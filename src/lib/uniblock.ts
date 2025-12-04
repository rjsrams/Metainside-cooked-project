// Uniblock API integration for market data

export interface TokenPrice {
  address?: string;
  symbol?: string;
  name?: string;
  decimals?: number;
  // Actual Uniblock API response fields
  usdPrice?: string; // API returns price as string
  updatedAt?: string;
  // Legacy/alternative field names for compatibility
  price_usd?: number;
  price?: number;
  price_change_24h?: number;
  priceChange24h?: number;
  market_cap?: number;
  marketCap?: number;
  volume_24h?: number;
  volume24h?: number;
  logo_url?: string;
  logoUrl?: string;
}

export interface Portfolio {
  total_value_usd: number;
  tokens: {
    address: string;
    symbol: string;
    name: string;
    balance: string;
    balance_formatted: number;
    price_usd: number;
    value_usd: number;
    logo_url?: string;
  }[];
}

export interface TrendingToken {
  address: string;
  symbol: string;
  name: string;
  price_usd: number;
  price_change_24h: number;
  volume_24h: number;
  logo_url?: string;
}

class UniblockService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = '/api/market';
  }

  private async makeRequest(endpoint: string, params?: Record<string, string>) {
    const url = new URL(`${this.baseUrl}${endpoint}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Get token prices for multiple tokens
  async getTokenPrices(tokenAddresses: string[], chainId: number = 1): Promise<TokenPrice[]> {
    try {
      const promises = tokenAddresses.map(address => 
        this.getTokenPrice(address, chainId)
      );
      const results = await Promise.allSettled(promises);
      return results
        .filter((result): result is PromiseFulfilledResult<TokenPrice | null> => 
          result.status === 'fulfilled' && result.value !== null
        )
        .map(result => result.value!);
    } catch (error) {
      console.error('Error fetching token prices:', error);
      return [];
    }
  }

  // Get single token price
  async getTokenPrice(tokenAddress: string, chainId: number = 1): Promise<TokenPrice | null> {
    try {
      const data = await this.makeRequest('/price', {
        address: tokenAddress,
        chainId: chainId.toString(),
      });
      return data || null;
    } catch (error) {
      console.error('Error fetching token price:', error);
      return null;
    }
  }

  // Get portfolio data for a wallet address (mock implementation)
  async getPortfolio(walletAddress: string, chainId: number = 1): Promise<Portfolio | null> {
    try {
      // Note: This would require a separate API route for portfolio data
      // For now, return a mock response
      console.log('Portfolio data not yet implemented for wallet:', walletAddress);
      return {
        total_value_usd: 0,
        tokens: []
      };
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      return null;
    }
  }

  // Get trending tokens
  async getTrendingTokens(limit: number = 10, chainId: number = 1): Promise<TrendingToken[]> {
    try {
      const data = await this.makeRequest('/trending', {
        limit: limit.toString(),
        chainId: chainId.toString(),
      });
      return data || [];
    } catch (error) {
      console.error('Error fetching trending tokens:', error);
      return [];
    }
  }

  // Get token transactions for a wallet (mock implementation)
  async getTokenTransactions(walletAddress: string, tokenAddress?: string, chainId: number = 1) {
    try {
      // Note: This would require a separate API route for transaction data
      console.log('Transaction data not yet implemented for wallet:', walletAddress);
      return [];
    } catch (error) {
      console.error('Error fetching token transactions:', error);
      return [];
    }
  }

  // Get DEX trades for a token (mock implementation)
  async getDexTrades(tokenAddress: string, chainId: number = 1) {
    try {
      // Note: This would require a separate API route for DEX trade data
      console.log('DEX trade data not yet implemented for token:', tokenAddress);
      return [];
    } catch (error) {
      console.error('Error fetching DEX trades:', error);
      return [];
    }
  }
}

export const uniblockService = new UniblockService();
