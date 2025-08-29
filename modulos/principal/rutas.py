# Importación de librerías
from nicegui import ui
from modulos.principal.paginas.inicio import pagina_inicio
from modulos.principal.paginas.cierre_sesion import pagina_cierre_sesion


# Página de inicio
@ui.page('/',)
async def inicio():
    await pagina_inicio()


# Página de cierre de sesión
@ui.page('/cerrar_sesion')
async def cierre_sesion():
    await pagina_cierre_sesion()