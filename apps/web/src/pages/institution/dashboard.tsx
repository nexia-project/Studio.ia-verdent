import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Building2, Users, GraduationCap, TrendingUp, 
  Plus, FileText, BarChart3, School,
  BookOpen, Calendar
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { name: 'Total de Professores', value: '24', icon: GraduationCap, change: '+3 este mês' },
  { name: 'Total de Alunos', value: '1.247', icon: Users, change: '+127 este semestre' },
  { name: 'Turmas Ativas', value: '42', icon: Building2, change: '8 departamentos' },
  { name: 'Taxa de Engajamento', value: '87%', icon: TrendingUp, change: '+5% vs mês anterior' },
]

const quickActions = [
  { name: 'Cadastrar Professor', icon: Plus, href: '/instituicao/professores/novo' },
  { name: 'Criar Turma', icon: School, href: '/instituicao/turmas/nova' },
  { name: 'Gerar Relatório', icon: FileText, href: '/instituicao/relatorios' },
  { name: 'Ver Análises', icon: BarChart3, href: '/instituicao/analises' },
]

const recentActivities = [
  { action: 'Professor cadastrado', detail: 'Prof. Carlos Silva - Matemática', time: '2 horas atrás' },
  { action: 'Turma criada', detail: '3º Ano A - 35 alunos', time: '5 horas atrás' },
  { action: 'Relatório gerado', detail: 'Desempenho Geral - Outubro', time: '1 dia atrás' },
  { action: 'Aluno matriculado', detail: 'João Pereira - 2º Ano B', time: '2 dias atrás' },
]

const departmentStats = [
  { name: 'Ciências Exatas', teachers: 8, students: 420, avgScore: 8.4 },
  { name: 'Ciências Humanas', teachers: 6, students: 380, avgScore: 8.1 },
  { name: 'Ciências Biológicas', teachers: 5, students: 290, avgScore: 8.7 },
  { name: 'Linguagens', teachers: 5, students: 157, avgScore: 8.3 },
]

export function InstitutionDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Institucional</h1>
        <p className="text-muted-foreground">
          Visão geral da sua instituição de ensino.
        </p>
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

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.name} to={action.href}>
            <Button 
              variant="outline" 
              className="w-full h-auto py-4 flex flex-col items-center gap-2"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{action.name}</span>
            </Button>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Métricas por Departamento
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-medium">{dept.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {dept.teachers} professores • {dept.students} alunos
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Nota média: {dept.avgScore}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Atividades Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-medium">{item.action}</p>
                    <p className="text-sm text-muted-foreground">{item.detail}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximos Eventos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Reunião de Professores', date: '15 Nov, 14:00', type: 'Reunião' },
              { title: 'Simulado ENEM', date: '20 Nov, 08:00', type: 'Avaliação' },
              { title: 'Entrega de Boletins', date: '30 Nov, 17:00', type: 'Administrativo' },
            ].map((event, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-2">
                  {event.type}
                </span>
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}