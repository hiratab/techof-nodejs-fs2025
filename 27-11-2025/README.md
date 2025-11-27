# Parte 1
- Implementar o que esta nos comentarios na parte do backend


# Parte 2
- Adicionar a seguinte propriedade ao Student
```
role: {
  type: String,
  enum: ["student", "admin", "instructor"],
  default: "student"
}
```

- Implementar o seguinte controle
  - Student
    - Pode Criar/Editar/Deleter *apenas os próprios posts*
    - Pode listar courses e students

  - Admin
    - Pode Editar/Deletar *qualquer post*
    - Pode Criar/Editar/Deletar *courses*
    - Pode Listar e *Editar* todos os students 

# Parte 3 (Bonus)
- Implementar o seguinte controle
  - Instrutor
    - Pode Editar/Deleter *apenas os posts dos alunos de seu course*

