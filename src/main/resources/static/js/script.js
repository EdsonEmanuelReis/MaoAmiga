const API_RESPONSAVEL = "/responsavel";
const API_ROTINA = "/rotina";


/* =========================
   NAVEGAÇÃO
========================= */

function mostrarTela(tela) {

    document.querySelectorAll(".tela").forEach(function(elemento) {

        elemento.classList.remove("ativa");

    });


    document.getElementById(tela).classList.add("ativa");


    if (tela === "responsaveis") {

        listarResponsaveis();

    }


    if (tela === "rotina") {

        listarRotina();

    }

}


/* =========================
   MENSAGENS
========================= */

function mostrarMensagem(id, texto, tipo) {

    const mensagem = document.getElementById(id);

    mensagem.textContent = texto;

    mensagem.className = "mensagem " + tipo;

}


function esconderMensagem(id) {

    const mensagem = document.getElementById(id);

    mensagem.className = "mensagem escondido";

    mensagem.textContent = "";

}


/* =========================
   RESPONSÁVEIS
========================= */

async function listarResponsaveis() {

    const lista = document.getElementById("listaResponsaveis");

    lista.innerHTML =
        "<p class='carregando'>Carregando responsáveis...</p>";


    try {

        const resposta =
            await fetch(`${API_RESPONSAVEL}/listarResponsavel`);


        if (!resposta.ok) {

            throw new Error("Erro ao buscar responsáveis");

        }


        const responsaveis = await resposta.json();

        lista.innerHTML = "";


        if (responsaveis.length === 0) {

            lista.innerHTML =
                "<p>Nenhum responsável cadastrado.</p>";

            return;

        }


        responsaveis.forEach(function(responsavel) {

            const card =
                document.createElement("div");


            card.className =
                "card-responsavel";


            card.innerHTML = `

                <h3>
                    👤 ${responsavel.nome}
                </h3>

                <p>
                    <strong>Vínculo:</strong>
                    ${responsavel.tipo_vinculo}
                </p>

                <p>
                    <strong>Telefone:</strong>
                    ${responsavel.telefone}
                </p>

                <p>
                    <strong>E-mail:</strong>
                    ${responsavel.email}
                </p>

            `;


            lista.appendChild(card);

        });


    } catch (erro) {

        console.error(erro);

        lista.innerHTML =
            "<p>Não foi possível carregar os responsáveis.</p>";

    }

}


/* =========================
   FORMULÁRIO RESPONSÁVEL
========================= */

function abrirFormularioResponsavel() {

    esconderMensagem("mensagemResponsavel");

    document
        .getElementById("formularioResponsavel")
        .classList.remove("escondido");

}


function fecharFormularioResponsavel() {

    document
        .getElementById("formularioResponsavel")
        .classList.add("escondido");

}


/* =========================
   CADASTRAR RESPONSÁVEL
========================= */

async function cadastrarResponsavel() {

    const nome =
        document.getElementById("nome").value.trim();


    const cpf =
        document.getElementById("cpf").value.trim();


    const telefone =
        document.getElementById("telefone").value.trim();


    const email =
        document.getElementById("email").value.trim();


    const tipoVinculo =
        document.getElementById("tipoVinculo").value.trim();


    const idIdoso =
        document.getElementById("idIdoso").value;


    if (
        !nome ||
        !cpf ||
        !telefone ||
        !email ||
        !tipoVinculo ||
        !idIdoso
    ) {

        mostrarMensagem(
            "mensagemResponsavel",
            "Preencha todos os campos.",
            "erro"
        );

        return;

    }


    const responsavel = {

        nome: nome,

        cpf: cpf,

        telefone: telefone,

        email: email,

        tipo_vinculo: tipoVinculo,

        idIdoso: Number(idIdoso)

    };


    try {

        const resposta =
            await fetch(
                `${API_RESPONSAVEL}/cadastrarResponsavel`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(responsavel)
                }
            );


        if (!resposta.ok) {

            const mensagem =
                await resposta.text();


            mostrarMensagem(
                "mensagemResponsavel",
                mensagem ||
                "Não foi possível cadastrar o responsável.",
                "erro"
            );

            return;

        }


        mostrarMensagem(
            "mensagemResponsavel",
            "Responsável cadastrado com sucesso!",
            "sucesso"
        );


        limparFormularioResponsavel();

        fecharFormularioResponsavel();

        listarResponsaveis();


    } catch (erro) {

        console.error(erro);


        mostrarMensagem(
            "mensagemResponsavel",
            "Não foi possível conectar ao servidor.",
            "erro"
        );

    }

}


/* =========================
   LIMPAR RESPONSÁVEL
========================= */

function limparFormularioResponsavel() {

    document.getElementById("nome").value = "";

    document.getElementById("cpf").value = "";

    document.getElementById("telefone").value = "";

    document.getElementById("email").value = "";

    document.getElementById("tipoVinculo").value = "";

    document.getElementById("idIdoso").value = "";

}


/* =========================
   ROTINA
========================= */

async function listarRotina() {

    const lista =
        document.getElementById("listaRotina");


    lista.innerHTML =
        "<p class='carregando'>Carregando rotina...</p>";


    try {

        const resposta =
            await fetch(`${API_ROTINA}/listarRotina`);


        if (!resposta.ok) {

            throw new Error("Erro ao buscar rotina");

        }


        const rotinas =
            await resposta.json();


        lista.innerHTML = "";


        if (rotinas.length === 0) {

            lista.innerHTML =
                "<p>Nenhuma atividade cadastrada.</p>";

            return;

        }


        rotinas.forEach(function(rotina) {

            const card =
                document.createElement("div");


            card.className =
                "card-rotina";


            const horario =
                rotina.horario
                    ? rotina.horario.substring(0, 5)
                    : "Sem horário";


            const concluida =
                rotina.concluida
                    ? "Concluída"
                    : "Pendente";


            card.innerHTML = `

                <h3>
                    📅 ${rotina.descri}
                </h3>

                <p>
                    <strong>Horário:</strong>
                    ${horario}
                </p>

                <span class="rotina-status">
                    ${concluida}
                </span>

            `;


            lista.appendChild(card);

        });


    } catch (erro) {

        console.error(erro);


        lista.innerHTML =
            "<p>Não foi possível carregar a rotina.</p>";

    }

}


/* =========================
   FORMULÁRIO ROTINA
========================= */

function abrirFormularioRotina() {

    esconderMensagem("mensagemRotina");


    document
        .getElementById("formularioRotina")
        .classList.remove("escondido");

}


function fecharFormularioRotina() {

    document
        .getElementById("formularioRotina")
        .classList.add("escondido");

}


/* =========================
   CADASTRAR ROTINA
========================= */

async function cadastrarRotina() {

    const descri =
        document
            .getElementById("descricaoRotina")
            .value
            .trim();


    const horario =
        document
            .getElementById("horarioRotina")
            .value;


    if (!descri) {

        mostrarMensagem(
            "mensagemRotina",
            "Digite uma atividade.",
            "erro"
        );

        return;

    }


    const rotina = {

        descri: descri,

        horario: horario || null,

        concluida: false

    };


    try {

        const resposta =
            await fetch(
                `${API_ROTINA}/registrarRotina`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(rotina)
                }
            );


        if (!resposta.ok) {

            const mensagem =
                await resposta.text();


            mostrarMensagem(
                "mensagemRotina",
                mensagem ||
                "Não foi possível cadastrar a atividade.",
                "erro"
            );

            return;

        }


        mostrarMensagem(
            "mensagemRotina",
            "Atividade adicionada à rotina!",
            "sucesso"
        );


        document.getElementById("descricaoRotina").value = "";

        document.getElementById("horarioRotina").value = "";


        fecharFormularioRotina();

        listarRotina();


    } catch (erro) {

        console.error(erro);


        mostrarMensagem(
            "mensagemRotina",
            "Não foi possível conectar ao servidor.",
            "erro"
        );

    }

}


/* =========================
   AUMENTAR FONTE
========================= */

function aumentarFonte() {

    const corpo = document.body;


    const tamanhoAtual =
        parseFloat(
            getComputedStyle(corpo).fontSize
        );


    const tamanhoMaximo = 24;


    if (tamanhoAtual >= tamanhoMaximo) {

        return;

    }


    const novoTamanho =
        Math.min(
            tamanhoAtual + 2,
            tamanhoMaximo
        );


    corpo.style.fontSize =
        novoTamanho + "px";

}