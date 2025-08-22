'use client'

import { type ReactNode } from 'react'
import { base } from 'wagmi/chains'
import { MiniKitProvider } from '@coinbase/onchainkit/minikit'
import { ToastProvider } from './providers/ToastProvider'

export function Providers(props: { children: ReactNode }) {
  return (
    <MiniKitProvider
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      chain={base}
      config={{
        appearance: {
          mode: 'auto',
          theme: 'pump-launchpad',
          name: process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME,
          logo: process.env.NEXT_PUBLIC_ICON_URL,
        },
      }}
    >
      <ToastProvider>
        {props.children}
      </ToastProvider>
    </MiniKitProvider>
  )
}

