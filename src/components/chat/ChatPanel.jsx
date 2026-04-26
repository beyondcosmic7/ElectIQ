import { useCallback } from 'react'
import { useGemini } from '../../hooks/useGemini'
import MessageList from './MessageList'
import ChatInputBar from './ChatInputBar'
import ApiKeySetup from '../layout/ApiKeySetup'

const HAS_API_KEY = Boolean(import.meta.env.VITE_GEMINI_API_KEY)

export default function ChatPanel() {
  const { sendMessage } = useGemini()

  const handleSend = useCallback((message) => {
    sendMessage(message)
  }, [sendMessage])

  const handleSelectQuestion = useCallback((question) => {
    sendMessage(question)
  }, [sendMessage])

  if (!HAS_API_KEY) {
    return <ApiKeySetup />
  }

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <MessageList onSelectQuestion={handleSelectQuestion} />
      <ChatInputBar onSend={handleSend} />
    </div>
  )
}
