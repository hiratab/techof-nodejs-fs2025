---
## 1. Adicionar `role` ao Model de Student
```js
role: {
    type: String,
    enum: ["student", "admin"],
    default: "student"
  }
```
---

## 2. Atualizar o Seed para Definir Roles
```js
const studentsWithRef = data.map(s => ({
  name: s.name,
  age: s.age,
  skills: s.skills,
  course: courseMap[s.course.name],
  password: s.password || "123456",
  role: s.role || (s.name === "Ana Admin" ? "admin" : "student")
}));
`---
``
### 2.1. Rodar o seed novamente

```bash
npm run seed
```
---

---
## 3. Incluir `role` no JWT e na Resposta do Login
## 3.1. Incluir `role` no JWT e na Resposta do Login
```js
const token = jwt.sign(
  { id: student._id, name: student.name, role: student.role },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);
```
### 3.2. Incluir `role` na resposta do login

```js
res.json({
  token,
  student: {
    id: student._id,
    name: student.name,
    role: student.role
  }
});
```

---

## 4. Criar um Mapa de Permissões no Backend

Crie um arquivo novo:
### `src/permissions.js`

```js
export const permissions = {
  student: ["post:create", "post:read", "post:update:own", "post:delete:own"],
  admin: [
    "post:create",
    "post:read",
    "post:update:any",
    "post:delete:any",
    "course:manage"
  ]
};

export function can(user, action) {
  if (!user) return false;
  const list = permissions[user.role] || [];
  return list.includes(action);
}
```
---

## 5. Garantir que o `authMiddleware` carregue `role` no `req.user`
---

## 6. Usar Permissões na Rota de DELETE de Posts

Agora vamos aplicar a regra:

- `admin` pode deletar **qualquer** post (`post:delete:any`)
- `student` só pode deletar **o próprio** post (`post:delete:own`)

---

## 7. (Opcional) Aplicar a Mesma Lógica no UPDATE de Posts

Exercício extra:

- Repetir a lógica de autorização no `PUT /posts/:id`:
  - `admin` pode editar qualquer post (`post:update:any`)
  - `student` só pode editar post próprio (`post:update:own`)

