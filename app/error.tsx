"use client";

import { Button } from "./components/ui/button";
import { AlertTriangle, RefreshCw, Home, Mail } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset?: () => void;
}) {
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Something went wrong
          </h2>
          
          <p className="text-muted-foreground mb-6">
            We encountered an unexpected error. Please try again or contact support.
          </p>

          {isDev && error.message && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg text-left">
              <p className="text-xs font-mono text-red-800 dark:text-red-300 break-words">
                {error.message}
              </p>
            </div>
          )}

          {error.digest && (
            <p className="text-xs text-muted-foreground mb-4">
              Error ID: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {reset && (
            <Button onClick={reset} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try again
            </Button>
          )}
          
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="w-4 h-4" />
              Go home
            </Button>
          </Link>
          
          <a href="mailto:support@kutra.co">
            <Button variant="ghost" className="gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
