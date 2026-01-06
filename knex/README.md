# 🧪 Roteiro de Aula Autônoma — Node.js + MySQL com Knex

## 🎯 Objetivos da aula

Nesta atividade, você vai:

- Integrar um projeto Node.js com um banco MySQL usando **Knex.js**
- Configurar a conexão com o banco de dados
- Criar uma **migration** para a tabela `students`
- Implementar operações básicas de **CRUD** usando Knex
- Expor essas operações em uma API REST com Express

> Ao final, você terá uma API Node.js conectada ao MySQL usando Knex.

---

## 1️⃣ Preparar o ambiente

### 1.1. Pré-requisitos

- Node.js instalado
- Acesso ao MySQL (por exemplo: `mysql-techof.alwaysdata.net`)
- Um database criado, por exemplo:  
  `techof_NOME_DO_ALUNO`

Anote as credenciais:

- host
- port
- user
- password
- database

---

### 1.2. Criar o projeto Node.js

```bash
mkdir node-mysql-knex
cd node-mysql-knex
npm init -y
npm install express knex mysql2
npm install --save-dev nodemon
```

Adicionar no `package.json` o script:

```json
"scripts": {
  "dev": "nodemon src/server.js"
}
```

Criar estrutura de pastas:

```bash
mkdir src
mkdir src/db
mkdir src/routes
```

---

## 2️⃣ Configurar o Knex

### 2.1. Criar arquivo de configuração do Knex

Crie o arquivo `knexfile.js` na raiz do projeto:

```js
export default {
  development: {
    client: "mysql2",
    connection: {
      host: "mysql-techof.alwaysdata.net",
      user: "SEU_USUARIO",
      password: "SUA_SENHA",
      database: "techof_NOME_DO_ALUNO"
    },
    migrations: {
      directory: "./migrations"
    }
  }
};
```

> Ajuste `user`, `password` e `database` com seus dados reais.

---

### 2.2. Criar instância do Knex

Arquivo: `src/db/knex.js`

```js
import knex from "knex";
import config from "../../knexfile.js";

export const db = knex(config.development);
```

---

## 3️⃣ Criar a tabela com Migration

### 3.1. Criar pasta de migrations

```bash
mkdir migrations
```

### 3.2. Criar migration para `students`

Crie o arquivo `migrations/001_create_students.js`:

```js
export function up(knex) {
  return knex.schema.createTable("students", table => {
    table.increments("id").primary();
    table.string("name", 100).notNullable();
    table.string("email", 100).notNullable().unique();
    table.string("course", 100).notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists("students");
}
```

### 3.3. Rodar a migration

Adicione no `package.json` (scripts):

```json
"migrate": "node --experimental-modules ./node_modules/knex/bin/cli.js migrate:latest"
```

Ou rode diretamente:

```bash
npx knex migrate:latest --esm
```

> Verifique se a tabela `students` foi criada no MySQL (via DBeaver ou phpMyAdmin).

---

## 4️⃣ Criar a API com Express

### 4.1. Criar o servidor Express

Arquivo: `src/server.js`

```js
import express from "express";
import { db } from "./db/knex.js";
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
app.use(express.json());

app.use("/students", studentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
```

---

### 4.2. Criar rotas de Students

Arquivo: `src/routes/studentRoutes.js`

```js
import { Router } from "express";
import { db } from "../db/knex.js";

const router = Router();

// GET /students -> lista todos
router.get("/", async (req, res) => {
  try {
    const students = await db("students").select("*");
    res.json(students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao buscar students" });
  }
});

// POST /students -> cria um novo
router.post("/", async (req, res) => {
  try {
    const { name, email, course } = req.body;
    const [id] = await db("students").insert({ name, email, course });
    const student = await db("students").where({ id }).first();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao criar student" });
  }
});

// PUT /students/:id -> atualiza
router.put("/:id", async (req, res) => {
  try {
    const { name, email, course } = req.body;
    await db("students").where({ id: req.params.id }).update({ name, email, course });
    const student = await db("students").where({ id: req.params.id }).first();
    res.json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao atualizar student" });
  }
});

// DELETE /students/:id -> remove
router.delete("/:id", async (req, res) => {
  try {
    await db("students").where({ id: req.params.id }).del();
    res.json({ message: "Student removido" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro ao deletar student" });
  }
});

export default router;
```

---

## 5️⃣ Testar a API

Iniciar o servidor:

```bash
npm run dev
```

Testar no Insomnia/Postman:

- `GET http://localhost:3000/students`
- `POST http://localhost:3000/students`
  ```json
  {
    "name": "Maria",
    "email": "maria@example.com",
    "course": "Fullstack"
  }
  ```

- `PUT http://localhost:3000/students/1`
- `DELETE http://localhost:3000/students/1`

---

## 6️⃣ Desafios extras (opcionais)

- Adicionar paginação: `GET /students?page=1&limit=10`
- Adicionar filtros por `course`
- Tratar erros de email duplicado (unique constraint)
- Criar outra tabela (ex: `courses`) e fazer relação na mão via `course_id`

---

## ✅ Entrega esperada

- Projeto Node.js conectado ao MySQL via Knex
- Tabela `students` criada via migration
- CRUD completo disponível em `/students`
- Código organizado em `src/db` e `src/routes`
