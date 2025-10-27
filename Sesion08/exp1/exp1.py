
import reflex as rx

from rxconfig import config


class CounterState(rx.State):
    conteo: int = 0

    def inc(self):
        self.conteo += 1

    def dec(self):
        self.conteo -= 1

# Página principal de la Exp 1
def index() -> rx.Component:
    return rx.vstack(
        rx.heading("Exp 1: Contador sin limites", size="6"),
        rx.text(f"Conteo: {CounterState.conteo}", size="5"),
        rx.hstack(
            rx.button("+ Incrementar", on_click=CounterState.inc),
            rx.button("- Disminuir", on_click=CounterState.dec),
            spacing="4",
        ),
        spacing="6",
        padding="8",
        align="center",
    )

# App y routing
app = rx.App()
app.add_page(index, route="/", title="Exp1 - Contador")
