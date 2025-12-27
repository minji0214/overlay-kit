export type Language = 'en' | 'ko'

export const translations = {
  en: {
    hero: {
      title: 'Overlay Kit',
      description: 'A lightweight headless React dialog & drawer library',
      description2: 'Fully customizable, SSR-friendly, and designed with accessibility in mind',
      getStarted: 'Get Started',
      copy: 'Copy',
      copied: 'Copied!',
    },
    features: {
      title: 'Features',
      headless: {
        title: 'Headless',
        description: 'No default styles, fully customizable',
      },
      ssr: {
        title: 'SSR Support',
        description: 'SSR-safe with Portal and client-side only mounting',
      },
      zIndex: {
        title: 'Z-index Management',
        description: 'Automatic z-index stacking or manual control',
      },
      global: {
        title: 'Global Dialog',
        description: 'Toast-like API to open dialogs anywhere with dialog() function',
      },
      scrollLock: {
        title: 'Scroll Lock',
        description: 'Automatically locks body scroll when dialog is open',
      },
      keyboard: {
        title: 'Keyboard Navigation',
        description: 'Tab, Shift+Tab, Escape key support',
      },
      accessibility: {
        title: 'Accessible',
        description: 'ARIA attributes included',
      },
      zeroDeps: {
        title: 'Zero Dependencies',
        description: 'Uses only React built-in APIs (Context API)',
      },
    },
    quickStart: {
      title: 'Quick Start',
      install: {
        title: 'Installation',
        comment: 'Install',
      },
      provider: {
        title: 'Provider Setup',
        comment: 'Provider Setup',
        description: 'Wrap your app with DialogProvider and add DialogRenderer in your root layout. Both are required.',
      },
      usage: {
        title: 'Usage',
        comment: 'Usage',
      },
      getStarted: {
        title: 'Get Started',
        step1: 'Installation',
        step2: 'Provider Setup',
        step3: 'Usage',
      },
    },
    examples: {
      title: 'Examples',
      description: 'Try out various usage examples',
      basic: {
        title: 'Basic Dialog',
        description: 'Open a dialog easily with dialog() function',
        content: 'Basic Dialog',
        text: 'This is a basic dialog opened with dialog() function.',
        step1: 'Install',
        step2: 'Provider Setup',
        step3: 'Use dialog() function',
      },
      hook: {
        title: 'useDialog Hook',
        description: 'Dialog using useDialog hook',
        content: 'Dialog opened with Hook',
        text: 'This is a dialog opened using useDialog hook.',
        step1: 'Install',
        step2: 'Provider Setup',
        step3: 'Use useDialog hook',
      },
      nested: {
        title: 'Nested Dialog',
        description: 'Open another dialog inside a dialog',
        content: 'First Dialog',
        text: 'You can open another dialog inside this dialog.',
        button: 'Open Nested Dialog',
        nestedContent: 'Nested Dialog',
        nestedText: 'z-index automatically increases!',
        step1: 'Install',
        step2: 'Provider Setup',
        step3: 'Open nested dialogs',
      },
      standalone: {
        title: 'Standalone Component',
        description: 'Using Dialog component directly',
        content: 'Standalone Dialog',
        text: 'This is a dialog using Dialog component directly.',
        close: 'Close',
        step1: 'Install',
        step2: 'Import Dialog component',
        step3: 'Use Dialog component',
      },
      viewExample: 'View Example',
      viewCode: 'View Code',
    },
    api: {
      title: 'API Documentation',
      dialog: {
        title: 'dialog(options)',
        description: 'Function to open a global dialog',
      },
      useDialog: {
        title: 'useDialog()',
        description: 'Hook to open dialogs',
      },
      dialogComponent: {
        title: '<Dialog>',
        description: 'Dialog component (component approach)',
      },
      dialogProvider: {
        title: '<DialogProvider>',
        description: 'Dialog context provider',
      },
    },
    footer: {
      description: 'A lightweight headless React dialog & drawer library',
    },
  },
  ko: {
    hero: {
      title: 'Overlay Kit',
      description: '가벼운 헤드리스 React 다이얼로그 & 드로어 라이브러리',
      description2: '완전히 커스터마이징 가능하고, SSR을 지원하며, 접근성을 고려한 설계',
      getStarted: '빠른 시작',
      copy: '복사',
      copied: '복사됨!',
    },
    features: {
      title: '주요 기능',
      headless: {
        title: 'Headless',
        description: '기본 스타일이 없어 완전히 커스터마이징 가능',
      },
      ssr: {
        title: 'SSR 지원',
        description: 'Portal과 클라이언트 사이드 마운팅으로 SSR 안전',
      },
      zIndex: {
        title: 'Z-index 관리',
        description: '자동 z-index 스택킹 또는 수동 제어 가능',
      },
      global: {
        title: 'Global Dialog',
        description: 'Toast-like API로 어디서든 dialog() 함수로 열기',
      },
      scrollLock: {
        title: 'Scroll Lock',
        description: '다이얼로그 열 때 자동으로 body 스크롤 잠금',
      },
      keyboard: {
        title: '키보드 네비게이션',
        description: 'Tab, Shift+Tab, Escape 키 지원',
      },
      accessibility: {
        title: '접근성',
        description: 'ARIA 속성 포함',
      },
      zeroDeps: {
        title: 'Zero Dependencies',
        description: 'React 내장 API만 사용 (Context API)',
      },
    },
    quickStart: {
      title: '빠른 시작',
      install: {
        title: '설치',
        comment: '설치',
      },
      provider: {
        title: 'Provider 설정',
        comment: 'Provider 설정',
        description: '앱의 루트 레이아웃에서 DialogProvider로 감싸고 DialogRenderer를 추가하세요. 둘 다 필수입니다.',
      },
      usage: {
        title: '사용하기',
        comment: '사용하기',
      },
      getStarted: {
        title: '빠른 시작',
        step1: '설치',
        step2: 'Provider 설정',
        step3: '사용하기',
      },
    },
    examples: {
      title: '예시',
      description: '다양한 사용 예시를 직접 확인해보세요',
      basic: {
        title: '기본 다이얼로그',
        description: 'dialog() 함수로 간단하게 다이얼로그 열기',
        content: '기본 다이얼로그',
        text: '이것은 dialog() 함수로 열린 기본 다이얼로그입니다.',
        step1: '설치',
        step2: 'Provider 설정',
        step3: 'dialog() 함수 사용',
      },
      hook: {
        title: 'useDialog Hook',
        description: 'useDialog 훅을 사용한 다이얼로그',
        content: 'Hook으로 열린 다이얼로그',
        text: 'useDialog 훅을 사용하여 열린 다이얼로그입니다.',
        step1: '설치',
        step2: 'Provider 설정',
        step3: 'useDialog 훅 사용',
      },
      nested: {
        title: '중첩 다이얼로그',
        description: '다이얼로그 안에서 다른 다이얼로그 열기',
        content: '첫 번째 다이얼로그',
        text: '이 다이얼로그 안에서 다른 다이얼로그를 열 수 있습니다.',
        button: '중첩 다이얼로그 열기',
        nestedContent: '중첩된 다이얼로그',
        nestedText: 'z-index가 자동으로 증가합니다!',
        step1: '설치',
        step2: 'Provider 설정',
        step3: '중첩 다이얼로그 열기',
      },
      standalone: {
        title: 'Standalone Component',
        description: 'Dialog 컴포넌트를 직접 사용하기',
        content: 'Standalone Dialog',
        text: 'Dialog 컴포넌트를 직접 사용한 다이얼로그입니다.',
        close: '닫기',
        step1: '설치',
        step2: 'Dialog 컴포넌트 import',
        step3: 'Dialog 컴포넌트 사용',
      },
      viewExample: '예시 보기',
      viewCode: '코드 보기',
    },
    api: {
      title: 'API 문서',
      dialog: {
        title: 'dialog(options)',
        description: '전역 다이얼로그를 여는 함수',
      },
      useDialog: {
        title: 'useDialog()',
        description: '다이얼로그를 열기 위한 훅',
      },
      dialogComponent: {
        title: '<Dialog>',
        description: '다이얼로그 컴포넌트 (컴포넌트 방식)',
      },
      dialogProvider: {
        title: '<DialogProvider>',
        description: '다이얼로그 컨텍스트 제공자',
      },
    },
    footer: {
      description: '가벼운 헤드리스 React 다이얼로그 & 드로어 라이브러리',
    },
  },
} as const
