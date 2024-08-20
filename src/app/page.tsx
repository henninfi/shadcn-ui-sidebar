"use client"
import Link from "next/link";
import Image from "next/image";
import { TrophyIcon } from "lucide-react";
import { ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useRedirectFunctions } from '@propelauth/react'

    

export default function HomePage() {
  const { redirectToSignupPage, redirectToLoginPage } = useRedirectFunctions()
  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-[50] sticky top-0 w-full bg-background/95 border-b backdrop-blur-sm dark:bg-black/[0.6] border-border/40">
        <div className="container h-14 flex items-center">
          <Link
            href="/"
            className="flex justify-start items-center hover:opacity-85 transition-opacity duration-300"
          >
            <TrophyIcon className="w-6 h-6 mr-3" />
            <span className="font-bold">Fantasy Premier League Rewards</span>
            <span className="sr-only">Fantasy Premier League Rewards</span>
          </Link>
          <nav className="ml-auto flex items-center gap-2">
            <ModeToggle />
            <Button
              variant="default"
              onClick={() => redirectToLoginPage()}
            >
              Log In
            </Button>
          </nav>
        </div>
      </header>
      <main className="min-h-[calc(100vh-57px-97px)] flex-1">
        <div className="container relative pb-10">
          <section className="mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-6">
            <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
              Track Your Fantasy Premier League Rewards
            </h1>
            <span className="max-w-[750px] text-center text-lg font-light text-foreground">
              Stay updated with your earnings throughout the season. Discover how much you've earned in weekly and top 3 prizes, and see how the rewards stack up for all participants in your league.
            </span>
            <div className="flex w-full items-center justify-center space-x-4 py-4 md:pb-6">
              <Button variant="outline" asChild>
                <Link href="/demo_league/314">
                  See Demo
                  <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>
              <Button variant="default" onClick={() => redirectToSignupPage()}>
                Sign Up Now
                
              </Button>
            </div>
          </section>
          <div className="w-full flex justify-center relative">
            <Image
              src="/demo-light-min.png"
              width={1080}
              height={608}
              alt="Fantasy League Demo"
              priority
              className="border rounded-xl shadow-sm dark:hidden"
            />
            <Image
              src="/demo-dark-min.png"
              width={1080}
              height={608}
              alt="Fantasy League Demo (Dark Mode)"
              priority
              className="border border-zinc-600 rounded-xl shadow-sm hidden dark:block dark:shadow-gray-500/5"
            />
            <Image
              src="/demo-mobile-light-min.png"
              width={228}
              height={494}
              alt="Fantasy League Mobile Demo"
              className="border rounded-xl absolute bottom-0 right-0 hidden lg:block dark:hidden"
            />
            <Image
              src="/demo-mobile-dark-min.png"
              width={228}
              height={494}
              alt="Fantasy League Mobile Demo (Dark Mode)"
              className="border border-zinc-600 rounded-xl absolute bottom-0 right-0 hidden dark:lg:block"
            />
          </div>
        </div>
      </main>
      <footer className="py-6 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground">
            Built with{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              shadcn/ui
            </Link>
            . Check out the source code on{" "}
            <Link
              href="https://github.com/salimi-my/shadcn-ui-sidebar"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </Link>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
