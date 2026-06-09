# 🛍️ ShopAI

> Motor de recomendação de e-commerce com IA em tempo real — construído com Next.js 14, Groq (Llama 3.3 70B), Zustand e Recharts.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Charts-Recharts-22b5bf?logo=recharts)](https://recharts.org/)
[![Groq](https://img.shields.io/badge/AI-Groq%20Llama%203.3%2070B-f97316)](https://groq.com/)

---

## 📸 Preview

ShopAI simula uma loja virtual inteligente onde **toda interação do usuário alimenta modelos de IA** que geram recomendações personalizadas, análise de sentimento de reviews, previsão de compra e insights comportamentais em tempo real — tudo com uma UI moderna e animações fluidas.

| Feature | Descrição |
|---------|-----------|
| 🧠 **Recomendações IA** | Perfil de compra analisado pela IA para sugerir produtos relevantes |
| 📊 **Dashboard Analytics** | Gráficos Recharts interativos: donut, funnel, barras, linha do tempo |
| 🎯 **Previsão** | Probabilidade e timing de compra calculados por modelo preditivo |
| ⭐ **Análise de Reviews** | Sentimento, resumo e veredicto gerados a partir de reviews reais da DummyJSON |
| 🛒 **Carrinho Inteligente** | Sidebar com métricas de sessão: conversão, ticket médio, histórico |
| 👥 **Perfis de Teste** | 4 personas simuladas (João, Márcia, Pedro, Ana) com histórico realista |

---

## 🏗️ Arquitetura

```mermaid
graph TD
    subgraph "Frontend (Next.js App Router)"
        HERO["Hero<br/>Landing page animada"]
        CATALOG["CatalogTab<br/>Grade de produtos + filtros"]
        MODAL["ProductModal<br/>Detalhes + Análise IA"]
        CART["CartSidebar<br/>Carrinho + métricas"]
        RECS["RecsTab<br/>Recomendações IA"]
        ANALYTICS["AnalyticsTab<br/>Dashboard com Recharts"]
        PREDICT["PredictTab<br/>Previsão de compra"]
        PROFILES["ProfileSwitcher<br/>Seletor de persona de teste"]
        HISTORY["SessionHistoryModal<br/>Histórico completo da sessão"]
    end

    subgraph "Analytics Sub-components"
        KPI["KPICards<br/>5 indicadores principais"]
        DONUT["CategoryDonut<br/>Distribuição por categoria"]
        FUNNEL["ConversionFunnel<br/>Views → Carrinho"]
        PRICE["PriceRangeChart<br/>Faixas de preço"]
        TIMELINE["SessionTimeline<br/>Linha do tempo interativa"]
    end

    subgraph "State (Zustand)"
        STORE["behaviorStore<br/>viewed[] · cart[] · activeProfile<br/>loadProfile()"]
    end

    subgraph "API Routes (Next.js)"
        PRODUCTS["/api/products<br/>Proxy DummyJSON"]
        REVIEWS["/api/reviews<br/>Análise de sentimento"]
        RECOMMEND["/api/recommend<br/>Recomendações IA"]
        ANALYZE["/api/analyze<br/>Insights comportamentais"]
        PREDICT_API["/api/predict<br/>Previsão de compra"]
    end

    subgraph "AI Layer"
        GEMINI["lib/gemini.ts<br/>Groq SDK · Llama 3.3 70B"]
    end

    subgraph "External"
        DUMMY["DummyJSON API<br/>Produtos + Reviews"]
    end

    HERO --> CATALOG
    CATALOG --> MODAL
    MODAL --> REVIEWS
    RECS --> RECOMMEND
    ANALYTICS --> ANALYZE
    PREDICT --> PREDICT_API
    CART --> STORE
    PROFILES --> STORE
    HISTORY --> STORE
    TIMELINE --> HISTORY

    ANALYTICS --> KPI
    ANALYTICS --> DONUT
    ANALYTICS --> FUNNEL
    ANALYTICS --> PRICE
    ANALYTICS --> TIMELINE

    REVIEWS --> GEMINI
    RECOMMEND --> GEMINI
    ANALYZE --> GEMINI
    PREDICT_API --> GEMINI

    PRODUCTS --> DUMMY
    STORE --> RECOMMEND
    STORE --> ANALYZE
    STORE --> PREDICT_API
```

---

## 📁 Estrutura de Pastas

```
shopai/
├── app/
│   ├── globals.css              # Estilos globais + keyframes + utilitários
│   ├── layout.tsx               # Root layout (metadata pt-BR)
│   ├── page.tsx                 # Página principal (tabs + hero)
│   └── api/
│       ├── products/route.ts    # GET  — Proxy da DummyJSON
│       ├── reviews/route.ts     # POST — Análise de sentimento das reviews
│       ├── recommend/route.ts   # POST — Recomendações personalizadas
│       ├── analyze/route.ts     # POST — Insights comportamentais
│       └── predict/route.ts     # POST — Previsão de compra
│
├── components/
│   ├── Hero.tsx                 # Landing page com shimmer, stats, CTA
│   ├── Navbar.tsx               # Barra de navegação + tabs + avatar
│   ├── ProfileSwitcher.tsx      # Dropdown de seleção de persona de teste
│   ├── AppBackground.tsx        # Fundo com orbs e partículas
│   ├── CartSidebar.tsx          # Carrinho + métricas de sessão
│   ├── ProductCard.tsx          # Card de produto (catálogo)
│   ├── ProductModal.tsx         # Modal de detalhes do produto
│   ├── CatalogTab.tsx           # Aba do catálogo (grid + filtros)
│   ├── RecsTab.tsx              # Aba de recomendações IA
│   ├── AnalyticsTab.tsx         # Aba do dashboard analytics
│   ├── PredictTab.tsx           # Aba de previsão de compra
│   ├── AIPanel.tsx              # Painel reutilizável de resultados IA
│   ├── analytics/
│   │   ├── KPICards.tsx         # Cards de indicadores (views, carrinho, conversão)
│   │   ├── CategoryDonut.tsx    # Gráfico donut Recharts por categoria
│   │   ├── ConversionFunnel.tsx # Funil de conversão horizontal (Recharts)
│   │   ├── PriceRangeChart.tsx  # Distribuição por faixa de preço (Recharts)
│   │   ├── SessionTimeline.tsx  # Linha do tempo interativa da sessão
│   │   └── SessionHistoryModal.tsx # Modal full-screen com grid de produtos
│   ├── card/
│   │   └── CardImage.tsx        # Imagem do card (badges, overlay, fallback)
│   ├── catalog/
│   │   ├── CatalogHeader.tsx    # Cabeçalho com métricas do catálogo
│   │   ├── CatalogToolbar.tsx   # Busca, filtros, ordenação
│   │   ├── CategoryIcons.tsx    # Ícones por categoria
│   │   └── SkeletonCard.tsx     # Skeleton loading dos cards
│   ├── hero/
│   │   ├── HeroBackground.tsx   # Grid + orbs + anéis + partículas
│   │   ├── StatCard.tsx         # Card de estatística com glass effect
│   │   └── SparkBurst.tsx       # Efeito de faíscas no hover
│   └── modal/
│       ├── ProductDetail.tsx    # Detalhes do produto (imagem, preço, tags)
│       └── AIAnalysis.tsx       # Botão + resultado da análise IA
│
├── lib/
│   ├── gemini.ts                # Cliente Groq + prompt builder
│   ├── products.ts              # Tipos: Product, ReviewData, ViewedProduct
│   ├── profiles.ts              # Perfis de teste (João, Márcia, Pedro, Ana)
│   ├── reviews.ts               # Reviews mock locais (fallback)
│   └── useCountUp.ts            # Hook de animação de contagem
│
├── services/
│   └── products.ts              # Fetch + mapeamento da DummyJSON → Product
│
├── store/
│   └── behaviorStore.ts         # Zustand: viewed[], cart[], métricas, perfis
│
├── .env.local                   # GROQ_API_KEY (não versionado)
├── tailwind.config.ts           # Cores, fontes, animações customizadas
├── tsconfig.json                # TypeScript strict, path alias @/*
├── next.config.js               # Permitir imagens remotas
└── package.json                 # Dependências e scripts
```

---

## 🔄 Fluxo de Dados

```mermaid
sequenceDiagram
    participant U as 👤 Usuário
    participant FE as Next.js Client
    participant ST as Zustand Store
    participant API as API Routes
    participant AI as Groq (Llama 3.3 70B)
    participant EXT as DummyJSON

    U->>FE: Navega pelo catálogo
    FE->>EXT: GET /api/products
    EXT-->>FE: Produtos + reviews
    FE->>ST: viewProduct(), addToCart()

    U->>FE: Seleciona perfil de teste
    FE->>EXT: GET /api/products
    EXT-->>FE: Produtos
    FE->>ST: loadProfile(viewed, cart, profileId, sessionStart)
    Note over ST: Sessão simulada com timestamps realistas

    U->>FE: Clica "Analisar produto"
    FE->>API: POST /api/reviews
    API->>AI: Prompt com reviews formatadas
    AI-->>API: JSON: sentimento, resumo, veredicto
    API-->>FE: Análise renderizada no modal

    U->>FE: Aba "Recomendações"
    FE->>ST: Lê viewed[], cart[]
    FE->>API: POST /api/recommend
    API->>AI: Prompt com perfil + catálogo
    AI-->>API: JSON: perfil, recomendações, upsell
    API-->>FE: Cards de recomendação

    U->>FE: Aba "Analytics" → Clica "Linha do Tempo"
    FE->>ST: Lê viewed[], cart[], activeProfile
    FE-->>FE: Abre SessionHistoryModal
    Note over FE: Grid de produtos com imagens, preços, ratings

    U->>FE: Aba "Previsão"
    FE->>ST: Lê dados da sessão
    FE->>API: POST /api/predict
    API->>AI: Prompt preditivo
    AI-->>API: JSON: probabilidade, timing, ticket
    API-->>FE: Dashboard de previsão
```

---

## 👥 Perfis de Teste

O sistema inclui **4 personas pré-definidas** que simulam comportamentos reais de compra. Basta clicar no avatar no canto superior direito da Navbar e selecionar um perfil — o app automaticamente carrega produtos visualizados, carrinho e tempo de sessão.

| Perfil | Iniciais | Emoji | Comportamento | Visualizados | Carrinho | Sessão |
|--------|----------|-------|---------------|-------------|----------|--------|
| **João Silva** | JS | 🏃 | Corredor amador · busca performance | 6 produtos | 1 item | 52 min |
| **Márcia Costa** | MC | 💅 | Fashionista · compradora frequente | 7 produtos | 2 itens | 78 min |
| **Pedro Alves** | PA | 💻 | Entusiasta tech · pesquisa bastante | 6 produtos | 2 itens | 35 min |
| **Ana Beatriz** | AB | 🏡 | Decoradora · compras para casa | 6 produtos | 2 itens | 95 min |

### Como funciona

1. Ao selecionar um perfil, o `ProfileSwitcher` busca os produtos reais da DummyJSON via `/api/products`
2. Os IDs do perfil são mapeados para objetos `Product` completos com timestamps espaçados (~3 min entre views)
3. `loadProfile()` injeta tudo na Zustand Store, simulando uma sessão de navegação real
4. O avatar da Navbar mostra as iniciais e cor azul quando um perfil está ativo

> **Por que isso existe?** Sem perfis, toda vez que o `npm run dev` reinicia, o estado zera e as abas de Recomendações, Previsão e Analytics ficam vazias. Com perfis, basta 1 clique para ter dados realistas de teste.

---

## 📊 Dashboard Analytics

A aba **Analytics** foi construída com [Recharts](https://recharts.org/) e oferece 5 visualizações profissionais:

### KPICards
5 cards com indicadores principais: Produtos visualizados, No carrinho, Taxa de conversão, Ticket médio e Duração da sessão. Cada card tem ícone Lucide, cor temática, tendência (↑/↓) e animação de entrada.

### CategoryDonut
Gráfico de rosca (donut) mostrando a distribuição de produtos por categoria. Inclui tooltips interativos, legenda colorida e valor central (total de categorias exploradas).

### ConversionFunnel
Gráfico de barras horizontal estilo funil: Produtos visualizados → No carrinho → Alta intenção. Cada barra mostra a contagem e percentual relativo, com cores gradientes (slate → blue → emerald).

### PriceRangeChart
Gráfico de barras vertical com 5 faixas de preço (R$0–50, R$50–200, R$200–500, R$500–1500, R$1500+). A barra com maior concentração é destacada em azul.

### SessionTimeline
Linha do tempo visual da sessão com conectores coloridos — verde para itens no carrinho, azul para visualizações recentes (< 3 min), cinza para mais antigas. **Clicável**: ao clicar no card, abre o **SessionHistoryModal**.

### SessionHistoryModal
Modal full-screen que exibe todos os produtos da sessão em cards com:
- Imagem real do produto (com fallback para ícone da categoria)
- Preço, rating (★), e badge de tempo ("agora", "5min", "1h")
- Seção "No Carrinho" com destaque esmeralda e badge 🛒
- Seção "Visualizados" com cards em grid responsivo (2 → 4 colunas)
- Stats rápidos: total visualizado, no carrinho, valor total, categorias exploradas
- Avatar e nome do perfil ativo (quando um perfil de teste está selecionado)

---

## 🎨 Design System

### Paleta de Cores

| Token | Cor | Uso |
|-------|-----|-----|
| `slate-50` | `#F8FAFC` | Background principal |
| `slate-900` | `#0F172A` | Texto principal, botões |
| `blue-500/600` | `#3B82F6` / `#2563EB` | Acentos IA, links, perfil ativo |
| `sky-400` | `#38BDF8` | Indicadores de atividade |
| `emerald-500` | `#10B981` | Carrinho, estados positivos |
| `amber-400` | `#FBBF24` | Estrelas de rating |
| `violet-500` | `#8B5CF6` | Orbs decorativos |

### Fontes

| Variável | Família | Uso |
|----------|---------|-----|
| `--font-display` | **Syne** (Google Fonts) | Títulos, headings, preços |
| `--font-body` | **DM Sans** (Google Fonts) | Texto corrido, labels, UI |

### Animações

| Classe | Efeito | Duração |
|--------|--------|---------|
| `animate-shimmer` | Gradiente fluindo no texto | 4s ∞ |
| `animate-fade-up` → `-2`, `-3`, `-4` | Entrada em cascata com delay | 0.7s |
| `animate-stat-enter` | Entrada com bounce (cubic-bezier) | 0.7s |
| `animate-card-enter` | Cards entrando com stagger | 0.5s |
| `animate-float` / `-slow` / `-slower` | Flutuação orbital suave | 6–11s ∞ |
| `animate-orb-pulse` / `-delay` / `-slow` | Pulsação de orbs no fundo | 6–8s ∞ |
| `animate-glow-pulse` | Brilho pulsante no botão CTA | 3s ∞ |
| `animate-ring` / `-reverse` | Anéis decorativos rotativos | 20–24s ∞ |
| `ripple-effect` | Ondulação no clique | 0.6s |
| `animate-cart-pop` | Pop-in ao adicionar no carrinho | 0.4s |
| `animate-scale-in` | Entrada do dropdown de perfis | 0.2s |
| `skeleton-shimmer` | Shimmer nos skeletons de loading | 1.8s ∞ |

---

## 🚀 Como Rodar

### Pré-requisitos

- **Node.js** 18+
- **Chave da Groq** — crie uma conta gratuita em [console.groq.com](https://console.groq.com) e gere uma API key

### Setup

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/shopai.git
cd shopai

# 2. Instale as dependências
npm install

# 3. Configure a chave da Groq
echo "GROQ_API_KEY=gsk_seu_token_aqui" > .env.local

# 4. Rode o projeto
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento com hot-reload |
| `npm run build` | Build de produção |
| `npm start` | Inicia o servidor de produção |

---

## 🧩 Stack Tecnológica

| Camada | Tecnologia | Por quê |
|--------|-----------|---------|
| **Framework** | Next.js 14 (App Router) | SSR, API Routes, otimização de imagens |
| **Linguagem** | TypeScript 5.9 (strict) | Segurança de tipos, DX |
| **Estilo** | Tailwind CSS 3.4 | Utilitário, customizável, performático |
| **Gráficos** | Recharts 2.12 | Declarativo, React-native, customizável |
| **Estado** | Zustand 4.5 | Leve, sem boilerplate, derivations |
| **Ícones** | Lucide React | Tree-shakeable, consistentes |
| **IA** | Groq SDK (Llama 3.3 70B) | JSON estruturado, baixa latência, gratuito |
| **Dados** | DummyJSON (proxy) | API realista de produtos com reviews |
| **Fontes** | Syne + DM Sans (Google Fonts) | Display moderno + body legível |

---

## 🔌 API Routes

### `GET /api/products`
Proxy da DummyJSON. Retorna o catálogo completo com produtos e reviews.

### `POST /api/reviews`
Analisa reviews de um produto com IA.

**Body:** `{ productName, productCategory, productPrice, reviews[] }`
**Response:** `{ sentimento_geral, score_confianca, resumo, pontos_fortes, pontos_fracos, perfil_ideal, veredicto, frase_destaque }`

### `POST /api/recommend`
Gera recomendações personalizadas baseadas no comportamento do usuário.

**Body:** `{ viewedNames, cartNames, topCat, avgPrice, viewedCount, cartCount }`
**Response:** `{ perfil, recomendacoes[], upsell, urgencia }`

### `POST /api/analyze`
Analisa padrões de navegação e gera insights de CRO.

**Body:** `{ viewedNames, cartNames, topCat, avgPrice, viewedCount, cartCount }`
**Response:** `{ segmento, insights[], acao_prioritaria }`

### `POST /api/predict`
Prevê probabilidade e timing de compra.

**Body:** `{ viewedNames, cartNames, topCat, avgPrice, viewedCount, cartCount }`
**Response:** `{ probabilidade, timing, categoria_mais_provavel, ticket_estimado, confianca, acao_recomendada, gatilho_principal, scores_categoria }`

---

## 📦 Zustand Store

```typescript
interface BehaviorStore {
  viewed: ViewProduct[]       // Últimos 10 produtos visualizados
  cart: Product[]             // Produtos no carrinho
  sessionStart: Date          // Início da sessão
  activeProfile: string | null // ID do perfil de teste ativo (null = nenhum)

  viewProduct(p)              // Registra visualização (+15s timeSpent)
  addToCart(p)                // Adiciona ao carrinho + registra view
  removeFromCart(id)          // Remove do carrinho
  clearCart()                 // Limpa carrinho
  clearHistory()              // Limpa tudo (inclusive activeProfile)
  loadProfile(v, c, id, d)    // Carrega perfil de teste: viewed[], cart[], profileId, sessionStart

  // Derivadas
  cartTotal()                 // Soma dos preços
  topCategory()               // Categoria mais visitada
  avgPrice()                  // Ticket médio
  conversionRate()            // Taxa de conversão (cart/viewed)
}
```

---

## 🎯 Funcionalidades

- [x] Catálogo com grid responsivo (2 → 6 colunas)
- [x] Busca por nome, categoria e tags
- [x] Filtro por categoria com chips
- [x] Ordenação por relevância, menor/maior preço
- [x] Modal de detalhes do produto
- [x] Análise IA de reviews (Groq Llama 3.3 70B)
- [x] Recomendações personalizadas por comportamento
- [x] Dashboard analytics profissional com Recharts (5 gráficos)
- [x] Linha do tempo interativa → modal com grid de produtos
- [x] Previsão de compra com scores por categoria
- [x] Carrinho lateral com total e histórico
- [x] 4 perfis de teste com 1 clique (João, Márcia, Pedro, Ana)
- [x] Indicador de produtos já visualizados
- [x] Skeleton loading com shimmer
- [x] Animações de entrada, hover e transições
- [x] Hero page com shimmer text, glass stats, orbs animados
- [x] Responsivo (mobile, tablet, desktop)
- [x] Reviews reais da DummyJSON com fallback local

---

## 📄 Licença

MIT — sinta-se livre para usar, modificar e compartilhar.

---

🤖 Feito com [Claude Code](https://claude.ai/code) · Next.js · Groq · Recharts · DummyJSON
