
# TokenLaunch Studio

A natural-language to token launcher that enables non-technical users to type prompts to launch tokens on-chain, explore trending launches, and manage governance with auditable records.

## Features

- **Natural Language Token Launcher**: Type commands in plain English to launch tokens on Base
- **Trending Launches Feed**: Discover trending tokens and copy successful launch patterns
- **Analytics Dashboard**: Track your launches and success metrics
- **MiniKit Integration**: Full integration with Farcaster frames and Base ecosystem
- **Wallet Integration**: Seamless wallet connection with OnchainKit
- **Audit Trail**: Complete logging of all actions and transactions

## Tech Stack

- Next.js 15.3.3 with App Router
- TypeScript
- Tailwind CSS
- OnchainKit for Base integration
- MiniKit for Farcaster frames
- Framer Motion for animations

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Copy `.env.local.example` to `.env.local` and add your API keys
4. Run the development server: `npm run dev`

## Environment Variables

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME`: Project name for OnchainKit
- `NEXT_PUBLIC_ICON_URL`: URL to your app icon

## Usage

1. Connect your wallet using the wallet button
2. Type natural language commands to launch tokens
3. Explore trending launches for inspiration
4. View analytics to track your success
5. Manage settings and purchase credits

## Commands Examples

- "Launch a meme token called 'MOON' with 1 billion total supply"
- "Create a governance token 'DAO' with 100M total supply"
- "Deploy a utility token 'GAME' with deflationary mechanics"

## License

MIT
