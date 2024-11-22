const { LitNodeClient } = require("@lit-protocol/lit-node-client");
const {
  LIT_NETWORK,
  LIT_RPC,
  LIT_ABILITY,
} = require("@lit-protocol/constants");
const {
  LitActionResource,
  LitPKPResource,
} = require("@lit-protocol/auth-helpers");
const { EthWalletProvider } = require("@lit-protocol/lit-auth-client");
const { LitContracts } = require("@lit-protocol/contracts-sdk");
const fs = require("fs");
const ethers = require("ethers");
require("dotenv").config();

// Read the Lit Action code that will be executed
const litActionCode = fs.readFileSync("litAction.js", "utf8");

// Get environment variables
const ETHEREUM_PRIVATE_KEY = process.env.ETHEREUM_PRIVATE_KEY;
if (!ETHEREUM_PRIVATE_KEY) {
  throw new Error("ETHEREUM_PRIVATE_KEY not found in .env");
}
//const LIT_PKP_PUBLIC_KEY = process.env.PKP_PUBLIC_KEY;

/**
 * Mints a new Programmable Key Pair (PKP) using the Lit Protocol
 * @param {ethers.Wallet} ethersSigner - An Ethereum wallet instance to sign transactions
 * @returns {Promise<Object>} The minted PKP information including publicKey and ethAddress
 */
const mintPkp = async (ethersSigner) => {
  try {
    // Connect to Lit Contracts
    const litContracts = new LitContracts({
      signer: ethersSigner,
      network: LIT_NETWORK.DatilDev,
    });
    await litContracts.connect();

    // Mint new PKP
    const mintTx = await litContracts.pkpNftContractUtils.write.mint();
    const pkp = mintTx.pkp;
    console.log(`✅ Minted new PKP: ${pkp.publicKey}`);
    return pkp;
  } catch (error) {
    console.error("Error minting PKP:", error);
    throw error;
  }
};

/**
 * Main function that orchestrates the Lit Protocol interaction
 * - Connects to Lit Network
 * - Mints PKP
 * - Creates authentication
 * - Gets session signatures
 * - Executes Lit Action
 * @returns {Promise<Object>} Response from the executed Lit Action
 */
const main = async () => {
  let litNodeClient;

  try {
    // Initialize Ethereum wallet with RPC provider
    const ethersWallet = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE),
    );

    // Initialize and connect Lit Node Client
    litNodeClient = new LitNodeClient({
      litNetwork: LIT_NETWORK.DatilDev,
      debug: true,
    });
    await litNodeClient.connect();
    console.log("✅ Connected to Lit network");

    // Mint new PKP or use existing one
    pkpInfo = await mintPkp(ethersWallet);

    // Create authentication method using Ethereum wallet
    const authMethod = await EthWalletProvider.authenticate({
      signer: ethersWallet,
      litNodeClient,
    });

    // Get session signatures for Lit Actions
    const sessionSigs = await litNodeClient.getPkpSessionSigs({
      pkpPublicKey: pkpInfo.publicKey,
      chain: "ethereum",
      authMethods: [authMethod],
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
      resourceAbilityRequests: [
        {
          resource: new LitActionResource("*"),
          ability: LIT_ABILITY.LitActionExecution,
        },
        {
          resource: new LitPKPResource("*"),
          ability: LIT_ABILITY.PKPSigning,
        },
      ],
    });

    // Execute the Lit Action with the provided code
    console.log("🔄 Executing Lit Action...");
    const response = await litNodeClient.executeJs({
      sessionSigs,
      code: litActionCode,
      jsParams: {
        prompt: "What are your thoughts on buying dogecoin?",
      },
    });

    console.log("✅ Execution complete");
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  } finally {
    // Ensure connection is closed
    if (litNodeClient) {
      litNodeClient.disconnect();
    }
  }
};

// Execute main function
main().catch(console.error);
