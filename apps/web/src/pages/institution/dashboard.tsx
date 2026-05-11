import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, GraduationCap, TrendingUp } from 'lucide-react'

export function InstitutionDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Institucional</h1>
        <p className="text-muted-foreground">
          Visão geral da sua instituição de ensino.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Total de Professores', value: '24', icon: GraduationCap },
          { name: 'Total de Alunos', value: '1,247', icon: Users },
          { name: 'Turmas Ativas', value: '42', icon: Building2 },
          { name: 'Taxa de Engajamento', value: '87%', icon: TrendingUp },
        ].map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Métricas por Departamento</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Gráficos e análises em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  )
}