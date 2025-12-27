import { FC, useState, useMemo } from 'react'

import { DialogProvider, DialogRenderer, dialog as dialogFunction, useDialog, Dialog } from '../index'
import { I18nProvider, useI18n } from './useI18n'
import { ExampleCodeSnippets } from './ExamplesCodeSnippets'
import { CodeBlock } from './CodeBlock'
import './styles.css'

const App: FC = () => {
  return (
    <DialogProvider defaultZIndex={50}>
      <I18nProvider>
        <DocumentationSite />
        <DialogRenderer />
      </I18nProvider>
    </DialogProvider>
  )
}

const DocumentationSite: FC = () => {
  return (
    <div className="docs-container">
      <LanguageSwitcher />
      <Hero />
      <Features />
      <QuickStart />
      <Examples />
      <APIDocumentation />
      <Footer />
    </div>
  )
}

const LanguageSwitcher: FC = () => {
  const { language, setLanguage } = useI18n()

  return (
    <div className="language-switcher">
      <button className={`lang-btn ${language === 'en' ? 'lang-btn-active' : ''}`} onClick={() => setLanguage('en')}>
        EN
      </button>
      <button className={`lang-btn ${language === 'ko' ? 'lang-btn-active' : ''}`} onClick={() => setLanguage('ko')}>
        KO
      </button>
    </div>
  )
}

const Hero: FC = () => {
  const { t } = useI18n()
  const [installCopied, setInstallCopied] = useState(false)
  const installCommand = 'pnpm add overlay-kit'

  const handleInstallCopy = async () => {
    try {
      await navigator.clipboard.writeText(installCommand)
      setInstallCopied(true)
      setTimeout(() => setInstallCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const openGetStartedDialog = () => {
    dialogFunction({
      content: (
        <div className="demo-content-inner">
          <h2 style={{ marginTop: 0 }}>🚀 {t.quickStart.getStarted.title}</h2>
          <CodeBlock>
            {`// 1. ${t.quickStart.install.title}
pnpm add overlay-kit

// 2. ${t.quickStart.provider.title}
import { DialogProvider, DialogRenderer } from 'overlay-kit'

function App() {
  return (
    <DialogProvider defaultZIndex={50}>
      <YourApp />
      <DialogRenderer />
    </DialogProvider>
  )
}

// 3. ${t.quickStart.usage.title}
import { dialog } from 'overlay-kit'

dialog({
  content: <div>Hello Dialog!</div>
})`}
          </CodeBlock>
        </div>
      ),
      overlayClassName: 'demo-overlay',
      contentClassName: 'demo-content',
    })
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">{t.hero.title}</h1>
        <p className="hero-description">
          {t.hero.description}
          <br />
          {t.hero.description2}
        </p>
        <div className="hero-buttons">
          <button className="hero-btn hero-btn-primary" onClick={openGetStartedDialog}>
            {t.hero.getStarted}
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn-secondary"
          >
            GitHub
          </a>
        </div>
        <div className="hero-install">
          <code className="hero-code">{installCommand}</code>
          <button className="hero-code-copy-btn" onClick={handleInstallCopy} aria-label={t.hero.copy}>
            {installCopied ? t.hero.copied : t.hero.copy}
          </button>
        </div>
      </div>
    </section>
  )
}

const Features: FC = () => {
  const { t } = useI18n()

  const features = useMemo(
    () => [
      {
        icon: '🎨',
        title: t.features.headless.title,
        description: t.features.headless.description,
      },
      {
        icon: '⚡',
        title: t.features.ssr.title,
        description: t.features.ssr.description,
      },
      {
        icon: '📚',
        title: t.features.zIndex.title,
        description: t.features.zIndex.description,
      },
      {
        icon: '🌐',
        title: t.features.global.title,
        description: t.features.global.description,
      },
      {
        icon: '🔒',
        title: t.features.scrollLock.title,
        description: t.features.scrollLock.description,
      },
      {
        icon: '⌨️',
        title: t.features.keyboard.title,
        description: t.features.keyboard.description,
      },
      {
        icon: '♿',
        title: t.features.accessibility.title,
        description: t.features.accessibility.description,
      },
      {
        icon: '📦',
        title: t.features.zeroDeps.title,
        description: t.features.zeroDeps.description,
      },
    ],
    [t],
  )

  return (
    <section className="features" id="features">
      <div className="section-container">
        <h2 className="section-title">{t.features.title}</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.title} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QuickStart: FC = () => {
  const { t } = useI18n()

  return (
    <section className="quickstart" id="quickstart">
      <div className="section-container">
        <h2 className="section-title">{t.quickStart.title}</h2>
        <div className="quickstart-content">
          <div className="quickstart-step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>{t.quickStart.install.title}</h3>
              <CodeBlock>{`pnpm add overlay-kit
# or
npm install overlay-kit
# or
yarn add overlay-kit`}</CodeBlock>
            </div>
          </div>

          <div className="quickstart-step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>{t.quickStart.provider.title}</h3>
              <p style={{ marginBottom: '12px', color: '#586069', fontSize: '0.95rem' }}>
                {t.quickStart.provider.description}
              </p>
              <CodeBlock language="tsx">{`import { DialogProvider, DialogRenderer } from 'overlay-kit'

function App() {
  return (
    <DialogProvider defaultZIndex={50}>
      <YourApp />
      <DialogRenderer />
    </DialogProvider>
  )
}

// In Next.js App Router (app/layout.tsx):
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <DialogProvider defaultZIndex={50}>
          {children}
          <DialogRenderer />
        </DialogProvider>
      </body>
    </html>
  )
}`}</CodeBlock>
            </div>
          </div>

          <div className="quickstart-step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>{t.quickStart.usage.title}</h3>
              <CodeBlock language="tsx">{`import { dialog } from 'overlay-kit'

function MyComponent() {
  const handleClick = () => {
    dialog({
      content: <div>Hello Dialog!</div>,
      closeOnOverlayClick: true,
      closeOnEscape: true,
    })
  }

  return <button onClick={handleClick}>Open Dialog</button>
}`}</CodeBlock>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const Examples: FC = () => {
  const { t } = useI18n()
  const { dialog: dialogHook } = useDialog()
  const [standaloneOpen, setStandaloneOpen] = useState(false)
  const [codeDialogOpen, setCodeDialogOpen] = useState(false)
  const [codeDialogType, setCodeDialogType] = useState<'basic' | 'hook' | 'nested' | 'standalone'>('basic')

  const showCode = (type: 'basic' | 'hook' | 'nested' | 'standalone', e?: React.MouseEvent) => {
    e?.preventDefault()
    e?.stopPropagation()

    setCodeDialogType(type)
    setCodeDialogOpen(true)
  }

  const examples = useMemo(
    () => [
      {
        title: t.examples.basic.title,
        description: t.examples.basic.description,
        type: 'basic' as const,
        action: () => {
          dialogFunction({
            content: (
              <div className="demo-content-inner">
                <h2 style={{ marginTop: 0 }}>{t.examples.basic.content}</h2>
                <p>{t.examples.basic.text}</p>
              </div>
            ),
            overlayClassName: 'demo-overlay',
            contentClassName: 'demo-content',
          })
        },
      },
      {
        title: t.examples.hook.title,
        description: t.examples.hook.description,
        type: 'hook' as const,
        action: () => {
          dialogHook({
            content: (
              <div className="demo-content-inner">
                <h2 style={{ marginTop: 0 }}>{t.examples.hook.content}</h2>
                <p>{t.examples.hook.text}</p>
              </div>
            ),
            overlayClassName: 'demo-overlay',
            contentClassName: 'demo-content',
          })
        },
      },
      {
        title: t.examples.nested.title,
        description: t.examples.nested.description,
        type: 'nested' as const,
        action: () => {
          dialogHook({
            content: (
              <div className="demo-content-inner">
                <h2 style={{ marginTop: 0 }}>{t.examples.nested.content}</h2>
                <p>{t.examples.nested.text}</p>
                <button
                  className="demo-btn-inline"
                  onClick={() =>
                    dialogHook({
                      content: (
                        <div className="demo-content-inner">
                          <h3 style={{ marginTop: 0 }}>{t.examples.nested.nestedContent}</h3>
                          <p>{t.examples.nested.nestedText}</p>
                        </div>
                      ),
                      overlayClassName: 'demo-overlay',
                      contentClassName: 'demo-content',
                    })
                  }
                >
                  {t.examples.nested.button}
                </button>
              </div>
            ),
            overlayClassName: 'demo-overlay',
            contentClassName: 'demo-content',
          })
        },
      },
      {
        title: t.examples.standalone.title,
        description: t.examples.standalone.description,
        type: 'standalone' as const,
        action: () => setStandaloneOpen(true),
      },
    ],
    [t, dialogHook, setStandaloneOpen],
  )

  return (
    <section className="examples" id="examples">
      <div className="section-container">
        <h2 className="section-title">{t.examples.title}</h2>
        <p className="section-description">{t.examples.description}</p>
        <div className="examples-grid">
          {examples.map((example) => (
            <div key={example.title} className="example-card">
              <h3 className="example-title">{example.title}</h3>
              <p className="example-description">{example.description}</p>
              <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                <button className="example-btn" onClick={example.action}>
                  {t.examples.viewExample}
                </button>
                <button className="example-btn example-btn-secondary" onClick={(e) => showCode(example.type, e)}>
                  {t.examples.viewCode}
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={standaloneOpen}
          onOpenChange={setStandaloneOpen}
          overlayClassName="demo-overlay"
          contentClassName="demo-content"
        >
          <div className="demo-content-inner">
            <h2 style={{ marginTop: 0 }}>{t.examples.standalone.content}</h2>
            <p>{t.examples.standalone.text}</p>
            <button className="demo-btn-inline" onClick={() => setStandaloneOpen(false)}>
              {t.examples.standalone.close}
            </button>
          </div>
        </Dialog>

        <Dialog
          open={codeDialogOpen}
          onOpenChange={setCodeDialogOpen}
          overlayClassName="demo-overlay"
          contentClassName="demo-content-code"
        >
          <div className="demo-content-inner">
            <h2 style={{ marginTop: 0, marginBottom: '24px' }}>{t.examples[codeDialogType].title}</h2>
            <ExampleCodeSnippets type={codeDialogType} />
          </div>
        </Dialog>
      </div>
    </section>
  )
}

const APIDocumentation: FC = () => {
  const { t } = useI18n()

  return (
    <section className="api" id="api">
      <div className="section-container">
        <h2 className="section-title">{t.api.title}</h2>

        <div className="api-section">
          <h3 className="api-title">{t.api.dialog.title}</h3>
          <p className="api-description">{t.api.dialog.description}</p>
          <CodeBlock language="tsx">{`dialog({
  content: ReactNode,
  zIndex?: number,
  closeOnOverlayClick?: boolean,
  closeOnEscape?: boolean,
  overlayClassName?: string,
  contentClassName?: string,
}): { close: () => void }`}</CodeBlock>
        </div>

        <div className="api-section">
          <h3 className="api-title">{t.api.useDialog.title}</h3>
          <p className="api-description">{t.api.useDialog.description}</p>
          <CodeBlock language="tsx">{`const { dialog } = useDialog()

dialog({ content: <div>Hello</div> })`}</CodeBlock>
        </div>

        <div className="api-section">
          <h3 className="api-title">{t.api.dialogComponent.title}</h3>
          <p className="api-description">{t.api.dialogComponent.description}</p>
          <CodeBlock language="tsx">{`<Dialog
  open?: boolean
  onOpenChange?: (open: boolean) => void
  zIndex?: number
  closeOnOverlayClick?: boolean
  closeOnEscape?: boolean
  overlayClassName?: string
  contentClassName?: string
>
  {children}
</Dialog>`}</CodeBlock>
        </div>

        <div className="api-section">
          <h3 className="api-title">{t.api.dialogProvider.title}</h3>
          <p className="api-description">{t.api.dialogProvider.description}</p>
          <CodeBlock language="tsx">{`<DialogProvider defaultZIndex={50}>
  <YourApp />
  <DialogRenderer />
</DialogProvider>`}</CodeBlock>
        </div>
      </div>
    </section>
  )
}

const Footer: FC = () => {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          <strong>Overlay Kit</strong> - MIT License
        </p>
        <p>{t.footer.description}</p>
      </div>
    </footer>
  )
}

export { App }
