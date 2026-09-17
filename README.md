# 🤝 Mão Amiga

Sistema desenvolvido como projeto acadêmico para gerenciamento e organização de informações relacionadas ao acompanhamento de pessoas idosas.

O projeto possui uma **API REST desenvolvida em Java e Spring Boot**, integrada a um banco de dados MySQL.

---

## 🎯 Objetivo

O objetivo do sistema é centralizar e organizar informações importantes relacionadas ao acompanhamento do idoso.

Através da API, é possível realizar operações de **cadastro, consulta, atualização e exclusão (CRUD)** dos principais dados utilizados pelo sistema.

A utilização dos CRUDs permite manter essas informações organizadas, facilitar sua manutenção e permitir que os dados sejam consultados e atualizados conforme necessário.

---

# 🧩 Módulos do sistema

A definição dos principais módulos foi realizada a partir das necessidades identificadas para o projeto. Durante o desenvolvimento, **Edson e Diego discutiram a estrutura do módulo de idosos e a relação entre o idoso e seu responsável**, buscando definir quais informações seriam necessárias e como elas seriam organizadas no sistema.

A partir dessa discussão, foi definida a utilização de entidades separadas para **Idoso** e **Responsável**, permitindo que as informações da pessoa acompanhada e de quem auxilia em seu acompanhamento sejam mantidas de forma organizada.

---

## 👴 Idoso

O CRUD de **Idoso** é responsável por armazenar as informações da pessoa que está sendo acompanhada.

A separação dessa entidade é importante porque o idoso representa a pessoa principal do acompanhamento e possui informações próprias, como dados pessoais e configurações relacionadas à acessibilidade.

São armazenados dados como:

* Nome
* Idade
* CPF
* Telefone
* E-mail
* Informações de acessibilidade
* Tamanho da fonte
* Responsável vinculado

O idoso possui um **responsável associado**, permitindo relacionar o cadastro da pessoa acompanhada com quem auxilia em seu acompanhamento.

### Operações

```text
POST   /idoso/cadastrarIdoso
GET    /idoso/listarIdoso
GET    /idoso/buscarIdosoPorId
PUT    /idoso/atualizarIdoso
DELETE /idoso/deletarIdoso
```

---

## 👤 Responsável

O CRUD de **Responsável** foi criado para manter separadas as informações da pessoa que auxilia no acompanhamento do idoso.

Essa separação permite evitar que os dados do responsável sejam misturados aos dados do idoso e facilita o relacionamento entre essas informações no banco de dados.

Um responsável pode estar associado a um ou mais idosos, enquanto cada idoso possui um responsável vinculado.

São armazenados:

* Nome
* CPF
* Telefone
* E-mail
* Tipo de vínculo

### Operações

```text
POST   /responsavel/cadastrarResponsavel
GET    /responsavel/listarResponsavel
GET    /responsavel/buscarResponsavelPorId
PUT    /responsavel/atualizarResponsavel
DELETE /responsavel/deletarResponsavel
```

---

## 📅 Rotina

O CRUD de **Rotina** é responsável pelo registro das atividades e horários importantes do dia a dia.

Esse módulo foi definido para permitir que as atividades sejam armazenadas e gerenciadas separadamente das informações pessoais do idoso.

São registradas informações como:

* Descrição da atividade
* Horário
* Status de conclusão

Exemplos de atividades:

* Tomar medicamento
* Fazer uma refeição
* Realizar uma atividade
* Caminhar
* Ir a uma consulta

### Operações

```text
POST   /rotina/registrarRotina
GET    /rotina/listarRotina
GET    /rotina/buscarIdRotina
PUT    /rotina/atualizarRotina
DELETE /rotina/deletarRotina
```

---

# 🏗️ Arquitetura do Backend

O backend segue uma arquitetura em camadas:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
JPA / Hibernate
    ↓
MySQL
```

### Controller

Recebe as requisições HTTP e disponibiliza os endpoints da API.

### Service

Concentra as regras de negócio e validações.

### Repository

Responsável pelo acesso aos dados utilizando Spring Data JPA.

### Model

Representa as entidades utilizadas pelo sistema e seu mapeamento para as tabelas do banco.

---

# 🗄️ Banco de dados

O sistema utiliza **MySQL** para armazenar as informações.

As principais entidades atualmente implementadas são:

```text
Responsável
     │
     │ 1:N
     ↓
   Idoso

Rotina
```

A relação entre **Responsável e Idoso** foi definida dessa forma durante a discussão da estrutura do módulo de idosos, considerando que um responsável pode acompanhar mais de uma pessoa, enquanto cada idoso possui um responsável vinculado.

---

# 🛠️ Tecnologias utilizadas

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Hibernate
* Maven
* Lombok
* API REST

### Banco de dados

* MySQL
* SQL

### Testes

* Insomnia

### Ferramentas

* IntelliJ IDEA
* Git
* GitHub

---

# 🧪 Testes

Os endpoints da API são testados utilizando o **Insomnia**.

São verificadas as principais operações dos CRUDs:

* Cadastro
* Consulta por ID
* Listagem
* Atualização
* Exclusão
* Validações
* Comunicação com o banco de dados

Os dados também podem ser conferidos diretamente no MySQL para verificar se as operações foram persistidas corretamente.

---

# 📌 Status

🟡 **Em desenvolvimento**

### Implementado

* ✅ Estrutura do projeto Spring Boot
* ✅ API REST
* ✅ Integração com MySQL
* ✅ CRUD de Idoso
* ✅ CRUD de Responsável
* ✅ CRUD de Rotina
* ✅ Regras de negócio e validações
* ✅ Testes dos endpoints com Insomnia

### Próximas etapas

* ⏳ CRUD de Remédios
* ⏳ CRUD de Consultas
* ⏳ CRUD de Registro de Saúde
* ⏳ Evolução das regras de negócio
* ⏳ Novos testes da API

---

# 📚 Documentação

A documentação detalhada do projeto está sendo desenvolvida no **GitBook**, contendo informações sobre:

* Requisitos
* Arquitetura
* Banco de dados
* API
* CRUDs
* Testes
* Evolução do projeto

---

# 🚀 Evolução do projeto

O desenvolvimento do sistema ocorre de forma incremental.

A primeira etapa foi voltada para a definição da estrutura do banco de dados e das principais entidades. Em seguida, foram desenvolvidos os CRUDs e as regras de negócio da API.

Atualmente, o sistema conta com os CRUDs de **Idoso, Responsável e Rotina**, permitindo trabalhar com o cadastro e gerenciamento dessas informações através da API REST.

As próximas etapas consistem na expansão do sistema com novos módulos e no aprimoramento das funcionalidades já implementadas.
