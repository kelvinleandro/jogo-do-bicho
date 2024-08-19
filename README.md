
# Jogo do Bicho

Esta é uma aplicação do Jogo do Bicho, desenvolvida utilizando React (Next.js) com TypeScript e Shadcn UI para a interface. A comunicação em tempo real entre os jogadores e o servidor é realizada utilizando Socket.IO. O servidor é construído com Python, utilizando Flask-SocketIO.

## Funcionalidades

- **Seleção de Animais:** Os jogadores podem escolher entre um conjunto de cartas de animais para fazer suas apostas.
- **Apostas Sincronizadas:** Todos os jogadores podem fazer suas apostas, e o servidor envia um feedback quando todos concluírem suas escolhas.
- **Comunicação em Tempo Real:** A aplicação utiliza Socket.IO para comunicação em tempo real entre o cliente e o servidor.

## Estrutura do Projeto

```plaintext
jogo-do-bicho/
├── client/                 # Código-fonte do cliente (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── game/       # Página do jogo
│   │   │   └── ...
│   │   ├── components/     # Componentes reutilizáveis da interface
│   │   ├── constants/      # Constantes usadas no projeto (ex: lista de animais)
│   │   ├── lib/            # Funções auxiliares
│   │   └── utils/          # Configuração do Socket.IO client
│   ├── public/             # Arquivos públicos (ex: favicon, ícones)
│   ├── tailwind.config.ts  # Configurações do Tailwind CSS
│   ├── package.json        # Dependências e scripts do projeto cliente
│   └── ...                 # Outros arquivos de configuração
├── server/                 # Código-fonte do servidor (Flask-SocketIO)
│   ├── animals.py          # Constantes usadas no projeto (ex: lista de animais)
│   ├── app.py              # Configuração do servidor Flask-SocketIO
│   ├── requirements.txt    # Dependências do projeto servidor
└── ...
```

## Configuração

### Servidor

O servidor Flask-SocketIO pode ser configurado utilizando o arquivo `.env`. As variáveis de ambiente incluem:

- `PORT`: Define a porta na qual o servidor será executado.
- `MAX_CLIENTS`: Define o número máximo de jogadores conectados.

### Cliente

O cliente Next.js pode ser configurado utilizando o arquivo `.env.local`. As variáveis de ambiente incluem:

- `PORT`: Define a porta na qual o servidor está sendo executado (no caso que esteja rodando na própria máquina).
- `SERVER_URL`: Define a URL do servidor Flask-SocketIO para deploys.

## Executando o Projeto

### Servidor

1. Navegue até o diretório `server`.

   ```bash
   cd server
   ```

2. (Opcional) Crie um ambiente virtual e ative-o:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate # para Linux
   .\.venv\Scripts\activate # para Windows
   ```

3. Instale as dependências do Python:

   ```bash
   pip install -r requirements.txt
   ```

4. Inicie o servidor:

   ```bash
   python app.py
   ```

### Cliente

1. Navegue até o diretório `client`.

   ```bash
   cd client
   ```

2. Instale as dependências do Node.js:

   ```bash
   npm install
   ```

3. Inicie o cliente:

   ```bash
   npm run dev
   ```
