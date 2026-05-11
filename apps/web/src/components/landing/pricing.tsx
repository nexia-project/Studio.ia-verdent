import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

const plans = [
  {
    name: 'Gratuito',
    description: 'Para começar a estudar',
    price: 'R$ 0',
    period: '/mês',
    features: [
      'Tutor IA: 50 mensagens/mês',
      'Caderno Digital: 5 uploads',
      'Flashcards ilimitados',
      '1 simulado/mês',
      'Correção de 1 redação',
    ],
    cta: 'Começar Grátis',
    popular: false,
  },
  {
    name: 'Premium',
    description: 'Para alunos dedicados',
    price: 'R$ 29',
    period: '/mês',
    features: [
      'Tutor IA ilimitado',
      'Caderno Digital ilimitado',
      'Flashcards com SM-2',
      'Simulados ilimitados',
      'Correção de redações ilimitada',
      'Geração de mapas mentais',
      'Sala de estudos colaborativa',
    ],
    cta: 'Assinar Premium',
    popular: true,
  },
  {
    name: 'Instituição',
    description: 'Para escolas e universidades',
    price: 'Sob consulta',
    period: '',
    features: [
      'Todas as funcionalidades Premium',
      'Dashboard institucional',
      'Gestão de professores',
      'Métricas de desempenho',
      'Relatórios personalizados',
      'Suporte prioritário',
      'API de integração',
    ],
    cta: 'Falar com Vendas',
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Planos simples e
            <span className="text-primary"> acessíveis</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Escolha o plano que melhor se adapta às suas necessidades. 
            Cancele a qualquer momento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full" 
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}