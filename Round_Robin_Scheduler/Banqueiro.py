def banqueiro(quantidade_recursos, maximo_requisitado, recursos_disponiveis, recursos_alocados):
    num_processos = len(maximo_requisitado)
    num_recursos = len(recursos_disponiveis)

    # Inicializando listas para armazenar o estado do sistema
    recursos_disponiveis = recursos_disponiveis[:]
    recursos_alocados = recursos_alocados[:]
    recursos_necessarios = []
    recursos_restantes = []

    # Calculando a quantidade necessária de recursos
    for i in range(num_processos):
        recursos_necessarios.append([maximo_requisitado[i][j] - recursos_alocados[i][j] for j in range(num_recursos)])
        recursos_restantes.append([recursos_disponiveis[j] - recursos_alocados[i][j] for j in range(num_recursos)])

    # Verificando a segurança do estado atual
    processo_concluido = [False] * num_processos
    sequencia_execucao = []
    while True:
        processo_encontrado = False
        for i in range(num_processos):
            if not processo_concluido[i]:
                if all(recursos_restantes[i][j] >= recursos_necessarios[i][j] for j in range(num_recursos)):
                    # Recursos suficientes disponíveis para o processo i
                    sequencia_execucao.append(i)
                    processo_encontrado = True
                    processo_concluido[i] = True

                    # Liberando os recursos alocados pelo processo i
                    recursos_disponiveis = [recursos_disponiveis[j] + recursos_alocados[i][j] for j in range(num_recursos)]
                    break

        if not processo_encontrado:
            break

    # Verificando se todos os processos foram concluídos
    if all(processo_concluido):
        return sequencia_execucao  # Estado seguro
    else:
        return None  # Estado inseguro

# Exemplo de uso
quantidade_recursos = 3
maximo_requisitado = [
    [7, 5, 3],
    [3, 2, 2],
    [9, 0, 2],
    [2, 2, 2],
    [4, 3, 3]
]
recursos_disponiveis = [10, 5, 7]
recursos_alocados = [
    [0, 1, 0],
    [2, 0, 0],
    [3, 0, 2],
    [2, 1, 1],
    [0, 0, 2]
]

sequencia_execucao = banqueiro(quantidade_recursos, maximo_requisitado, recursos_disponiveis, recursos_alocados)
if sequencia_execucao is not None:
    print("Estado seguro. Sequência de execução: ", sequencia_execucao)
else:
    print("Estado inseguro.")
