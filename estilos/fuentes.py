# Importación de librerías
from nicegui import ui, app

# Función para construir la fuente Platform
def constructor_fuente_platform():

    # Montar la carpeta estática para las fuentes
    app.add_static_files('/static', 'static')

    # Agregar CSS para usar la fuente "Platform"
    ui.add_head_html("""
    <style>
    @font-face {
        font-family: 'Platform';
        src: url('/static/fonts/Platform-Regular.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Platform';
        src: url('/static/fonts/Platform-Bold.woff2') format('woff2');
        font-weight: bold;
        font-style: normal;
    }

    body {
        font-family: 'Platform', sans-serif !important;
    }
    </style>
    """)
