import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Shield, Users, Settings, Activity, DollarSign, Brain, FileText,
  UserPlus, CreditCard, Bell, Database, Search, Filter, MoreVertical,
  AlertTriangle, CheckCircle, Clock, TrendingUp, TrendingDown,
  Zap, BarChart3, PieChart, Globe, Server, Cpu, HardDrive,
  Lock, Unlock, Crown, Star, Trash2, Edit, Eye, Ban,
  Download, RefreshCw, AlertCircle, CheckSquare, XSquare
} from 'lucide-react';

// Mock data - Métricas de IA
const iaMetrics = {
  totalSpent: 12547.89,
  monthlyBudget: 15000,
  tokensUsed: 4523891,
  requestsToday: 12543,
  avgLatency: 245,
  costPerUser: 5.23,
};

const iaProviders = [
  { name: 'OpenRouter', cost: 5234.50, tokens: 2100000, percentage: 42, color: 'bg-blue-500' },
  { name: 'OpenAI', cost: 3891.25, tokens: 1450000, percentage: 31, color: 'bg-green-500' },
  { name: 'Claude', cost: 2145.80, tokens: 680000, percentage: 17, color: 'bg-purple-500' },
  { name: 'DeepSeek', cost: 1276.34, tokens: 293891, percentage: 10, color: 'bg-orange-500' },
];

const iaModels = [
  { name: 'GPT-4o', provider: 'OpenAI', cost: 2456.80, requests: 45200, avgTokens: 1250 },
  { name: 'Claude Sonnet 4', provider: 'Anthropic', cost: 1890.50, requests: 32100, avgTokens: 2100 },
  { name: 'DeepSeek V4', provider: 'DeepSeek', cost: 890.25, requests: 28900, avgTokens: 980 },
  { name: 'GPT-4o-mini', provider: 'OpenAI', cost: 678.45, requests: 67800, avgTokens: 450 },
  { name: 'Claude Haiku', provider: 'Anthropic', cost: 255.30, requests: 45600, avgTokens: 320 },
];

// Mock data - Analytics de Conteúdo
const contentUsage = [
  { feature: 'Tutor IA (Tiagão)', users: 1245, requests: 45200, percentage: 35 },
  { feature: 'Caderno Digital', users: 892, requests: 23100, percentage: 22 },
  { feature: 'Simulado ENEM', users: 756, requests: 18900, percentage: 18 },
  { feature: 'Redação', users: 623, requests: 12400, percentage: 12 },
  { feature: 'Flashcards', users: 534, requests: 9800, percentage: 8 },
  { feature: 'Módulo Fazedores', users: 312, requests: 5600, percentage: 5 },
];

const userSegments = [
  { segment: 'Alunos Free', users: 1847, avgUsage: '45 min/dia', conversion: '12%' },
  { segment: 'Alunos Premium', users: 487, avgUsage: '2.5 h/dia', retention: '94%' },
  { segment: 'Professores', users: 124, avgUsage: '1.8 h/dia', active: '89%' },
  { segment: 'Instituições', users: 12, avgUsage: '4.2 h/dia', active: '100%' },
];

// Mock data - Usuários
const users = [
  { id: 1, name: 'Ana Carolina Silva', email: 'ana.silva@email.com', role: 'student', plan: 'premium', status: 'active', lastActive: '2 min atrás', iaUsage: 1250 },
  { id: 2, name: 'Prof. Roberto Mendes', email: 'roberto@escola.com', role: 'teacher', plan: 'institution', status: 'active', lastActive: '5 min atrás', iaUsage: 890 },
  { id: 3, name: 'Escola Municipal Jardim', email: 'contato@emj.edu.br', role: 'institution_admin', plan: 'enterprise', status: 'active', lastActive: '1 hora atrás', iaUsage: 45600 },
  { id: 4, name: 'João Pedro Santos', email: 'joao.santos@email.com', role: 'student', plan: 'free', status: 'active', lastActive: '15 min atrás', iaUsage: 320 },
  { id: 5, name: 'Maria Clara Lima', email: 'maria.lima@email.com', role: 'student', plan: 'premium', status: 'suspended', lastActive: '2 dias atrás', iaUsage: 0 },
  { id: 6, name: 'Prof. Carlos Souza', email: 'carlos@escola.com', role: 'teacher', plan: 'free', status: 'pending', lastActive: 'Nunca', iaUsage: 0 },
];

// Mock data - System Health
const systemHealth = [
  { service: 'API Gateway', status: 'operational', uptime: '99.99%', latency: '12ms' },
  { service: 'Database PostgreSQL', status: 'operational', uptime: '99.95%', latency: '8ms' },
  { service: 'Redis Cache', status: 'operational', uptime: '99.99%', latency: '2ms' },
  { service: 'AI Service (OpenRouter)', status: 'operational', uptime: '98.5%', latency: '245ms' },
  { service: 'AI Service (OpenAI)', status: 'degraded', uptime: '97.2%', latency: '450ms' },
  { service: 'File Storage', status: 'operational', uptime: '99.9%', latency: '45ms' },
];

const alerts = [
  { type: 'error', message: 'Latência alta no OpenAI (>500ms)', time: '5 min atrás', service: 'AI' },
  { type: 'warning', message: 'Uso de disco acima de 85%', time: '1 hora atrás', service: 'Storage' },
  { type: 'warning', message: 'Gastos com IA próximos do orçamento (83%)', time: '2 horas atrás', service: 'Budget' },
  { type: 'success', message: 'Backup diário concluído', time: '4 horas atrás', service: 'Database' },
  { type: 'info', message: 'Novo usuário premium: Ana Carolina', time: '5 horas atrás', service: 'User' },
];

export function AdminDashboard() {
  const [abaAtiva, setAbaAtiva] = useState('overview');
  const [searchUser, setSearchUser] = useState('');

  const budgetPercentage = (iaMetrics.totalSpent / iaMetrics.monthlyBudget) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Controle total da plataforma StudyAI
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,470</div>
            <p className="text-xs text-muted-foreground">+156 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gastos com IA</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${iaMetrics.totalSpent.toLocaleString()}</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={budgetPercentage} className="h-2 flex-1" />
              <span className="text-xs text-muted-foreground">{budgetPercentage.toFixed(0)}%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Usados</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(iaMetrics.tokensUsed / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-muted-foreground">{iaMetrics.requestsToday.toLocaleString()} hoje</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">19.7%</div>
            <p className="text-xs text-green-600">+2.3% vs mês anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="space-y-4">
        <TabsList className="grid grid-cols-6 w-full">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="ia">Monitor IA</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="system">Sistema</TabsTrigger>
          <TabsTrigger value="config">Configurações</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Alertas */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-500" />
                  <CardTitle>Alertas do Sistema</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {alerts.map((alert, i) => (
                    <div 
                      key={i} 
                      className={`p-3 rounded-lg border ${
                        alert.type === 'error' ? 'bg-red-50 border-red-200' :
                        alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                        alert.type === 'success' ? 'bg-green-50 border-green-200' :
                        'bg-blue-50 border-blue-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <p className={`text-sm font-medium ${
                          alert.type === 'error' ? 'text-red-800' :
                          alert.type === 'warning' ? 'text-yellow-800' :
                          alert.type === 'success' ? 'text-green-800' :
                          'text-blue-800'
                        }`}>{alert.message}</p>
                        <Badge variant="outline">{alert.service}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Ações Rápidas */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Novo Usuário
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Crown className="mr-2 h-4 w-4" />
                  Liberar Premium
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Enviar Notificação
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Database className="mr-2 h-4 w-4" />
                  Backup Manual
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Uso por Feature */}
          <Card>
            <CardHeader>
              <CardTitle>Uso por Funcionalidade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contentUsage.map((item) => (
                  <div key={item.feature} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{item.feature}</span>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{item.users} usuários</span>
                        <span>{item.requests.toLocaleString()} reqs</span>
                      </div>
                    </div>
                    <Progress value={item.percentage} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Monitor IA */}
        <TabsContent value="ia" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Gastos por Provider */}
            <Card>
              <CardHeader>
                <CardTitle>Gastos por Provider</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {iaProviders.map((provider) => (
                    <div key={provider.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{provider.name}</span>
                        <span className="text-sm">${provider.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={provider.percentage} className={provider.color} />
                        <span className="text-xs w-10 text-right">{provider.percentage}%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {(provider.tokens / 1000000).toFixed(2)}M tokens
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Modelos */}
            <Card>
              <CardHeader>
                <CardTitle>Modelos Mais Usados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {iaModels.map((model, i) => (
                    <div key={model.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{model.name}</p>
                        <p className="text-sm text-muted-foreground">{model.provider}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${model.cost.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">
                          {model.requests.toLocaleString()} reqs • {model.avgTokens} tokens/média
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Métricas de IA */}
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Uso de IA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">${iaMetrics.costPerUser}</p>
                  <p className="text-sm text-muted-foreground">Custo por usuário</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">{iaMetrics.avgLatency}ms</p>
                  <p className="text-sm text-muted-foreground">Latência média</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">89.5%</p>
                  <p className="text-sm text-muted-foreground">Cache hit rate</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold text-primary">2.3%</p>
                  <p className="text-sm text-muted-foreground">Taxa de erro</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Segmentos de Usuários */}
            <Card>
              <CardHeader>
                <CardTitle>Segmentos de Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userSegments.map((segment) => (
                    <div key={segment.segment} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{segment.segment}</span>
                        <Badge>{segment.users} usuários</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Uso médio:</span>
                          <span className="ml-2">{segment.avgUsage}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">
                            {segment.conversion ? 'Conversão:' : segment.retention ? 'Retenção:' : 'Ativos:'}
                          </span>
                          <span className="ml-2 text-green-600">
                            {segment.conversion || segment.retention || segment.active}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Distribuição de Planos */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Planos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Free</span>
                      <span className="font-medium">1,847 (74.8%)</span>
                    </div>
                    <Progress value={74.8} className="bg-gray-200" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Premium</span>
                      <span className="font-medium">487 (19.7%)</span>
                    </div>
                    <Progress value={19.7} className="bg-yellow-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Instituição</span>
                      <span className="font-medium">124 (5.0%)</span>
                    </div>
                    <Progress value={5.0} className="bg-blue-500" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span>Enterprise</span>
                      <span className="font-medium">12 (0.5%)</span>
                    </div>
                    <Progress value={0.5} className="bg-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Receita */}
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-3xl font-bold text-green-600">$24,567</p>
                  <p className="text-sm text-muted-foreground">Receita Total</p>
                  <p className="text-xs text-green-600 mt-1">+12% vs mês anterior</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">$9,740</p>
                  <p className="text-sm text-muted-foreground">MRR (Premium)</p>
                  <p className="text-xs text-green-600 mt-1">+8% vs mês anterior</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-3xl font-bold text-primary">$12,400</p>
                  <p className="text-sm text-muted-foreground">Instituições</p>
                  <p className="text-xs text-green-600 mt-1">+15% vs mês anterior</p>
                </div>
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-3xl font-bold text-red-500">-$12,548</p>
                  <p className="text-sm text-muted-foreground">Custos IA</p>
                  <p className="text-xs text-red-600 mt-1">51% da receita</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Usuários */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gestão de Usuários</CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar usuário..." 
                      className="pl-8 w-64"
                      value={searchUser}
                      onChange={(e) => setSearchUser(e.target.value)}
                    />
                  </div>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                  <Button>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Novo
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-7 gap-4 p-4 bg-muted font-medium text-sm">
                  <div className="col-span-2">Usuário</div>
                  <div>Função</div>
                  <div>Plano</div>
                  <div>Status</div>
                  <div>Último Acesso</div>
                  <div>Ações</div>
                </div>
                
                {users.map((user) => (
                  <div key={user.id} className="grid grid-cols-7 gap-4 p-4 border-t items-center">
                    <div className="col-span-2">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div>
                      <Badge variant="outline">
                        {user.role === 'student' ? 'Aluno' : 
                         user.role === 'teacher' ? 'Professor' : 
                         user.role === 'institution_admin' ? 'Instituição' : 'Admin'}
                      </Badge>
                    </div>
                    <div>
                      <Badge 
                        variant={
                          user.plan === 'premium' ? 'default' :
                          user.plan === 'enterprise' ? 'secondary' :
                          'outline'
                        }
                      >
                        {user.plan === 'free' ? 'Free' : 
                         user.plan === 'premium' ? 'Premium' : 
                         user.plan === 'institution' ? 'Instituição' : 'Enterprise'}
                      </Badge>
                    </div>
                    <div>
                      <Badge 
                        variant={
                          user.status === 'active' ? 'default' :
                          user.status === 'pending' ? 'outline' :
                          'destructive'
                        }
                      >
                        {user.status === 'active' ? 'Ativo' : 
                         user.status === 'pending' ? 'Pendente' : 'Suspenso'}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">{user.lastActive}</div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Crown className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Ban className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sistema */}
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saúde do Sistema</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemHealth.map((service) => (
                  <div key={service.service} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {service.status === 'operational' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <span className="font-medium">{service.service}</span>
                        <p className="text-sm text-muted-foreground">Latência: {service.latency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge 
                        variant={service.status === 'operational' ? 'default' : 'outline'}
                        className={service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {service.status === 'operational' ? 'Operacional' : 'Degradado'}
                      </Badge>
                      <span className="text-sm text-muted-foreground w-16 text-right">{service.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Recursos do Servidor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Cpu className="h-4 w-4" /> CPU
                    </span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4" /> Memória
                    </span>
                    <span>62%</span>
                  </div>
                  <Progress value={62} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Server className="h-4 w-4" /> Disco
                    </span>
                    <span className="text-orange-500">87%</span>
                  </div>
                  <Progress value={87} className="bg-red-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas em Tempo Real</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-xl font-bold">1.2k</p>
                    <p className="text-xs text-muted-foreground">Reqs/min</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-xl font-bold">342</p>
                    <p className="text-xs text-muted-foreground">Ativos</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-xl font-bold">45ms</p>
                    <p className="text-xs text-muted-foreground">Latência</p>
                  </div>
                  <div className="p-3 border rounded-lg text-center">
                    <p className="text-xl font-bold">0.02%</p>
                    <p className="text-xs text-muted-foreground">Erros</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Configurações */}
        <TabsContent value="config" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Limites e Gates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Limite de Tokens (Free)</label>
                  <Input type="number" defaultValue={10000} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Limite de Tokens (Premium)</label>
                  <Input type="number" defaultValue={100000} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Máximo de Cadernos (Free)</label>
                  <Input type="number" defaultValue={3} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Máximo de Flashcards (Free)</label>
                  <Input type="number" defaultValue={50} />
                </div>
                <Button className="w-full">Salvar Limites</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Feature Flags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: 'Módulo Fazedores', enabled: true },
                  { name: 'Redação IA', enabled: true },
                  { name: 'Simulado ENEM', enabled: true },
                  { name: 'Sala de Estudos', enabled: false },
                  { name: 'Notebook RAG', enabled: true },
                  { name: 'Voz do Tiagão', enabled: true },
                ].map((feature) => (
                  <div key={feature.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{feature.name}</span>
                    <Button 
                      variant={feature.enabled ? 'default' : 'outline'} 
                      size="sm"
                      className={feature.enabled ? 'bg-green-600' : ''}
                    >
                      {feature.enabled ? 'Ativo' : 'Desativado'}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Configurações de IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Modelo Padrão</label>
                  <select className="w-full p-2 border rounded">
                    <option>GPT-4o</option>
                    <option>Claude Sonnet 4</option>
                    <option>DeepSeek V4</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Temperatura</label>
                  <Input type="number" step="0.1" defaultValue={0.7} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Tokens</label>
                  <Input type="number" defaultValue={4096} />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Testar Conexão</Button>
                <Button>Salvar Configurações</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
