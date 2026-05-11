import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Mic, Bot, User, Zap, Lightbulb, Target, Wrench } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Foco5Min } from '@/components/tutor/foco-5min'
import { DesafioOrganizacao } from '@/components/tutor/desafio-organizacao'
import { AulaAtivaTracker } from '@/components/tutor/aula-ativa-tracker'
import { BotaoDesafioFazedor, CardDesafioFazedorNoChat } from '@/components/tutor/integracao-fazedores'
import { useDesafioUnico } from '@/hooks/useFazedores'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  tipo?: 'normal' | 'missao' | 'desafio' | 'foco'
  metadata?: any
}

const missoesExemplo = [
  { id: '1', titulo: 'Tentativa Inicial', descricao: 'O que você já sabe?', duracao: '2 min', tipo: 'tentativa' as const },
  { id: '2', titulo: 'Explicação Guiada', descricao: 'Tiagão explica e corrige', duracao: '3 min', tipo: 'explicacao' as const },
  { id: '3', titulo: 'Desafio +1', descricao: 'Vá além do básico', duracao: '3 min', tipo: 'desafio' as const },
  { id: '4', titulo: 'Pergunta Curiosa', descricao: 'Conecte com sua vida', duracao: '2 min', tipo: 'curiosidade' as const },
]

export function TutorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Olá! Eu sou o Tiagão, seu professor. Vamos aprender em missões rápidas? 🎯\n\nSobre qual tema você quer estudar hoje?',
      tipo: 'missao',
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [modoFoco, setModoFoco] = useState(false)
  const [desafioAtivo, setDesafioAtivo] = useState<any>(null)
  const [missaoAtual, setMissaoAtual] = useState(0)
  const [aulaAtiva, setAulaAtiva] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const enviarMensagem = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Simular chamada API - em produção chamar /api/tutor/aula-ativa
      setTimeout(() => {
        const respostas = [
          'Ótima tentativa! 💪 Você está no caminho certo. Agora vou te mostrar uma forma ainda melhor de pensar sobre isso...',
          'Interessante! Você fez o que poucos fazem: parou para pensar. 🧠\n\nAgora, que tal o desafio +1? Crie um exemplo próprio sobre esse tema.',
          'Perceba como sua explicação já está boa, mas podemos organizar melhor. É como um porta-malas: cabe tudo, só precisa de arrumação! 🧳',
        ]
        
        const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)]
        
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: respostaAleatoria,
          tipo: 'missao',
        }
        
        setMessages((prev) => [...prev, assistantMessage])
        setMissaoAtual((prev) => Math.min(prev + 1, missoesExemplo.length - 1))
        setIsLoading(false)
      }, 1500)
    } catch (error) {
      console.error('Erro:', error)
      setIsLoading(false)
    }
  }

  const ativarFoco5Min = async () => {
    setModoFoco(true)
    
    // Simular chamada API - em produção chamar /api/tutor/foco-5min
    const roteiroMock = {
      mensagem_abertura: 'Vamos tirar você dessa parada em 5 minutos! 🚀',
      passos: [
        { titulo: 'Lembrar', instrucao: 'Anote 3 coisas que você JÁ SABE sobre este tema', duracao: '1 min' },
        { titulo: 'Produzir', instrucao: 'Crie uma frase explicando o conceito com suas palavras', duracao: '3 min' },
        { titulo: 'Questionar', instrucao: 'Escreva 1 dúvida ou curiosidade sobre o tema', duracao: '1 min' },
      ],
      frase_orgulho: 'Você acabou de provar que consegue produzir mesmo quando está travado!',
      call_to_action_extra: 'Que tal mandar essa dúvida para eu te ajudar a ir mais fundo?',
    }

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Modo Foco 5 Min ativado! 🔥\n\n' + roteiroMock.mensagem_abertura,
        tipo: 'foco',
        metadata: roteiroMock,
      },
    ])
  }

  const gerarDesafioOrganizacao = async () => {
    // Simular chamada API - em produção chamar /api/tutor/desafio-organizacao
    const desafioMock = {
      titulo: 'O Caderno que Não Cabe Mais 📚',
      situacao: 'Você tem 50 páginas de conteúdo para estudar em 2 horas. Parece impossível, né? Mas o problema não é a quantidade...',
      pergunta_inicial: 'Se você tivesse que organizar esse conteúdo em apenas 3 caixinhas mentais, quais seriam?',
      perguntas_de_guias: [
        'Quais são os 3 conceitos MAIS importantes?',
        'O que você pode ignorar sem prejudicar o entendimento?',
        'Como você explicaria isso em 2 minutos para um amigo?',
      ],
      exemplo_de_resposta_criativa: 'Caixinha 1: Conceitos base (20%) | Caixinha 2: Aplicações práticas (50%) | Caixinha 3: Exceções e detalhes (30%)',
      reflexao_final: 'Organizar é diferente de simplificar. É dar prioridade ao que realmente importa!',
    }

    setDesafioAtivo(desafioMock)
    
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: `Novo desafio de organização: ${desafioMock.titulo}\n\n${desafioMock.situacao}`,
        tipo: 'desafio',
      },
    ])
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      enviarMensagem()
    }
  }

  const iniciarAulaAtiva = () => {
    setAulaAtiva(true)
    setMissaoAtual(0)
    setMessages([
      {
        id: '1',
        role: 'assistant',
        content: '🎯 Modo Aula Ativa iniciado!\n\nVamos aprender em missões rápidas de 3-7 minutos.\n\nSobre qual tema você quer estudar hoje?',
        tipo: 'missao',
      },
    ])
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Tutor IA - Tiagão</h1>
          <p className="text-muted-foreground">
            Aprenda de forma ativa com missões guiadas
          </p>
        </div>
        <div className="flex gap-2">
          {!aulaAtiva ? (
            <Button onClick={iniciarAulaAtiva} variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Modo Aula Ativa
            </Button>
          ) : (
            <Badge variant="default" className="bg-primary">
              🎯 Aula Ativa
            </Badge>
          )}
          <Button onClick={ativarFoco5Min} variant="outline" disabled={modoFoco}>
            <Zap className="h-4 w-4 mr-2" />
            Foco 5 Min
          </Button>
          <Button onClick={gerarDesafioOrganizacao} variant="outline">
            <Lightbulb className="h-4 w-4 mr-2" />
            Desafio
          </Button>
          <BotaoDesafioFazedor 
            topicoAtual={messages[messages.length - 1]?.content}
            onDesafioRecebido={(desafio) => {
              setMessages((prev) => [
                ...prev,
                {
                  id: Date.now().toString(),
                  role: 'assistant',
                  content: desafio.conteudo,
                  tipo: 'fazedor',
                  metadata: desafio,
                },
              ]);
            }}
          />
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        {/* Sidebar com tracker de missões */}
        {aulaAtiva && (
          <div className="w-64 hidden lg:block">
            <AulaAtivaTracker missoes={missoesExemplo} missaoAtual={missaoAtual} />
          </div>
        )}

        {/* Chat principal */}
        <Card className="flex-1 flex flex-col">
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <div
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      message.role === 'assistant' ? 'bg-primary' : 'bg-muted'
                    }`}>
                      {message.role === 'assistant' ? (
                        <Bot className="h-4 w-4 text-white" />
                      ) : (
                        <User className="h-4 w-4" />
                      )}
                    </div>
                    
                    <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === 'assistant' 
                        ? 'bg-muted' 
                        : 'bg-primary text-primary-foreground'
                    }`}>
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                  </div>

                  {/* Renderizar componentes especiais */}
                  {message.tipo === 'foco' && message.metadata && (
                    <div className="mt-4">
                      <Foco5Min
                        roteiro={message.metadata}
                        onComplete={() => {
                          setModoFoco(false)
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now().toString(),
                              role: 'assistant',
                              content: 'Incrível! Você completou o Foco 5 Min! 🎉\n\nO que achou? Quer continuar estudando ou tem alguma dúvida do que produziu?',
                            },
                          ])
                        }}
                        onCancel={() => setModoFoco(false)}
                      />
                    </div>
                  )}

                  {message.tipo === 'desafio' && desafioAtivo && (
                    <div className="mt-4">
                      <DesafioOrganizacao
                        desafio={desafioAtivo}
                        onComplete={(resposta) => {
                          setDesafioAtivo(null)
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now().toString(),
                              role: 'user',
                              content: `[Resposta ao desafio: ${resposta}]`,
                            },
                            {
                              id: (Date.now() + 1).toString(),
                              role: 'assistant',
                              content: 'Excelente organização! 🧠✨\n\nVocê acabou de demonstrar uma habilidade que poucos têm: conseguir enxergar o essencial no meio do caos. Isso é exatamente o que diferencia quem domina de quem só decora.',
                            },
                          ])
                        }}
                        onSkip={() => {
                          setDesafioAtivo(null)
                          setMessages((prev) => [
                            ...prev,
                            {
                              id: Date.now().toString(),
                              role: 'assistant',
                              content: 'Tudo bem! Podemos voltar a esse desafio depois. O importante é não parar! 💪',
                            },
                          ])
                        }}
                      />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <span className="animate-bounce">.</span>
                      <span className="animate-bounce delay-100">.</span>
                      <span className="animate-bounce delay-200">.</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Digite sua mensagem..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  disabled={modoFoco || !!desafioAtivo}
                />
                <Button 
                  onClick={enviarMensagem} 
                  disabled={isLoading || !input.trim() || modoFoco || !!desafioAtivo}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
