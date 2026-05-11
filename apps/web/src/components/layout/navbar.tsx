import { useUser, SignOutButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'
import { GraduationCap, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Navbar() {
  const { isSignedIn, user } = useUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link to="/" className="flex items-center gap-2 mr-4">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="font-display font-bold text-xl">StudyAI</span>
        </Link>

        <nav className="flex flex-1 items-center gap-6 text-sm">
          <Link to="/" className="transition-colors hover:text-foreground/80">
            Início
          </Link>
          {isSignedIn && (
            <>
              <Link to="/aluno" className="transition-colors hover:text-foreground/80">
                Dashboard
              </Link>
              <Link to="/aluno/tutor" className="transition-colors hover:text-foreground/80">
                Tutor IA
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span className="text-sm">{user?.firstName}</span>
              </div>
              <SignOutButton>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-4 w-4" />
                </Button>
              </SignOutButton>
            </>
          ) : (
            <Link to="/login/aluno">
              <Button>Entrar</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}