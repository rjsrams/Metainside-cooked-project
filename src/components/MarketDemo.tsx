"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useTokenPrice } from "@/hooks/useUniblock";
import { Loader2, DollarSign, TrendingUp, Search } from "lucide-react";

// Common token addresses for testing (using real Ethereum mainnet addresses)
const POPULAR_TOKENS = [
  {
    symbol: "USDT",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: "Tether USD",
  }, // From your curl example
  {
    symbol: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    name: "Wrapped Ethereum",
  },
 
  {
    symbol: "WBTC",
    address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
    name: "Wrapped Bitcoin",
  },
];

export function MarketDemo() {
  const [selectedToken, setSelectedToken] = useState(POPULAR_TOKENS[0]);
  const {
    price: tokenPrice,
    isLoading: loading,
    error,
  } = useTokenPrice(selectedToken.address);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Market Data Demo
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Real-time token prices powered by Uniblock API
        </p>
      </div>

      {/* Token Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5" />
            Select Token
          </CardTitle>
          <CardDescription>
            Choose a token to view its current market data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {POPULAR_TOKENS.map((token) => (
              <Button
                key={token.address}
                variant={
                  selectedToken.address === token.address
                    ? "default"
                    : "outline"
                }
                onClick={() => setSelectedToken(token)}
                className="flex flex-col h-auto p-3"
              >
                <span className="font-semibold">{token.symbol}</span>
                <span className="text-xs opacity-70">{token.name}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Display */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5" />
            {selectedToken.symbol} Price
          </CardTitle>
          <CardDescription>Current market price and 24h change</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && (
            <div className="flex items-center justify-center p-8">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Loading price data...
            </div>
          )}

          {error && (
            <div className="text-center p-8">
              <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
              <Badge variant="secondary">
                Demo mode - API integration in progress
              </Badge>
            </div>
          )}

          {!loading && !error && tokenPrice && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold">
                  $
                  {tokenPrice.usdPrice
                    ? parseFloat(tokenPrice.usdPrice).toLocaleString(
                        undefined,
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      )
                    : (tokenPrice.price_usd || tokenPrice.price || 0).toFixed(
                        2
                      )}
                </span>
                <Badge
                  variant={
                    (tokenPrice.price_change_24h ||
                      tokenPrice.priceChange24h ||
                      0) >= 0
                      ? "default"
                      : "destructive"
                  }
                  className="flex items-center gap-1"
                >
                  <TrendingUp className="w-3 h-3" />
                  {(
                    tokenPrice.price_change_24h ||
                    tokenPrice.priceChange24h ||
                    0
                  ).toFixed(2)}
                  %
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    Contract Address
                  </span>
                  <span className="font-semibold text-xs">
                    {tokenPrice.address
                      ? `${tokenPrice.address.slice(
                          0,
                          6
                        )}...${tokenPrice.address.slice(-4)}`
                      : selectedToken.address.slice(0, 6) +
                        "..." +
                        selectedToken.address.slice(-4)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    Updated At
                  </span>
                  <span className="font-semibold text-xs">
                    {tokenPrice.updatedAt
                      ? new Date(tokenPrice.updatedAt).toLocaleTimeString()
                      : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    Symbol
                  </span>
                  <span className="font-semibold">
                    {tokenPrice.symbol || selectedToken.symbol}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 dark:text-gray-400 block">
                    API Status
                  </span>
                  <span className="font-semibold text-green-600">
                    ✓ Live Data
                  </span>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && !tokenPrice && (
            <div className="text-center p-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No price data available for this token
              </p>
              <Badge variant="secondary">Try selecting a different token</Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
