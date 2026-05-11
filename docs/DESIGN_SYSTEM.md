# Design System StudyAI

## Paleta de Cores

### Tokens CSS (HSL)

```css
:root {
  /* Fundo e Texto */
  --color-background: hsl(270 40% 98%);      /* Fundo geral lilás claro */
  --color-foreground: hsl(280 35% 14%);      /* Texto principal arroxeado */
  
  /* Primário */
  --color-primary: hsl(271 81% 56%);         /* Roxo/violeta principal */
  --color-primary-foreground: hsl(0 0% 100%); /* Branco sobre primary */
  
  /* Secundário */
  --color-secondary: hsl(270 35% 96%);       /* Superfícies secundárias */
  --color-secondary-foreground: hsl(280 30% 26%);
  
  /* Muted */
  --color-muted: hsl(270 25% 93%);           /* Áreas apagadas */
  --color-muted-foreground: hsl(270 12% 46%); /* Texto secundário */
  
  /* Acento */
  --color-accent: hsl(292 65% 52%);          /* Magenta/roxo-pink */
  --color-accent-foreground: hsl(0 0% 100%);
  
  /* Destrutivo */
  --color-destructive: hsl(0 72% 51%);       /* Erro/vermelho */
  --color-destructive-foreground: hsl(0 0% 100%);
  
  /* Bordas e Foco */
  --color-border: hsl(270 24% 90%);          /* Bordas lilás */
  --color-ring: hsl(271 81% 56%);            /* Foco acessibilidade */
  
  /* Cartões */
  --color-card: hsl(0 0% 100%);              /* Branco */
  --color-card-foreground: hsl(220 25% 12%); /* Texto neutro escuro */
}
```

### Gradientes

#### Menu Lateral - Tema Elegante
```css
background: linear-gradient(180deg, #1f0b3d 0%, #31105c 50%, #46207a 100%);
```

#### Menu Lateral - Tema Vibrante
```css
background: linear-gradient(180deg, #2a0b48 0%, #4b1791 50%, #6a21c9 100%);
```

## Tipografia

### Fontes

- **Corpo**: Inter, Nunito
- **Títulos**: Inter, Outfit
- **Fallback**: system-ui, sans-serif

### Escala

| Nome | Tamanho | Peso | Uso |
|------|---------|------|-----|
| h1 | 2.5rem (40px) | 700 | Títulos de página |
| h2 | 2rem (32px) | 600 | Seções principais |
| h3 | 1.5rem (24px) | 600 | Subseções |
| h4 | 1.25rem (20px) | 500 | Cards |
| body | 1rem (16px) | 400 | Texto padrão |
| small | 0.875rem (14px) | 400 | Legendas |
| xs | 0.75rem (12px) | 400 | Notas |

## Componentes

### Botões

#### Primary
```
Background: hsl(271 81% 56%)
Text: white
Hover: hsl(271 81% 50%)
Border-radius: 0.5rem
Padding: 0.5rem 1rem
```

#### Secondary
```
Background: hsl(270 35% 96%)
Text: hsl(280 30% 26%)
Hover: hsl(270 35% 90%)
Border-radius: 0.5rem
Padding: 0.5rem 1rem
```

#### Ghost
```
Background: transparent
Text: hsl(271 81% 56%)
Hover: hsl(270 35% 96%)
Border-radius: 0.5rem
Padding: 0.5rem 1rem
```

### Cards

```
Background: white
Border: 1px solid hsl(270 24% 90%)
Border-radius: 0.75rem
Shadow: 0 1px 3px rgba(0,0,0,0.1)
Padding: 1.5rem
```

### Inputs

```
Background: white
Border: 1px solid hsl(270 24% 90%)
Border-radius: 0.5rem
Padding: 0.5rem 0.75rem
Focus: ring-2 ring-primary
```

## Espaçamento

### Scale

| Token | Valor |
|-------|-------|
| space-1 | 0.25rem (4px) |
| space-2 | 0.5rem (8px) |
| space-3 | 0.75rem (12px) |
| space-4 | 1rem (16px) |
| space-5 | 1.25rem (20px) |
| space-6 | 1.5rem (24px) |
| space-8 | 2rem (32px) |
| space-10 | 2.5rem (40px) |
| space-12 | 3rem (48px) |

## Breakpoints

| Nome | Largura |
|------|---------|
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1536px |

## Animações

### Durações

- Fast: 150ms
- Normal: 200ms
- Slow: 300ms

### Easing

- Default: cubic-bezier(0.4, 0, 0.2, 1)
- Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)

## Ícones

- Biblioteca: Lucide React
- Tamanho padrão: 1.5rem (24px)
- Tamanho small: 1rem (16px)
- Tamanho large: 2rem (32px)