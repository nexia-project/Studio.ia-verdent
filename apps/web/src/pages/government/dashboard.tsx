import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Landmark, Users, School, TrendingUp, FileText, Download, 
  MapPin, BarChart3, AlertCircle, CheckCircle, Filter,
  GraduationCap, BookOpen, Award, Calendar, Search
} from 'lucide-react';

// Mock data
const redes = [
  { id: 1, nome: 'Rede Municipal de São Paulo', escolas: 450, alunos: 450000, professores: 18000, ideb: 5.8 },
  { id: 2, nome: 'Rede Estadual de São Paulo', escolas: 1200, alunos: 1200000, professores: 52000, ideb: 4.9 },
  { id: 3, nome: 'Rede Municipal do Rio de Janeiro', escolas: 320, alunos: 280000, professores: 11000, ideb: 5.2 },
  { id: 4, nome: 'Rede Estadual do Rio de Janeiro', escolas: 890, alunos: 850000, professores: 38000, ideb: 4.5 },
];

const escolas = [
  { id: 1, nome: 'EMEF Prof. João Silva', rede: 'Municipal', alunos: 850, ideb: 6.2, status: 'excelente' },
  { id: 2, nome: 'EE Dr. Carlos Mendes', rede: 'Estadual', alunos: 1200, ideb: 4.8, status: 'regular' },
  { id: 3, nome: 'EMEF Maria Santos', rede: 'Municipal', alunos: 620, ideb: 5.9, status: 'bom' },
  { id: 4, nome: 'EE Prof. Ana Costa', rede: 'Estadual', alunos: 980, ideb: 4.2, status: 'atencao' },
];

const metricasNacionais = {
  totalEscolas: 2860,
  totalAlunos: 2780000,
  totalProfessores: 119000,
  mediaIdeb: 5.1,
  taxaEvasao: 13.2,
  taxaAprovacao: 78.5,
};

const indicadoresPorRegiao = [
  { regiao: 'Norte', ideb: 4.8, evasao: 16.5, aprovacao: 72.3 },
  { regiao: 'Nordeste', ideb: 4.5, evasao: 18.2, aprovacao: 68.9 },
  { regiao: 'Sudeste', ideb: 5.4, evasao: 11.8, aprovacao: 82.1 },
  { regiao: 'Sul', ideb: 5.6, evasao: 10.5, aprovacao: 84.7 },
  { regiao: 'Centro-Oeste', ideb: 5.2, evasao: 12.3, aprovacao: 79.8 },
];

const alertas = [
  { tipo: 'critico', mensagem: '12 escolas com IDEB abaixo de 3.0', tempo: 'Hoje' },
  { tipo: 'alerta', mensagem: '45 escolas com evasão acima de 20%', tempo: 'Ontem' },
  { tipo: 'info', mensagem: 'Nova meta IDEB 2025 publicada', tempo: '2 dias atrás' },
];

export function GovernmentDashboard() {
  const [abaAtiva, setAbaAtiva] = useState('visao-geral');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard do Governo</h1>
          <p className="text-muted-foreground">
            Visão macro das redes de ensino público.
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Exportar Dados
        </Button>
      </div>

      {/* Stats Nacionais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Escolas na Rede', value: metricasNacionais.totalEscolas.toLocaleString(), icon: School, trend: '+12 este ano' },
          { name: 'Total de Alunos', value: (metricasNacionais.totalAlunos / 1000000).toFixed(1) + 'M', icon: Users, trend: '+2.3% vs ano anterior' },
          { name: 'Professores', value: (metricasNacionais.totalProfessores / 1000).toFixed(0) + 'k', icon: GraduationCap, trend: '+850 contratados' },
          { name: 'IDEB Médio', value: metricasNacionais.mediaIdeb.toFixed(1), icon: TrendingUp, trend: '+0.3 vs 2023' },
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
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="visao-geral">Visão Geral</TabsTrigger>
          <TabsTrigger value="redes">Redes</TabsTrigger>
          <TabsTrigger value="escolas">Escolas</TabsTrigger>
          <TabsTrigger value="relatorios">Relatórios</TabsTrigger>
        </TabsList>

        {/* Visão Geral */}
        <TabsContent value="visao-geral" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Indicadores por Região */}
            <Card>
              <CardHeader>
                <CardTitle>Indicadores por Região</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {indicadoresPorRegiao.map((regiao) => (
                    <div key={regiao.regiao} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{regiao.regiao}</span>
                        <Badge variant={regiao.ideb >= 5 ? 'default' : 'outline'}>
                          IDEB: {regiao.ideb}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Evasão</span>
                          <span className="text-red-500">{regiao.evasao}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Aprovação</span>
                          <span className="text-green-600">{regiao.aprovacao}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <CardTitle>Alertas da Rede</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {alertas.map((alerta, i) => (
                  <div 
                    key={i} 
                    className={`p-3 rounded-lg border ${
                      alerta.tipo === 'critico' ? 'bg-red-50 border-red-200' :
                      alerta.tipo === 'alerta' ? 'bg-orange-50 border-orange-200' :
                      'bg-blue-50 border-blue-200'
                    }`}
                  >
                    <p className={`text-sm font-medium ${
                      alerta.tipo === 'critico' ? 'text-red-800' :
                      alerta.tipo === 'alerta' ? 'text-orange-800' :
                      'text-blue-800'
                    }`}>{alerta.mensagem}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alerta.tempo}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Metas IDEB */}
          <Card>
            <CardHeader>
              <CardTitle>Metas IDEB 2024</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Anos Iniciais</span>
                    <span className="font-bold">5.8 / 6.0</span>
                  </div>
                  <Progress value={96.7} />
                  <p className="text-sm text-muted-foreground">96.7% da meta alcançada</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Anos Finais</span>
                    <span className="font-bold">4.9 / 5.5</span>
                  </div>
                  <Progress value={89.1} />
                  <p className="text-sm text-muted-foreground">89.1% da meta alcançada</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>Ensino Médio</span>
                    <span className="font-bold">3.8 / 4.5</span>
                  </div>
                  <Progress value={84.4} className="bg-red-100" />
                  <p className="text-sm text-muted-foreground">84.4% da meta alcançada</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Indicadores Chave */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Indicadores Chave
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Taxa de Aprovação', value: '78.5%', trend: '+2.1%' },
                  { label: 'Média ENEM', value: '642', trend: '+18 pts' },
                  { label: 'Taxa de Evasão', value: '13.2%', trend: '-0.8%' },
                  { label: 'Prof/Aluno', value: '1:23', trend: 'Meta: 1:20' },
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
        </TabsContent>

        {/* Redes */}
        <TabsContent value="redes">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Redes de Ensino</CardTitle>
                <Input placeholder="Buscar rede..." className="w-64" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg">
                <div className="grid grid-cols-6 gap-4 p-4 bg-muted font-medium text-sm">
                  <div className="col-span-2">Rede</div>
                  <div>Escolas</div>
                  <div>Alunos</div>
                  <div>Professores</div>
                  <div>IDEB</div>
                </div>
                
                {redes.map((rede) => (
                  <div key={rede.id} className="grid grid-cols-6 gap-4 p-4 border-t items-center">
                    <div className="col-span-2 font-medium">{rede.nome}</div>
                    <div>{rede.escolas}</div>
                    <div>{(rede.alunos / 1000).toFixed(0)}k</div>
                    <div>{(rede.professores / 1000).toFixed(0)}k</div>
                    <div>
                      <Badge variant={rede.ideb >= 5 ? 'default' : rede.ideb >= 4 ? 'outline' : 'destructive'}>
                        {rede.ideb}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Escolas */}
        <TabsContent value="escolas">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Escolas da Rede</CardTitle>
                <div className="flex gap-2">
                  <Input placeholder="Buscar escola..." className="w-64" />
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
                  <div className="col-span-2">Escola</div>
                  <div>Rede</div>
                  <div>Alunos</div>
                  <div>IDEB</div>
                  <div>Status</div>
                </div>
                
                {escolas.map((escola) => (
                  <div key={escola.id} className="grid grid-cols-6 gap-4 p-4 border-t items-center">
                    <div className="col-span-2 font-medium">{escola.nome}</div>
                    <div>{escola.rede}</div>
                    <div>{escola.alunos}</div>
                    <div>{escola.ideb}</div>
                    <div>
                      <Badge 
                        variant={
                          escola.status === 'excelente' ? 'default' :
                          escola.status === 'bom' ? 'secondary' :
                          escola.status === 'regular' ? 'outline' :
                          'destructive'
                        }
                      >
                        {escola.status}
                      </Badge>
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
              <CardTitle>Relatórios Consolidados</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">IDEB por Rede</CardTitle>
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
                    <CardTitle className="text-base">Taxa de Evasão</CardTitle>
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
                    <CardTitle className="text-base">Indicadores Socioeconômicos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
                      <Landmark className="h-8 w-8 text-muted-foreground" />
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
                        <option>Desempenho IDEB</option>
                        <option>Taxa de Evasão</option>
                        <option>Indicadores de Gestão</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Rede</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>Todas</option>
                        <option>Municipal</option>
                        <option>Estadual</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Ano</label>
                      <select className="w-full mt-1 p-2 border rounded">
                        <option>2024</option>
                        <option>2023</option>
                        <option>2022</option>
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
