const API_IDOSO = "/idoso";

let idosoEditando = null;


// ===============================
// IDOSO
// ===============================

function abrirFormularioIdoso() {
    idosoEditando = null;

    document.getElementById("formularioIdoso").classList.remove("escondido");

    limparFormularioIdoso();

    document.querySelector("#formularioIdoso h3").textContent =
        "Adicionar idoso";
}

function fecharFormularioIdoso() {
    document.getElementById("formularioIdoso").classList.add("escondido");

    idosoEditando = null;

    limparFormularioIdoso();
}

function limparFormularioIdoso() {
    document.getElementById("nomeIdoso").value = "";
    document.getElementById("idadeIdoso").value = "";
    document.getElementById("cpfIdoso").value = "";
    document.getElementById("telefoneIdoso").value = "";
    document.getElementById("emailIdoso").value = "";
    document.getElementById("contatoEmergencia").value = "";
    document.getElementById("telefoneEmergencia").value = "";
    document.getElementById("idResponsavel").value = "";
    document.getElementById("necessitaAcessibilidade").value = "true";
    document.getElementById("tamanhoFonte").value = "16";
}

async function cadastrarIdoso() {
    const idoso = {
        nome: document.getElementById("nomeIdoso").value,
        idade: Number(document.getElementById("idadeIdoso").value),
        cpf: document.getElementById("cpfIdoso").value,
        telefone: document.getElementById("telefoneIdoso").value,
        email: document.getElementById("emailIdoso").value,
        contatoEmergencia: document.getElementById("contatoEmergencia").value,
        telefoneEmergencia: document.getElementById("telefoneEmergencia").value,
        necessitaAcessibilidade:
            document.getElementById("necessitaAcessibilidade").value === "true",
        tamanhoFonte: Number(document.getElementById("tamanhoFonte").value),
        idResponsavel: Number(document.getElementById("idResponsavel").value)
    };

    try {
        let url = API_IDOSO + "/cadastrarIdoso";
        let metodo = "POST";

        if (idosoEditando !== null) {
            url = API_IDOSO + "/atualizarIdoso?id=" + idosoEditando;
            metodo = "PUT";
        }

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idoso)
        });

        if (!resposta.ok) {
            mostrarMensagem(
                "mensagemIdoso",
                "Não foi possível salvar o idoso.",
                "erro"
            );
            return;
        }

        mostrarMensagem(
            "mensagemIdoso",
            idosoEditando === null
                ? "Idoso cadastrado com sucesso!"
                : "Idoso atualizado com sucesso!",
            "sucesso"
        );

        fecharFormularioIdoso();
        listarIdosos();

    } catch (erro) {
        console.error(erro);

        mostrarMensagem(
            "mensagemIdoso",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}

async function listarIdosos() {
    const lista = document.getElementById("listaIdosos");

    if (!lista) {
        return;
    }

    lista.innerHTML = "<p class='carregando'>Carregando idosos...</p>";

    try {
        const resposta = await fetch(
            API_IDOSO + "/listarIdoso"
        );

        if (!resposta.ok) {
            lista.innerHTML = "<p>Não foi possível carregar os idosos.</p>";
            return;
        }

        const idosos = await resposta.json();

        lista.innerHTML = "";

        if (idosos.length === 0) {
            lista.innerHTML = "<p>Nenhum idoso cadastrado.</p>";
            return;
        }

        idosos.forEach(function (idoso) {
            const card = document.createElement("div");

            card.className = "card-responsavel";

            card.innerHTML = `
                <h3>${idoso.nome}</h3>
                <p><strong>Idade:</strong> ${idoso.idade}</p>
                <p><strong>CPF:</strong> ${idoso.cpf}</p>
                <p><strong>Telefone:</strong> ${idoso.telefone}</p>
                <p><strong>E-mail:</strong> ${idoso.email}</p>
                <p><strong>Responsável:</strong> ${idoso.idResponsavel}</p>

                <div class="botoes-formulario">
                    <button class="botao-principal"
                        onclick="editarIdoso(${idoso.id})">
                        Editar
                    </button>

                    <button class="botao-cancelar"
                        onclick="excluirIdoso(${idoso.id})">
                        Excluir
                    </button>
                </div>
            `;

            lista.appendChild(card);
        });

    } catch (erro) {
        console.error(erro);
        lista.innerHTML = "<p>Erro ao conectar com o servidor.</p>";
    }
}

async function editarIdoso(id) {
    try {
        const resposta = await fetch(
            API_IDOSO + "/buscarIdosoPorId?id=" + id
        );

        if (!resposta.ok) {
            alert("Idoso não encontrado.");
            return;
        }

        const idoso = await resposta.json();

        idosoEditando = id;

        document.getElementById("nomeIdoso").value = idoso.nome;
        document.getElementById("idadeIdoso").value = idoso.idade;
        document.getElementById("cpfIdoso").value = idoso.cpf;
        document.getElementById("telefoneIdoso").value = idoso.telefone;
        document.getElementById("emailIdoso").value = idoso.email;
        document.getElementById("contatoEmergencia").value =
            idoso.contatoEmergencia;
        document.getElementById("telefoneEmergencia").value =
            idoso.telefoneEmergencia;
        document.getElementById("idResponsavel").value =
            idoso.idResponsavel;
        document.getElementById("necessitaAcessibilidade").value =
            String(idoso.necessitaAcessibilidade);
        document.getElementById("tamanhoFonte").value =
            idoso.tamanhoFonte;

        document.querySelector("#formularioIdoso h3").textContent =
            "Editar idoso";

        document.getElementById("formularioIdoso")
            .classList.remove("escondido");

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar o idoso.");
    }
}

async function excluirIdoso(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir este idoso?"
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(
            API_IDOSO + "/deletarIdoso?id=" + id,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            mostrarMensagem(
                "mensagemIdoso",
                "Não foi possível excluir o idoso.",
                "erro"
            );
            return;
        }

        mostrarMensagem(
            "mensagemIdoso",
            "Idoso excluído com sucesso!",
            "sucesso"
        );

        listarIdosos();

    } catch (erro) {
        console.error(erro);

        mostrarMensagem(
            "mensagemIdoso",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}