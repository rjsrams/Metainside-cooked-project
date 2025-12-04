"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { MarketDemo } from "@/components/MarketDemo";
import {
  Rocket,
  BookOpen,
  FileText,
  Zap,
  Palette,
  Code,
  Sparkles,
} from "lucide-react";

export default function Home() {
  console.log('🏠 Home component is rendering');
  console.log('📍 Current URL:', typeof window !== 'undefined' ? window.location.href : 'Server side');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <div className="max-w-4xl w-full space-y-8">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome to MetaInside
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A modern starter template combining Next.js, Hardhat, and Tailwind
              CSS for full-stack Web3 development
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Code
                    className="text-blue-600 dark:text-blue-400"
                    size={24}
                  />
                </div>
                <CardTitle>Next.js</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  React framework with server-side rendering and modern
                  developer experience
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap
                    className="text-yellow-600 dark:text-yellow-400"
                    size={24}
                  />
                </div>
                <CardTitle>Hardhat</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Ethereum development environment for smart contract
                  development and testing
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900 rounded-lg flex items-center justify-center mb-4">
                  <Palette
                    className="text-cyan-600 dark:text-cyan-400"
                    size={24}
                  />
                </div>
                <CardTitle>Tailwind CSS</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Utility-first CSS framework for rapid UI development
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* API Status */}
          <div className="flex justify-center">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 hover:bg-green-200 dark:hover:bg-green-800"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Uniblock API + shadcn/ui + Tailwind CSS configured!
            </Badge>
          </div>

          {/* Market Data Dashboard */}
          <div className="mt-16">
            <MarketDemo />
          </div>
        </div>
      </main>
    </div>
  );
}
