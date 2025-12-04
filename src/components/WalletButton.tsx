"use client";

import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { Wallet, LogOut, AlertCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const [showConnectors, setShowConnectors] = useState(false);

  const isWrongNetwork = isConnected && chainId !== baseSepolia.id;

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isWrongNetwork) {
    return (
      <Button
        onClick={() => switchChain({ chainId: baseSepolia.id })}
        variant="destructive"
        className="gap-2"
      >
        <AlertCircle className="h-4 w-4" />
        Switch to Base Sepolia
      </Button>
    );
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-secondary/50 rounded-lg border border-border/50">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-sm font-mono">{formatAddress(address)}</span>
        </div>
        <Button
          onClick={() => disconnect()}
          variant="outline"
          size="icon"
          className="hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowConnectors(!showConnectors)}
        disabled={isPending}
        className="gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
      >
        <Wallet className="h-4 w-4" />
        {isPending ? "Connecting..." : "Connect Wallet"}
        <ChevronDown className={`h-4 w-4 transition-transform ${showConnectors ? "rotate-180" : ""}`} />
      </Button>

      {showConnectors && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setShowConnectors(false)} 
          />
          <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-xl z-50 overflow-hidden">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => {
                  connect({ connector });
                  setShowConnectors(false);
                }}
                className="w-full px-4 py-3 text-left hover:bg-secondary/50 transition-colors flex items-center gap-3 border-b border-border/50 last:border-0"
              >
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-violet-500/20 to-indigo-500/20 flex items-center justify-center">
                  <Wallet className="h-4 w-4 text-violet-400" />
                </div>
                <span className="font-medium">{connector.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
