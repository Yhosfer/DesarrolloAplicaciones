import reflex as rx
from typing import List, Dict

class ApiState(rx.State):
    datos: List[Dict] = []
    cargando: bool = False
    error: str = ""

    async def cargar(self):
        import httpx
        self.cargando, self.error = True, ""
        try:
            async with httpx.AsyncClient() as client:
                r = await client.get("https://jsonplaceholder.typicode.com/users", timeout=10)
                r.raise_for_status()
                self.datos = r.json()
        except Exception as e:
            self.error = f"Fallo al cargar: {e}"
        finally:
            self.cargando = False

def index() -> rx.Component:
    return rx.vstack(
        rx.heading("Exp 4: API pública (httpx)", size="6"),
        rx.button("Cargar datos", on_click=ApiState.cargar),
        rx.cond(ApiState.cargando, rx.text("Cargando...")),
        rx.cond(ApiState.error != "", rx.text(ApiState.error, color="red")),
        rx.unordered_list(
            rx.foreach(ApiState.datos, lambda d: rx.list_item(d.get("name", "sin nombre")))
        ),
        spacing="4",
        padding="6",
    )

app = rx.App()
app.add_page(index, title="Exp4")
