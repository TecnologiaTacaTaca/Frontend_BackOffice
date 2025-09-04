
# Importación de librerías
from nicegui import ui
from modulos.principal.plantilla import plantilla
from usuario_sesion.manejador_usuario import constructor_usuario


@plantilla
# Página de inicio
async def pagina_inicio():
    '''
    Página de inicio que muestra un saludo al usuario autenticado.
    Si el usuario no tiene permisos para ningún módulo, se le informa.
    '''
    # Obtener el usuario actual
    usuario = await constructor_usuario()
    nombre = usuario.nombre

    # Construir la interfaz de usuario
    with ui.column().classes('bg-[#FFFFFF] dark:bg-[#252525] justify-self-center items-center w-full'):
        with ui.row().classes('mt-24 mb-8 justify-center items-center gap-4'):
            with ui.column():
                ui.label(f'¡Hola, {nombre}!').classes('text-[#005F5A] dark:text-[#35B6B4] text-4xl font-bold')
        
        # Mostrar información del modo desarrollo si está activo
        if usuario.id_usuario == "root-dev":
            with ui.row().classes('justify-center items-center gap-4 mb-4'):
                ui.label('MODO DESARROLLO').classes('text-[#FF6B35] dark:text-[#FF8C42] text-center text-lg font-bold')
            with ui.row().classes('justify-center items-center gap-4 mb-4'):
                ui.label('Usuario Root con todos los permisos - Graph API deshabilitado').classes('text-[#252525] dark:text-[#FFFFFF] text-center text-sm')
        
        # Mostrar mensaje si no tiene permisos para ningún módulo
        if len(usuario.metodos) == 0:
            with ui.row().classes('justify-center items-center gap-4'):
                ui.label('No tenés permisos para acceder a ningún módulo. Si creés que esto es un error, por favor, cerrá sesión y volvé a iniciar sesión con tu cuenta de Microsoft.').classes('text-[#252525] dark:text-[#FFFFFF] text-center text-lg')