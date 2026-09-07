"use client";

import { createContext, useContext, useState } from "react";

type IntroContextValue = {
  active: number;
  setActive: (index: number) => void;
};

const IntroContext = createContext<IntroContextValue | null>(null);

export function IntroProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(0);
  return <IntroContext.Provider value={{ active, setActive }}>{children}</IntroContext.Provider>;
}

export function useIntro() {
  const ctx = useContext(IntroContext);
  if (!ctx) throw new Error("useIntro must be used inside IntroProvider");
  return ctx;
}
