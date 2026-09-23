// ===============================
// NAVEGAÇÃO
// ===============================

function mostrarTela(nomeTela) {

    const telas = document.querySelectorAll(".tela");

    telas.forEach(function (tela) {
        tela.classList.remove("ativa");
    });

    const tela = document.getElementById(nomeTela);

    if (tela) {
        tela.classList.add("ativa");
    }

    if (nomeTela === "idosos") {
        listarIdosos();
    }

    if (nomeTela === "responsaveis") {
        listarResponsaveis();
    }

    if (nomeTela === "rotina") {
        listarRotina();
    }

    if (nomeTela === "medicamentos") {
        listarMedicamentos();
    }
}


// ===============================
// MENSAGENS
// ===============================

function mostrarMensagem(idElemento, texto, tipo) {

    const elemento = document.getElementById(idElemento);

    if (!elemento) {
        return;
    }

    elemento.textContent = texto;
    elemento.className = "mensagem " + tipo;
}


function esconderMensagem(idElemento) {

    const elemento = document.getElementById(idElemento);

    if (elemento) {
        elemento.className = "mensagem escondido";
        elemento.textContent = "";
    }
}


// ===============================
// AUMENTAR FONTE
// ===============================

function aumentarFonte() {

    const corpo = document.body;

    const tamanhoAtual =
        parseFloat(
            window.getComputedStyle(corpo).fontSize
        );

    if (tamanhoAtual < 24) {

        corpo.style.fontSize =
            (tamanhoAtual + 2) + "px";
    }
}


// ===============================
// INICIALIZAÇÃO
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    listarIdosos();
    listarResponsaveis();
    listarRotina();
    listarMedicamentos();

});