import reflex as rx

class EstadoTareas(rx.State):
    tareas: list[str] = ["Tarea 1", "Tarea 2"]
    nueva_tarea: str = ""

    def agregar_tarea(self):
        if self.nueva_tarea.strip():
            self.tareas.append(self.nueva_tarea.strip())
            self.nueva_tarea = ""



def lista_tareas():
    return rx.vstack(
        rx.heading("Lista de Tareas", size="6"),
        rx.foreach(EstadoTareas.tareas, lambda tarea: rx.text(f"• {tarea}")),
        spacing="3",
        align="start",
    )


def agregar_tarea():
    return rx.hstack(
        rx.input(
            placeholder="Escribe una nueva tarea...",
            value=EstadoTareas.nueva_tarea,
            on_change=EstadoTareas.set_nueva_tarea,   
            width="250px",
        ),
        rx.button("Agregar", color_scheme="blue", on_click=EstadoTareas.agregar_tarea),
        spacing="3",
    )


def index():
    return rx.center(
        rx.vstack(
            lista_tareas(),
            agregar_tarea(),
            spacing="6",
        ),
        height="100vh",
    )


app = rx.App()
app.add_page(index)
