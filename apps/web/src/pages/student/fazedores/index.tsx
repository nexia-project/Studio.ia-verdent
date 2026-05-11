import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Lightbulb, Hammer, BookOpen, Users, Trophy, ArrowRight } from 'lucide-react';
import { DesafioFazedor } from '@/components/fazedores/desafio-fazedor';

const categorias = [
  { id: 'consertar', nome: 'Consertar', icone: Wrench, cor: 'bg-red-500' },
  { id: 'organizar', nome: 'Organizar', icone: Lightbulb, cor: 'bg-blue-500' },
  { id: 'criar', nome: 'Criar', icone: Hammer, cor: 'bg-green-500' },
  { id: 'estudar', nome: 'Estudar', icone: BookOpen, cor: 'bg-purple-500' },
];

const desafiosMock = [
  {
    id: '1',
    titulo: 'A Gaveta que Emperra',
    descricao: 'Você tem uma gaveta que não abre direito. Parece que vai quebrar se forçar. O que fazer?',
    categoria: 'consertar',
    dificuldade: 'fácil',
    tempo: '10 min',
  },
  {
    id: '2',
    titulo: 'Porta-Malas Cheio',
    descricao: 'Precisa levar 4 malas no porta-malas, mas parece impossível. Como organizar?',
    categoria: 'organizar',
    dificuldade: 'médio',
    tempo: '15 min',
  },
  {
    id: '3',
    titulo: 'Suporte de Celular',
    descricao: 'Crie um suporte para assistir vídeos usando apenas papelão e cola.',
    categoria: 'criar',
    dificuldade: 'médio',
    tempo: '20 min',
  },
  {
    id: '4',
    titulo: 'Organizar a Matéria',
    descricao: 'Você tem 50 páginas de conteúdo para estudar. Como organizar em "caixinhas mentais"?',
    categoria: 'estudar',
    dificuldade: 'difícil',
    tempo: '30 min',
  },
];

export function FazedoresPage() {
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null);
  const [desafioAtivo, setDesafioAtivo] = useState<any>(null);
  const [carregando, setCarregando] = useState(false);

  const gerarDesafio = async (categoria: string) => {
    setCarregando(true);

    // Simular chamada API - em produção chamar /api/fazedores/desafio
    setTimeout(() => {
      const desafioMock = {
        titulo: categoria === 'consertar' ? 'A Cadeira Bamba' : 
                 categoria === 'organizar' ? 'A Mesa de Estudos' :
                 categoria === 'criar' ? 'Organizador de Cabos' :
                 'Resumir um Capítulo',
        descricao: 'Situação prática do dia a dia para resolver com criatividade e ferramentas simples.',
        perguntasParaPensar: [
          'O que você observa que está errado ou poderia melhorar?',
          'Quais ferramentas ou materiais você tem disponíveis?',
          'Se você fosse explicar para um amigo, o que diria para ele fazer?',
        ],
        passoAPasso: [
          'Observe com atenção o problema. Não tente resolver ainda, só olhe.',
          'Identifique o que está causando o problema (parafuso solto, falta de espaço, etc.).',
          'Separe as ferramentas/materiais que precisa.',
          'Faça uma tentativa simples primeiro. Não precisa ser perfeito.',
          'Teste e ajuste até ficar bom o suficiente.',
        ],
        desafioExtra: 'Agora pense: como você poderia melhorar ainda mais? Ou como adaptar essa solução para outro problema parecido?',
        mensagemFinal: 'Você acabou de fazer o que muita gente nem tenta: pensar em como resolver um problema real. Isso é ser um Fazedor!',
        ferramentasNecessarias: ['Chave de fenda', 'Fita adesiva', 'Paciência'],
        cuidados: ['Peça ajuda de um adulto se precisar usar ferramentas', 'Não force demais para não quebrar'],
      };

      setDesafioAtivo(desafioMock);
      setCarregando(false);
    }, 1000);
  };

  if (desafioAtivo) {
    return (
      <div className="max-w-2xl mx-auto">
        <DesafioFazedor
          desafio={desafioAtivo}
          onComplete={(respostas) => {
            console.log('Desafio completado:', respostas);
            setDesafioAtivo(null);
            // TODO: Enviar para API /api/fazedores/responder
          }}
          onSkip={() => setDesafioAtivo(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Módulo Fazedores 🛠️</h1>
        <p className="text-muted-foreground mt-2">
          Aprenda a consertar, organizar e criar como nossos pais faziam.
          <br />
          Coloque a mão na massa e desenvolva o prazer de resolver problemas!
        </p>
      </div>

      <!-- Estatísticas -->
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Desafios Completos', valor: '0', icone: Trophy },
          { label: 'Nível Atual', valor: 'Iniciante', icone: Users },
          { label: 'Ferramentas Usadas', valor: '0', icone: Wrench },
          { label: 'Dias Seguidos', valor: '0', icone: Lightbulb },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 text-center">
              <stat.icone className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-bold">{stat.valor}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <!-- Categorias -->
      <div>
        <h2 className="text-lg font-semibold mb-4">Escolha uma categoria:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categorias.map((cat) => (
            <Button
              key={cat.id}
              variant={categoriaAtiva === cat.id ? 'default' : 'outline'}
              className="h-auto py-6 flex flex-col items-center gap-2"
              onClick={() => {
                setCategoriaAtiva(cat.id);
                gerarDesafio(cat.id);
              }}
              disabled={carregando}
            >
              <div className={`w-10 h-10 rounded-full ${cat.cor} flex items-center justify-center`}>
                <cat.icone className="h-5 w-5 text-white" />
              </div>
              <span>{cat.nome}</span>
            </Button>
          ))}
        </div>
      </div>

      <!-- Lista de Desafios -->
      <div>
        <h2 className="text-lg font-semibold mb-4">Desafios Disponíveis:</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {desafiosMock.map((desafio) => {
            const CategoriaIcone = categorias.find(c => c.id === desafio.categoria)?.icone || Wrench;
            return (
              <Card key={desafio.id} className="cursor-pointer hover:border-primary transition-colors">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <CategoriaIcone className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-base">{desafio.titulo}</CardTitle>
                    </div>
                    <Badge variant="outline">{desafio.tempo}</Badge>
                  </div>
                  <CardDescription>{desafio.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant={
                        desafio.dificuldade === 'fácil' ? 'secondary' :
                        desafio.dificuldade === 'médio' ? 'default' :
                        'destructive'
                      }
                    >
                      {desafio.dificuldade}
                    </Badge>
                    <Button size="sm" onClick={() => gerarDesafio(desafio.categoria)}>
                      Começar
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <!-- Para Professores -->
      <Card className="bg-muted/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle className="text-lg">Para Professores e Pais</CardTitle>
          </div>
          <CardDescription>
            Use os desafios do Módulo Fazedores em sala de aula ou em casa.
            Desenvolva em seus alunos/filhos o prazer de resolver problemas reais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline">Ver Plano de Atividades</Button>
        </CardContent>
      </Card>
    </div>
  );
}
