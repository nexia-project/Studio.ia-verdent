import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

interface Foco5MinProps {
  roteiro: {
    mensagem_abertura: string;
    passos: Array<{
      titulo: string;
      instrucao: string;
      duracao: string;
    }>;
    frase_orgulho: string;
    call_to_action_extra: string;
  };
  onComplete: () => void;
  onCancel: () => void;
}

export function Foco5Min({ roteiro, onComplete, onCancel }: Foco5MinProps) {
  const [passoAtual, setPassoAtual] = useState(0);
  const [tempoRestante, setTempoRestante] = useState(60); // 1 minuto em segundos
  const [isRunning, setIsRunning] = useState(false);
  const [completado, setCompletado] = useState(false);

  const duracoes = [60, 180, 60]; // 1min, 3min, 1min em segundos
  const totalTempo = 300; // 5 minutos total
  const tempoDecorrido = duracoes.slice(0, passoAtual).reduce((a, b) => a + b, 0) + (duracoes[passoAtual] - tempoRestante);
  const progresso = (tempoDecorrido / totalTempo) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && tempoRestante > 0) {
      interval = setInterval(() => {
        setTempoRestante((prev) => prev - 1);
      }, 1000);
    } else if (tempoRestante === 0) {
      if (passoAtual < 2) {
        setPassoAtual((prev) => prev + 1);
        setTempoRestante(duracoes[passoAtual + 1]);
      } else {
        setCompletado(true);
        setIsRunning(false);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, tempoRestante, passoAtual]);

  const formatarTempo = (segundos: number) => {
    const mins = Math.floor(segundos / 60);
    const secs = segundos % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (completado) {
    return (
      <Card className="border-green-500">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Parabéns! 🎉</h3>
          <p className="text-muted-foreground mb-4">{roteiro.frase_orgulho}</p>
          <p className="text-sm mb-4">{roteiro.call_to_action_extra}</p>
          <Button onClick={onComplete}>Continuar Estudando</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-primary">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Modo Foco 5 Min 🔥</CardTitle>
            <p className="text-sm text-muted-foreground">{roteiro.mensagem_abertura}</p>
          </div>
          <div className="text-2xl font-bold">{formatarTempo(tempoRestante)}</div>
        </div>
        <Progress value={progresso} className="mt-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          {roteiro.passos.map((passo, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border ${
                index === passoAtual
                  ? 'border-primary bg-primary/5'
                  : index < passoAtual
                  ? 'border-green-500 bg-green-50'
                  : 'border-muted'
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    index < passoAtual
                      ? 'bg-green-500 text-white'
                      : index === passoAtual
                      ? 'bg-primary text-white'
                      : 'bg-muted'
                  }`}
                >
                  {index < passoAtual ? '✓' : index + 1}
                </div>
                <span className="font-medium">{passo.titulo}</span>
                <span className="text-xs text-muted-foreground ml-auto">{passo.duracao}</span>
              </div>              {index === passoAtual && (
                <p className="text-sm mt-2 text-muted-foreground">{passo.instrucao}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => setIsRunning(!isRunning)}
            className="flex-1"
            variant={isRunning ? 'secondary' : 'default'}
          >
            {isRunning ? (
              <>
                <Pause className="h-4 w-4 mr-2" />
                Pausar
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                {passoAtual === 0 && tempoRestante === duracoes[0] ? 'Iniciar' : 'Continuar'}
              </>
            )}
          </Button>
          <Button variant="outline" onClick={() => {
            setPassoAtual(0);
            setTempoRestante(duracoes[0]);
            setIsRunning(false);
          }}>
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button variant="ghost" onClick={onCancel}>Cancelar</Button>
        </div>
      </CardContent>
    </Card>
  );
}
