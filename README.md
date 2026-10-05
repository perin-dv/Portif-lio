# Guilherme Perin — Portfólio

Portfólio profissional de **Guilherme Perin**, reunindo projetos de software, IA, cloud, automação e produção audiovisual.

**Site publicado:** https://guilherme-perin.vercel.app

## Conteúdo

O portfólio apresenta cases e trabalhos reais, incluindo:

- **TakeDream** — aplicação desktop de edição assistida, transcrição, análise de silêncios, revisão em timeline e exportação.
- **TemNaLoja** — app Android, backend, painel administrativo, WhatsApp oficial e pagamentos.
- **Stella** — experiência mobile para restaurante, catálogo, produto, carrinho e fluxo de pedidos.
- **AmazonClip** — case técnico de infraestrutura, Linux, AWS/Contabo, worker e pipeline de transcrição.
- **AI & Generative Media** — trabalhos reais de UGC com IA, publicidade, vídeo generativo e apresentador virtual.

A versão atual também inclui galerias reais dos projetos, vídeos otimizados com reprodução sob demanda e os dois currículos profissionais para download.

## Stack do site

- HTML5
- CSS3
- JavaScript leve no navegador
- Node.js para scripts locais de validação, build e preview
- Deploy contínuo pela Vercel a partir da branch `main`

## Rodar localmente

Pré-requisito: **Node.js 18+**.

```bash
git clone https://github.com/perin-dv/Portif-lio.git
cd Portif-lio
npm run dev
```

Servidor local padrão:

```text
http://127.0.0.1:4173
```

## Validar e gerar build

```bash
npm run check
npm run build
npm run preview
```

O comando `npm run build` executa as validações do projeto e gera a versão pronta para publicação.

## Estrutura principal

```text
dist/
├── index.html
├── style.css
└── assets/
    ├── screenshots dos projetos
    ├── vídeos e thumbnails otimizados
    └── currículos em PDF

scripts/
├── check.mjs
├── build.mjs
└── serve.mjs
```

## Mídia e performance

Os screenshots são usados diretamente nas galerias responsivas dos projetos. Os vídeos da seção audiovisual utilizam thumbnails leves e o conteúdo completo é carregado somente quando o visitante escolhe assistir, reduzindo o peso inicial da página.

## Projetos relacionados

- [TakeDream](https://github.com/perin-dv/TakeDream)
- [Stella Cliente](https://github.com/perin-dv/Stella-Cliente)
- [Stella Empresa](https://github.com/perin-dv/Stella-Empresa)
- [GerenteMarketing](https://github.com/perin-dv/GerenteMarketing)

O case **TemNaLoja** aparece no portfólio, mas o código principal permanece privado.

## Contato

- **Portfólio:** https://guilherme-perin.vercel.app
- **LinkedIn:** https://www.linkedin.com/in/guilherme-perin-580322272
- **GitHub:** https://github.com/perin-dv
- **Email:** perin_gui_@hotmail.com

---

Disponível para oportunidades remotas, colaboração e projetos freelance.
