import React, { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// mapa de permissões por role
const permissions = {
  student: ["post:create", "post:read", "post:update:own", "post:delete:own"],
  admin: [
    "post:create",
    "post:read",
    "post:update:any",
    "post:delete:any",
    "course:manage"
  ]
};

// helper de autorização no frontend
function can(user, action) {
  if (!user) return false;
  const list = permissions[user.role] || [];
  return list.includes(action);
}

export default function App() {
  const [name, setName] = useState("ZecaGomes@domain.com");
  const [password, setPassword] = useState("password123");
  const [token, setToken] = useState("");
  const [loggedStudent, setLoggedStudent] = useState(null);

  const [posts, setPosts] = useState([]);
  const [students, setStudents] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", comment: "" });

  async function login(e) {
    e.preventDefault();
    try {
      const res = await fetch(API_URL + "/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: name, password })
      });
      if (!res.ok) {
        alert("Login failed");
        return;
      }
      const data = await res.json();
      setToken(data.token);
      // backend deve retornar: { token, student: { id, name, role } }
      setLoggedStudent(data.student);
    } catch (err) {
      console.error(err);
      alert("Erro ao fazer login");
    }
  }

  async function loadStudents() {
    try {
      const res = await fetch(API_URL + "/students?page=1&limit=10");
      const data = await res.json();
      setStudents(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function loadPosts() {
    try {
      const res = await fetch(API_URL + "/posts?page=1&limit=10", {
        headers: token ? { Authorization: "Bearer " + token } : {}
      });
      if (!res.ok) {
        console.warn("Não foi possível carregar posts (talvez não logado?)");
        return;
      }
      const data = await res.json();
      setPosts(data.data || []);
    } catch (err) {
      console.error(err);
    }
  }

  async function createPost(e) {
    e.preventDefault();
    if (!token || !can(loggedStudent, "post:create")) {
      alert("Você não tem permissão para criar posts");
      return;
    }
    try {
      const res = await fetch(API_URL + "/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(newPost)
      });
      if (!res.ok) {
        alert("Erro ao criar post");
        return;
      }
      setNewPost({ title: "", comment: "" });
      loadPosts();
    } catch (err) {
      console.error(err);
      alert("Erro inesperado ao criar post");
    }
  }

  async function deletePost(id, post) {
    if (!token) return;

    const isOwner =
      loggedStudent && post.author && post.author._id === loggedStudent.id;
    const canDeleteAny = can(loggedStudent, "post:delete:any");
    const canDeleteOwn = can(loggedStudent, "post:delete:own") && isOwner;

    if (!canDeleteAny && !canDeleteOwn) {
      alert("Você não tem permissão para deletar este post");
      return;
    }

    if (!window.confirm("Tem certeza que deseja remover este post?")) return;

    try {
      const res = await fetch(API_URL + "/posts/" + id, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token
        }
      });
      if (!res.ok) {
        alert("Erro ao remover post");
        return;
      }
      setPosts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  const isOwner = post =>
    loggedStudent && post.author && post.author._id === loggedStudent.id;

  return (
    <div style={{ fontFamily: "sans-serif", padding: "1rem" }}>
      <h1>Mongoose React Client (Vite)</h1>

      <section style={{ marginBottom: "1rem" }}>
        <h2>Login</h2>
        <form onSubmit={login}>
          <div>
            <label>Name: </label>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label>Password: </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        {token ? (
          <p>
            ✅ Logado como{" "}
            <strong>
              {loggedStudent?.name} ({loggedStudent?.role || "sem role"})
            </strong>
          </p>
        ) : (
          <p>⚠ Faça login para acessar recursos protegidos.</p>
        )}
      </section>

      <section style={{ marginBottom: "1rem" }}>
        <h2>Students (página 1)</h2>
        <button onClick={loadStudents}>Recarregar</button>
        <ul>
          {students.map(s => (
            <li key={s._id}>
              {s.name} – {s.course?.name || "sem curso"}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: "1rem" }}>
        <h2>Posts (rota protegida)</h2>
        <button onClick={loadPosts} disabled={!token}>
          Carregar Posts
        </button>
        {!token && <p>⚠ Faça login para ver e criar posts.</p>}
        <ul>
          {posts.map(p => {
            const canDeleteAny = can(loggedStudent, "post:delete:any");
            const canDeleteOwn =
              can(loggedStudent, "post:delete:own") && isOwner(p);

            return (
              <li key={p._id}>
                <strong>{p.title}</strong> – {p.comment}{" "}
                {p.author && <em>({p.author.name})</em>}
                {(canDeleteAny || canDeleteOwn) && (
                  <>
                    {" "}
                    <button onClick={() => deletePost(p._id, p)}>
                      Deletar
                    </button>
                  </>
                )}
              </li>
            );
          })}
        </ul>

        {token && can(loggedStudent, "post:create") && (
          <>
            <h3>Criar novo Post</h3>
            <form onSubmit={createPost}>
              <div>
                <label>Título: </label>
                <input
                  value={newPost.title}
                  onChange={e =>
                    setNewPost({ ...newPost, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label>Comentário: </label>
                <input
                  value={newPost.comment}
                  onChange={e =>
                    setNewPost({ ...newPost, comment: e.target.value })
                  }
                />
              </div>
              <button type="submit">Criar</button>
            </form>
          </>
        )}

        {token && !can(loggedStudent, "post:create") && (
          <p>Você está logado, mas não tem permissão para criar posts.</p>
        )}
      </section>

      {loggedStudent?.role === "admin" && (
        <section style={{ marginTop: "2rem" }}>
          <h2>Área Admin (exemplo visual)</h2>
          <p>
            Aqui poderiam ficar ações como gerenciar cursos, ver todos os posts,
            estatísticas, etc.
          </p>
        </section>
      )}
    </div>
  );
}
