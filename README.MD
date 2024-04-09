# FOOD EXPLORER API

## Instalando as dependências
`npm install`

### Migrations
O projeto possui no arquivo de server uma instrução para já executar as migrations quando o servidor for criado, porém, caso queira executar manualmente, você pode utilizar o comando abaixo: 

#### Executando a migration
A execução da primeira migration irá criar o arquivo de banco de dados do SQLite com as tabelas configuradas nos arquivos de migration.

`npm run migration`

#### Seed
Para facilitar, criei um arquivo de seeds que fica dentro do diretório de bancos de dados, contendo um exemplo de lista de pratos baseado no material do Figma e com contas de usuários aleatórias.

Quando o script de seed for executado ele irá fazer um reset do banco, então use com extremo cuidado.

`npm run seed`

#### Criação manual das migrations (apenas a título de conhecimento): 

``` 
npx knex migrate:make createUsers --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createIngredients --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createCategories --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createDishes --knexfile .\src\database\knex\config\knexfile.js
```

#### Migration para a versão mais atual (apenas a título de conhecimento)
npm run migration

#### Rollback (apenas a título de conhecimento)
npm run migration 
