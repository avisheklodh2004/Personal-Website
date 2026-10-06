import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { Glyph } from "./chess/Board";

export const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="nav">
      <div className="nav__inner">
        <a href="#top" className="nav__brand" aria-label="Avishek Lodh, back to top">
          <span className="nav__mark">
            <Glyph piece="N" />
          </span>
          <span>Avishek Lodh</span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="icon-btn icon-btn--ghost"
            href="https://github.com/avisheklodh2004"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
          >
            <Github size={17} strokeWidth={1.75} />
          </a>
          <a className="btn btn--primary btn--sm nav__cta" href="#contact">
            Get in touch
          </a>
          <button
            className="icon-btn icon-btn--ghost nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} strokeWidth={1.75} /> : <Menu size={18} strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" className="nav__sheet" aria-label="Mobile">
          {[...NAV_ITEMS, { label: "Contact", href: "#contact" }].map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
