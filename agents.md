# Agents Guide

Este projeto e um portfolio Angular 18 publicado no Firebase Hosting.

## Objetivo da arquitetura

- Manter o layout publico visualmente estavel.
- Separar a home em componentes pequenos sob `src/app/view/usuario/index/components`.
- Deixar `IndexComponent` como orquestrador de dados, estado de tela, formulario e navegacao.
- Evitar regras de estilo duplicadas; o CSS legado da home continua em `index.component.css` com encapsulamento global para preservar o layout apos a quebra em componentes.

## Comandos principais

- `npm install --legacy-peer-deps --no-audit --no-fund`
- `npm run build`
- `npm start`

O projeto usa Angular 18, mas `primeng@16.9.1` declara peer dependency para Angular 16. Por isso a instalacao atual precisa de `--legacy-peer-deps` ate que o PrimeNG seja atualizado com teste visual.

## Cuidados antes de alterar

- Nao mover ou renomear imagens em `src/assets/images` sem revisar os templates da home e do admin.
- Nao adicionar rotas privadas ao `sitemap.xml`.
- Manter `robots.txt` bloqueando rotas administrativas e de login.
- Ao alterar a home publica, validar desktop e mobile: existem versoes separadas do card de perfil e do menu.
- Preferir componentes focados por secao a crescimento do `IndexComponent`.

## Estrutura relevante

- `src/app/view/usuario/index/index.component.ts`: carrega Firestore, GitHub, formulario, datas comemorativas e navegacao.
- `src/app/view/usuario/index/components/profile-card`: perfil desktop/mobile.
- `src/app/view/usuario/index/components/portfolio-nav`: menu lateral e menu responsivo.
- `src/app/view/usuario/index/components/about-section`: sobre, areas e carousel.
- `src/app/view/usuario/index/components/resume-section`: resumo, grafico e chips.
- `src/app/view/usuario/index/components/projects-section`: cards de projetos.
- `src/app/view/usuario/index/components/contact-section`: formulario de contato.
- `src/sitemap.xml` e `src/robots.txt`: SEO tecnico basico.
- `src/app/view/adm/admin`: dashboard e painel administrativo principal.
- `src/app/view/adm/edit`: telas profundas de edicao de areas, projetos e itens do resumo.

## Padrao de trabalho

- Use dados tipados das interfaces em `src/app/model/services/interfaces`.
- Preserve `target="_blank"` com `rel="noopener noreferrer"`.
- Para novas secoes publicas, crie um componente novo e passe dados via `@Input`.
- Para acoes da UI, emita `@Output` e trate efeitos colaterais no componente pai.
- Para o admin, mantenha a linguagem visual em paineis claros, sidebar escura, botoes de acao consistentes e formularios em grid responsivo.
- Para PageSpeed, nao reintroduza bibliotecas pesadas na home sem necessidade: admin/login/editores ficam em lazy modules, graficos publicos devem preferir CSS/HTML, e fontes externas devem ser evitadas na tela publica.
- `firebase.json` define cache longo para assets versionados e `no-cache` para `index.html`; preserve essa politica ao alterar deploy.
- Rode build antes de finalizar qualquer alteracao estrutural.
