const info = [
  { avaliacao: "1 estrela", totalClientes: 2 },
  { avaliacao: "2 estrelas", totalClientes: 15 },
  { avaliacao: "3 estrelas", totalClientes: 18 },
  { avaliacao: "4 estrelas", totalClientes: 25 },
  { avaliacao: "5 estrelas", totalClientes: 40 },
];

function calcularMediaAvaliacoes(dados) {
  let total = 0;
  let totalClientes = 0;

  dados.forEach((item) => {
    total += Number(item.avaliacao.split(" ")[0]) * item.totalClientes;
    totalClientes += item.totalClientes;
  });

  const media = total / totalClientes;
  return media;
}

const mediaAvaliacoes = calcularMediaAvaliacoes(info);
console.log("A média das avaliações é:", mediaAvaliacoes);
