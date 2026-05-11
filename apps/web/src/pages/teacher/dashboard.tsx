import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, BookOpen, FileText, BarChart3 } from 'lucide-react'

export function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard do Professor</h1>
        <p className="text-muted-foreground">
          Gerencie suas turmas, crie provas e acompanhe o desempenho dos alunos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { name: 'Minhas Turmas', value: '4', icon: Users },
          { name: 'Total de Alunos', value: '127', icon: Users },
          { name: 'Provas Criadas', value: '12', icon: FileText },
          { name: 'Questões no Banco', value: '156', icon: BookOpen },
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Criar Nova Prova
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Adicionar Questão
            </Button>
            <Button className="w-full justify-start" variant="outline">
              <BarChart3 className="mr-2 h-4 w-4" />
              Ver Relatórios
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Turmas Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: '3º Ano A', subject: 'Matemática', students: 32 },
                { name: '2º Ano B', subject: 'Física', students: 28 },
                { name: '1º Ano C', subject: 'Química', students: 35 },
              ].map((turma) => (
                <div key={turma.name} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{turma.name}</p>
                    <p className="text-sm text-muted-foreground">{turma.subject}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{turma.students} alunos</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}