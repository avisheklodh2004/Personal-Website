import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#about">
        Skip to content
      </a>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container footer__inner">
          <p>© {new Date().getFullYear()} Avishek Lodh</p>
          <nav aria-label="Footer">
            <a href="https://github.com/avisheklodh2004" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/avisheklodh/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a href="mailto:alodh2@asu.edu">Email</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
