# FOOD EXPLORER API

## Instalando as dependências
`npm install`

### Migrations
O projeto possui no arquivo de server uma instrução para já executar as migrations quando o servidor for criado, porém, caso queira executar manualmente, você pode utilizar o comando abaixo: 

#### Criação manual das migrations (não é necessário): 

``` 
npx knex migrate:make createUsers --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createIngredients --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createCategories --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createDishes --knexfile .\src\database\knex\config\knexfile.js
```

#### Migration para a versão mais atual
A execução da primeira migration irá criar o banco de dados caso ele não exista e atualizá-lo caso alguma configuração dos arquivos de migrations tenha sido adicionado.

`npm run migration`

#### Preenchendo o banco com os arquivos de SEED.
Assim que o banco é criado, crio algumas contas de exemplo para o projeto para já ter um catálogo de pratos pré-cadastrado.

`npm run seed`

### 