import { FC, useState } from 'react'

import { useI18n } from './useI18n'

interface CodeBlockProps {
  children: string
  language?: string
}

export const CodeBlock: FC<CodeBlockProps> = ({ children, language = 'bash' }) => {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="code-block-wrapper">
      <pre className="code-block">
        <code className={`language-${language}`}>{children}</code>
      </pre>
      <button className="code-copy-btn" onClick={handleCopy} aria-label={t.hero.copy}>
        {copied ? t.hero.copied : t.hero.copy}
      </button>
    </div>
  )
}
