## Postgres commands

```bash
postgres=# \c  // connect to an database
```


## Testes

> Estou usando JEST como test runner e Sqlite3 como base de dados.

Para criar a base de dados antes de iniciarem os testes.

```js
  beforeAll(async () => {
    // conexão vinda do @database
    const connection = await createConnection()
    
    await connection.runMigrations()
  })
```

A cada ciclo de testes o db.sqlite é excluido com o script no package.json

```json
  {
    "scripts": {
      "posttest": //script
    }
  }
```
