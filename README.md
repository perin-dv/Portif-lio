# Guilherme Perin — Portfólio

Site profissional responsivo, em português, com foco em software, IA, cloud, automação e produção audiovisual. Inclui TakeDream, TemNaLoja, Stella, AmazonClip, AI & Generative Media, Sobre, competências, formação e contato.

## Tecnologia

HTML5 e CSS3, sem framework, sem dependências npm e JavaScript leve no navegador para o player de vídeo sob demanda. Scripts locais em Node.js. Tipografia DM Sans e Manrope via Google Fonts, com fontes do sistema como fallback. O favicon SVG está embutido no HTML.

## Rodar localmente

Pré-requisito: Node.js 18 ou superior com npm.

```sh
git clone https://github.com/perin-dv/Portif-lio.git
cd Portif-lio
git switch main
npm run dev
```

Abra http://127.0.0.1:4173. Não é necessário instalar dependências. Para outra porta, configure a variável de ambiente PORT antes de iniciar.

## Verificação e build

```sh
npm run check
npm run build
npm run preview
```

O build verifica o conteúdo e copia o site estático de `dist/` para `build/`. A prévia serve `build/` na mesma porta. Encerre o servidor anterior antes de abrir outro.

## Estrutura

- `dist/index.html`: código-fonte da página, textos, links e placeholders.
- `dist/style.css`: estilos e comportamento responsivo.
- `dist/assets/`: diretório reservado às mídias autorizadas, ainda não fornecidas.
- `scripts/`: servidor local, verificação e build.
- `.openai/hosting.json`: identificação do site existente e configuração estática do Sites; não contém credenciais.
- `CHECKLIST.md`: materiais pendentes e cuidados com dados de clientes.

`dist/` é a fonte editável do site atual, não um resultado gerado. `build/` é a saída gerada e não é versionada. Todos os placeholders são preservados, sem simular demos ou downloads disponíveis.

## Editar e adicionar provas visuais

Edite os dois arquivos em `dist/`. Coloque screenshots, vídeos ou APKs autorizados em `dist/assets/` e substitua o respectivo placeholder por imagem, vídeo ou link real. Para arquivos grandes, prefira hospedagem apropriada e links confirmados. Não use dados reais de clientes nos exemplos.

## Publicação

**A versão atual deve permanecer privada até a revisão final.** Não há GitHub Actions, publicação automática nem GitHub Pages habilitado por este projeto. Exportar código ao GitHub não altera o acesso ao site.

No Sites, reutilize o projeto registrado em `.openai/hosting.json` e solicite publicação privada após a revisão das alterações. O Sites usa `dist/` diretamente e não exige build. A mudança de público deve ser feita separadamente, somente após autorização.

Para continuar em outra hospedagem estática, execute `npm run build` e use `build/` como diretório publicado. O comando de build é `npm run build`. Nenhuma credencial, conta de hospedagem ou automação externa está configurada. Antes de publicar fora do Sites, confirme o acesso desejado e retire o identificador do Sites de qualquer novo projeto independente.

## Conteúdo e limitações

- Formação: Gestão de Comércio concluída; Engenharia de Computação cursando desde 2026.
- GitHub: https://github.com/perin-dv
- LinkedIn: https://www.linkedin.com/in/guilherme-perin-580322272
- Contato: perin_gui_@hotmail.com
- Não há preços, resultados quantitativos, depoimentos ou datas de projeto inventados.
- A stack de Stella permanece aguardando confirmação.
- Screenshots, demos, repositórios específicos e APKs permanecem pendentes.

Branch de continuidade: `feat/portfolio-v1`.
