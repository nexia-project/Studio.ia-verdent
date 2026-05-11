// apps/web/src/hooks/useFazedores.ts
// Hook para integrar o Módulo Fazedores no frontend

import { useState, useCallback } from 'react';

interface UseFazedoresOptions {
  onSuccess?: (data: any) => void;
  onError?: (error: Error) => void;
}

interface FazedoresRequest {
  modo: 'DESAFIO_UNICO' | 'SERIE_DESAFIOS' | 'PLANO_MODULO';
  contexto: string;
  idade?: number;
  publico?: 'fundamental' | 'medio' | 'adulto';
  detalhesExtra?: string;
}

export function useFazedores(options: UseFazedoresOptions = {}) {
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<Error | null>(null);

  const gerarDesafio = useCallback(async (params: FazedoresRequest) => {
    setCarregando(true);
    setErro(null);

    try {
      const res = await fetch('/api/v1/fazedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      options.onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setErro(error);
      options.onError?.(error);
      throw error;
    } finally {
      setCarregando(false);
    }
  }, [options]);

  const enviarResposta = useCallback(async (desafioId: string, respostaAluno: string, contextoDesafio?: string) => {
    setCarregando(true);
    setErro(null);

    try {
      const res = await fetch('/api/v1/fazedores/responder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          desafioId,
          respostaAluno,
          contextoDesafio,
        }),
      });

      if (!res.ok) {
        throw new Error(`Erro ${res.status}: ${await res.text()}`);
      }

      const data = await res.json();
      options.onSuccess?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setErro(error);
      options.onError?.(error);
      throw error;
    } finally {
      setCarregando(false);
    }
  }, [options]);

  return {
    gerarDesafio,
    enviarResposta,
    carregando,
    erro,
  };
}

// Funções helpers pré-configuradas para casos comuns

export function useDesafioUnico(options?: UseFazedoresOptions) {
  const { gerarDesafio, ...rest } = useFazedores(options);

  const pedirDesafio = useCallback(async (contexto: string, idade?: number, publico?: string) => {
    return gerarDesafio({
      modo: 'DESAFIO_UNICO',
      contexto,
      idade,
      publico,
    });
  }, [gerarDesafio]);

  return { pedirDesafio, ...rest };
}

export function useSerieDesafios(options?: UseFazedoresOptions) {
  const { gerarDesafio, ...rest } = useFazedores(options);

  const pedirSerie = useCallback(async (contexto: string, idade?: number, publico?: string) => {
    return gerarDesafio({
      modo: 'SERIE_DESAFIOS',
      contexto,
      idade,
      publico,
    });
  }, [gerarDesafio]);

  return { pedirSerie, ...rest };
}

export function usePlanoModulo(options?: UseFazedoresOptions) {
  const { gerarDesafio, ...rest } = useFazedores(options);

  const pedirPlano = useCallback(async (contexto: string, detalhesExtra?: string, publico?: string) => {
    return gerarDesafio({
      modo: 'PLANO_MODULO',
      contexto,
      publico,
      detalhesExtra,
    });
  }, [gerarDesafio]);

  return { pedirPlano, ...rest };
}
