import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Upload, FileText, Brain, Sparkles, Download, 
  MessageSquare, BookOpen, Lightbulb, ListChecks,
  FileQuestion, Presentation, MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProcessedContent {
  resumo: string;
  pontosChave: string[];
  flashcards: { front: string; back: string }[];
  perguntas: { pergunta: string; resposta: string }[];
  mapaMental: string;
  planoAula: string;
}

const modosChat = [
  { id: 'padrao', nome: 'Padrão', icone: MessageSquare },
  { id: 'estudo', nome: 'Estudo', icone: BookOpen },
  { id: 'pesquisa', nome: 'Pesquisa', icone: Lightbulb },
  { id: 'revisao', nome: 'Revisão', icone: ListChecks },
  { id: 'duvidas', nome: 'Dúvidas', icone: FileQuestion },
];

export function CadernoPage() {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [processando, setProcessando] = useState(false);
  const [conteudoProcessado, setConteudoProcessado] = useState<ProcessedContent | null>(null);
  const [modoChat, setModoChat] = useState('padrao');
  const [mensagem, setMensagem] = useState('');
  const [chat, setChat] = useState<{role: 'user' | 'assistant', content: string}[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setArquivos(Array.from(files));
    setProcessando(true);

    // Simular processamento IA
    setTimeout(() => {
      setConteudoProcessado({
        resumo: 'Este é um resumo inteligente do conteúdo enviado. A IA analisou o material e extraiu os pontos mais importantes para você estudar de forma eficiente.',
        pontosChave: [
          'Primeiro conceito fundamental do material',
          'Segundo ponto importante com exemplos práticos',
          'Terceiro elemento essencial para memorização',
          'Quarto tópico relevante para provas',
          'Quinto ponto de atenção especial',
        ],
        flashcards: [
          { front: 'O que é o conceito principal?', back: 'É a ideia central que organiza todo o pensamento do autor.' },
          { front: 'Quando isso foi desenvolvido?', back: 'No século XX, durante o movimento modernista.' },
          { front: 'Qual a aplicação prática?', back: 'Pode ser usado em diversas áreas do conhecimento.' },
        ],
        perguntas: [
          { pergunta: 'Qual a relação entre os conceitos A e B?', resposta: 'Eles são complementares e se desenvolvem juntos.' },
          { pergunta: 'Por que isso é importante?', resposta: 'Porque forma a base do entendimento moderno.' },
        ],
        mapaMental: 'Estrutura visual do conteúdo com ramificações principais',
        planoAula: 'Roteiro de 50 minutos para ensinar este conteúdo',
      });
      setProcessando(false);
    }, 2000);
  };

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;
    
    setChat(prev => [...prev, { role: 'user', content: mensagem }]);
    setMensagem('');
    
    // Simular resposta IA
    setTimeout(() => {
      setChat(prev => [...prev, { 
        role: 'assistant', 
        content: `No modo ${modosChat.find(m => m.id === modoChat)?.nome}, posso ajudar com: ${mensagem}\n\nAqui está uma análise baseada no seu material...` 
      }]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Caderno Digital 📚</h1>
        <p className="text-muted-foreground">
          Upload de PDFs, fotos e áudios. A IA resume, cria flashcards e extrai o essencial.
        </p>
      </div>

      {/* Upload Area */}
      {!conteudoProcessado && (
        <Card 
          className="border-dashed border-2 hover:border-primary cursor-pointer transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              {processando ? 'Processando...' : 'Clique para fazer upload'}
            </h3>
            <p className="text-sm text-muted-foreground">
              PDF, imagens (JPG, PNG) ou áudio (MP3, WAV)
            </p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.mp3,.wav"
              className="hidden"
              onChange={handleUpload}
            />
          </CardContent>
        </Card>
      )}

      {/* Conteúdo Processado */}
      {conteudoProcessado && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar com cards de resultado */}
          <div className="space-y-4">
            <Card className="bg-primary/5 border-primary">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Resumo Inteligente</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{conteudoProcessado.resumo}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Flashcards Gerados</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {conteudoProcessado.flashcards.length} cards criados
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Estudar Flashcards
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">Pontos-Chave</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conteudoProcessado.pontosChave.slice(0, 3).map((ponto, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <span className="text-primary font-bold">{i + 1}.</span>
                      {ponto}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Área principal com tabs */}
          <div className="lg:col-span-2 space-y-4">
            <Tabs defaultValue="chat" className="w-full">
              <TabsList className="grid grid-cols-5">
                <TabsTrigger value="chat">Chat</TabsTrigger>
                <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
                <TabsTrigger value="perguntas">Perguntas</TabsTrigger>
                <TabsTrigger value="mapa">Mapa Mental</TabsTrigger>
                <TabsTrigger value="plano">Plano</TabsTrigger>
              </TabsList>

              <TabsContent value="chat" className="space-y-4">
                <Card className="min-h-[400px] flex flex-col">
                  <CardHeader className="border-b">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">Conversar sobre o material</CardTitle>
                      <div className="flex gap-1">
                        {modosChat.map((modo) => (
                          <Button
                            key={modo.id}
                            variant={modoChat === modo.id ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setModoChat(modo.id)}
                            className="text-xs"
                          >
                            <modo.icone className="h-3 w-3 mr-1" />
                            {modo.nome}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 space-y-4 py-4 max-h-[300px] overflow-y-auto">
                      {chat.length === 0 && (
                        <div className="text-center text-muted-foreground py-8">
                          <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p>Comece a conversar sobre o material no modo {modosChat.find(m => m.id === modoChat)?.nome}</p>
                        </div>
                      )}
                      {chat.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            msg.role === 'user' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-muted'
                          }`}>
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-4 border-t">
                      <Input
                        placeholder="Digite sua pergunta sobre o material..."
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
                      />
                      <Button onClick={enviarMensagem}>
                        Enviar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="flashcards">
                <Card>
                  <CardHeader>
                    <CardTitle>Flashcards Gerados ({conteudoProcessado.flashcards.length})</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {conteudoProcessado.flashcards.map((card, i) => (
                      <div key={i} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                        <p className="font-medium mb-2">Frente: {card.front}</p>
                        <p className="text-sm text-muted-foreground">Verso: {card.back}</p>
                      </div>
                    ))}
                    <Button className="w-full">
                      <Brain className="h-4 w-4 mr-2" />
                      Adicionar ao Deck de Estudo
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="perguntas">
                <Card>
                  <CardHeader>
                    <CardTitle>Perguntas de Estudo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {conteudoProcessado.perguntas.map((q, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <p className="font-medium mb-2">{q.pergunta}</p>
                        <p className="text-sm text-muted-foreground">{q.resposta}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="mapa">
                <Card>
                  <CardHeader>
                    <CardTitle>Mapa Mental</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-muted rounded-lg p-8 text-center">
                      <Brain className="h-16 w-16 mx-auto mb-4 text-primary" />
                      <p>Mapa mental interativo será exibido aqui</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Visualização em árvore horizontal estilo NotebookLM
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="plano">
                <Card>
                  <CardHeader>
                    <CardTitle>Plano de Aula</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Presentation className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">Roteiro de 50 minutos</p>
                          <p className="text-sm text-muted-foreground">
                            {conteudoProcessado.planoAula}
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Baixar Plano (PDF)
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
