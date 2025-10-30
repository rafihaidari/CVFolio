type EmailProps = {
  user: string
  domain: string
  className?: string
  label?: string
}

export function ObfuscatedEmail({ user, domain, className, label = 'Email' }: EmailProps) {
  const masked = `${user.replace(/\./g, '·')}[at]${domain.replace(/\./g, '[dot]')}`
  const handleClick = () => {
    const addr = `${user}@${domain}`
    window.location.href = `mailto:${addr}`
  }
  return (
    <button type="button" onClick={handleClick} className={className} aria-label={`Email ${user}`}> 
      {label || masked}
    </button>
  )
}

type PhoneProps = {
  parts: string[]
  className?: string
  label?: string
}

export function ObfuscatedPhone({ parts, className, label = 'Call' }: PhoneProps) {
  const masked = parts.join(' ').replace(/\d/g, '•')
  const handleClick = () => {
    const raw = parts.join('')
    const tel = raw.replace(/\s+/g, '')
    window.location.href = `tel:${tel}`
  }
  return (
    <button type="button" onClick={handleClick} className={className} aria-label="Call phone">
      {label || masked}
    </button>
  )
}


