declare enum WindowName {
  main = 'main',
  setting = 'setting'
}

interface Window {
  windowName: 'main' | 'setting'
}

interface myLib {
  name: string
  length: number
  extras?: string[]
}
