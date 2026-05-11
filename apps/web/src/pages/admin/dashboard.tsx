import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, Users, Settings, Activity,
  UserPlus, CreditCard, Bell, Database,
  AlertTriangle, CheckCircle, Clock
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { name: 'Total de Usuários', value: '2.4k', icon: Users, change: '+156 este mês' },
  { name: 'Usuários Premium', value: '487', icon: Shield, change: '+23 assinaturas' },
  { name: 'Instituições', value: '12', icon: Settings, change: '+2 novas' },
  { name: 'Taxa de Conversão', value: '20.3%', icon: Activity, change: '+2.1%' },
]

const quickActions = [
  { name: 'Novo Usuário', icon: UserPlus, href: '/admin/usuarios/novo' },
  { name: 'Gerenciar Planos', icon: CreditCard, href: '/admin/planos' },
  { name: 'Notificações', icon: Bell, href: '/admin/notificacoes' },
  { name: 'Database', icon: Database, href: '/admin/database' },
]

const recentUsers = [
  { name: 'Ana Carolina Silva', email: 'ana.silva@email.com', role: 'Aluno', status: 'active', date: 'Hoje, 10:30' },
  { name: 'Prof. Roberto Mendes', email: 'roberto@escola.com', role: 'Professor', status: 'active', date: 'Hoje, 09:15' },
  { name: 'Escola Municipal Jardim', email: 'contato@emj.edu.br', role: 'Instituição', status: 'pending', date: 'Ontem' },
  { name: 'João Pedro Santos', email: 'joao.santos@email.com', role: 'Aluno', status: 'active', date: 'Ontem' },
]

const systemHealth = [
  { service: 'API', status: 'operational', uptime: '99.9%' },
  { service: 'Database', status: 'operational', uptime: '99.9%' },
  { service: 'Redis Cache', status: 'operational', uptime: '99.9%' },
  { service: 'AI Service', status: 'degraded', uptime: '98.2%' },
]

const alerts = [
  { type: 'error', message: 'Latência alta no serviço de IA', time: '5 min atrás' },
  { type: 'warning', message: 'Uso de disco acima de 80%', time: '1 hora atrás' },
  { type: 'success', message: 'Backup diário concluído', time: '4 horas atrás' },
]

export function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
        <p className="text-muted-foreground">
          Gerenciamento completo da plataforma.
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
        {/* Recent Users */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Usuários Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user, i) => (
                <div key={i} className="flex items-center justify-between border-b last:border-0 pb-3 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{user.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{user.role}</span>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status === 'active' ? 'Ativo' : 'Pendente'}
                    </span>
                    <span className="text-sm text-muted-foreground w-24 text-right">{user.date}</span>
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
              <AlertTriangle className="h-5 w-5" />
              Alertas do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, i) => (
                <div 
                  key={i} 
                  className={`p-3 rounded-lg border ${
                    alert.type === 'error' ? 'bg-red-50 border-red-200' :
                    alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                    'bg-green-50 border-green-200'
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
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Saúde do Sistema
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemHealth.map((service) => (
                <div key={service.service} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {service.status === 'operational' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                    )}
                    <span className="font-medium">{service.service}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'operational' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.status === 'operational' ? 'Operacional' : 'Degradado'}
                    </span>
                    <span className="text-sm text-muted-foreground w-16 text-right">{service.uptime}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Admin Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Ações Administrativas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <Users className="mr-2 h-4 w-4" />
              Gerenciar Usuários
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Shield className="mr-2 h-4 w-4" />
              Override de Assinaturas
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <CreditCard className="mr-2 h-4 w-4" />
              Configurar Planos
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Database className="mr-2 h-4 w-4" />
              Backup e Restore
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <Bell className="mr-2 h-4 w-4" />
              Enviar Notificação
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Métricas em Tempo Real
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Requisições/min', value: '1.2k', trend: '+5%' },
              { label: 'Latência média', value: '45ms', trend: '-2ms' },
              { label: 'Erros (24h)', value: '0.02%', trend: '-0.01%' },
              { label: 'Usuários ativos', value: '342', trend: '+12' },
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
  )
}