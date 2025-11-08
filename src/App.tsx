import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Toaster } from "./components/ui/sonner";
import { Menu } from "lucide-react";
import { Button } from "./components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "./components/ui/sheet";
import logoImage from "asset:logo.png";

export default function App() {
  const navItems = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <div className="size-full">
      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#020817]/95 backdrop-blur-md border-b border-primary/20">
        <div className="flex items-center h-16 md:h-20 px-4 md:px-6 lg:px-8">
          <a
            href="#"
            className="hover:scale-105 transition-transform duration-300 ease-out group"
          >
            <img
              src={logoImage}
              alt="A.L Logo"
              className="h-10 w-10 md:h-12 md:w-12 object-contain invert group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] transition-all duration-300"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-6 ml-auto mr-4 lg:mr-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="relative px-4 py-2 text-muted-foreground hover:text-primary transition-all duration-300 group whitespace-nowrap"
              >
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-3/4 shadow-[0_0_10px_var(--glow-purple)]"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden ml-auto">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary transition-colors">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="border-l border-primary/30 bg-[#020817]">
                <SheetHeader>
                  <SheetTitle className="text-primary">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 mt-4">
                  {navItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg px-4 py-3 rounded-lg hover:bg-primary/10 hover:text-primary transition-all duration-300 hover:translate-x-2"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      <Toaster />
    </div>
  );
}
