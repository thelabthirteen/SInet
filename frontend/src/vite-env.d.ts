/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_AI_RESPONSE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
