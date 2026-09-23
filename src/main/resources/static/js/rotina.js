const API_ROTINA = "/rotina";

let rotinaEditando = null;


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