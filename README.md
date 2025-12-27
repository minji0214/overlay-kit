# Overlay Kit

A lightweight, headless React library for drawer and dialog components with SSR support.

## Installation

```bash
pnpm add react-headless-overlay
```

## Features

- ✅ **Headless** - No default styles, fully customizable
- ✅ **SSR-friendly** - Uses Portal with client-side only mounting
- ✅ **Z-index management** - Automatic z-index stacking, or manually control
- ✅ **Global dialog system** - Toast-like API with `dialog()` function
- ✅ **Scroll lock** - Automatically locks body scroll when dialog is open
- ✅ **Focus trap** - Keeps focus within dialog
- ✅ **Keyboard navigation** - Tab, Shift+Tab, Escape key support
- ✅ **Accessible** - ARIA attributes included
- ✅ **Zero dependencies** - Uses only React built-in APIs (Context API)

## Usage

### Global Dialog System (Recommended)

**Important**: To use the global `dialog()` function, you must wrap your app with both `DialogProvider` and `DialogRenderer` in your root layout.

- `DialogProvider`: Manages the dialog state and provides context
- `DialogRenderer`: Renders the dialogs to the screen

Both are required - without `DialogRenderer`, dialogs won't appear even if you call `dialog()`.

```tsx
import { DialogProvider, DialogRenderer } from 'react-headless-overlay'

function App() {
  return (
    <DialogProvider defaultZIndex={50}>
      <YourApp />
      <DialogRenderer />
    </DialogProvider>
  )
}

// In Next.js App Router, place this in your root layout:
// app/layout.tsx
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
}
```

Then use `dialog()` function anywhere to open dialogs:

```tsx
import { dialog } from 'react-headless-overlay'

function MyComponent() {
  const handleClick = () => {
    const { close } = dialog({
      content: <div>Hello Dialog!</div>,
      zIndex: 100, // optional
      closeOnOverlayClick: true,
      closeOnEscape: true,
    })

    // Close programmatically
    // close()
  }

  return <button onClick={handleClick}>Open Dialog</button>
}
```

Or use the `useDialog` hook:

```tsx
import { useDialog } from 'react-headless-overlay'

function MyComponent() {
  const { dialog } = useDialog()

  const handleClick = () => {
    dialog({
      content: <div>Hello Dialog!</div>,
    })
  }

  return <button onClick={handleClick}>Open Dialog</button>
}
```

#### Z-index Management

Dialogs are automatically stacked with increasing z-index values. You can also manually control z-index:

```tsx
// Automatic stacking (defaultZIndex: 50 → 50, 51, 52, ...)
dialog({ content: <div>Dialog 1</div> })
dialog({ content: <div>Dialog 2</div> }) // z-index: 51

// Manual z-index
dialog({ content: <div>Dialog</div>, zIndex: 100 })
```

### Standalone Dialog Component

```tsx
import { Dialog } from 'react-headless-overlay'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button onClick={() => setOpen(true)}>Open Dialog</button>
      <Dialog
        open={open}
        onOpenChange={setOpen}
        zIndex={100}
        closeOnOverlayClick={true}
        closeOnEscape={true}
        overlayClassName="custom-overlay"
        contentClassName="custom-content"
      >
        <div>Dialog content</div>
      </Dialog>
    </>
  )
}
```

#### Dialog Props

- `open?: boolean` - Controls the dialog open state
- `onOpenChange?: (open: boolean) => void` - Callback when dialog state changes
- `children?: ReactNode` - Dialog content
- `zIndex?: number` - Custom z-index value
- `closeOnOverlayClick?: boolean` - Close dialog when clicking overlay (default: `true`)
- `closeOnEscape?: boolean` - Close dialog when pressing Escape key (default: `true`)
- `overlayClassName?: string` - Custom className for overlay
- `contentClassName?: string` - Custom className for content

### Drawer

```tsx
import { Drawer } from 'react-headless-overlay'
import { useState } from 'react'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <Drawer open={open} onOpenChange={setOpen} side="right">
      <p>Drawer content</p>
    </Drawer>
  )
}
```

## Styling

Since this library is headless, you need to provide your own styles. Here's an example with CSS:

```css
/* Overlay */
.dialog-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

/* Content */
.dialog-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  padding: 24px;
  max-width: 90vw;
  max-height: 90vh;
  overflow: auto;
}
```

```tsx
<Dialog
  open={open}
  onOpenChange={setOpen}
  overlayClassName="dialog-overlay"
  contentClassName="dialog-content"
>
  <div>Your content</div>
</Dialog>
```

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build library
pnpm build

# Type check
pnpm type-check

# Lint
pnpm lint

# Format
pnpm format
```

## License

MIT
