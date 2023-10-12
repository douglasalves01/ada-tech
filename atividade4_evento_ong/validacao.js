const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const valor = document.getElementById("donation");
const confirmPassword = document.getElementById("password-confirm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); //cancela os comportamentos padrões da página

  checkInputs(); //executar a função
});

function checkInputs() {
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const valorValue = password.value.trim();

  if (usernameValue == "") {
    errorValidation(username, "Preencha o campo");
  } else {
    sucessValidation(username);
  }
  if (emailValue == "") {
    errorValidation(email, "Preencha o campo");
  } else {
    sucessValidation(email);
  }
  if (valorValue == "") {
    errorValidation(valor, "Preencha o campo");
  } else {
    sucessValidation(valor);
  }
}
function errorValidation(input, message) {
  const controle = input.parentElement; //pegando o elemento pai
  const small = controle.querySelector("small");

  small.innerText = message;

  controle.className = "controle erro";
}
function sucessValidation(input) {
  const controle = input.parentElement;
  controle.className = "controle sucesso";
}
