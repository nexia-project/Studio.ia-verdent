import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, Lightbulb, Hammer, CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface DesafioFazedorProps {
  desafio: {
    titulo: string;
    descricao: string;
    perguntasParaPensar: string[];
    passoAPasso: string[];
    desafioExtra: string;
    mensagemFinal: string;
    ferramentasNecessarias?: string[];
    cuidados?: string[];
  };
  onComplete: (respostas: { pensar: string; tentativa: string; extra: string }) => void;
  onSkip: () => void;
}

export function DesafioFazedor({ desafio, onComplete, onSkip }: DesafioFazedorProps) {
  const [etapa, setEtapa] = useState(0);
  const [respostas, setRespostas] = useState({
    pensar: '',
    tentativa: '',
    extra: '',
  });

  const etapas = [
    { titulo: 'O Problema', icone: Wrench },
    { titulo: 'Pense Antes', icone: Lightbulb },
    { titulo: 'Mão na Massa', icone: Hammer },
    { titulo: 'Desafio Extra', icone: RotateCcw },
    { titulo: 'Conclusão', icone: CheckCircle },
  ];

  const renderEtapa = () => {
    switch (etapa) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-lg">
              <p className="font-medium mb-2">{desafio.descricao}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {desafio.ferramentasNecessarias?.map((ferramenta) => (
                  <span key={ferramenta} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                    {ferramenta}
                  </span>
                ))}
              </div>
            </div>
            
            {desafio.cuidados && desafio.cuidados.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                <p className="text-sm font-medium text-yellow-800">⚠️ Cuidados:</p>
                <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                  {desafio.cuidados.map((cuidado, i) => (
                    <li key={i}>{cuidado}</li>
                  ))}
                </ul>
              </div>
            )}

            <Button onClick={() => setEtapa(1)} className="w-full">
              Vamos começar! 🛠️
            </Button>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Antes de mostrar a solução, quero que você PENSE. Não precisa acertar, só tentar!
            </p>
            
            <div className="space-y-3">
              {desafio.perguntasParaPensar.map((pergunta, i) => (
                <div key={i} className="bg-muted p-3 rounded-lg">
                  <span className="text-sm font-medium">{pergunta}</span>
                </div>
              ))}
            </div>

            <Textarea
              placeholder="Escreva o que você pensou, mesmo que não tenha certeza..."
              value={respostas.pensar}
              onChange={(e) => setRespostas({ ...respostas, pensar: e.target.value })}
              className="min-h-[100px]"
            />

            <Button 
              onClick={() => setEtapa(2)} 
              disabled={!respostas.pensar.trim()}
              className="w-full"
            >
              Próximo: Ver Solução
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Ótimo! Agora veja uma forma de resolver passo a passo:
            </p>

            <div className="space-y-2">
              {desafio.passoAPasso.map((passo, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-sm">{passo}</p>
                </div>
              ))}
            </div>

            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium mb-2">O que você achou? Como você faria diferente?</p>
              <Textarea
                placeholder="Descreva sua própria tentativa ou adaptação..."
                value={respostas.tentativa}
                onChange={(e) => setRespostas({ ...respostas, tentativa: e.target.value })}
                className="min-h-[80px]"
              />
            </div>

            <Button 
              onClick={() => setEtapa(3)} 
              className="w-full"
            >
              Próximo: Desafio Extra
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="bg-accent/10 border border-accent p-4 rounded-lg">
              <p className="font-medium text-accent-foreground">🎯 Desafio Extra (+1)</p>
              <p className="text-sm mt-2">{desafio.desafioExtra}</p>
            </div>

            <Textarea
              placeholder="Use sua criatividade aqui..."
              value={respostas.extra}
              onChange={(e) => setRespostas({ ...respostas, extra: e.target.value })}
              className="min-h-[100px]"
            />

            <Button 
              onClick={() => setEtapa(4)} 
              disabled={!respostas.extra.trim()}
              className="w-full"
            >
              Finalizar
              <CheckCircle className="h-4 w-4 ml-2" />
            </Button>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>

            <p className="text-lg font-medium">Parabéns! 🎉</p>
            <p className="text-muted-foreground">{desafio.mensagemFinal}</p>

            <div className="bg-muted p-4 rounded-lg text-left">
              <p className="text-sm font-medium mb-2">Resumo do que você fez:</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Pensou antes de ver a resposta ✓</li>
                <li>Entendeu a solução passo a passo ✓</li>
                <li>Criou sua própria adaptação ✓</li>
                <li>Fez o desafio extra (+1) ✓</li>
              </ul>
            </div>

            <Button 
              onClick={() => onComplete(respostas)} 
              className="w-full"
            >
              Completar Desafio
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="border-orange-500">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="h-5 w-5 text-orange-500" />
            <CardTitle className="text-lg">Módulo Fazedores 🛠️</CardTitle>
          </div>
          <span className="text-xs text-muted-foreground">
            {etapa + 1} / {etapas.length}
          </span>
        </div>

        <!-- Progresso -->
        <div className="flex gap-1 mt-2">
          {etapas.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full ${
                i <= etapa ? 'bg-orange-500' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        <CardDescription>{desafio.titulo}</CardDescription>
      </CardHeader>

      <CardContent>
        {renderEtapa()}

        {etapa < 4 && (
          <Button variant="ghost" onClick={onSkip} className="w-full mt-4">
            Pular por enquanto
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
