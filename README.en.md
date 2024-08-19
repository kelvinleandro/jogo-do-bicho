
# Jogo do Bicho

This is a Jogo do Bicho (Animal Game) application, developed using React (Next.js) with TypeScript and Shadcn UI for the interface. Real-time communication between players and the server is handled using Socket.IO. The server is built with Python using Flask-SocketIO.

## Features

- **Animal Selection:** Players can choose from a set of animal cards to place their bets.
- **Synchronized Betting:** All players can place their bets, and the server provides feedback once everyone has made their choices.
- **Real-Time Communication:** The application uses Socket.IO for real-time communication between the client and the server.

## Project Structure

```plaintext
jogo-do-bicho/
├── client/                 # Client source code (Next.js)
│   ├── src/
│   │   ├── app/
│   │   │   ├── game/       # Game page
│   │   │   └── ...
│   │   ├── components/     # Reusable UI components
│   │   ├── constants/      # Project constants (e.g., list of animals)
│   │   ├── lib/            # Helper functions
│   │   └── utils/          # Socket.IO client configuration
│   ├── public/             # Public files (e.g., favicon, icons)
│   ├── tailwind.config.ts  # Tailwind CSS configuration
│   ├── package.json        # Client project dependencies and scripts
│   └── ...                 # Other configuration files
├── server/                 # Server source code (Flask-SocketIO)
│   ├── animals.py          # Project constants (e.g., list of animals)
│   ├── app.py              # Flask-SocketIO server setup
│   ├── requirements.txt    # Server project dependencies
└── ...
```

## Configuration

### Server

The Flask-SocketIO server can be configured using the `.env` file. Environment variables include:

- `PORT`: Defines the port on which the server will run.
- `MAX_CLIENTS`: Defines the maximum number of connected players.

### Client

The Next.js client can be configured using the `.env.local` file. Environment variables include:

- `PORT`: Define the port on which the server is running (in case it is running on the same machine).
- `SERVER_URL`: Defines the Flask-SocketIO server URL for deployments.

## Running the Project

### Server

1. Navigate to the `server` directory.

   ```bash
   cd server
   ```

2. (Optional) Create a virtual environment and activate it:

   ```bash
   python3 -m venv .venv
   source .venv/bin/activate # for Linux
   .\.venv\Scripts\activate # for Windows
   ```

3. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the server:

   ```bash
   python app.py
   ```

### Client

1. Navigate to the `client` directory.

   ```bash
   cd client
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Start the client:

   ```bash
   npm run dev
   ```
