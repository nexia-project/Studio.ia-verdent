import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Hero } from '@/components/landing/hero'
import { Features } from '@/components/landing/features'
import { Pricing } from '@/components/landing/pricing'
import { Footer } from '@/components/layout/footer'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary" />
            <span className="font-display font-bold text-xl">StudyAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground">
              Recursos
            </a>
            <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
              Preços
            </a>
            <a href="#about" className="text-sm text-muted-foreground hover:text-foreground">
              Sobre
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login/aluno">
              <Button variant="ghost">Entrar</Button>
            </Link>
            <Link to="/login/aluno">
              <Button>Começar Grátis</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>

      <Footer />
    </div>
  )
}