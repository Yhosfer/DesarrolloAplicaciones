import reflex as rx

# Datos de ejemplo
todas_las_tareas = [
    {"titulo": "Tarea 1", "estado": "Pendiente"},
    {"titulo": "Tarea 2", "estado": "En Progreso"},
    {"titulo": "Tarea 3", "estado": "Completada"},
    {"titulo": "Tarea 4", "estado": "Pendiente"},
]

def contar_tareas_por_estado(tareas: list[dict]) -> dict[str, int]:
    cont = {}
    for t in tareas:
        e = t["estado"]
        cont[e] = cont.get(e, 0) + 1
    return cont

def lista_por_estado(estado: str):
    # Lista visual de títulos filtrados por estado
    filtradas = [t for t in todas_las_tareas if t["estado"] == estado]
    return rx.vstack(
        rx.foreach(filtradas, lambda t: rx.text(t["titulo"])),
        spacing="1",
        align_items="start",
    )

def columna(nombre: str, estado: str, contadores: dict[str, int]):
    return rx.card(
        rx.vstack(
            rx.heading(nombre, size="5"),
            lista_por_estado(estado),
            rx.separator(),
            rx.text(f"Total: {contadores.get(estado, 0)}", weight="bold"),
            spacing="3",
            align_items="start",
            width="100%",
        ),
        size="3",
        class_name="w-full",
    )

@rx.page(route="/", title="Kanban con contadores")
def index():
    cont = contar_tareas_por_estado(todas_las_tareas)
    return rx.container(
        rx.heading("Tablero Kanban (contadores por estado)", size="6"),
        rx.grid(
            columna("Pendientes", "Pendiente", cont),
            columna("En Progreso", "En Progreso", cont),
            columna("Completadas", "Completada", cont),
            columns="3",
            gap="4",
            width="100%",
        ),
        size="4",
    )

app = rx.App()
