import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, BookOpen, FileText, BarChart3, Plus, Search, 
  MoreVertical, TrendingUp, Calendar, CheckCircle, Clock,
  GraduationCap, Award, AlertCircle, Download, Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data
const turmas = [
  { id: 1, nome: '3º Ano A', disciplina: 'Matemática', alunos: 32, media: 7.5, status: 'ativa' },
  { id: 2, nome: '2º Ano B', disciplina: 'Física', alunos: 28, media: 6.8, status: 'ativa' },
  { id: 3, nome: '1º Ano C', disciplina: 'Química', alunos: 35, media: 7.2, status: 'ativa' },
  { id: 4, nome: '3º Ano D', disciplina: 'Matemática', alunos: 30, media: 6.5, status: 'encerrada' },
];

const provas = [
  { id: 1, titulo: 'Prova Bimestral - Matemática', turma: '3º Ano A', data: '2024-02-15', status: 'aplicada', media: 7.2 },
  { id: 2, titulo: 'Avaliação de Física', turma: '2º Ano B', data: '2024-02-20', status: 'agendada', media: null },
  { id: 3, titulo: 'Prova de Química', turma: '1º Ano C', data: '2024-02-10', status: 'corrigida', media: 7.8 },
];

const questoes = [
  { id: 1, enunciado: 'Qual é a derivada de x²?', disciplina: 'Matemática', dificuldade: 'média', bncc: 'EM13MAT301', uso: 12 },
  { id: 2, enunciado: 'Explique a Lei de Newton...', disciplina: 'Física', dificuldade: 'difícil', bncc: 'EM13FIS201', uso: 8 },
  { id: 3, enunciado: 'Balanceie a equação química...', disciplina: 'Química', dificuldade: 'fácil', bncc: 'EM13QUI101', uso: 15 },
];

const alunos = [
  { id: 1, nome: 'Ana Silva', turma: '3º Ano A', media: 8.5, frequencia: 95, status: 'bom' },
  { id: 2, nome: 'Bruno Costa', turma: '3º Ano A', media: 6.2, frequencia: 80, status: 'alerta' },
  { id: 3, nome: 'Carla Mendes', turma: '3º Ano A', media: 9.1, frequencia: 98, status: 'excelente' },
  { id: 4, nome: 'Daniel Souza', turma: '3º Ano A', media: 5.8, frequencia: 75, status: 'risco' },
];

export function TeacherDashboard() {
  const [abaAtiva, setAbaAtiva] = useState('visao-geral');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard do Professor</h1>
          <p className="text-muted-foreground">
            Gerencie suas turmas, crie provas e acompanhe o desempenho dos alunos.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exportar Relatório
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Nova Turma
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Turmas Ativas', value: '4', icon: Users, trend: '+1 este semestre' },
          { name: 'Total de Alunos', value: '125', icon: GraduationCap, trend: '98% frequência' },
          { name: 'Provas Criadas', value: '12', icon: FileText, trend: '3 este mês' },
          { name: 'Questões no Banco', value: '156', icon: BookOpen, trend: '+23 novas' },
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
          <TabsTrigger value="turmas">Turmas</TabsTrigger>
          <TabsTrigger value="provas">Provas</TabsTrigger>
          <TabsTrigger value="questoes">Questões</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Turmas Recentes */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Turmas Recentes</CardTitle>
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {turmas.slice(0, 3).map((turma) => (
                    <div key={turma.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{turma.nome}</p>
                        <p className="text-sm text-muted-foreground">{turma.disciplina} • {turma.alunos} alunos</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">Média: {turma.media}</p>
                        <Badge variant={turma.status === 'ativa' ? 'default' : 'secondary'}>
                          {turma.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Próximas Provas */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Próximas Provas</CardTitle>
                  <Button variant="ghost" size="sm">Ver todas</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {provas.map((prova) => (
                    <div key={prova.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div>
                        <p className="font-medium">{prova.titulo}</p>
                        <p className="text-sm text-muted-foreground">{prova.turma} • {prova.data}</p>
                      </div>
                      <Badge 
                        variant={
                          prova.status === 'aplicada' ? 'default' :
                          prova.status === 'agendada' ? 'outline' :
                          'secondary'
                        }
                      >
                        {prova.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alertas */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-500" />
                <CardTitle>Alunos em Atenção</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alunos.filter(a => a.status === 'alerta' || a.status === 'risco').map((aluno) => (
                  <div key={aluno.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        aluno.status === 'risco' ? 'bg-red-500' : 'bg-orange-500'
                      }`} />
                      <div>
                        <p className="font-medium">{aluno.nome}</p>
                        <p className="text-sm text-muted-foreground">{aluno.turma}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">Média: {aluno.media}</p>
                      <p className="text-sm text-muted-foreground">Frequência: {aluno.frequencia}%</p>
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
                <CardTitle>Minhas Turmas</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar turma..." className="w-64" />
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Turma
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {turmas.map((turma) => (
                  <Card key={turma.id} className="cursor-pointer hover:border-primary transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{turma.nome}</CardTitle>
                        <Badge variant={turma.status === 'ativa' ? 'default' : 'secondary'}>
                          {turma.status}
                        </Badge>
                      </div>
                      <CardDescription>{turma.disciplina}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Alunos</span>
                        <span className="font-medium">{turma.alunos}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Média da Turma</span>
                          <span className="font-medium">{turma.media}</span>
                        </div>
                        <Progress value={turma.media * 10} />
                      </div>
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">Ver Alunos</Button>
                        <Button variant="outline" size="sm" className="flex-1">Lançar Nota</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Provas */}
        <TabsContent value="provas">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Gerenciamento de Provas</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Prova
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button variant="outline">Gerar com IA</Button>
                <Button variant="outline">Banco de Questões</Button>
                <Button variant="outline">Correção em Massa</Button>
              </div>

              <div className="border rounded-lg">
                <div className="grid grid-cols-5 gap-4 p-4 bg-muted font-medium text-sm">
                  <div>Título</div>
                  <div>Turma</div>
                  <div>Data</div>
                  <div>Status</div>
                  <div>Ações</div>
                </div>
                
                {provas.map((prova) => (
                  <div key={prova.id} className="grid grid-cols-5 gap-4 p-4 border-t items-center">
                    <div>
                      <p className="font-medium">{prova.titulo}</p>
                      {prova.media && <span className="text-sm text-muted-foreground">Média: {prova.media}</span>}
                    </div>
                    <div>{prova.turma}</div>
                    <div>{prova.data}</div>
                    <div>
                      <Badge variant={
                        prova.status === 'aplicada' ? 'default' :
                        prova.status === 'agendada' ? 'outline' :
                        'secondary'
                      }>
                        {prova.status}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">Editar</Button>
                      <Button variant="ghost" size="sm">Visualizar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Questões */}
        <TabsContent value="questoes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Banco de Questões</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar questão..." className="w-64" />
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Nova Questão
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Badge variant="outline">Todas</Badge>
                <Badge variant="outline">Matemática</Badge>
                <Badge variant="outline">Física</Badge>
                <Badge variant="outline">Química</Badge>
                <Badge variant="outline">Fácil</Badge>
                <Badge variant="outline">Média</Badge>
                <Badge variant="outline">Difícil</Badge>
              </div>

              <div className="space-y-3">
                {questoes.map((questao) => (
                  <Card key={questao.id} className="cursor-pointer hover:border-primary transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium mb-2">{questao.enunciado}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline">{questao.disciplina}</Badge>
                            <Badge 
                              variant={
                                questao.dificuldade === 'fácil' ? 'secondary' :
                                questao.dificuldade === 'média' ? 'default' :
                                'destructive'
                              }
                            >
                              {questao.dificuldade}
                            </Badge>
                            <Badge variant="outline">BNCC: {questao.bncc}</Badge>
                            <span className="text-sm text-muted-foreground">Usada {questao.uso}x</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Relatórios */}
        <TabsContent value="relatorios">
          <Card>
            <CardHeader>
              <CardTitle>Relatórios e Análises</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Desempenho por Turma</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">Gerar Relatório</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Progresso dos Alunos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">Gerar Relatório</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Análise de Questões</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-muted rounded-lg flex items-center justify-center">
                      <Award className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full mt-4">Gerar Relatório</Button>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Relatório Personalizado</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium">Turma</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Todas as turmas</option>
                        <option>3º Ano A</option>
                        <option>2º Ano B</option>
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
                      <label className="text-sm font-medium">Tipo</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Desempenho geral</option>
                        <option>Frequência</option>
                        <option>Notas</option>
                      </select>
                    </div>
                  </div>
                  
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Gerar Relatório em PDF
                  </Button>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
