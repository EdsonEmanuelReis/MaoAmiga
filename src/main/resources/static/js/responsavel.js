const API_RESPONSAVEL = "/responsavel";

let responsavelEditando = null;


// ===============================
// RESPONSÁVEL
// ===============================

function abrirFormularioResponsavel() {
    responsavelEditando = null;

    document.getElementById("formularioResponsavel")
        .classList.remove("escondido");

    limparFormularioResponsavel();

    document.querySelector("#formularioResponsavel h3").textContent =
        "Adicionar responsável";
}

function fecharFormularioResponsavel() {
    document.getElementById("formularioResponsavel")
        .classList.add("escondido");

    responsavelEditando = null;

    limparFormularioResponsavel();
}

function limparFormularioResponsavel() {
    document.getElementById("nomeResponsavel").value = "";
    document.getElementById("cpfResponsavel").value = "";
    document.getElementById("telefoneResponsavel").value = "";
    document.getElementById("emailResponsavel").value = "";
    document.getElementById("tipoVinculo").value = "";
}

async function cadastrarResponsavel() {
    const responsavel = {
        nome: document.getElementById("nomeResponsavel").value,
        cpf: document.getElementById("cpfResponsavel").value,
        telefone: document.getElementById("telefoneResponsavel").value,
        email: document.getElementById("emailResponsavel").value,
        tipo_vinculo: document.getElementById("tipoVinculo").value
    };

    try {
        let url = API_RESPONSAVEL + "/cadastrarResponsavel";
        let metodo = "POST";

        if (responsavelEditando !== null) {
            url =
                API_RESPONSAVEL +
                "/atualizarResponsavel?id=" +
                responsavelEditando;

            metodo = "PUT";
        }

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(responsavel)
        });

        if (!resposta.ok) {
            mostrarMensagem(
                "mensagemResponsavel",
                "Não foi possível salvar o responsável.",
                "erro"
            );
            return;
        }

        mostrarMensagem(
            "mensagemResponsavel",
            responsavelEditando === null
                ? "Responsável cadastrado com sucesso!"
                : "Responsável atualizado com sucesso!",
            "sucesso"
        );

        fecharFormularioResponsavel();
        listarResponsaveis();

    } catch (erro) {
        console.error(erro);

        mostrarMensagem(
            "mensagemResponsavel",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}

async function listarResponsaveis() {
    const lista = document.getElementById("listaResponsaveis");

    if (!lista) {
        return;
    }

    lista.innerHTML =
        "<p class='carregando'>Carregando responsáveis...</p>";

    try {
        const resposta = await fetch(
            API_RESPONSAVEL + "/listarResponsavel"
        );

        if (!resposta.ok) {
            lista.innerHTML =
                "<p>Não foi possível carregar os responsáveis.</p>";
            return;
        }

        const responsaveis = await resposta.json();

        lista.innerHTML = "";

        if (responsaveis.length === 0) {
            lista.innerHTML =
                "<p>Nenhum responsável cadastrado.</p>";
            return;
        }

        responsaveis.forEach(function (responsavel) {
            const card = document.createElement("div");

            card.className = "card-responsavel";

            card.innerHTML = `
                <h3>${responsavel.nome}</h3>
                <p><strong>CPF:</strong> ${responsavel.cpf}</p>
                <p><strong>Telefone:</strong> ${responsavel.telefone}</p>
                <p><strong>E-mail:</strong> ${responsavel.email}</p>
                <p><strong>Vínculo:</strong> ${responsavel.tipo_vinculo}</p>

                <div class="botoes-formulario">
                    <button class="botao-principal"
                        onclick="editarResponsavel(${responsavel.id})">
                        Editar
                    </button>

                    <button class="botao-cancelar"
                        onclick="excluirResponsavel(${responsavel.id})">
                        Excluir
                    </button>
                </div>
            `;

            lista.appendChild(card);
        });

    } catch (erro) {
        console.error(erro);

        lista.innerHTML =
            "<p>Erro ao conectar com o servidor.</p>";
    }
}

async function editarResponsavel(id) {
    try {
        const resposta = await fetch(
            API_RESPONSAVEL + "/buscarResponsavelPorId?id=" + id
        );

        if (!resposta.ok) {
            alert("Responsável não encontrado.");
            return;
        }

        const responsavel = await resposta.json();

        responsavelEditando = id;

        document.getElementById("nomeResponsavel").value =
            responsavel.nome;

        document.getElementById("cpfResponsavel").value =
            responsavel.cpf;

        document.getElementById("telefoneResponsavel").value =
            responsavel.telefone;

        document.getElementById("emailResponsavel").value =
            responsavel.email;

        document.getElementById("tipoVinculo").value =
            responsavel.tipo_vinculo;

        document.querySelector("#formularioResponsavel h3").textContent =
            "Editar responsável";

        document.getElementById("formularioResponsavel")
            .classList.remove("escondido");

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar o responsável.");
    }
}

async function excluirResponsavel(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir este responsável?"
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(
            API_RESPONSAVEL + "/deletarResponsavel?id=" + id,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            mostrarMensagem(
                "mensagemResponsavel",
                "Não foi possível excluir o responsável.",
                "erro"
            );
            return;
        }

        mostrarMensagem(
            "mensagemResponsavel",
            "Responsável excluído com sucesso!",
            "sucesso"
        );

        listarResponsaveis();

    } catch (erro) {
        console.error(erro);

        mostrarMensagem(
            "mensagemResponsavel",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}