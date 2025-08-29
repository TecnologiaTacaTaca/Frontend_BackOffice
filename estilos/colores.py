# Importación de librerías
from nicegui import ui

# Crea el constructor de colores
def constructor_colores():
    """Crea los colores personalizados para la app."""

    # Agrega estilos personalizados al head del documento.
    ## El propósito es manejar el dark mode en los ítems de ui.expansion, a los que no se puede llegar con classes (Tailwind) ni props (Quasar).
    ui.add_head_html('''
        <style>
        .q-item--dark {
            color: #252525;
        }
        .q-item--dark .q-item__section--side:not(.q-item__section--avatar) {
            color: #757575;
        }
        </style>
        ''')

    # Crea el modo oscuro
    modo_oscuro = ui.dark_mode()

    # Define los colores personalizados para la aplicación
    ui.colors(
        primary='#FFFFFF',
        secondary='#252525',
        dark='#252525',
        dark_page="#252525",
        verdeoscuro='#005F5A',
        verdeclaro='#35B6B4',
        blanco='#FFFFFF',
        grisoscuro="#252525",
        rojo='#F44336'
    )

    # Devuelve el modo oscuro para poder usarlo en el pie de página
    return modo_oscuro

