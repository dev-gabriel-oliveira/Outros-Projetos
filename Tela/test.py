from tkinter import Tk, Label, Entry, Button, Frame

def exibir_resultado():
    valor = entrada.get()
    resultado.config(text="O valor é: " + valor)

# Cria a janela principal
janela = Tk()

# Configurações da janela
janela.title("Minha Aplicação")
janela.geometry("400x300")

# Altera a cor da janela
janela.configure(bg="#333")

# Adiciona um rótulo na janela
rotulo = Label(janela, text="Olá, mundo!",
               fg="#FFF", bg="#333",
               font=("Arial", 20), justify="center",
               pady=20)
rotulo.pack()

# Cria o campo de entrada
entry_box = Frame(janela, bg="#333", padx=10, pady=10)
entry_box.pack()
entrada = Entry(entry_box)
entrada.pack()

# Cria um botão para exibir o resultado
btn_box = Frame(janela, bg="#333", padx=10, pady=10)
btn_box.pack()
botao = Button(btn_box, text="Exibir", command=exibir_resultado)
botao.pack()

# Cria um rótulo para mostrar o resultado
res_box = Frame(janela, bg="#333", padx=10, pady=10)
res_box.pack()
resultado = Label(res_box, fg="#FFF", bg="#111", pady=5)
resultado.pack()

# Executa o loop principal da aplicação
janela.mainloop()
