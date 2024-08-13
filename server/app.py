from flask import Flask, request
from flask_socketio import SocketIO, emit, disconnect
import random

app = Flask(__name__)
socketio = SocketIO(app)

MAX_CLIENTS = 2
clients = {}
guesses = {}

# Mapeamento dos animais para os números
ANIMAIS = {
    "avestruz": [1, 2, 3, 4],
    "burro": [5, 6, 7, 8],
    "cachorro": [9, 10, 11, 12],
    "leão": [13, 14, 15, 16],
    "macaco": [17, 18, 19, 20],
    "pavão": [21, 22, 23, 24],
    "peru": [25, 26, 27, 28],
    "tigre": [29, 30, 31, 32],
    "urso": [33, 34, 35, 36],
    "elefante": [37, 38, 39, 40],
    "cobra": [41, 42, 43, 44],
    "coelho": [45, 46, 47, 48],
    "cavalo": [49, 50, 51, 52],
    "rato": [53, 54, 55, 56],
    "boi": [57, 58, 59, 60],
    "camelo": [61, 62, 63, 64],
    "gato": [65, 66, 67, 68],
    "galo": [69, 70, 71, 72],
    "jacaré": [73, 74, 75, 76],
    "javali": [77, 78, 79, 80],
    "peixe": [81, 82, 83, 84],
    "ressaca": [85, 86, 87, 88],
    "sapo": [89, 90, 91, 92],
    "tartaruga": [93, 94, 95, 96],
    "vaca": [97, 98, 99, 100]
}

@app.route('/')
def index():
    return "Jogo do Bicho - Servidor WebSocket Rodando"

@socketio.on('connect')
def handle_connect():
    if len(clients) < MAX_CLIENTS:
        clients[request.sid] = {'guess': None}
        print(f'Jogador conectado. Total de jogadores: {len(clients)}')

        if len(clients) == MAX_CLIENTS:
            start_game()
    else:
        emit('message', 'Número máximo de jogadores atingido. Desconectando...')
        disconnect()

@socketio.on('disconnect')
def handle_disconnect():
    clients.pop(request.sid, None)
    print(f'Jogador desconectado. Total de jogadores: {len(clients)}')

@socketio.on('guess')
def handle_guess(data):
    animal_guess = data['animal']
    guesses[request.sid] = animal_guess
    print(f"Jogador {request.sid} escolheu: {animal_guess}")

    if len(guesses) == MAX_CLIENTS:
        evaluate_results()

def start_game():
    global chosen_animal, chosen_numbers
    chosen_animal = random.choice(list(ANIMAIS.keys()))
    chosen_numbers = ANIMAIS[chosen_animal]
    print(f"Animal selecionado: {chosen_animal} ({chosen_numbers})")
    socketio.emit('message', 'START GAME')
    socketio.emit('message', 'GUESS ANIMAL')

def evaluate_results():
    for sid, animal in guesses.items():
        if animal == chosen_animal:
            emit('message', 'Você acertou!', room=sid)
        else:
            emit('message', f'Você errou! O animal correto era {chosen_animal}.', room=sid)
    
    # Limpa apenas as adivinhações para permitir uma nova rodada
    guesses.clear()

    # Inicia uma nova rodada automaticamente
    socketio.emit('message', 'Nova rodada iniciando...')
    start_game()

if __name__ == '__main__':
    socketio.run(app, port=3000)
