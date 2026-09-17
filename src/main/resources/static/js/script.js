const API_IDOSO = "/idoso";
const API_RESPONSAVEL = "/responsavel";
const API_ROTINA = "/rotina";

let idosoEditando = null;
let responsavelEditando = null;
let rotinaEditando = null;


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


// ===============================
// ROTINA
// ===============================

function abrirFormularioRotina() {
    rotinaEditando = null;

    document.getElementById("formularioRotina")
        .classList.remove("escondido");

    limparFormularioRotina();

    document.querySelector("#formularioRotina h3").textContent =
        "Adicionar atividade";
}

function fecharFormularioRotina() {
    document.getElementById("formularioRotina")
        .classList.add("escondido");

    rotinaEditando = null;

    limparFormularioRotina();
}

function limparFormularioRotina() {
    document.getElementById("descricaoRotina").value = "";
    document.getElementById("horarioRotina").value = "";
    document.getElementById("concluidaRotina").value = "false";
}

async function cadastrarRotina() {
    const rotina = {
        descri: document.getElementById("descricaoRotina").value,
        horario: document.getElementById("horarioRotina").value,
        concluida:
            document.getElementById("concluidaRotina").value === "true"
    };

    try {
        let url = API_ROTINA + "/registrarRotina";
        let metodo = "POST";

        if (rotinaEditando !== null) {
            url =
                API_ROTINA +
                "/atualizarRotina?id=" +
                rotinaEditando;

            metodo = "PUT";
        }

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(rotina)
        });

        if (!resposta.ok) {
            mostrarMensagem(
                "mensagemRotina",
                "Não foi possível salvar a atividade.",
                "erro"
            );
            return;
        }

        mostrarMensagem(
            "mensagemRotina",
            rotinaEditando === null
                ? "Atividade cadastrada com sucesso!"
                : "Atividade atualizada com sucesso!",
            "sucesso"
        );

        fecharFormularioRotina();
        listarRotina();

    } catch (erro) {
        console.error(erro);

        mostrarMensagem(
            "mensagemRotina",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}

async function listarRotina() {
    const lista = document.getElementById("listaRotina");

    if (!lista) {
        return;
    }

    lista.innerHTML =
        "<p class='carregando'>Carregando rotina...</p>";

    try {
        const resposta = await fetch(
            API_ROTINA + "/listarRotina"
        );

        if (!resposta.ok) {
            lista.innerHTML =
                "<p>Não foi possível carregar a rotina.</p>";
            return;
        }

        const rotinas = await resposta.json();

        lista.innerHTML = "";

        if (rotinas.length === 0) {
            lista.innerHTML =
                "<p>Nenhuma atividade cadastrada.</p>";
            return;
        }

        rotinas.forEach(function (rotina) {
            const card = document.createElement("div");

            card.className = "card-rotina";

            let horario = rotina.horario || "Sem horário";

            let status = rotina.concluida
                ? "Concluída"
                : "Pendente";

            card.innerHTML = `
                <h3>${rotina.descri}</h3>
                <p><strong>Horário:</strong> ${horario}</p>

                <span class="rotina-status">
                    ${status}
                </span>

                <div class="botoes-formulario">
                    <button class="botao-principal"
                        onclick="editarRotina(${rotina.id})">
                        Editar
                    </button>

                    <button class="botao-cancelar"
                        onclick="excluirRotina(${rotina.id})">
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

async function editarRotina(id) {
    try {
        const resposta = await fetch(
            API_ROTINA + "/buscarIdRotina?id=" + id
        );

        if (!resposta.ok) {
            alert("Atividade não encontrada.");
            return;
        }

        const rotina = await resposta.json();

        rotinaEditando = id;

        document.getElementById("descricaoRotina").value =
            rotina.descri;

        document.getElementById("horarioRotina").value =
            rotina.horario || "";

        document.getElementById("concluidaRotina").value =
            String(rotina.concluida);

        document.querySelector("#formularioRotina h3").textContent =
            "Editar atividade";

        document.getElementById("formularioRotina")
            .classList.remove("escondido");

    } catch (erro) {
        console.error(erro);
        alert("Erro ao buscar a atividade.");
    }
}

async function excluirRotina(id) {
    const confirmar = confirm(
        "Tem certeza que deseja excluir esta atividade?"
    );

    if (!confirmar) {
        return;
    }

    try {
        const resposta = await fetch(
            API_ROTINA + "/deletarRotina?id=" + id,
            {
                method: "DELETE"
            }
        );

        if (!resposta.ok) {
            mostrarMensagem(
                "mensagemRotina",
                "Não foi possível excluir a atividade.",
                "erro"
            );
            return;
        }

        mostrarMensagem(
            "mensagemRotina",
            "Atividade excluída com sucesso!",
            "sucesso"
        );

        listarRotina();

    } catch (erro) {
        console.error(erro);

        mostrarMensagem(
            "mensagemRotina",
            "Erro ao conectar com o servidor.",
            "erro"
        );
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
});