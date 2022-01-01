# My Node.js template builder

Cria automaticamente um projeto Node.js com [Express](https://expressjs.com/) com algumas personalizações, baseado em meu modelo

## ❓ Como usar
```
git clone https://github.com/josejefferson/my-nodejs-template-builder.git project-name
cd project-name
npm install
node install.js
```
> Isto irá criar um diretório `project-name`


## 🚀 Executar
### Iniciar servidor (produção)
```
npm start
```

### Iniciar servidor (desenvolvimento)
```
npm run dev
```

### Build
```
npm run build
```
> Apenas se escolher SASS e/ou Gulp na [personalização](#-personalizações) do projeto


## 🔧 Personalizações
Ao executar o comando `node install.js` irá aparecer algumas perguntas sobre o projeto:
1) **Nome do projeto**
2) **Autor do projeto**
3) **Descrição do projeto**
4) **Criar um repositório [Git](https://git-scm.com/)?**
5) **Usar [ESLint](https://eslint.org/)?**
6) **Usar [SASS](https://sass-lang.com/)?**
7) **Usar [Gulp](https://gulpjs.com/)?**
8) **Usar [Socket.IO](https://socket.io/)?**
9) **Usar [EJS](https://ejs.co/)?**
10) **Usar [.env](https://www.npmjs.com/package/dotenv)?**
11) **Usar [Yarn](https://yarnpkg.com/)?**
> Baseado nas respostas, ao final, alterações às pastas e aos arquivos do projeto serão feitas e as bibliotecas necessárias serão instaladas

## 📁 Estrutura de arquivos
```
📂src/
├─ 📂css/...
├─ 📂img/
│  └─ 📂icons/...
├─ 📂js/...
├─ 📂lib/
│  ├─ 📂css/...
│  ├─ 📂fonts/...
│  └─ 📂js/...
├─ 📂scss/...
├─ 📄favicon.png
├─ 📄index.html
└─ 📄manifest.json
📂views/
└─ 📄index.ejs
📄.env
📄.eslintrc.json
📄.gitignore
📄gulpfile.js
📄index.js
📄package.json
```