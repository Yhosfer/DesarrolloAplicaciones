import reflex as rx

class EstadoFormulario(rx.State):
    nombre: str = ""
    email: str = ""
    mensaje: str = ""

    def enviar_formulario(self):
        if "@" not in self.email:
            rx.notify("Error: Dirección de correo electrónico no válida")
        else:
            rx.notify("Formulario enviado correctamente")


def formulario_contacto():
    return rx.fragment(
        rx.heading("Formulario de Contacto", size="8", margin_bottom="1em"),
        rx.form(
            rx.input(
                placeholder="Nombre",
                value=EstadoFormulario.nombre,
                on_change=EstadoFormulario.set_nombre,
            ),
            rx.input(
                placeholder="Correo electrónico",
                value=EstadoFormulario.email,
                on_change=EstadoFormulario.set_email,
            ),
            rx.text_area(
                placeholder="Mensaje",
                value=EstadoFormulario.mensaje,
                on_change=EstadoFormulario.set_mensaje,
            ),
            rx.button("Enviar", on_click=EstadoFormulario.enviar_formulario),
            width="50%",
            spacing="4",
        ),
        align="center",
    )


app = rx.App()
app.add_page(formulario_contacto, route="/")
