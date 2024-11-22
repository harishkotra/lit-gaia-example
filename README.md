# Lit Protocol + Gaia Integration

This project demonstrates how to integrate Lit Protocol with Gaia's AI capabilities, showcasing PKP (Programmable Key Pairs) minting, authentication, and Gaia's AI-powered Lit Actions.

## Features

- Lit Protocol integration
- PKP (Programmable Key Pair) minting
- Secure authentication
- Gaia node integration via Lit Actions
- Session signature management

## Prerequisites

- Node.js v20+
- npm or yarn
- An Ethereum private key
- Basic understanding of blockchain and AI concepts

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/lit-protocol-ai
cd lit-protocol-ai
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
ETHEREUM_PRIVATE_KEY=your_ethereum_private_key_here
PKP_PUBLIC_KEY=your_pkp_public_key_here  # Optional, will mint new one if not provided
```

## Project Structure

```
lit-protocol-ai/
├── index.js          # Main application file
├── litAction.js      # Lit Action code for AI integration
├── .env             # Environment variables
└── README.md        # This file
```

## Required Dependencies

```json
{
  "@lit-protocol/lit-node-client": "^latest",
  "@lit-protocol/constants": "^latest",
  "@lit-protocol/auth-helpers": "^latest",
  "@lit-protocol/lit-auth-client": "^latest",
  "@lit-protocol/contracts-sdk": "^latest",
  "ethers": "^5.7.2",
  "dotenv": "^latest"
}
```

## Usage

Run the application:
```bash
node index.js
```

The application will:
1. Connect to the Lit Network
2. Mint a new PKP (if needed)
3. Set up authentication
4. Execute a Lit Action that interacts with an AI model
5. Return the AI-generated response

## Lit Action

The Lit Action (`litAction.js`) demonstrates:
- Interaction with AI models
- Response processing
- Error handling
- Clean response formatting

## Environment Variables

- `ETHEREUM_PRIVATE_KEY`: Your Ethereum private key (required)
- `PKP_PUBLIC_KEY`: Your PKP public key (optional)

## Security Considerations

- Keep your Ethereum private key secure
- Never commit `.env` file to version control
- Monitor session signatures expiration
- Use appropriate access control for Lit Actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For support, please refer to:
- [Lit Protocol Documentation](https://developer.litprotocol.com/)
- [GitHub Issues](https://github.com/harishkotra/lit-gaia-example/issues)