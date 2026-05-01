import { OracleAvatar } from './OracleAvatar'

function Ornament() {
  return (
    <div className="flex items-center justify-center py-1.5 opacity-40" aria-hidden="true">
      <span className="text-[9px] text-gold-500 tracking-[0.5em]">◆ ◆ ◆</span>
    </div>
  )
}

function parseBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i} className="font-semibold text-gold-200"
          style={{ textShadow: '0 0 6px rgba(200,160,40,0.2)' }}>
          {part.slice(2, -2)}
        </strong>
      : part
  )
}

function parseContent(text, { dropCap = false } = {}) {
  const lines = text.split('\n')
  const elements = []
  let i = 0
  let firstLetterDropped = false

  while (i < lines.length) {
    const line = lines[i]

    if (/^[-•*]\s/.test(line) || /^\d+\.\s/.test(line)) {
      const listItems = []
      while (i < lines.length && (/^[-•*]\s/.test(lines[i]) || /^\d+\.\s/.test(lines[i]))) {
        listItems.push(lines[i].replace(/^[-•*]\s/, '').replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ul key={`list-${i}`} className="mt-1.5 space-y-1 pl-3.5 border-l border-gold-600/30">
          {listItems.map((item, j) => (
            <li key={j} className="flex gap-2 items-start">
              <span className="text-gold-500 mt-1 text-[8px] shrink-0">◆</span>
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>
      )
    } else if (line.trim() === '') {
      if (elements.length > 0) elements.push(<Ornament key={`orn-${i}`} />)
      i++
    } else {
      const useCap = dropCap && !firstLetterDropped && line.length > 0
      if (useCap) {
        firstLetterDropped = true
        const firstChar = line[0]
        const rest = line.slice(1)
        elements.push(
          <p key={`p-${i}`} className="relative">
            <span
              className="float-left font-display font-bold text-gold-300 mr-1.5 mt-0.5"
              style={{
                fontSize: '2.2rem',
                lineHeight: '0.9',
                textShadow: '0 0 12px rgba(200,160,40,0.3)',
              }}
              aria-hidden="true"
            >
              {firstChar}
            </span>
            <span className="sr-only">{firstChar}</span>
            {parseBold(rest)}
          </p>
        )
      } else {
        elements.push(<p key={`p-${i}`}>{parseBold(line)}</p>)
      }
      i++
    }
  }
  return elements
}

export function MessageBubble({ message, index }) {
  const isUser = message.role === 'user'

  if (isUser) {
    return (
      <div key={message.id} className="flex justify-end mb-3 mk-message-enter">
        <div className="max-w-xs px-4 py-2.5 rounded-2xl text-sm"
          style={{
            background: 'linear-gradient(135deg, rgba(200,160,40,0.25) 0%, rgba(160,120,30,0.15) 100%)',
            border: '1px solid rgba(200,160,40,0.2)',
            color: '#e8cc60',
          }}>
          {message.content}
        </div>
      </div>
    )
  }

  return (
    <div key={message.id} className="flex gap-2 mb-4 mk-message-enter">
      <OracleAvatar />
      <div className="flex-1 max-w-md"
        style={{
          background: 'linear-gradient(135deg, rgba(40,35,28,0.8) 0%, rgba(20,18,16,0.8) 100%)',
          border: '1px solid rgba(200,160,40,0.15)',
        }}
        className="rounded-2xl px-4 py-3 text-sm text-text-secondary relative overflow-hidden">
        <span className="absolute inset-0 mk-bubble-sweep pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,220,140,0.4), transparent)',
            width: '40%',
            height: '100%',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          {parseContent(message.content, { dropCap: index === 0 })}
        </div>
      </div>
    </div>
  )
}
