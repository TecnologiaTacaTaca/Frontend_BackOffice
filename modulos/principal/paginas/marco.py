# Importación de librerías
from nicegui import ui


# --- Barra lateral ---
def barra_lateral(usuario):
    '''
    Función que crea la barra lateral de la aplicación.
    :param usuario: Objeto Usuario con la información del usuario actual.
    :return: barra_lateral: Componente de la barra lateral.
    '''
    with ui.left_drawer().classes('bg-[#005F5A] dark:bg-[#35B6B4] h-screen') as barra_lateral:
        ui.menu_item('Inicio', on_click=lambda: ui.navigate.to('/')).classes('text-[#FFFFFF] dark:text-[#252525]')
        try:
            for modulo in usuario.modulos:
                with ui.expansion(modulo['nombre_mostrado'], group='grupo_barra_lateral').classes('text-[#FFFFFF] dark:text-[#252525] w-full'):
                    for submodulo in modulo.get('submodulos', []):
                        ui.menu_item(submodulo['nombre_mostrado_front'], on_click=lambda sm=submodulo: ui.navigate.to(sm['ruta'])).classes('text-[#FFFFFF] dark:text-[#252525] w-full')
        except:
            pass
    return barra_lateral


# --- Cabecera y pie ---
def cabecera(usuario, barra_lateral: ui.left_drawer):
    '''
    Función que crea la cabecera de la aplicación.
    :param usuario: Objeto Usuario con la información del usuario actual.
    :param barra_lateral: Componente de la barra lateral para poder abrir/cerrar.
    '''
    with ui.header().classes('bg-[#FFFFFF] dark:bg-[#252525] text-[#005F5A] dark:text-[#35B6B4] border-[#005F5A] dark:border-[#35B6B4] items-center justify-between border-b'):
        ui.button(on_click=lambda: barra_lateral.toggle(), icon='menu').props('color=primary text-color=verdeosucro dark-color=secondary dark-text-color=verdeclaro flat')
        with ui.row().classes('items-center justify-items-center h-8'):
            ui.label('BACK OFFICE').classes('text-3xl font-bold')
            ui.image('static/img/Logo-color-TT.png').classes('h-full w-12')
            with ui.button(on_click=lambda: dropdown.toggle()).props('flat').classes('p-0 border-none bg-transparent'):
                try:
                    ui.image(f"data:image/png;base64,{usuario.foto}").classes('h-8 w-8 rounded-full')
                except:
                    pass
                
                with ui.menu() as dropdown:
                    with ui.column().classes('px-4 py-2'):
                        try:
                            ui.label(usuario.nombre).classes('text-sm')
                        except:
                            ui.label('Usuario desconocido').classes('text-sm')
                    ui.separator()
                    ui.menu_item('Cerrar sesión', on_click=lambda: ui.navigate.to('/cerrar_sesion')).classes('text-red-500')


# --- Pie de página ---
def pie(modo_oscuro: ui.dark_mode):
    '''
    Función que crea el pie de página de la aplicación.
    :param modo_oscuro: Variable reactiva que controla el modo oscuro.
    '''
    with ui.footer().classes("bg-[#35B6B4] dark:bg-[#005F5A] p-2 justify-end items-center"):
        ui.icon('light_mode').classes('text-[#FFFFFF] dark:text-[#005F5A]')
        ui.switch().bind_value(modo_oscuro).props('color=grisoscuro')
        ui.icon('dark_mode').classes('text-[#35B6B4] dark:text-[#252525]')
            
