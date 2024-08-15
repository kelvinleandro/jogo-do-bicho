from flask import Flask, request
from flask_socketio import SocketIO, emit, disconnect
import random
from animals import ANIMAIS

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

MAX_CLIENTS = 2
allow_new_clients = True
clients = {}
guesses = {}

@app.route('/')
def index():
    return "Jogo do Bicho - Servidor WebSocket Rodando"

@socketio.on('connect')
def handle_connect():
    global allow_new_clients
    if len(clients) < MAX_CLIENTS and allow_new_clients:
        clients[request.sid] = {'guess': None}
        print(f'Jogador conectado. Total de jogadores: {len(clients)}')

        if len(clients) == MAX_CLIENTS:
            allow_new_clients = False
            socketio.emit('start_game')
            start_new_round()
    else:
        emit('message', 'Número máximo de jogadores atingido. Desconectando...')
        disconnect()

@socketio.on('disconnect')
def handle_disconnect():
    try:
        clients.pop(request.sid, None)
        guesses.pop(request.sid, None)
        print(f'Jogador desconectado. Total de jogadores: {len(clients)}')

    except Exception as e:
        print(f'Erro ao desconectar jogador: {e}')

@socketio.on('guess')
def handle_guess(data):
    animal_guess = data['animal']
    guesses[request.sid] = animal_guess
    print(f"Jogador {request.sid} escolheu: {animal_guess}")

    if len(guesses) == len(clients):
        evaluate_results()

def start_new_round():
    global chosen_animal, chosen_numbers
    chosen_animal = random.choice(list(ANIMAIS.keys()))
    chosen_numbers = ANIMAIS[chosen_animal]
    print(f"Animal selecionado: {chosen_animal} ({chosen_numbers})")
    socketio.emit('guess_animal')

def evaluate_results():
    for sid, animal in guesses.items():
        try:
            if animal == chosen_animal:
                emit('guess_result', f'ACERTOU {chosen_animal}', room=sid)
            else:
                emit('guess_result', f'ERROU {chosen_animal}.', room=sid)
        except Exception as e:
            print(f'Erro ao enviar resultado para jogador {sid}: {e}')
    
    # Limpa apenas as adivinhações para permitir uma nova rodada
    guesses.clear()

    # Inicia uma nova rodada automaticamente
    socketio.emit('message', 'Nova rodada iniciando...')
    start_new_round()

if __name__ == '__main__':
    socketio.run(app, port=5000)
