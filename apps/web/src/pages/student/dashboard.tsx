import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MessageCircle, BookOpen, Brain, Trophy, Clock, Flame } from 'lucide-react'
import { Link } from 'react-router-dom'

const quickActions = [
  { name: 'Falar com Tiagão', icon: MessageCircle, href: '/aluno/tutor', color: 'bg-primary' },
  { name: 'Abrir Caderno', icon: BookOpen, href: '/aluno/caderno', color: 'bg-secondary' },
  { name: 'Revisar Flashcards', icon: Brain, href: '/aluno/flashcards', color: 'bg-accent' },
  { name: 'Ver Conquistas', icon: Trophy, href: '/aluno/conquistas', color: 'bg-muted' },
]

const stats = [
  { name: 'Horas de Estudo', value: '12h', icon: Clock, change: '+2h esta semana' },
  { name: 'Dias Seguidos', value: '5', icon: Flame, change: 'Seu recorde: 12 dias' },
  { name: 'Flashcards', value: '156', icon: Brain, change: '23 para revisar hoje' },
  { name: 'Conquistas', value: '8', icon: Trophy, change: '2 novas esta semana' },
]

export function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo de volta! Continue sua jornada de aprendizado.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.name} to={action.href}>
            <Button 
              variant="outline" 
              className="w-full h-auto py-6 flex flex-col items-center gap-3"
            >
              <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center`}>
                <action.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium">{action.name}</span>
            </Button>
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: 'Revisou 20 flashcards', subject: 'Biologia', time: '2 horas atrás' },
              { action: 'Conversou com Tiagão', subject: 'Matemática', time: '5 horas atrás' },
              { action: 'Completou simulado', subject: 'ENEM Geral', time: '1 dia atrás' },
              { action: 'Desbloqueou conquista', subject: 'Mestre dos Flashcards', time: '2 dias atrás' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between border-b last:border-0 pb-4 last:pb-0">
                <div>
                  <p className="font-medium">{item.action}</p>
                  <p className="text-sm text-muted-foreground">{item.subject}</p>
                </div>
                <span className="text-sm text-muted-foreground">{item.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}