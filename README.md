# **API - Sistema de Conta Bancária**

Este é um sistema de API RESTful para gerenciar contas bancárias de clientes. Ele permite realizar operações como criar contas, realizar depósitos, saques e consultar o extrato e o saldo.

## **Tecnologias Utilizadas**

- **Node.js**: Para execução do servidor.
- **Express.js**: Framework para construção da API.
- **UUID**: Para gerar identificadores únicos de clientes.
- **JavaScript (ES6+)**: Linguagem principal usada no projeto.

## **Funcionalidades**

A API oferece as seguintes funcionalidades:

- **Criar uma conta bancária** (`POST /account`): Cria uma conta com um CPF e nome do cliente.
- **Consultar extrato da conta** (`GET /statement`): Retorna todas as transações da conta de um cliente.
- **Realizar depósito** (`POST /deposit`): Realiza um depósito na conta do cliente.
- **Realizar saque** (`POST /withdraw`): Realiza um saque da conta do cliente (com verificação de saldo).
- **Consultar extrato de um dia específico** (`GET /statement/date`): Retorna as transações realizadas em uma data específica.
- **Atualizar informações da conta** (`PUT /account`): Permite alterar o nome do titular da conta.
- **Consultar dados da conta** (`GET /account`): Retorna as informações da conta bancária do cliente.
- **Excluir conta bancária** (`DELETE /account`): Exclui uma conta bancária do sistema.
- **Consultar saldo da conta** (`GET /balance`): Retorna o saldo atual da conta do cliente.

## **Como Rodar o Projeto**

### **Pré-requisitos**

- **Node.js**: A versão recomendada do Node.js para rodar este projeto é a versão 16.x ou superior.

### **Passos para Instalar e Rodar**

1. **Clone o repositório** para sua máquina:

    ```bash
    git clone https://github.com/seu-usuario/sistema-conta-bancaria.git
    cd sistema-conta-bancaria
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Inicie o servidor**:

    ```bash
    npm start
    ```

    O servidor estará rodando em `http://localhost:3031`.

## **EndPoints da API**

Abaixo estão os principais end-points disponíveis na API:

### **1. Criar Conta Bancária**
`POST /account`

**Body**:
```json
{
  "cpf": "12345678900",
  "name": "Nome do Cliente"
}
