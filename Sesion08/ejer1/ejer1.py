import reflex as rx

# Estado global del tablero Kanban
class State(rx.State):
    def __init__(self):
        super().__init__()
        self.mostrar_solo_pendientes = False  # controla tareas pendientes

    # Método para activar el filtro de pendientes
    def mostrar_pendientes(self):
        self.mostrar_solo_pendientes = True


# Función que representa cada tarjeta de tarea
def tarjeta_tarea(tarea):
    return rx.div(
        tarea["titulo"],
        rx.div(f"Estado: {tarea['estado']}"),
        # Aquí se pueden agregar más detalles de la tarea
    )


# Función que representa cada columna del tablero Kanban
def columna_kanban(nombre, tareas):
    if State.mostrar_solo_pendientes:
        tareas = [t for t in tareas if t["estado"] == "Pendiente"]
    return rx.div(
        rx.heading(nombre),
        rx.div([tarjeta_tarea(tarea) para tarea in tareas])
    )


# Datos de ejemplo para el tablero
tareas_en_progreso = [
    {"titulo": "Tarea 1", "estado": "Pendiente"},
    {"titulo": "Tarea 2", "estado": "En Progreso"},
]

tareas_completadas = [
    {"titulo": "Tarea 3", "estado": "Completada"},
    {"titulo": "Tarea 4", "estado": "Pendiente"},
]


# Función principal que renderiza el tablero
def index():
    return rx.div(
        rx.button("Mostrar Pendientes", on_click=State.mostrar_pendientes),
        columna_kanban("En Progreso", tareas_en_progreso),
        columna_kanban("Completadas", tareas_completadas)
    )
