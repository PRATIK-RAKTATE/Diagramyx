import { useState } from "react";
import "./App.css";

/**
 * use in next code 
 * <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="manifest" href="/site.webmanifest">
 * 
 */

function App() {
  const [count, setCount] = useState(0); // keep if you want later; unused for now

  return (
    <div className="page">
      <div className="bgGlow" aria-hidden="true" />
      <header className="hero">
        <img
          className="logo"
          src="/icons/android-chrome-512x512.png"
          alt="Diagramyx logo"
          width={48}
          height={48}
          loading="eager"
          decoding="async"
        />

        <h1 className="title">
          About <span className="accent">Building Diagramyx</span>
        </h1>

        <p className="subtitle">
          Building Diagramyx is a modern diagram and visual workflow builder
          designed for fast creation of node-based diagrams, clean
          documentation, and shareable exports — optimized for performance,
          accessibility, and search.
        </p>
      </header>

      <main className="content">
        <section className="card" aria-labelledby="why-title">
          <h2 id="why-title" className="cardTitle">
            Why Building Diagramyx?
          </h2>

          <ul className="list">
            <li>Interactive diagrams with structured nodes and connectors</li>
            <li>
              Clean exports and shareable visuals for documentation and teams
            </li>
            <li>
              Fast UI, keyboard-friendly controls, and accessible components
            </li>
            <li>
              Built to scale: predictable state, clear boundaries, and testable
              modules
            </li>
          </ul>
        </section>
      </main>

      <footer className="footer">
        <span>
          © {new Date().getFullYear()} Diagramyx • Build. Connect. Export.
        </span>
      </footer>
    </div>
  );
}

export default App;
