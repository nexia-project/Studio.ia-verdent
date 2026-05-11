import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Users, GraduationCap, School, TrendingUp, Plus, Search, 
  BarChart3, AlertCircle, CheckCircle, Clock, Calendar,
  FileText, Download, Filter, MoreVertical, Mail, Phone,
  MapPin, BookOpen, Award, Building2
} from 'lucide-react';

// Mock data
const professores = [
  { id: 1, nome: 'Prof. Ana Silva', disciplina: 'Matemática', turmas: 3, alunos: 95, status: 'ativo' },
  { id: 2, nome: 'Prof. Bruno Costa', disciplina: 'Física', turmas: 2, alunos: 60, status: 'ativo' },
  { id: 3, nome: 'Prof. Carla Mendes', disciplina: 'Química', turmas: 4, alunos: 120, status: 'ativo' },
  { id: 4, nome: 'Prof. Daniel Souza', disciplina: 'Biologia', turmas: 2, alunos: 58, status: 'ferias' },
];

const turmas = [
  { id: 1, nome: '3º Ano A', serie: '3º Ano', alunos: 32, media: 7.5, professor: 'Ana Silva' },
  { id: 2, nome: '3º Ano B', serie: '3º Ano', alunos: 30, media: 7.2, professor: 'Ana Silva' },
  { id: 3, nome: '2º Ano A', serie: '2º Ano', alunos: 28, media: 6.8, professor: 'Bruno Costa' },
  { id: 4, nome: '1º Ano A', serie: '1º Ano', alunos: 35, media: 7.8, professor: 'Carla Mendes' },
];

const alunos = [
  { id: 1, nome: 'Alice Santos', turma: '3º Ano A', media: 8.5, frequencia: 95, status: 'bom' },
  { id: 2, nome: 'Bernardo Lima', turma: '3º Ano A', media: 6.2, frequencia: 80, status: 'alerta' },
  { id: 3, nome: 'Cecília Martins', turma: '3º Ano A', media: 9.1, frequencia: 98, status: 'excelente' },
  { id: 4, nome: 'Diego Ferreira', turma: '3º Ano A', media: 5.8, frequencia: 75, status: 'risco' },
];

const metricas = {
  totalAlunos: 485,
  totalProfessores: 24,
  totalTurmas: 18,
  mediaGeral: 7.2,
  frequenciaMedia: 89,
  evasao: 3.2,
};

const departamentos = [
  { name: 'Ciências Exatas', teachers: 8, students: 420, avgScore: 8.4 },
  { name: 'Ciências Humanas', teachers: 6, students: 380, avgScore: 8.1 },
  { name: 'Ciências Biológicas', teachers: 5, students: 290, avgScore: 8.7 },
  { name: 'Linguagens', teachers: 5, students: 157, avgScore: 8.3 },
];

const atividadesRecentes = [
  { action: 'Professor cadastrado', detail: 'Prof. Carlos Silva - Matemática', time: '2 horas atrás' },
  { action: 'Turma criada', detail: '3º Ano A - 35 alunos', time: '5 horas atrás' },
  { action: 'Relatório gerado', detail: 'Desempenho Geral - Outubro', time: '1 dia atrás' },
  { action: 'Aluno matriculado', detail: 'João Pereira - 2º Ano B', time: '2 dias atrás' },
];

export function InstitutionDashboard() {
  const [abaAtiva, setAbaAtiva] = useState('visao-geral');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Institucional</h1>
          <p className="text-muted-foreground">
            Visão completa da sua instituição de ensino.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Dados
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Turma
          </Button>
        </div>
      </div>

      {/* Stats Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Total de Alunos', value: metricas.totalAlunos, icon: Users, trend: '+12 este mês' },
          { name: 'Total de Professores', value: metricas.totalProfessores, icon: GraduationCap, trend: '2 em contratação' },
          { name: 'Turmas Ativas', value: metricas.totalTurmas, icon: School, trend: '100% ativas' },
          { name: 'Média Geral', value: metricas.mediaGeral, icon: TrendingUp, trend: '+0.3 este bimestre' },
        ].map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.trend}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs value={abaAtiva} onValueChange={setAbaAtiva} className="space-y-4">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="professores">Professores</TabsTrigger>
          <TabsTrigger value="turmas">Turmas</TabsTrigger>
          <TabsTrigger value="alunos">Alunos</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Métricas de Desempenho */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Métricas de Desempenho</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Frequência Média</span>
                      <span className="font-bold">{metricas.frequenciaMedia}%</span>
                    </div>
                    <Progress value={metricas.frequenciaMedia} />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Taxa de Evasão</span>
                      <span className="font-bold text-red-500">{metricas.evasao}%</span>
                    </div>
                    <Progress value={metricas.evasao} className="bg-red-100" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-green-600">85%</p>
                      <p className="text-sm text-muted-foreground">Alunos acima da média</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-orange-500">12%</p>
                      <p className="text-sm text-muted-foreground">Em recuperação</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4 text-center">
                      <p className="text-3xl font-bold text-red-500">3%</p>
                      <p className="text-sm text-muted-foreground">Em risco de evasão</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <CardTitle>Alertas</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-medium text-red-800">5 alunos</p>
                  <p className="text-xs text-red-600">Em risco de evasão</p>
                </div>
                
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <p className="text-sm font-medium text-orange-800">3 turmas</p>
                  <p className="text-xs text-orange-600">Média abaixo de 6.0</p>
                </div>
                
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm font-medium text-yellow-800">12 alunos</p>
                  <p className="text-xs text-yellow-600">Frequência abaixo de 75%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Departamentos e Atividades */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Métricas por Departamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {departamentos.map((dept) => (
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Atividades Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {atividadesRecentes.map((item, i) => (
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

          {/* Distribuição por Série */}
          <Card>
            <CardHeader>
              <CardTitle>Distribuição por Série</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['1º Ano', '2º Ano', '3º Ano'].map((serie) => (
                  <Card key={serie}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{serie}</span>
                        <Badge>{Math.floor(Math.random() * 6) + 4} turmas</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Alunos</span>
                          <span>{Math.floor(Math.random() * 50) + 150}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Média</span>
                          <span>{(Math.random() * 2 + 6).toFixed(1)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Professores */}
        <TabsContent value="professores">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Corpo Docente</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar professor..." className="w-64" />
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Professor
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-6 gap-4 p-4 bg-muted font-medium text-sm">
                  <div>Nome</div>
                  <div>Disciplina</div>
                  <div>Turmas</div>
                  <div>Alunos</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                
                {professores.map((prof) => (
                  <div key={prof.id} className="grid grid-cols-6 gap-4 p-4 border-t items-center">
                    <div className="font-medium">{prof.nome}</div>
                    <div>{prof.disciplina}</div>
                    <div>{prof.turmas}</div>
                    <div>{prof.alunos}</div>
                    <div>
                      <Badge variant={prof.status === 'ativo' ? 'default' : 'secondary'}>
                        {prof.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Ver</Button>
                      <Button variant="ghost" size="sm">Editar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Turmas */}
        <TabsContent value="turmas">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Todas as Turmas</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Nova Turma
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {turmas.map((turma) => (
                  <Card key={turma.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{turma.nome}</CardTitle>
                        <Badge variant="outline">{turma.serie}</Badge>
                      </div>
                      <CardDescription>Professor: {turma.professor}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Alunos matriculados</span>
                        <span className="font-medium">{turma.alunos}</span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Média da turma</span>
                          <span className="font-medium">{turma.media}</span>
                        </div>
                        <Progress value={turma.media * 10} />
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">Ver Alunos</Button>
                        <Button variant="outline" size="sm" className="flex-1">Relatório</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Alunos */}
        <TabsContent value="alunos">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gestão de Alunos</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar aluno..." className="w-64" />
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtrar
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-6 gap-4 p-4 bg-muted font-medium text-sm">
                  <div>Aluno</div>
                  <div>Turma</div>
                  <div>Média</div>
                  <div>Frequência</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                
                {alunos.map((aluno) => (
                  <div key={aluno.id} className="grid grid-cols-6 gap-4 p-4 border-t items-center">
                    <div className="font-medium">{aluno.nome}</div>
                    <div>{aluno.turma}</div>
                    <div>{aluno.media}</div>
                    <div>{aluno.frequencia}%</div>
                    <div>
                      <Badge 
                        variant={
                          aluno.status === 'excelente' ? 'default' :
                          aluno.status === 'bom' ? 'secondary' :
                          aluno.status === 'alerta' ? 'outline' :
                          'destructive'
                        }
                      >
                        {aluno.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Perfil</Button>
                      <Button variant="ghost" size="sm">Histórico</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Institucionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Desempenho por Disciplina</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">Gerar</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Evolução do IDEB</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">Gerar</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Taxa de Evasão</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">Gerar</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Relatório Personalizado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-sm font-medium">Tipo</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Desempenho acadêmico</option>
                        <option>Frequência</option>
                        <option>Avaliação docente</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Período</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Último mês</option>
                        <option>Último bimestre</option>
                        <option>Ano letivo</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Formato</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>PDF</option>
                        <option>Excel</option>
                        <option>CSV</option>
                      </select>
                    </div>
                    <div className="flex items-end">
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Gerar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
