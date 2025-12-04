import useSWR from "swr";
import { uniblockService } from "@/lib/uniblock";

// Hook for fetching token prices
export function useTokenPrices(tokenAddresses: string[], chainId: number = 1) {
  const { data, error, isLoading } = useSWR(
    tokenAddresses.length > 0
      ? ["token-prices", tokenAddresses.join(","), chainId]
      : null,
    () => uniblockService.getTokenPrices(tokenAddresses, chainId),
    {
      refreshInterval: 30000, // Refresh every 30 seconds
      revalidateOnFocus: false,
    }
  );

  return {
    prices: data || [],
    isLoading,
    error,
  };
}

// Hook for fetching single token price
export function useTokenPrice(tokenAddress: string, chainId: number = 1) {
  const { data, error, isLoading } = useSWR(
    tokenAddress ? ["token-price", tokenAddress, chainId] : null,
    () => uniblockService.getTokenPrice(tokenAddress, chainId),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    price: data,
    isLoading,
    error,
  };
}

// Hook for fetching portfolio data
export function usePortfolio(walletAddress: string, chainId: number = 1) {
  const { data, error, isLoading } = useSWR(
    walletAddress ? ["portfolio", walletAddress, chainId] : null,
    () => uniblockService.getPortfolio(walletAddress, chainId),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    portfolio: data,
    isLoading,
    error,
  };
}

// Hook for fetching trending tokens
export function useTrendingTokens(limit: number = 10, chainId: number = 1) {
  const { data, error, isLoading } = useSWR(
    ["trending-tokens", limit, chainId],
    () => uniblockService.getTrendingTokens(limit, chainId),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    tokens: data || [],
    isLoading,
    error,
  };
}

// Hook for fetching token transactions
export function useTokenTransactions(
  walletAddress: string,
  tokenAddress?: string,
  chainId: number = 1
) {
  const { data, error, isLoading } = useSWR(
    walletAddress
      ? ["token-transactions", walletAddress, tokenAddress, chainId]
      : null,
    () =>
      uniblockService.getTokenTransactions(
        walletAddress,
        tokenAddress,
        chainId
      ),
    {
      revalidateOnFocus: true,
    }
  );

  return {
    transactions: data || [],
    isLoading,
    error,
  };
}

// Hook for fetching DEX trades
export function useDexTrades(tokenAddress: string, chainId: number = 1) {
  const { data, error, isLoading } = useSWR(
    tokenAddress ? ["dex-trades", tokenAddress, chainId] : null,
    () => uniblockService.getDexTrades(tokenAddress, chainId),
    {
      revalidateOnFocus: false,
    }
  );

  return {
    trades: data || [],
    isLoading,
    error,
  };
}
