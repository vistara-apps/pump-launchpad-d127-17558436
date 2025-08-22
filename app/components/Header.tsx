'use client'

import { useState } from 'react'
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownDisconnect } from '@coinbase/onchainkit/wallet'
import { Identity, Avatar, Name, Address, EthBalance } from '@coinbase/onchainkit/identity'
import { Rocket, Menu, X } from 'lucide-react'

interface HeaderProps {
  variant?: 'withWalletConnect' | 'simple'
}

export function Header({ variant = 'withWalletConnect' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-surface border-b border-white/10 px-4 py-3 sticky top-0 z-10 shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg" aria-hidden="true">
            <Rocket className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-textPrimary">PUMP Launchpad</h1>
            <p className="text-sm text-textSecondary hidden sm:block">Launch your Solana token</p>
          </div>
        </div>

        {variant === 'withWalletConnect' && (
          <div className="hidden md:flex items-center space-x-4">
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

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2 text-textSecondary hover:text-textPrimary transition-colors rounded-md focus:outline-none focus:ring-2 focus:ring-primary/30"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-surface border-b border-white/10 shadow-lg animate-slide-up">
          <div className="container mx-auto p-4 space-y-4">
            <nav className="space-y-2">
              <a href="#" className="block px-4 py-2 text-textPrimary hover:bg-primary/10 rounded-md transition-colors">
                Discover
              </a>
              <a href="#" className="block px-4 py-2 text-textPrimary hover:bg-primary/10 rounded-md transition-colors">
                Launch
              </a>
              <a href="#" className="block px-4 py-2 text-textPrimary hover:bg-primary/10 rounded-md transition-colors">
                About
              </a>
            </nav>
            
            {variant === 'withWalletConnect' && (
              <div className="pt-2 border-t border-white/10">
                <Wallet className="z-10 block w-full">
                  <ConnectWallet className="btn-primary w-full justify-center">
                    <Name className="text-inherit" />
                  </ConnectWallet>
                </Wallet>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

