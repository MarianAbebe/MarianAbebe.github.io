import Link from "next/link";
import { StatusIndicator } from "./ui";

const links = [
  ["ABOUT", "/#about"], ["MISSIONS", "/missions"], ["JOURNEY", "/#journey"],
  ["SYSTEMS", "/#systems"], ["SIGNALS", "/#signals"], ["LOGBOOK", "/logbook"], ["CONTACT", "/#contact"]
];

export function Navigation() {
  return <header className="nav-shell">
    <Link href="/mars" className="wordmark" aria-label="Marian Abebe mission control home">MARIAN ABEBE</Link>
    <nav aria-label="Primary navigation">{links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}</nav>
    <StatusIndicator />
  </header>;
}

export function Footer() {
  return <footer className="footer"><span>MA // ENGINEERING PORTFOLIO</span><span>MISSION CLOCK // {new Date().getFullYear()}</span><a href="#top">RETURN TO ORBIT ↑</a></footer>;
}
