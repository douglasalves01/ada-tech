const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Digite seu peso em kg: ", (pesoInput) => {
  const peso = parseFloat(pesoInput);

  rl.question("Digite sua altura em metros: ", (alturaInput) => {
    const altura = parseFloat(alturaInput);

    const imc = peso / (altura * altura);

    let mensagem = `Seu IMC é ${imc.toFixed(2)}. Você está na faixa de: `;

    if (imc < 18.5) {
      mensagem += "abaixo do peso.";
    } else if (imc < 24.9) {
      mensagem += "peso normal.";
    } else if (imc < 29.9) {
      mensagem += "sobrepeso.";
    } else {
      mensagem += "obesidade.";
    }

    console.log(mensagem);

    rl.close();
  });
});
