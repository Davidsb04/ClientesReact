# Frontend CRUD com React

Este repositório contém o frontend para um aplicativo CRUD (Create, Read, Update, Delete) desenvolvido com React. O frontend consome uma API desenvolvida em ASP.NET Core para realizar operações CRUD em registros de clientes.

## Requisitos

- [Node.js](https://nodejs.org/) 14.0 ou superior
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Bootstrap](https://getbootstrap.com/)
- [reactstrap](https://reactstrap.github.io/)
- [axios](https://github.com/axios/axios)

## Configuração e Execução

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio-frontend.git
    cd nome-do-repositorio-frontend
    ```

2. **Instale as dependências:**

    Se você estiver usando npm:

    ```bash
    npm install
    ```

    Ou, se você estiver usando yarn:

    ```bash
    yarn install
    ```

3. **Instale as bibliotecas adicionais:**

    Se você estiver usando npm:

    ```bash
    npm install bootstrap reactstrap axios
    ```

    Ou, se você estiver usando yarn:

    ```bash
    yarn add bootstrap reactstrap axios
    ```

4. **Configure a URL da API:**

    Abra o arquivo `src/App.js` e certifique-se de que a URL da API está correta:

    ```javascript
    // src/App.js
    const baseUrl = 'http://localhost:5265/api/Cliente';
    ```

5. **Execute o aplicativo:**

    Se você estiver usando npm:

    ```bash
    npm start
    ```

    Ou, se você estiver usando yarn:

    ```bash
    yarn start
    ```

    O aplicativo estará disponível em `http://localhost:3000`.

## Observações

- Este repositório é referente à ApiMongoDB. Caso você queira executar o código completo, siga os passos de instalação da API disponíveis no [ApiMongoDB](https://github.com/Davidsb04/ApiMongoDB).
- Certifique-se de que a API está sendo executada com o protocolo HTTP, juntamente com o frontend, para evitar conflitos de protocolo entre o backend e o frontend durante as requisições.
- O backend deve estar em execução antes de iniciar o frontend para que o frontend possa consumir a API corretamente.

