import { Router } from "express";
import { Post } from "../models/Post.js";

const router = Router();

router.get("/", async(req,res)=>{
  // Esta rota é privada. Requer autenticação para poder listar os posts.
  // Implementar paginação
  // Implementar listagem dos posts
});

router.post("/", async(req,res)=>{
  // Esta rota é privada. Requer autenticação para poder listar os posts.
  // Implementar criação de post
});

router.put("/:id", async(req,res)=>{
  // Esta rota é privada. Requer autenticação para poder listar os posts.
  // Implementar atualização de post
  // Apenas o autor do post pode atualizá-lo
});

router.delete("/:id", async(req,res)=>{
  // Esta rota é privada. Requer autenticação para poder listar os posts.
  // Implementar remoção de post
  // Apenas o autor do post pode removê-lo
});

export default router;
