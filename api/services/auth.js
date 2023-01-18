import bcrypt from "bcryptjs";
const mysql = require('../mysql/mysql').pool;

export const createPasswordHash = async (senha) => 
    bcrypt.hash(senha, 8);

export const checkPassword = (senha, usuarioSenha) =>
    bcrypt.compareSync(senha, usuarioSenha);