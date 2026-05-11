// apps/web/src/components/tutor/integracao-fazedores.tsx
// Botão para integrar Módulo Fazedores na tela do Tiagão

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wrench, Loader2 } from 'lucide-react';
import { useDesafioUnico } from '@/hooks/useFazedores';

interface IntegracaoFazedoresProps {
  topicoAtual?: string;
  onDesafioRecebido: (desafio: any) => void;
}

export function BotaoDesafioFazedor({ topicoAtual, onDesafioRecebido }: IntegracaoFazedoresProps) {
  const { pedirDesafio, carregando } = useDesafioUnico({
    onSuccess: (data) => {
      onDesafioRecebido(data);
    },
  });

  const handleClick = async () => {
    const contexto = topicoAtual 
      ? `desafio prático relacionado a: ${topicoAtual}`
      : 'desafio prático do cotidiano para desenvolver habilidades de resolver problemas';

    await pedirDesafio(contexto, 15, 'medio');
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={handleClick}
      disabled={carregando}
    >
      {carregando ? (
        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
      ) : (
        <Wrench className="h-4 w-4 mr-2" />
      )}
      Desafio Fazedor 🔧
    </Button>
  );
}

// Componente para mostrar o desafio dentro do chat do Tiagão
export function CardDesafioFazedorNoChat({ 
  desafio, 
  onResponder 
}: { 
  desafio: any; 
  onResponder: () => void;
}) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 my-2">
      <div className="flex items-center gap-2 mb-2">
        <Wrench className="h-4 w-4 text-orange-600" />
        <span className="font-medium text-orange-800">Desafio Fazedor 🛠️</span>
      </div>
      
      <div className="text-sm text-orange-900 whitespace-pre-line">
        {desafio.conteudo?.substring(0, 200)}...
      </div>
      
      <Button 
        size="sm" 
        variant="outline" 
        className="mt-2 w-full border-orange-300"
        onClick={onResponder}
      >
        Ver desafio completo
      </Button>
    </div>
  );
}
