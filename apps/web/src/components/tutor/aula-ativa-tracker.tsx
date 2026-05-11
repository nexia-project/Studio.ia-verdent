import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Zap, Brain, Trophy } from 'lucide-react';

interface Missao {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  tipo: 'tentativa' | 'explicacao' | 'desafio' | 'curiosidade';
  completada?: boolean;
}

interface AulaAtivaTrackerProps {
  missoes: Missao[];
  missaoAtual: number;
}

const icones = {
  tentativa: Target,
  explicacao: Brain,
  desafio: Zap,
  curiosidade: Trophy,
};

const cores = {
  tentativa: 'bg-blue-500',
  explicacao: 'bg-green-500',
  desafio: 'bg-orange-500',
  curiosidade: 'bg-purple-500',
};

export function AulaAtivaTracker({ missoes, missaoAtual }: AulaAtivaTrackerProps) {
  return (
    <Card className="border-primary/50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="font-medium">Missão Ativa</span>
          </div>
          <Badge variant="outline">
            {missaoAtual + 1} de {missoes.length}
          </Badge>
        </div>

        <div className="space-y-2">
          {missoes.map((missao, index) => {
            const Icone = icones[missao.tipo];
            const isAtual = index === missaoAtual;
            const isCompletada = index < missaoAtual || missao.completada;

            return (
              <div
                key={missao.id}
                className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                  isAtual
                    ? 'bg-primary/10 border border-primary'
                    : isCompletada
                    ? 'bg-muted/50 opacity-60'
                    : 'opacity-40'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompletada
                      ? 'bg-green-500 text-white'
                      : isAtual
                      ? cores[missao.tipo] + ' text-white'
                      : 'bg-muted'
                  }`}
                >
                  {isCompletada ? (
                    '✓'
                  ) : (
                    <Icone className="h-4 w-4" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className={`font-medium truncate ${isAtual ? 'text-primary' : ''}`}>
                    {missao.titulo}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {missao.descricao}
                  </p>
                </div>

                <span className="text-xs text-muted-foreground">{missao.duracao}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
