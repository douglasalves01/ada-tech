import express, { urlencoded } from "express";
import mysql from "mysql2";
////vou fazer como estivesse usando um banco mysql apenas para o exercicio
///Não fiz a
const app = express();
app.listen(3333, () => {
  console.log("App funcionando");
});
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.get("/cadastro", (req, res) => {
  res.render("index.html");
});
app.post("/cadastro", (req, res) => {
  cadastro(req, res);
});
function cadastro(req, res) {
  const name = req.body.name;
  const idade = req.body.year;
  const email = req.body.email;
  const tamanho = req.body.tamanho;
  const categoria = req.body.categoria;
  const valor = req.body.valor;
  const sql = `insert into doacao (name,idade,email,tamanho,categoria,valor) values ('${name}','${idade}','${email}','${tamanho}','${categoria}','${valor}')`;
  conn.query(sql, (err) => {
    if (err) {
      console.log(err);
    }
    res.send("cadastro realizado com sucesso");
  });
}

abreConexao();

const conn = mysql.createConnection({
  host: "seuHost",
  user: "seuUser",
  password: "suaSenha",
  database: "seuBanco",
});
function abreConexao() {
  conn.connect((err) => {
    if (err) {
      console.log(err);
    }
    console.log("Conectou no banco de dados.....");
    app.listen(3000);
  });
}
