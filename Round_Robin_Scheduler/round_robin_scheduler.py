import json, time, os
from prettytable import PrettyTable

global table
table = PrettyTable([' '])

global tasks 
tasks = []

def render_table():
    #Cria o Arquivo
    file = open("Escalonamento Round-Robin","w")

    #Escreve no Arquivo
    file.write(table.get_string())
    file.close()

    print('A tabela do Escalonamento foi salva em seu diretório atual!')
    print('__________________________________')
    input('Pressione ENTER para voltar ao menu...')

def round_robin():
    count_time = 1

    total_wait_time = 0  # Tempo total de espera de todas as tarefas
    total_turnaround_time = 0  # Tempo total de vida (turnaround) de todas as tarefas

    # Ordena as tasks por prioridade (Do Maior ao Menor)
    tasks_ordered = sorted(tasks, key=lambda x: x['ingress'], reverse=False)

    while len(tasks_ordered) > 0:
        # Obtém a próxima tarefa
        current_task = tasks_ordered[0]

        # Verifica se há tarefas com prioridade maior do que a tarefa atual
        max_priority = current_task['priority']
        for task in tasks_ordered:
            if task['ingress'] <= count_time:
                if task['priority'] > max_priority:
                    current_task = task
                    max_priority = task['priority']

        if current_task['ingress'] <= count_time and current_task['duration'] >= 0:
            # Executa a tarefa pelo quantum de 15 unidades de tempo ou até sua duração acabar
            count_for = 1
            while count_for <= 15:
                new_column = ["O" if id == current_task['id'] else " " if task['ingress'] > count_time else "-" if task['duration'] > 0 else " " for id, task in enumerate(tasks)]
                table.add_column(str(count_time), new_column)

                # Atualiza o tempo de vida das tarefas
                for task in tasks_ordered:
                    if task['ingress'] <= count_time and task['duration'] > 0:
                        total_turnaround_time += 1
                # Atualiza o tempo de espera das tarefas
                for task in tasks_ordered:
                    if task['ingress'] <= count_time and task['duration'] > 0 and task != current_task:
                        total_wait_time += 1
                
                current_task['duration'] -= 1

                if current_task['duration'] == 0 or count_for == 15:
                    # Verifica se ainda há tarefas a executar
                    if len(tasks_ordered) > 1:
                        for _ in range(4):
                            # Atualiza o tempo de vida e de espera das tarefas
                            for task in tasks_ordered:
                                if task['ingress'] <= count_time and task['duration'] > 0:
                                    total_wait_time += 1
                                    total_turnaround_time += 1

                            # Troca de Contexto por 4 unidades de tempo
                            count_time += 1
                            new_column = ["-" if task['ingress'] <= count_time and task['duration'] > 0 else " " for task in tasks]
                            table.add_column(str(count_time), new_column)
                    break

                count_for += 1
                count_time += 1

            # Verifica se a tarefa já acabou ou não
            if current_task['duration'] == 0:
                # Remove a tarefa da lista, pois sua duração acabou
                tasks_ordered.pop(0)
            else:
                # Move a tarefa para o final da lista
                tasks_ordered.append(tasks_ordered.pop(0))
        else:
            new_column = ["-" if task['ingress'] <= count_time and task['duration'] > 0 else " " for task in tasks]
            table.add_column(str(count_time), new_column)

        # Exibe a Linha do Tempo
        print(table)

        # Conta o tempo
        count_time += 1
        time.sleep(0.5)

    # Calcula os tempos médios de espera e de vida (turnaround)
    num_tasks = len(tasks)
    avg_wait_time = total_wait_time / num_tasks
    avg_turnaround_time = total_turnaround_time / num_tasks

    print('Tempo médio de espera:', avg_wait_time)
    print('Tempo médio de vida (turnaround):', avg_turnaround_time)

    render_table()


def main():
    global table
    global tasks

    print('_____Escalonador_Round_Robin______')
    print('__________________________________')
    input('Pressione ENTER para ir ao menu...')

    while True:
        # Menu de Opções
        os.system('cls' if os.name == 'nt' else 'clear')
        print('\nDigite a opção que deseja...',
                '\n 1 - Adicionar Task',
                '\n 2 - Ver Tasks',
                '\n 3 - Remover todas as Tasks',
                '\n 4 - Executar Tasks (Round-Robin)',
                '\n 5 - Sair','\n')
        
        option = int(input("-> "))
        
        if option == 1:
            print('\nEspecifique os dados da nova Task...')
            ingress = int(input("Ingresso: "))
            duration = int(input("Duração: "))
            
            # Criar a task
            task = {
                "id": (len(tasks)),
                "ingress": ingress,
                "duration": duration,
                "priority": 0
            }
            
            # Adicionar linha à tabela
            table.add_row(['Task {}'.format(len(tasks) + 1)])

            # Adicionar task à lista
            tasks.append(task)

        elif option == 2:
            id = 0
            for task in tasks:
                id += 1
                json_task = json.dumps(task)
                print("___________________________________________________________")
                print('< Task {} > '.format(str(id)) + json_task)
            
            print('__________________________________')
            input('Pressione ENTER para voltar ao menu...')
        
        elif option == 3:
            # Remover todas as tasks
            table = PrettyTable([' '])
            tasks = []
            print('\nTasks removidas com sucesso!')
            time.sleep(2)

        elif option == 4:
            # Executar o Round Robin
            round_robin()

        elif option == 5:
            break

        else:
            print('Digite uma opção válida!')
            print('__________________________________')
            input('Pressione ENTER para voltar ao menu...')

main()