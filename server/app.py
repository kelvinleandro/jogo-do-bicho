import random
import time
import os
from dotenv import load_dotenv
from flask import Flask, request
from flask_socketio import SocketIO, emit, disconnect
from animals import ANIMAIS

load_dotenv()

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

PORT = int(os.environ.get("PORT", 5000))
MAX_CLIENTS = int(os.environ.get("MAX_CLIENTS", 2))
game_state = {
    'round_in_progress': False,
    'chosen_animal': None,
    'chosen_numbers': None,
    'round_start_time': None
}
clients = {}
guesses = {}

@app.route('/')
def index():
    return "Jogo do Bicho - Servidor WebSocket Rodando"

@socketio.on('connect')
def handle_connect():
    if len(clients) < MAX_CLIENTS:
        clients[request.sid] = {'joined_mid_round': game_state['round_in_progress']}
        print(f'Jogador conectado. Total de jogadores: {len(clients)}')
        
        if len(clients) == MAX_CLIENTS and not game_state['round_in_progress']:
            start_new_round()
        elif game_state['round_in_progress']:
            emit('wait_for_next_round', room=request.sid)
    else:
        emit('message', 'Número máximo de jogadores atingido. Desconectando...')
        disconnect()

@socketio.on('disconnect')
def handle_disconnect():
    clients.pop(request.sid, None)
    guesses.pop(request.sid, None)
    print(f'Jogador desconectado. Total de jogadores: {len(clients)}')
    
    if len(clients) == 0 and game_state['round_in_progress']:
        end_current_round()

@socketio.on('guess')
def handle_guess(data):
    if not game_state['round_in_progress'] or clients[request.sid]['joined_mid_round']:
        emit('invalid_guess', 'Aguarde a próxima rodada para fazer sua aposta.', room=request.sid)
        return

    animal_guess = data['animal']
    guesses[request.sid] = animal_guess
    print(f"Jogador {request.sid} escolheu: {animal_guess}")

    if len(guesses) == len([client for client in list(clients.values()) if not client['joined_mid_round']]):
        evaluate_results()

def start_new_round():
    game_state['round_in_progress'] = True
    game_state['chosen_animal'] = random.choice(list(ANIMAIS.keys()))
    game_state['chosen_numbers'] = ANIMAIS[game_state['chosen_animal']]
    game_state['round_start_time'] = time.time()
    print(f"Animal selecionado: {game_state['chosen_animal']} ({game_state['chosen_numbers']})")
    
    for sid in clients:
        clients[sid]['joined_mid_round'] = False
    
    socketio.emit('guess_animal')

def evaluate_results():
    for sid, animal in guesses.items():
        result = 'ACERTOU' if animal == game_state['chosen_animal'] else 'ERROU'
        emit('guess_result', f'{result} {game_state["chosen_animal"]}', room=sid)
    
    end_current_round()

def end_current_round():
    game_state['round_in_progress'] = False
    guesses.clear()
    
    if len(clients) > 0:
        socketio.emit('round_ended')
        time.sleep(5)
        start_new_round()

if __name__ == '__main__':
    socketio.run(app, port=PORT)
