
import './globals.css'
import '@coinbase/onchainkit/styles.css'
import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'PUMP Launchpad',
  description: 'Launch your Solana token with escrow, deployment, and degen-native engagement.',
  other: {
    'fc:frame': JSON.stringify({
      version: 'next',
      imageUrl: process.env.NEXT_PUBLIC_APP_HERO_IMAGE,
      button: {
        title: 'Launch PUMP Launchpad',
        action: {
          type: 'launch_frame',
          name: 'PUMP Launchpad',
          url: process.env.NEXT_PUBLIC_URL,
          splashImageUrl: process.env.NEXT_PUBLIC_SPLASH_IMAGE,
          splashBackgroundColor: process.env.NEXT_PUBLIC_SPLASH_BACKGROUND_COLOR,
        },
      },
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="bg-bg">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
