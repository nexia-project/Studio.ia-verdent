import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Lightbulb, Send, Sparkles } from 'lucide-react';

interface DesafioOrganizacaoProps {
  desafio: {
    titulo: string;
    situacao: string;
    pergunta_inicial: string;
    perguntas_de_guias: string[];
    exemplo_de_resposta_criativa: string;
    reflexao_final: string;
  };
  onComplete: (resposta: string) => void;
  onSkip: () => void;
}

export function DesafioOrganizacao({ desafio, onComplete, onSkip }: DesafioOrganizacaoProps) {
  const [resposta, setResposta] = useState('');
  const [mostrarDica, setMostrarDica] = useState(false);
  const [etapa, setEtapa] = useState(0);

  const etapas = [
    { titulo: 'O Desafio', conteudo: desafio.situacao },
    { titulo: 'A Pergunta', conteudo: desafio.pergunta_inicial },
    ...desafio.perguntas_de_guias.map((p, i) => ({
      titulo: `Dica ${i + 1}`,
      conteudo: p,
    })),
  ];

  return (
    <Card className="border-accent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          <CardTitle className="text-lg">Desafio de Organização 🧩</CardTitle>
        </div>
        <h3 className="font-semibold text-primary">{desafio.titulo}</h3>
      </CardHeader>

      <CardContent className="space-y-4">
        <!-- Progresso das etapas -->
        <div className="flex gap-1">
          {etapas.map((_, index) => (
            <div
              key={index}
              className={`h-1 flex-1 rounded-full ${
                index <= etapa ? 'bg-accent' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <!-- Conteúdo da etapa atual -->
        <div className="bg-muted/50 p-4 rounded-lg">
          <span className="text-xs font-medium text-accent uppercase">
            {etapas[etapa]?.titulo}
          </span>
          <p className="mt-1">{etapas[etapa]?.conteudo}</p>
        </div>

        <!-- Navegação entre etapas -->
        {etapa < etapas.length - 1 ? (
          <Button onClick={() => setEtapa(etapa + 1)} className="w-full">
            Próxima Dica 💡
          </Button>
        ) : (
          <>
            <Textarea
              placeholder="Escreva sua resposta criativa aqui..."
              value={resposta}
              onChange={(e) => setResposta(e.target.value)}
              className="min-h-[100px]"
            />

            <div className="flex gap-2">
              <Button
                onClick={() => setMostrarDica(!mostrarDica)}
                variant="outline"
                className="flex-1"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {mostrarDica ? 'Esconder Exemplo' : 'Ver Exemplo'}
              </Button>
              <Button
                onClick={() => onComplete(resposta)}
                disabled={!resposta.trim()}
                className="flex-1"
              >
                <Send className="h-4 w-4 mr-2" />
                Enviar Resposta
              </Button>
            </div>

            {mostrarDica && (
              <div className="bg-accent/10 p-3 rounded-lg text-sm">
                <span className="font-medium">Exemplo de resposta criativa:\u003c/span>
                <p className="text-muted-foreground mt-1">{desafio.exemplo_de_resposta_criativa}</p>
              </div>
            )}

            <Button variant="ghost" onClick={onSkip} className="w-full">
              Pular desafio por enquanto
            </Button>
          </>
        )}

        {etapa === etapas.length - 1 && (
          <div className="text-center text-sm text-muted-foreground pt-2 border-t">
            {desafio.reflexao_final}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
