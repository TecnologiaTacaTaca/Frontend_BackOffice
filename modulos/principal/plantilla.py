# Importación de librerías
import functools
from usuario_sesion.manejador_usuario import constructor_usuario
from estilos.fuentes import constructor_fuente_platform
from estilos.colores import constructor_colores
from modulos.principal.paginas.marco import barra_lateral, cabecera, pie


# Función decoradora para aplicar una plantilla a las páginas
def plantilla(fn_contenido):
    @functools.wraps(fn_contenido)
    async def wrapper(*args, **kwargs):
        """
        Función decoradora que envuelve el contenido de una página con una plantilla que incluye:
        - Construcción del usuario desde la sesión.
        - Construcción de colores personalizados para la aplicación.
        - Construcción de la fuente Platform.
        - Barra lateral con menús basados en los módulos y submódulos del usuario.
        - Cabecera con el nombre del usuario y opción para cerrar sesión.
        - Espacio para el contenido específico de la página.
        - Pie de página con estilo.
        :param fn_contenido: Función que genera el contenido específico de la página.
        :return: Wrapper que renderiza la plantilla con el contenido.
        """
        # --- Usuario ---
        usuario = await constructor_usuario()
        
        # --- Colores personalizados ---
        modo_oscuro = constructor_colores()

        # --- Fuente Platform ---
        constructor_fuente_platform()

        # --- Barra lateral ---
        barra_izquierda = barra_lateral(usuario)

        # --- Cabecera y pie ---
        cabecera(usuario, barra_izquierda)

        # --- Contenido principal de la página decorada---
        # Llama a la función decorada
        await fn_contenido(*args, **kwargs)

        # --- Pie de página ---
        pie(modo_oscuro)
            
    # Retorna el wrapper
    return wrapper 