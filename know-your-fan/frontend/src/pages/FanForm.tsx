import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../lib/supabase'
import styles from './FanForm.module.css'

export default function FanForm() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    email: '',
    cidade: '',
    estado: '',
    jogos_favoritos: '',
    perfil_esports: '', 
  })

  const [selectedRede, setSelectedRede] = useState('')
  const [linkRede, setLinkRede] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0]
    if (uploaded) setFile(uploaded)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    let fileUrl = null
    let documentoValidado = null

    if (file) {
      const fileExt = file.name.split('.').pop()
      const fileName = `${formData.cpf.replace(/\D/g, '')}.${fileExt}`

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('documentos')
        .upload(fileName, file, { upsert: true })

      if (uploadError) {
        alert('Erro ao enviar documento')
        setLoading(false)
        return
      }

      fileUrl = uploadData.path

      const documentoUrl = `https://wdybgyrkuabwspapjerv.supabase.co/storage/v1/object/public/documentos/${fileUrl}`
      const ocrForm = new FormData()
      ocrForm.append('url', documentoUrl)
      ocrForm.append('apikey', 'K84549420788957')
      ocrForm.append('language', 'por')

      try {
        const response = await fetch('https://api.ocr.space/parse/image', {
          method: 'POST',
          body: ocrForm,
        })

        const result = await response.json()
        const textoOCR = result?.ParsedResults?.[0]?.ParsedText || ''

        const texto = textoOCR.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
        const nomeMatch = texto.includes(formData.nome.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
        const cpfMatch = texto.replace(/\D/g, '').includes(formData.cpf.replace(/\D/g, ''))

        documentoValidado = nomeMatch && cpfMatch
      } catch (err) {
        console.error('Erro ao validar OCR:', err)
      }
    }

    const redes: Record<string, string> = {
      twitter: '',
      instagram: '',
      twitch: ''
    }
    if (selectedRede && linkRede) redes[selectedRede] = linkRede

    const { error } = await supabase.from('fans').insert([{
      ...formData,
      ...redes,
      documento_url: fileUrl,
      documento_validado: documentoValidado,
      perfil_validado: null,
      redes_vinculadas: null
    }])

    setLoading(false)
    if (error) {
      alert('Erro ao cadastrar fã')
    } else {
      alert('Fã cadastrado com sucesso!')
      navigate('/dashboard')
    }
  }

  return (
    <div className={styles.wrapper}>
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        <ArrowLeft size={16} />
        Voltar
      </button>

      <div className={styles.formContainer}>
        <form className={styles.formCard} onSubmit={handleSubmit}>
          <h2 className={styles.formTitle}>Cadastro de Fã</h2>

          <div className={styles.grid}>
            {[
              { name: 'nome', label: 'Nome', required: true },
              { name: 'cpf', label: 'CPF', required: true },
              { name: 'email', label: 'Email', required: true },
              { name: 'cidade', label: 'Cidade' },
              { name: 'estado', label: 'Estado' },
              { name: 'jogos_favoritos', label: 'Jogos favoritos' },
            ].map((field) => (
              <div key={field.name} className={styles.inputGroup}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  onChange={handleChange}
                  required={field.required}
                />
              </div>
            ))}

            {/* Perfil de jogos */}
            <div className={styles.inputGroup}>
              <label htmlFor="perfil_esports">Perfil de jogos</label>
              <input
                id="perfil_esports"
                name="perfil_esports"
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="rede">Escolha a rede social</label>
              <select
                id="rede"
                value={selectedRede}
                onChange={(e) => setSelectedRede(e.target.value)}
                required
              >
                <option value="">Selecione...</option>
                <option value="twitch">Twitch</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
              </select>
            </div>

            {selectedRede && (
              <div className={styles.inputGroup}>
                <label htmlFor="linkRede">Link do perfil</label>
                <input
                  id="linkRede"
                  placeholder={`https://${selectedRede}.com/seuperfil`}
                  value={linkRede}
                  onChange={(e) => setLinkRede(e.target.value)}
                  required
                />
              </div>
            )}
          </div>

          <div className={styles.inputGroup}>
            <label>Documento (PDF ou imagem)</label>
            <input type="file" accept=".pdf,image/*" onChange={handleFileChange} />
          </div>

          <button type="submit" className={styles.submitButton} disabled={loading}>
            {loading ? 'Enviando...' : 'Cadastrar fã'}
          </button>
        </form>
      </div>
    </div>
  )
}
