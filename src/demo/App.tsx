import { FC, useState } from 'react'

import { DialogProvider, DialogRenderer, dialog, useDialog, Dialog } from '../index'
import './styles.css'

const App: FC = () => {
  return (
    <DialogProvider defaultZIndex={50}>
      <MainContent />
      <DialogRenderer />
    </DialogProvider>
  )
}

const MainContent: FC = () => {
  const { dialog: dialogHook } = useDialog()
  const [standaloneOpen, setStandaloneOpen] = useState(false)

  const openDialog1 = () => {
    dialog({
      content: (
        <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px' }}>
          <h2 style={{ marginTop: 0 }}>Dialog 1 (Function Call)</h2>
          <p>이것은 dialog() 함수로 열린 다이얼로그입니다.</p>
          <button
            onClick={() =>
              dialog({
                content: (
                  <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px' }}>
                    <h3 style={{ marginTop: 0 }}>중첩 다이얼로그</h3>
                    <p>이것은 중첩된 다이얼로그입니다.</p>
                  </div>
                ),
                overlayClassName: 'demo-overlay',
                contentClassName: 'demo-content',
              })
            }
          >
            중첩 다이얼로그 열기
          </button>
        </div>
      ),
      overlayClassName: 'demo-overlay',
      contentClassName: 'demo-content',
    })
  }

  const openDialog2 = () => {
    dialog({
      content: (
        <div style={{ padding: '24px', backgroundColor: '#f0f0f0', borderRadius: '12px', maxWidth: '500px' }}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Dialog 2</h2>
          <p style={{ lineHeight: 1.6 }}>z-index가 자동으로 증가합니다.</p>
          <div style={{ marginTop: '16px' }}>
            <button style={{ marginRight: '8px', padding: '8px 16px' }} onClick={openDialog1}>
              Dialog 1 열기
            </button>
          </div>
        </div>
      ),
      zIndex: 100,
      overlayClassName: 'demo-overlay',
      contentClassName: 'demo-content',
    })
  }

  const openDialogWithHook = () => {
    dialogHook({
      content: (
        <div style={{ padding: '32px', backgroundColor: 'white', borderRadius: '16px' }}>
          <h2 style={{ marginTop: 0, color: '#6366f1' }}>Dialog (useDialog Hook)</h2>
          <p>useDialog 훅을 사용한 다이얼로그입니다.</p>
        </div>
      ),
      overlayClassName: 'demo-overlay',
      contentClassName: 'demo-content',
    })
  }

  return (
    <div className="demo-container">
      <header className="demo-header">
        <h1>Overlay Kit Test Page</h1>
        <p>스크롤과 복잡한 스타일이 있는 테스트 페이지</p>
      </header>

      <nav className="demo-nav">
        <button onClick={openDialog1} className="demo-btn demo-btn-primary">
          Dialog 1 열기 (Function)
        </button>
        <button onClick={openDialog2} className="demo-btn demo-btn-secondary">
          Dialog 2 열기 (z-index: 100)
        </button>
        <button onClick={openDialogWithHook} className="demo-btn demo-btn-accent">
          Dialog 열기 (Hook)
        </button>
        <button onClick={() => setStandaloneOpen(true)} className="demo-btn demo-btn-outline">
          Standalone Dialog
        </button>
      </nav>

      <main className="demo-main">
        {Array.from({ length: 20 }).map((_, i) => (
          <section key={i} className={`demo-section ${i % 2 === 0 ? 'demo-section-alt' : ''}`}>
            <h2>Section {i + 1}</h2>
            <p>
              이것은 테스트를 위한 긴 콘텐츠입니다. 스크롤이 가능하도록 많은 섹션을 추가했습니다. 다이얼로그가 열릴 때
              스크롤이 잠기는지 확인할 수 있습니다.
            </p>
            <div className="demo-grid">
              {Array.from({ length: 6 }).map((_, j) => (
                <div key={j} className="demo-card">
                  <div className="demo-card-header">Card {j + 1}</div>
                  <div className="demo-card-body">
                    <p>카드 콘텐츠 {j + 1}</p>
                    <button
                      onClick={() =>
                        dialog({
                          content: (
                            <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px' }}>
                              <h3>Card {j + 1}에서 열린 다이얼로그</h3>
                              <p>
                                섹션 {i + 1}의 카드 {j + 1}에서 열렸습니다.
                              </p>
                            </div>
                          ),
                          overlayClassName: 'demo-overlay',
                          contentClassName: 'demo-content',
                        })
                      }
                      className="demo-btn demo-btn-small"
                    >
                      다이얼로그 열기
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop: '20px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </section>
        ))}
      </main>

      <Dialog
        open={standaloneOpen}
        onOpenChange={setStandaloneOpen}
        overlayClassName="demo-overlay"
        contentClassName="demo-content"
      >
        <div style={{ padding: '24px', backgroundColor: 'white', borderRadius: '8px' }}>
          <h2 style={{ marginTop: 0 }}>Standalone Dialog</h2>
          <p>컴포넌트로 직접 사용한 다이얼로그입니다.</p>
          <button onClick={() => setStandaloneOpen(false)} style={{ marginTop: '16px', padding: '8px 16px' }}>
            닫기
          </button>
        </div>
      </Dialog>
    </div>
  )
}

export { App }
