
'use client'

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet'
import {
  Name,
  Identity,
  Address,
  Avatar,
} from '@coinbase/onchainkit/identity'

export function WalletConnect() {
  return (
    <Wallet className="z-10">
      <ConnectWallet className="bg-primary hover:bg-primary/90 text-white text-sm px-4 py-2 rounded transition-colors">
        <Name className="text-inherit" />
      </ConnectWallet>
      <WalletDropdown className="bg-surface border border-border rounded-lg shadow-card">
        <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
          <Avatar className="w-8 h-8" />
          <Name className="text-foreground" />
          <Address className="text-muted" />
        </Identity>
        <WalletDropdownDisconnect className="text-red-500 hover:bg-red-500/10 px-4 py-2" />
      </WalletDropdown>
    </Wallet>
  )
}
