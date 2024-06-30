const quantidade = document.querySelector("#quantidade");
const tipo = document.querySelector("#tipo");
const tamanho = document.querySelector("#tamanho");
const entrega = document.querySelector("#entrega");
const outputTexto = document.getElementById("total");
const totalInput = document.getElementById("total-hidden");

const pequenoPreco = 0.6;
const medioPreco = 3.5;
const grandePreco = 5.0;



document.addEventListener("DOMContentLoaded", function () {
  const quantidade = document.getElementById("quantidade");

  if (quantidade) {
    quantidade.addEventListener("keydown", (e) => {
      if (
        e.key !== "ArrowUp" &&
        e.key !== "ArrowDown" &&
        e.key !== "Backspace"
      ) {
        e.preventDefault();
      }
    });
  }
});
const habilitarQuantidade = () => {
  if (tipo.value !== "" && tamanho.value !== "" && entrega.value !== "") {
    quantidade.disabled = false;
    quantidade.value = "";
    outputTexto.textContent = "£ 00.00";
  } else {
    quantidade.disabled = true;
    quantidade.value = "";
    outputTexto.textContent = "£ 00.00";
  }
};

document.addEventListener("DOMContentLoaded", (event) => {
  tipo.addEventListener("change", habilitarQuantidade);
  entrega.addEventListener("change", habilitarQuantidade);
  tamanho.addEventListener("change", (event) => {
    habilitarQuantidade();
    if (tamanho.value === "Pequeno") {
      quantidade.min = 50;
      quantidade.step = 50;
    } else {
      quantidade.min = 1;
      quantidade.step = 1;
    }
    quantidade.value = "";
    outputTexto.textContent = "£ 00.00";
  });

  quantidade.addEventListener("input", () => {
    const tamanhoText = tamanho.options[tamanho.selectedIndex].textContent;
    let preco = 0;

    if (tamanhoText === "Pequeno") {
      preco = pequenoPreco;
    } else if (tamanhoText === "Médio") {
      preco = medioPreco;
    } else if (tamanhoText === "Grande") {
      preco = grandePreco;
    }

    const quantidadeValor = parseInt(quantidade.value);
    if (!isNaN(quantidadeValor)) {
      const total = (quantidadeValor * preco).toFixed(2);
      outputTexto.textContent = "£ " + total;
      totalInput.value = total;
    } else {
      outputTexto.textContent = "£ 00.00";
      totalInput.value = "";
    }
  });
});




