import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Landmark, Users, School, FileText } from 'lucide-react'

export function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard do Governo</h1>
        <p className="text-muted-foreground">
          Visão macro das redes de ensino público.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Escolas na Rede', value: '156', icon: School },
          { name: 'Total de Alunos', value: '45.2k', icon: Users },
          { name: 'Professores', value: '3.8k', icon: Landmark },
          { name: 'Relatórios Gerados', value: '127', icon: FileText },
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
          <CardTitle>Métricas da Rede</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Dados consolidados em desenvolvimento...</p>
        </CardContent>
      </Card>
    </div>
  )
}