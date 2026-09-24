# Starless Studios — React + TypeScript

Conversão do HTML original para um projeto **Vite + React + TypeScript**. O layout e o conteúdo são preservados; os canvases Three.js agora são componentes com inicialização e limpeza pelo ciclo de vida do React.

## Executar

Requer Node.js 20.19+ ou 22.12+.

```bash
npm install
npm run dev
```

Para compilar e conferir os tipos:

```bash
npm run build
npm run preview
```

## Estrutura

- `src/App.tsx`: roteamento por hash, compatível com os links `#/p/camera-system` do HTML original e com `#work`, `#studio` e `#elsewhere`.
- `src/components/`: header, home, footer, wiki e blocos de documentação.
- `src/graphics/`: fundo de partículas e Dead Star (Three.js), com shaders GLSL separados.
- `src/data/site.json`: **edite aqui** nome, links, projetos, textos e blocos de wiki.
- `src/types/site.ts`: tipos TypeScript dos dados.
- `src/styles/site.css`: CSS original, preservado.
- `public/favicon.svg`: ícone original.

## Antes de publicar

Substitua os links de exemplo em `src/data/site.json` — especialmente `builtbybit.com/members/your-id/` — e o vídeo de demonstração de exemplo. Os campos de imagens vazios foram mantidos como placeholders, sem inventar mídias.

Os campos `value` dos blocos de texto, lista e nota aceitam **HTML de formatação escrito no JSON local**, como no arquivo original. Se algum dia eles vierem de usuários ou de uma API, sanitize o HTML antes de passá-lo a `dangerouslySetInnerHTML`.

O roteamento usa hash: funciona em hospedagem estática sem configurar rewrites no servidor.
