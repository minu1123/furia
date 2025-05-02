import React, { useState } from 'react';
import styles from './ChatBot.module.css';

const ChatBotIA: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: 'Olá! Sou o assistente oficial da FURIA 🐺. Como posso ajudar no desafio Know Your Fan?'
    }
  ]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');

    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'openai/gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'Você é um assistente simpático e direto da organização FURIA. Ajude o visitante com dúvidas sobre cadastro, envio de documentos, validação e o desafio Know Your Fan.'
            },
            ...messages.map(msg => ({
              role: msg.from === 'bot' ? 'assistant' : 'user',
              content: msg.text
            })),
            { role: 'user', content: userText }
          ],
          temperature: 0.7,
          max_tokens: 300
        })
      });

      const data = await response.json();
      const aiText = data?.choices?.[0]?.message?.content?.trim();

      setMessages(prev => [
        ...prev,
        {
          from: 'bot',
          text:
            aiText || '⚠️ A IA não retornou uma resposta válida. Verifique a chave ou tente novamente.'
        }
      ]);
    } catch (error) {
      console.error('Erro OpenRouter:', error);
      setMessages(prev => [
        ...prev,
        { from: 'bot', text: '❌ Erro ao se conectar com a IA. Tente novamente mais tarde.' }
      ]);
    }
  };

  return (
    <div className={styles.chatWrapper}>
      {open && (
        <div className={styles.chatBox}>
          <div className={styles.header}>
            Chat FURIA 🤖
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={styles[msg.from]}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.inputBox}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Pergunte algo..."
            />
            <button onClick={handleSend}>Enviar</button>
          </div>
        </div>
      )}
      {!open && (
        <button className={styles.toggle} onClick={() => setOpen(true)}>
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBotIA;
