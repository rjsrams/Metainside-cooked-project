import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import { SensitiveString } from "hardhat/types/config";
import * as dotenv from "dotenv";
dotenv.config();

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxViemPlugin],
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY as SensitiveString,
    },
  },
  solidity: {
    profiles: {
      default: {
        compilers: [
          {
            version: "0.8.20",
          },
        ],
      },
      production: {
        compilers: [
          {
            version: "0.8.20",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200,
              },
            },
          },
        ],
      },
    },
  },
  networks: {
    baseSepolia: {
      type: "http",
      chainType: "op",
      url: process.env.BASE_SEPOLIA_RPC_URL as SensitiveString,
      accounts: [process.env.PRIVATE_KEY as SensitiveString],
    },
    bscTestnet: {
      type: "http",
      chainType: "op",
      url: process.env.BSC_TESTNET_RPC_URL as SensitiveString,
      accounts: [process.env.PRIVATE_KEY as SensitiveString],
    },
     nebulas: {
      type: "http",
      chainType: "op",
      url: "https://rpc-nebulas-testnet.u2u.xyz",
      accounts: [process.env.PRIVATE_KEY as SensitiveString],
      chainId: 2484,
    },
    
    taikoHoodi: {
      type: "http",
      chainType: "op",
      url: "https://rpc.hoodi.taiko.xyz",
      accounts: [process.env.PRIVATE_KEY as SensitiveString],
      chainId: 167013,
    },
  },
};

export default config;
