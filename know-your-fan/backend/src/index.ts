import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('API do Know Your Fan funcionando!')
})

app.listen(3001, () => {
  console.log('🚀 Servidor rodando em http://localhost:3001')
})
