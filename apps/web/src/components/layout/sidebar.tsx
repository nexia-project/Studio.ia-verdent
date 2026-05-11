import { useLocation } from 'react-router-dom'
import { 
  Home, 
  MessageCircle, 
  BookOpen, 
  Brain,
  Trophy,
  Settings,
  Wrench,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/aluno', icon: Home },
  { name: 'Tutor IA', href: '/aluno/tutor', icon: MessageCircle },
  { name: 'Fazedores', href: '/aluno/fazedores', icon: Wrench },
  { name: 'Caderno', href: '/aluno/caderno', icon: BookOpen },
  { name: 'Flashcards', href: '/aluno/flashcards', icon: Brain },
  { name: 'Conquistas', href: '/aluno/conquistas', icon: Trophy },
  { name: 'Configurações', href: '/aluno/configuracoes', icon: Settings },
]

export function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r bg-background min-h-[calc(100vh-3.5rem)]">
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <a
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.name}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}