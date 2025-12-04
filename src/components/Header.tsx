"use client";

import { WalletButton } from "./WalletButton";
import { CheckSquare } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/25">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              TaskChain
            </h1>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Dev By MetaInside
            </p>
          </div>
        </div>
        <WalletButton />
      </div>
    </header>
  );
}
