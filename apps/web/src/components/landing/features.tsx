import { 
  MessageCircle, 
  BookOpen, 
  Brain, 
  FileText,
  Users,
  BarChart3
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const features = [
  {
    name: 'Tutor IA Personalizado',
    description: 'Tiagão, seu professor virtual, disponível 24/7 para tirar dúvidas e guiar seus estudos.',
    icon: MessageCircle,
  },
  {
    name: 'Caderno Digital',
    description: 'Upload de PDFs, fotos e áudios. A IA resume e extrai os pontos mais importantes.',
    icon: BookOpen,
  },
  {
    name: 'Flashcards Inteligentes',
    description: 'Sistema de repetição espaçada (SM-2) para memorização eficiente.',
    icon: Brain,
  },
  {
    name: 'Correção de Redações',
    description: 'Correção completa seguindo as 5 competências do ENEM com feedback detalhado.',
    icon: FileText,
  },
  {
    name: 'Para Professores',
    description: 'Gerador de provas, planos de aula e banco de questões com BNCC.',
    icon: Users,
  },
  {
    name: 'Dashboard Institucional',
    description: 'Métricas de desempenho, gestão de turmas e relatórios completos.',
    icon: BarChart3,
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Tudo que você precisa para
            <span className="text-primary"> ir bem nos estudos</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Ferramentas poderosas potencializadas por inteligência artificial 
            para alunos, professores e instituições.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <Card key={feature.name} className="border-0 shadow-sm">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{feature.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}