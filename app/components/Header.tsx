'use client'

import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'
import { Identity, Avatar, Name, Address, EthBalance } from '@coinbase/onchainkit/identity'
import { Rocket, Menu } from 'lucide-react'

interface HeaderProps {
  variant?: 'withWalletConnect' | 'simple'
}

export function Header({ variant = 'withWalletConnect' }: HeaderProps) {
  return (
    <header className="bg-surface border-b border-white/10 px-4 py-3">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-textPrimary">PUMP Launchpad</h1>
            <p className="text-sm text-textSecondary">Launch your Solana token</p>
          </div>
        </div>

        {variant === 'withWalletConnect' && (
          <div className="flex items-center space-x-4">
            <Wallet className="z-10">
              <ConnectWallet className="btn-primary">
                <Name className="text-inherit" />
              </ConnectWallet>
              <WalletDropdown>
                <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                  <Avatar />
                  <Name />
                  <Address />
                  <EthBalance />
                </Identity>
                <WalletDropdownDisconnect />
              </WalletDropdown>
            </Wallet>
          </div>
        )}

        {variant === 'simple' && (
          <button className="p-2 text-textSecondary hover:text-textPrimary transition-colors">
            <Menu className="w-6 h-6" />
          </button>
        )}
      </div>
    </header>
  )
}
