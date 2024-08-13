# Jogo do Bicho

ideia básica:

1. servidor espera jogadores entrarem (considera MAX_CLIENTS jogando)
2. depois que todos entrarem, flag que inicia a partida
3. seleciona um número/animal e manda flag para os jogadores adivinharem
4. servidor aguarda todos os jogadores enviarem suas respostas
5. servidor verifica se cada jogador acertou ou errou e envia uma mensagem personalizada para cada um
6. reseta "status" de cada jogador (verificação de que enviou sua aposta)
7. volta para passo 3