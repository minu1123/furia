# Know Your Fan - FURIA Esports Challenge

Este é o projeto desenvolvido para o desafio **"Know Your Fan"** da FURIA Esports. A proposta é criar uma plataforma moderna, funcional e responsiva que permita:

* Cadastrar fãs de e-sports
* Validar identidade via upload de documentos com OCR (Reconhecimento Óptico de Caracteres)
* Vincular redes sociais
* Exibir dados em um dashboard inteligente

---

## 🚀 Tecnologias Utilizadas

* **React** (com Vite) — Frontend
* **TypeScript** — Tipagem estática
* **CSS Modules** — Estilização modular
* **Supabase** — Backend como serviço (banco de dados e autenticação)
* **OCR.Space API** — Extração de dados de documentos (nome, CPF etc.)
* **React Router DOM** — Navegação entre páginas
* **Chatbot Customizado** — Script inteligente flutuante
* **React Icons / SVGs** — Ícones sociais
* **Deploy-ready** — Código preparado para hospedagem

---

## 📁 Estrutura de Pastas

```
know-your-fan/
├── backend/                        # (caso exista backend separado)
├── frontend/
│   ├── public/
│   ├── node_modules/
│   ├── .env                        # Variáveis de ambiente
│   ├── index.html                  # HTML base
│   ├── package.json               
│   ├── tsconfig.*.json            # Tipagem
│   ├── vite.config.ts             # Configuração Vite
│   └── src/
│       ├── assets/                # Recursos visuais (logo etc.)
│       ├── img/                   # Imagens dos times
│       ├── lib/                   # Funções reutilizáveis (OCR, Supabase)
│       ├── pages/
│       │   ├── ChatBotIA.tsx
│       │   ├── ChatBot.module.css
│       │   ├── Dashboard.tsx
│       │   ├── Dashboard.module.css
│       │   ├── FanForm.tsx
│       │   ├── FanForm.module.css
│       │   ├── HomePage.tsx
│       │   └── HomePage.module.css
│       ├── App.tsx
│       ├── App.css
│       ├── main.tsx
│       └── index.css
```

---

## ⚙️ Instalação

### Pré-requisitos

* Node.js (versão 18+)
* npm ou yarn
* Conta no [Supabase.io](https://supabase.io)
* Chave da API [OCR.space](https://ocr.space/)

### Passos para rodar localmente:

1. **Clone o projeto:**

```bash
git clone https://github.com/seu-usuario/know-your-fan.git
cd know-your-fan/frontend
```

2. **Instale as dependências:**

```bash
npm install
# ou
yarn
```

3. **Configure variáveis de ambiente:**

Crie um arquivo `.env` com:

```env
VITE_SUPABASE_URL=https://xyzcompany.supabase.co
VITE_SUPABASE_ANON_KEY=chave_publica
VITE_OCR_API_KEY=sua_chave_da_ocr_space
```

4. **Inicie o projeto:**

```bash
npm run dev
# ou
yarn dev
```

---

## 📌 Funcionalidades Implementadas

| Funcionalidade                          | Status         |
| --------------------------------------- | -------------- |
| Cadastro de fãs com nome, email e redes | ✅ Implementado |
| Upload de documento com validação OCR   | ✅ Implementado |
| Extração de nome e CPF com OCR.space    | ✅ Implementado |
| Validação automática do documento       | ✅ Implementado |
| Interface moderna estilo FURIA          | ✅ Implementado |
| Integração com Supabase (CRUD completo) | ✅ Implementado |
| Dashboard com visualização de fãs       | ✅ Implementado |
| Chatbot IA com botão flutuante          | ✅ Implementado |
| Responsivo (mobile e desktop)           | ✅ Implementado |

---

## 📸 Preview do Projeto

![preview](./public/screenshot-home.png)

---

## 💬 Desafio Proposto

> Desenvolver uma aplicação que possibilite o cadastro de fãs da FURIA, validação de identidade via OCR, vinculação com redes sociais e visualização dos dados via dashboard.

---

## 🧐 Como funciona a validação?

1. O fã envia uma imagem ou PDF de um documento oficial.
2. A API OCR.space extrai os dados automaticamente (nome e CPF).
3. O sistema compara os dados extraídos com os dados fornecidos.
4. Se forem compatíveis, o perfil é marcado como **validado**.
5. Todas as informações são armazenadas e gerenciadas no **Supabase**.

---

## 🧑‍💻 Autor

**Minu**
Criado com 💜 para o desafio da FURIA.

[Portfólio](https://github.com/seu-usuario) — [LinkedIn](https://linkedin.com/in/seu-usuario)

---

## 📄 Licença

Este projeto é livre para fins educacionais ou de apresentação em desafios. Entre em contato para uso comercial.
