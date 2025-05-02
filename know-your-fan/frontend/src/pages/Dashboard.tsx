import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { User, FileSearch, ArrowLeft } from 'lucide-react'
import styles from './Dashboard.module.css'

interface Fan {
  id: number
  nome: string
  cpf?: string
  email: string
  jogos_favoritos?: string
  perfil_esports?: string
  documento_url?: string
  documento_validado?: boolean
  perfil_validado?: boolean
  redes_vinculadas?: boolean
  twitter?: string
  instagram?: string
  twitch?: string
}

export default function Dashboard() {
  const [fans, setFans] = useState<Fan[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchFans = async () => {
      const { data, error } = await supabase
        .from('fans')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Erro ao carregar fãs:', error)
      } else {
        setFans(data)

        for (const fan of data) {
          if (fan.documento_url && fan.documento_validado == null) {
            await validarDocumento(fan)
          }
          if (fan.perfil_esports && fan.perfil_validado == null) {
            await validarPerfil(fan)
          }
          if (fan.redes_vinculadas == null) {
            await validarRedes(fan)
          }
        }
      }
    }

    fetchFans()
  }, [])

  const validarDocumento = async (fan: Fan) => {
    const url = `https://wdybgyrkuabwspapjerv.supabase.co/storage/v1/object/public/documentos/${fan.documento_url}`
    const cpfLimpo = (fan.cpf || '').replace(/\D/g, '')
    const nomeLimpo = fan.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()

    try {
      const response = await fetch('https://api.ocr.space/parse/imageurl', {
        method: 'POST',
        headers: { apikey: 'K84549420788957' },
        body: new URLSearchParams({
          language: 'por',
          isOverlayRequired: 'false',
          url,
        }),
      })

      const result = await response.json()
      const textoOCR = result?.ParsedResults?.[0]?.ParsedText
      if (!textoOCR) {
        console.warn('OCR não retornou texto.')
        return
      }

      const texto = textoOCR.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      const nomeMatch = texto.includes(nomeLimpo)
      const cpfMatch = texto.replace(/\D/g, '').includes(cpfLimpo)
      const validado = nomeMatch && cpfMatch

      await supabase
        .from('fans')
        .update({ documento_validado: validado })
        .eq('id', fan.id)

      setFans(prev =>
        prev.map(f => f.id === fan.id ? { ...f, documento_validado: validado } : f)
      )
    } catch (err) {
      console.error('Erro na validação OCR:', err)
    }
  }

  const validarPerfil = async (fan: Fan) => {
    try {
      const url = fan.perfil_esports?.toLowerCase() || ''

      // Palavras-chave aceitas na URL para validação
      const keywords = [
        'twitch', 'liquipedia', 'furia', 'esports', 'steam',
        'csgo', 'valorant', 'lol', 'leagueoflegends', 'dota',
        'hltv', 'faceit'
      ]

      const valido = keywords.some(keyword => url.includes(keyword))

      await supabase
        .from('fans')
        .update({ perfil_validado: valido })
        .eq('id', fan.id)

      setFans(prev =>
        prev.map(f => f.id === fan.id ? { ...f, perfil_validado: valido } : f)
      )
    } catch (err) {
      console.error('Erro ao validar perfil:', fan.perfil_esports, err)
    }
  }

  const validarRedes = async (fan: Fan) => {
    const redes = [fan.twitter, fan.instagram, fan.twitch].filter(Boolean)
    const algumaValida = redes.some(url =>
      url?.startsWith('http') &&
      /(twitch\.tv|twitter\.com|instagram\.com)/.test(url)
    )

    await supabase
      .from('fans')
      .update({ redes_vinculadas: algumaValida })
      .eq('id', fan.id)

    setFans(prev =>
      prev.map(f => f.id === fan.id ? { ...f, redes_vinculadas: algumaValida } : f)
    )
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowLeft size={16} /> Voltar
      </button>

      <h2 className={styles.title}>🎮 Dashboard FURIA</h2>

      <div className={styles.cardGrid}>
        <Card title="Total de Fãs" value={fans.length.toString()} icon={<User size={28} />} />
        <Card title="Com documento" value={fans.filter(f => f.documento_url).length.toString()} icon={<FileSearch size={28} />} />
        <Card title="Sem documento" value={fans.filter(f => !f.documento_url).length.toString()} icon={<FileSearch size={28} className="text-red-500" />} />
      </div>

      <div className={styles.tableContainer}>
        <h3 className={styles.tableTitle}>📋 Fãs cadastrados</h3>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Jogos</th>
              <th>Perfil</th>
              <th>Documento</th>
              <th>Status Documento</th>
              <th>Status Perfil</th>
              <th>Redes Sociais</th>
            </tr>
          </thead>
          <tbody>
            {fans.map(fan => (
              <tr key={fan.id}>
                <td>{fan.nome}</td>
                <td>{fan.email}</td>
                <td>{fan.jogos_favoritos || '—'}</td>
                <td>
                  {fan.perfil_esports ? (
                    <a href={fan.perfil_esports} target="_blank" rel="noreferrer" className={styles.link}>Ver perfil</a>
                  ) : (
                    <span className={styles.textGray}>—</span>
                  )}
                </td>
                <td>
                  {fan.documento_url ? (
                    <a href={`https://wdybgyrkuabwspapjerv.supabase.co/storage/v1/object/public/documentos/${fan.documento_url}`} target="_blank" rel="noreferrer" className={styles.link}>Visualizar</a>
                  ) : (
                    <span className={styles.textGray}>Não enviado</span>
                  )}
                </td>
                <td className={`${styles.status} ${fan.documento_validado === true ? styles.success : fan.documento_validado === false ? styles.error : styles.pending}`}>
                  {fan.documento_validado === true ? '✅' : fan.documento_validado === false ? '❌' : '⏳'}
                </td>
                <td className={`${styles.status} ${fan.perfil_validado === true ? styles.success : fan.perfil_validado === false ? styles.error : styles.pending}`}>
                  {fan.perfil_validado === true ? '✅' : fan.perfil_validado === false ? '❌' : '⏳'}
                </td>
                <td className={`${styles.status} ${fan.redes_vinculadas === true ? styles.success : fan.redes_vinculadas === false ? styles.error : styles.pending}`}>
                  {fan.redes_vinculadas === true ? '✅' : fan.redes_vinculadas === false ? '❌' : '⏳'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Card({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardIcon}>{icon}</div>
      <div className={styles.cardText}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardValue}>{value}</p>
      </div>
    </div>
  )
}
