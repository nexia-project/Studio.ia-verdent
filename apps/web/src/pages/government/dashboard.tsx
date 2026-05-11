import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Landmark, Users, School, FileText, 
  Download, MapPin, TrendingUp, AlertCircle,
  BarChart3, Calendar
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { name: 'Escolas na Rede', value: '156', icon: School, change: '+4 este ano' },
  { name: 'Total de Alunos', value: '45.2k', icon: Users, change: '+2.3k vs ano anterior' },
  { name: 'Professores', value: '3.8k', icon: Landmark, change: '+180 contratados' },
  { name: 'Relatórios Gerados', value: '127', icon: FileText, change: 'Este mês' },
]

const quickActions = [
  { name: 'Exportar Dados', icon: Download, href: '/governo/exportar' },
  { name: 'Mapa da Rede', icon: MapPin, href: '/governo/mapa' },
  { name: 'Indicadores', icon: BarChart3, href: '/governo/indicadores' },
  { name: 'Alertas', icon: AlertCircle, href: '/governo/alertas' },
]

const regionStats = [
  { region: 'Norte', schools: 28, students: 8200, performance: 7.2 },
  { region: 'Nordeste', schools: 42, students: 15400, performance: 7.5 },
  { region: 'Centro-Oeste', schools: 24, students: 6800, performance: 7.8 },
  { region: 'Sudeste', schools: 45, students: 9800, performance: 8.1 },
  { region: 'Sul', schools: 17, students: 5000, performance: 8.3 },
]

const recentReports = [
  { name: 'Relatório Anual de Desempenho', date: '30 Out, 2024', status: 'Completo' },
  { name: 'Análise de Evolução por Região', date: '25 Out, 2024', status: 'Completo' },
  { name: 'Indicadores de Infraestrutura', date: '20 Out, 2024', status: 'Pendente' },
  { name: 'Avaliação de Professores', date: '15 Out, 2024', status: 'Completo' },
]

const alerts = [
  { type: 'warning', message: '3 escolas com taxa de evasão acima de 10%', time: 'Hoje' },
  { type: 'info', message: 'Novo cronograma de avaliações publicado', time: 'Ontem' },
  { type: 'success', message: 'Meta de matrículas 2024 atingida', time: '2 dias atrás' },
]

export function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard do Governo</h1>
        <p className="text-muted-foreground">
          Visão macro das redes de ensino público.
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Regional Performance */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Desempenho por Região
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {regionStats.map((region) => (
                <div key={region.region} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-medium">{region.region}</p>
                    <p className="text-sm text-muted-foreground">
                      {region.schools} escolas • {region.students.toLocaleString()} alunos
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(region.performance / 10) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium w-12 text-right">{region.performance}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alertas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg border ${
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    alert.type === 'success' ? 'bg-green-50 border-green-200' :
                    'bg-blue-50 border-blue-200'
                  }`}
                >
                  <p className="text-sm font-medium">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Relatórios Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">{report.date}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'Completo' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {report.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Indicadores Chave
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Taxa de Aprovação', value: '87.3%', trend: '+2.1%' },
                { label: 'Média ENEM', value: '642', trend: '+18 pts' },
                { label: 'Taxa de Evasão', value: '4.2%', trend: '-0.8%' },
                { label: 'Prof/Aluno', value: '1:12', trend: 'Ideal' },
              ].map((metric, i) => (
                <div key={i} className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                  <p className="text-xs text-green-600 mt-1">{metric.trend}</p>
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
            Agenda Institucional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: 'Reunião com Diretores', date: '12 Nov, 09:00', location: 'Sede Administrativa' },
              { title: 'Lançamento do Programa', date: '15 Nov, 14:00', location: 'Auditório Central' },
              { title: 'Capacitação de Professores', date: '20-22 Nov', location: 'Online' },
              { title: 'Fórum de Educação', date: '05 Dez, 08:00', location: 'Centro de Convenções' },
            ].map((event, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <p className="font-medium">{event.title}</p>
                <p className="text-sm text-primary">{event.date}</p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}