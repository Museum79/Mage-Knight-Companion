import { useState, useRef, useEffect } from 'react'
import { Send, RefreshCw, BookOpen, AlertCircle } from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import { OracleAvatar, MessageBubble, LoadingBubble, EmptyState } from '../components/chat'

export function RulesPage() {
  const [input, setInput] = useState('')
  const [inputFocused, setInputFocused] = useState(false)
  const { messages, isLoading, error, sendMessage, clearError, clearMessages } = useChatStore()
  const bottomRef = useRef(null)
  const scrollRef = useRef(null)
  const isEmpty = messages.length === 0

  // Auto-scroll intelligent : ne scroll que si l'utilisateur est déjà en bas
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isLoading])

  const handleSubmit = (e) => {
    e?.preventDefault()
    const q = input.trim()
    if (!q || isLoading) return
    setInput('')
    sendMessage(q)
  }

  return (
    <div className="flex flex-col h-full">
      {/* Sub-header */}
      <div className="flex items-center justify-between px-4 py-3 relative"
        style={{ borderBottom: '1px solid rgba(116,95,63,0.2)' }}>
        <span className="absolute bottom-0 left-0 right-0 h-px mk-header-glow pointer-events-none"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(200,160,40,0.5), transparent)' }}
          aria-hidden="true"
        />
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(28,23,17,0.98) 0%, rgba(12,10,8,0.96) 100%)',
              border: '1px solid rgba(200,160,40,0.3)',
              boxShadow: '0 0 8px rgba(200,160,40,0.1)',
            }}>
            <BookOpen size={12} className="text-gold-300" />
          </div>
          <div>
            <h2 className="font-display font-bold text-gold-300 tracking-wide text-sm leading-none">
              Oracle des Règles
            </h2>
            <p className="text-[10px] text-[#7a6344] mt-1 leading-none">Mage Knight Board Game</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearMessages}
            aria-label="Effacer la conversation"
            className="p-2 rounded-xl text-[#8a6b44] transition-all duration-300 active:opacity-70 hover:text-gold-300 hover:-rotate-45"
            style={{
              background: 'rgba(28,22,15,0.8)',
              border: '1px solid rgba(116,95,63,0.2)',
            }}>
            <RefreshCw size={14} />
          </button>
        )}
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-4"
        role="log"
        aria-live="polite"
        aria-label="Conversation avec l'Oracle"
      >
        {isEmpty && !isLoading && (
          <EmptyState onSelect={sendMessage} isLoading={isLoading} />
        )}

        {messages.map((msg, i) => <MessageBubble key={msg.id} message={msg} index={i} />)}
        {isLoading && <LoadingBubble />}

        {error && (
          <div className="flex items-start gap-3 p-3 mb-3 rounded-2xl mk-error-shake"
            role="alert"
            style={{
              background: 'rgba(80,10,10,0.3)',
              border: '1px solid rgba(180,60,60,0.3)',
            }}>
            <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-red-300">{error}</p>
              <button onClick={clearError} className="text-xs text-red-500 mt-1 font-display tracking-wide">
                Fermer
              </button>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="px-4 py-3 flex gap-2 relative"
        style={{ borderTop: '1px solid rgba(116,95,63,0.2)' }}
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onFocus={() => setInputFocused(true)}
          onBlur={() => setInputFocused(false)}
          placeholder="Posez votre question…"
          disabled={isLoading}
          aria-label="Votre question pour l'Oracle"
          className="flex-1 mk-input rounded-[1.1rem] px-4 py-2.5 text-sm disabled:opacity-50 transition-shadow duration-200"
          style={{
            boxShadow: inputFocused
              ? '0 0 0 2px rgba(200,160,40,0.35), 0 0 14px rgba(200,160,40,0.2)'
              : undefined,
          }}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          aria-label="Envoyer la question"
          className="w-10 h-10 rounded-xl mk-control-accent disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center shrink-0 active:opacity-90 transition-all group relative overflow-hidden"
        >
          <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, rgba(255,240,180,0.35), transparent 70%)' }}
            aria-hidden="true"
          />
          <Send size={15} className="text-slate-950 relative group-hover:translate-x-0.5 transition-transform" />
        </button>
      </form>
    </div>
  )
}
