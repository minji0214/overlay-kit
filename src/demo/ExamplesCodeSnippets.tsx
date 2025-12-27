import { FC } from 'react'

import { CodeBlock } from './CodeBlock'

interface ExampleCodeProps {
  type: 'basic' | 'hook' | 'nested' | 'standalone'
}

const codes = {
  basic: `// 1. First, set up Provider in your app root (app.tsx or layout.tsx)
import { DialogProvider, DialogRenderer } from 'overlay-kit'

function App() {
  return (
    <DialogProvider defaultZIndex={50}>
      <YourApp />
      <DialogRenderer />
    </DialogProvider>
  )
}

// 2. Then use dialog() function anywhere
import { dialog } from 'overlay-kit'

function MyComponent() {
  const handleClick = () => {
    dialog({
      content: <div>Hello Dialog!</div>,
      closeOnOverlayClick: true,
      closeOnEscape: true,
    })
  }

  return <button onClick={handleClick}>Open Dialog</button>
}`,
  hook: `// 1. First, set up Provider in your app root (app.tsx or layout.tsx)
import { DialogProvider, DialogRenderer } from 'overlay-kit'

function App() {
  return (
    <DialogProvider defaultZIndex={50}>
      <YourApp />
      <DialogRenderer />
    </DialogProvider>
  )
}

// 2. Then use useDialog hook in your component
import { useDialog } from 'overlay-kit'

function MyComponent() {
  const { dialog } = useDialog()

  const handleClick = () => {
    dialog({
      content: <div>Hello Dialog!</div>,
    })
  }

  return <button onClick={handleClick}>Open Dialog</button>
}`,
  nested: `// 1. First, set up Provider in your app root (app.tsx or layout.tsx)
import { DialogProvider, DialogRenderer } from 'overlay-kit'

function App() {
  return (
    <DialogProvider defaultZIndex={50}>
      <YourApp />
      <DialogRenderer />
    </DialogProvider>
  )
}

// 2. Then use useDialog hook to open nested dialogs
import { useDialog } from 'overlay-kit'

function MyComponent() {
  const { dialog } = useDialog()

  const handleClick = () => {
    dialog({
      content: (
        <div>
          <h2>First Dialog</h2>
          <p>You can open another dialog inside this dialog.</p>
          <button
            onClick={() =>
              dialog({
                content: (
                  <div>
                    <h3>Nested Dialog</h3>
                    <p>z-index automatically increases!</p>
                  </div>
                ),
              })
            }
          >
            Open Nested Dialog
          </button>
        </div>
      ),
    })
  }

  return <button onClick={handleClick}>Open Dialog</button>
}`,
  standalone: `// Standalone Dialog doesn't require Provider
import { Dialog } from 'overlay-kit'
import { useState } from 'react'

function MyComponent() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        overlayClassName="my-overlay"
        contentClassName="my-content"
      >
        <div>Dialog content</div>
      </Dialog>
    </>
  )
}`,
}

export const ExampleCodeSnippets: FC<ExampleCodeProps> = ({ type }) => {
  const code = codes[type]

  return (
    <div className="example-code-container">
      <CodeBlock language="tsx">{code}</CodeBlock>
    </div>
  )
}
