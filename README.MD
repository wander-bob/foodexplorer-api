<h1 align="center"> FOODEXPLOER BACKEND </h1>

<p>
  Projeto da conclusão da trilha Explorer da Rocketseat, onde criamos um sistema para restaurantes aplicando os conceitos que aprendemos durante a trilha.
</p>

O projeto pode ser acessado nesse [link](https://admirable-dodol-bf77d4.netlify.app/).

<br>

## 🚀 Tecnologias

O backend desse projeto foi desenvolvido com as seguintes tecnologias:

- <p><a href="https://nodejs.org/">NodeJS</a></p>
- <p><a href="https://expressjs.com/">ExpressJS</a></p>
- <p><a href="https://www.sqlite.org/">SQLite</a></p>
- <p><a href="https://knexjs.org/">KnexJS</a></p>
- <p><a href="https://pm2.keymetrics.io/">PM2</a></p>
- <p><a href="https://sqlite.org">SQLite</a></p>


<br>
<div style="display: flex; align-itens:center;justify-content: space-evenly; gap: 16px;">
  <img src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg" alt="NodeJS" height="32" width="32"/>
  <img src="https://cdn.worldvectorlogo.com/logos/knex-1.svg" alt="KnexJS" height="32" width="32"/>
  <img src="https://cdn.worldvectorlogo.com/logos/express-109.svg" alt="ExpressJS" width="80px"/>
  <img src="https://cdn.worldvectorlogo.com/logos/pm2.svg" alt="PM2" height="32" width="80"/>
  <img src="https://cdn.worldvectorlogo.com/logos/sqlite.svg" alt="SQLite" height="32" width="80"/>

</div>

## 💻 Projeto

O foodexplorer é um aplicativo de restaurante que permite a um gerente do estabelecimento cadastrar e excluir novos pratos e também aos clientes visualizar os pratos e adicioná-los a um carrinho.

No backend, criamos um servidor capaz de processar as requisições e armazenar dados e imagens em um banco de dados em memória, além de servir esses dados e arquivos de volta para o frontend.

## 🔖 Layout

Você pode visualizar o layout do projeto através [DESSE LINK](https://www.figma.com/community/file/1196874589259687769). É necessário ter conta no [Figma](https://figma.com) para acessá-lo.

## Licença

Esse projeto está sob a licença MIT.

<div align="center">
<img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</div>

## Instalando o projeto
Primeiramente, você vai precisar dos requisitos abaixo: 
- Baixar e instalar o NODEJS [link](https://nodejs.org/en/download).
- Baixar e instalar o GIT HUB CLI (só porque é mais fácil gerenciar repositórios com ele mesmo) [link](https://cli.github.com/)

1 - Crie ou escolha uma pasta para armazenar os repositórios via um terminal de sua escolha: 

Exemplo: 

```
  cd documents
  mkdir myprojects
  cd myprojects
```

2 - Clone o repositório do fronted: 

```  
  gh repo clone wander-bob/foodexplorer-web
```

3 - E também o repositório do backend: 

```  
  gh repo clone wander-bob/foodexplorer-api
```

4 - Abra um novo terminal e em cada um dos terminais acesse os repositórios do frontend e backend.

E neles, execute o comando de instalação das dependências:

```
  npm i

```
5 - Execute as migrações para a criação do banco de dados e o processo de seeding, para ter uma lista de pratos e usuários prévios para já poder utilizar o projeto. 

```
  npx run migration
  npx run seed
```

 - Por fim, basta criar um arquivo `.env` no repositório do backend e nela, criar as variáveis sujeridas no arquivo .env_example e executar o frontend e backend do projeto: 

```
npm run dev
```
---
