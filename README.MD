# FOOD EXPLORER API

## Instalando as dependências
npm install

### Migrations
O projeto possui no arquivo de server uma instrução para já executar as migrations quando o servidor for criado, porém, caso queira executar manualmente, você pode utilizar o comando abaixo: 

#### Criação das migrations: 

``` 
npx knex migrate:make createUsers --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createIngredients --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createCategories --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createDishes --knexfile .\src\database\knex\config\knexfile.js
```

#### Migration para a versão mais atual
npm run migration

#### Rollback
npm run migration 