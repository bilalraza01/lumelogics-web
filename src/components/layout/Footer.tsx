"use client";

import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";
import type { SVGProps } from "react";

const LinkedinIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.27 2.38 4.27 5.47v6.27zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.22 0z"/>
  </svg>
);

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8zM9.6 15.6V8.4l6.2 3.6-6.2 3.6z"/>
  </svg>
);

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644z"/>
  </svg>
);

const GithubIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
    <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2c-3.34.72-4.04-1.6-4.04-1.6-.55-1.4-1.34-1.77-1.34-1.77-1.1-.74.08-.73.08-.73 1.2.09 1.83 1.24 1.83 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18a4.66 4.66 0 0 1 1.24 3.22c0 4.61-2.81 5.62-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .3"/>
  </svg>
);

const SOCIAL = [
  { label: "LinkedIn", href: "#", Icon: LinkedinIcon },
  { label: "YouTube", href: "#", Icon: YoutubeIcon },
  { label: "X", href: "#", Icon: XIcon },
  { label: "GitHub", href: "#", Icon: GithubIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#0c0b10] text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Lumelogics partners with operators to design, build, and deploy
              AI automations that produce measurable business outcomes.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-md bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                >
                  <Icon width={15} height={15} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:justify-self-end w-full md:max-w-md">
            <h4 className="text-sm font-medium">Subscribe to our newsletter</h4>
            <form
              className="mt-3 flex items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 flex-1 rounded-md border border-white/10 bg-white/5 px-4 text-sm placeholder:text-white/40 focus:border-brand-400 focus:outline-none"
              />
              <button
                type="submit"
                className="h-11 rounded-md bg-brand-500 px-5 text-sm font-medium hover:bg-brand-600 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <p className="mt-3 text-xs text-white/40">
              One short email per month. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Lumelogics. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-white/70">Privacy</a>
            <a href="#" className="hover:text-white/70">Terms</a>
            <a href="#" className="hover:text-white/70">Contact</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
