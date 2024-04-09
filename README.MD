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


### Executando o servidor
#### Em desevnolvimento
No ambiente de desenvolvimento, a API utiliza o próprio recurso do node que permite a execução e monitoração dos arquivos para reiniciar o servidor no caso de qualquer alteração.

`npm run dev`

#### Em produção
Já em produção, utilizamos o P2M para manter a aplicação resiliente.

<a href="https://pm2.keymetrics.io/">P2M Link</a>

`npm start`

### Apenas a título de conhecimento

#### Criação manual dos arquivos de migration

``` 
npx knex migrate:make createUsers --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createIngredients --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createCategories --knexfile .\src\database\knex\config\knexfile.js
npx knex migrate:make createDishes --knexfile .\src\database\knex\config\knexfile.js
```

#### Migration para a versão mais atual 
`npm run migration-up`

#### Rollback
`npm run migration-down`
