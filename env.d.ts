/// <reference types="vite/client" />

import 'dayjs'

declare global {
  interface Window {
    ksu?: object
  }

  interface Navigator {
    standalone?: boolean
  }
}

declare module 'dayjs' {
  interface Dayjs {
    fromNow(withoutSuffix?: boolean): string
  }
}
