const API_MEDICAMENTO = "/medicamento";

let medicamentoEditando = null;

function abrirFormularioMedicamento() {
    medicamentoEditando = null;

    document.getElementById("formularioMedicamento").classList.remove("escondido");

    limparFormularioMedicamento();

    document.querySelector("#formularioMedicamento h3").textContent =
        "Adicionar medicamento";
}

function fecharFormularioMedicamento() {
    document.getElementById("formularioMedicamento").classList.add("escondido");

    medicamentoEditando = null;

    limparFormularioMedicamento();
}

function limparFormularioMedicamento() {
    document.getElementById("nomeMedicamento").value = "";
    document.getElementById("dosagemMedicamento").value = "";
    document.getElementById("quantidadeMedicamento").value = "";
    document.getElementById("validadeMedicamento").value = "";
    document.getElementById("intervaloMedicamento").value = "";
    document.getElementById("horarioMedicamento").value = "";
}

async function cadastrarMedicamento() {

    const medicamento = {
        nome: document.getElementById("nomeMedicamento").value,
        dosagem: document.getElementById("dosagemMedicamento").value,
        quantidade: Number(
            document.getElementById("quantidadeMedicamento").value
        ),
        validade: document.getElementById("validadeMedicamento").value,
        intervaloHoras: Number(
            document.getElementById("intervaloMedicamento").value
        ),
        horario: document.getElementById("horarioMedicamento").value
    };

    try {

        let url = API_MEDICAMENTO + "/cadastrarMedicamento";
        let metodo = "POST";

        if (medicamentoEditando !== null) {
            url =
                API_MEDICAMENTO +
                "/atualizarMedicamento?id=" +
                medicamentoEditando;

            metodo = "PUT";
        }

        const resposta = await fetch(url, {
            method: metodo,
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(medicamento)
        });

        if (!resposta.ok) {

            const mensagem = await resposta.text();

            mostrarMensagem(
                "mensagemMedicamento",
                mensagem || "Não foi possível salvar o medicamento.",
                "erro"
            );

            return;
        }

        mostrarMensagem(
            "mensagemMedicamento",
            medicamentoEditando === null
                ? "Medicamento cadastrado com sucesso!"
                : "Medicamento atualizado com sucesso!",
            "sucesso"
        );

        fecharFormularioMedicamento();

        listarMedicamentos();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "mensagemMedicamento",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}

async function listarMedicamentos() {

    const lista = document.getElementById("listaMedicamentos");

    if (!lista) return;

    lista.innerHTML =
        "<p class='carregando'>Carregando medicamentos...</p>";

    try {

        const resposta = await fetch(
            API_MEDICAMENTO + "/listarMedicamento"
        );

        if (!resposta.ok) {

            lista.innerHTML =
                "<p>Não foi possível carregar os medicamentos.</p>";

            return;
        }

        const medicamentos = await resposta.json();

        lista.innerHTML = "";

        if (medicamentos.length === 0) {

            lista.innerHTML =
                "<p>Nenhum medicamento cadastrado.</p>";

            return;
        }

        medicamentos.forEach(function (medicamento) {

            const card = document.createElement("div");

            card.className = "card-medicamento";

            card.innerHTML = `
                <h3>${medicamento.nome}</h3>

                <p>
                    <strong>Dosagem:</strong>
                    ${medicamento.dosagem}
                </p>

                <p>
                    <strong>Quantidade:</strong>
                    ${medicamento.quantidade}
                </p>

                <p>
                    <strong>Validade:</strong>
                    ${medicamento.validade}
                </p>

                <p>
                    <strong>Intervalo:</strong>
                    ${medicamento.intervaloHoras} horas
                </p>

                <p>
                    <strong>Horário:</strong>
                    ${medicamento.horario}
                </p>

                <div class="botoes-formulario">

                    <button
                        class="botao-principal"
                        onclick="editarMedicamento(${medicamento.id})">
                        Editar
                    </button>

                    <button
                        class="botao-cancelar"
                        onclick="excluirMedicamento(${medicamento.id})">
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

async function editarMedicamento(id) {

    try {

        const resposta = await fetch(
            API_MEDICAMENTO +
            "/buscarMedicamento?id=" +
            id
        );

        if (!resposta.ok) {

            mostrarMensagem(
                "mensagemMedicamento",
                "Medicamento não encontrado.",
                "erro"
            );

            return;
        }

        const medicamento = await resposta.json();

        medicamentoEditando = id;

        document.getElementById("nomeMedicamento").value =
            medicamento.nome;

        document.getElementById("dosagemMedicamento").value =
            medicamento.dosagem;

        document.getElementById("quantidadeMedicamento").value =
            medicamento.quantidade;

        document.getElementById("validadeMedicamento").value =
            medicamento.validade;

        document.getElementById("intervaloMedicamento").value =
            medicamento.intervaloHoras;

        document.getElementById("horarioMedicamento").value =
            medicamento.horario;

        document.querySelector("#formularioMedicamento h3").textContent =
            "Editar medicamento";

        document
            .getElementById("formularioMedicamento")
            .classList.remove("escondido");

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "mensagemMedicamento",
            "Erro ao buscar o medicamento.",
            "erro"
        );
    }
}

async function excluirMedicamento(id) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir este medicamento?"
    );

    if (!confirmar) return;

    try {

        const resposta = await fetch(
            API_MEDICAMENTO +
            "/deletarMedicamento?id=" +
            id,
            {
                method: "DELETE"
            }
        );

        if (resposta.status === 409) {

            mostrarMensagem(
                "mensagemMedicamento",
                "Não é possível excluir este medicamento porque ele está associado a uma rotina.",
                "erro"
            );

            return;
        }

        if (resposta.status === 404) {

            mostrarMensagem(
                "mensagemMedicamento",
                "Medicamento não encontrado.",
                "erro"
            );

            return;
        }

        if (!resposta.ok) {

            mostrarMensagem(
                "mensagemMedicamento",
                "Não foi possível excluir o medicamento.",
                "erro"
            );

            return;
        }

        mostrarMensagem(
            "mensagemMedicamento",
            "Medicamento excluído com sucesso!",
            "sucesso"
        );

        listarMedicamentos();

    } catch (erro) {

        console.error(erro);

        mostrarMensagem(
            "mensagemMedicamento",
            "Erro ao conectar com o servidor.",
            "erro"
        );
    }
}