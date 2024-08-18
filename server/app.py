import random
import time
from flask import Flask, request
from flask_socketio import SocketIO, emit, disconnect
from animals import ANIMAIS

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

MAX_CLIENTS = 2
game_started = False
clients = {}
guesses = {}
chosen_animal, chosen_numbers = None, None

@app.route('/')
def index():
    return "Jogo do Bicho - Servidor WebSocket Rodando"

@socketio.on('connect')
def handle_connect():
    global game_started
    if len(clients) < MAX_CLIENTS and not game_started:
        clients[request.sid] = {'guess': None}
        print(f'Jogador conectado. Total de jogadores: {len(clients)}')

        if len(clients) == MAX_CLIENTS:
            game_started = True
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
    time.sleep(5)
    start_new_round()

if __name__ == '__main__':
    socketio.run(app, port=5000)
