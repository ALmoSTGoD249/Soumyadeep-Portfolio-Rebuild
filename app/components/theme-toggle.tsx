"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-theme");
    const mobileSystemMode = window.matchMedia("(max-width: 600px) and (pointer: coarse)");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (next: Theme) => {
      document.documentElement.dataset.theme = next;
      setTheme(next);
    };

    if (mobileSystemMode.matches) {
      window.localStorage.removeItem("portfolio-theme");
      apply(systemDark.matches ? "dark" : "light");
    } else {
      apply(stored === "dark" || stored === "light" ? stored : "light");
    }
    setReady(true);

    const syncMobileSystem = () => {
      if (mobileSystemMode.matches) {
        window.localStorage.removeItem("portfolio-theme");
        apply(systemDark.matches ? "dark" : "light");
      }
    };
    mobileSystemMode.addEventListener?.("change", syncMobileSystem);
    systemDark.addEventListener?.("change", syncMobileSystem);
    return () => {
      mobileSystemMode.removeEventListener?.("change", syncMobileSystem);
      systemDark.removeEventListener?.("change", syncMobileSystem);
    };
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    window.localStorage.setItem("portfolio-theme", next);
    document.documentElement.dataset.theme = next;
    setTheme(next);
  };

  return (
    <button
      className="portfolio-theme-toggle"
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      data-ready={ready ? "true" : "false"}
    >
      {theme === "dark" ? <Sun size={15} strokeWidth={1.7} /> : <Moon size={15} strokeWidth={1.7} />}
      <span>{theme === "dark" ? "LIGHT MODE" : "DARK MODE"}</span>
    </button>
  );
}
