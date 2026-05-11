import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, RotateCcw, CheckCircle, XCircle, TrendingUp, Clock } from 'lucide-react';

interface Flashcard {
  id: string;
  front: string;
  back: string;
  nextReview: Date;
  easeFactor: number;
  repetitions: number;
  interval: number;
}

// Algoritmo SM-2 simplificado
function calculateNextReview(flashcard: Flashcard, quality: number): Partial<Flashcard> {
  let { repetitions, easeFactor, interval } = flashcard;

  // quality: 0-5 (0 = erro total, 5 = resposta perfeita)
  if (quality < 3) {
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }

  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);

  return { repetitions, easeFactor, interval, nextReview };
}

const flashcardsMock: Flashcard[] = [
  {
    id: '1',
    front: 'Qual é a fórmula da água?',
    back: 'H₂O - dois átomos de hidrogênio e um de oxigênio',
    nextReview: new Date(),
    easeFactor: 2.5,
    repetitions: 0,
    interval: 0,
  },
  {
    id: '2',
    front: 'Quando foi proclamada a independência do Brasil?',
    back: '7 de setembro de 1822',
    nextReview: new Date(),
    easeFactor: 2.5,
    repetitions: 0,
    interval: 0,
  },
  {
    id: '3',
    front: 'O que é fotossíntese?',
    back: 'Processo pelo qual plantas convertem luz solar em energia química',
    nextReview: new Date(),
    easeFactor: 2.5,
    repetitions: 0,
    interval: 0,
  },
];

export function FlashcardsPage() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>(flashcardsMock);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [stats, setStats] = useState({ studied: 0, correct: 0, streak: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex) / flashcards.length) * 100;

  const handleResponse = (quality: number) => {
    const updatedCard = { ...currentCard, ...calculateNextReview(currentCard, quality) };
    
    setFlashcards(prev => prev.map((c, i) => i === currentIndex ? updatedCard : c));
    
    setStats(prev => ({
      studied: prev.studied + 1,
      correct: quality >= 3 ? prev.correct + 1 : prev.correct,
      streak: quality >= 3 ? prev.streak + 1 : 0,
    }));

    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowAnswer(false);
    } else {
      setSessionComplete(true);
    }
  };

  const restartSession = () => {
    setCurrentIndex(0);
    setShowAnswer(false);
    setSessionComplete(false);
    setStats({ studied: 0, correct: 0, streak: 0 });
  };

  if (sessionComplete) {
    return (
      <div className="max-w-md mx-auto">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Sessão Completa! 🎉</h2>
            <p className="text-muted-foreground mb-6">
              Você revisou {stats.studied} flashcards
            </p>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-2xl font-bold">{stats.studied}</p>
                <p className="text-xs text-muted-foreground">Estudados</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{stats.correct}</p>
                <p className="text-xs text-muted-foreground">Acertos</p>
              </div>
              <div className="bg-muted p-3 rounded-lg">
                <p className="text-2xl font-bold text-orange-500">{stats.streak}</p>
                <p className="text-xs text-muted-foreground">Sequência</p>
              </div>
            </div>

            <Button onClick={restartSession} className="w-full">
              <RotateCcw className="h-4 w-4 mr-2" />
              Revisar Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Flashcards 🧠</h1>
          <p className="text-muted-foreground">
            Revisão espaçada com algoritmo SM-2
          </p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline">
            <TrendingUp className="h-3 w-3 mr-1" />
            {stats.streak} dias seguidos
          </Badge>
          <Badge variant="outline">
            <Clock className="h-3 w-3 mr-1" />
            {flashcards.length} para revisar
          </Badge>
        </div>
      </div>

      {/* Progresso */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progresso da sessão</span>
          <span>{currentIndex + 1} / {flashcards.length}</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Card principal */}
      <Card className="min-h-[300px] flex flex-col">
        <CardContent className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            
            <h2 className="text-xl font-medium">{currentCard.front}</h2>
            
            {!showAnswer ? (
              <Button onClick={() => setShowAnswer(true)} size="lg">
                Mostrar Resposta
              </Button>
            ) : (
              <div className="space-y-4 w-full">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-lg">{currentCard.back}</p>
                </div>
                
                <p className="text-sm text-muted-foreground">Como foi sua resposta?</p>
                
                <div className="flex gap-2 justify-center">
                  <Button 
                    variant="destructive" 
                    onClick={() => handleResponse(0)}
                    className="flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Errei
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleResponse(3)}
                    className="flex-1"
                  >
                    Difícil
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={() => handleResponse(5)}
                    className="flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Acertei
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats do card atual */}
      <div className="flex justify-center gap-4 text-sm text-muted-foreground">
        <span>Repetições: {currentCard.repetitions}</span>
        <span>•</span>
        <span>Fator: {currentCard.easeFactor.toFixed(1)}</span>
        <span>•</span>
        <span>Intervalo: {currentCard.interval} dias</span>
      </div>
    </div>
  );
}
