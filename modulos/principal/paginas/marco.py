# Importación de librerías
from nicegui import ui

# Variable global para controlar el estado de la barra lateral
barra_colapsada = {'value': False}

def toggle_barra_lateral():
    '''
    Función que alterna el estado de la barra lateral entre expandida y colapsada.
    '''
    barra_colapsada['value'] = not barra_colapsada['value']
    # Refrescar la barra lateral después de cambiar el estado
    if hasattr(toggle_barra_lateral, 'refresh_callback'):
        toggle_barra_lateral.refresh_callback()

# --- Barra lateral ---
def barra_lateral(usuario):
    '''
    Función que crea la barra lateral de la aplicación.
    :param usuario: Objeto Usuario con la información del usuario actual.
    :return: barra_lateral: Componente de la barra lateral.
    '''
    
    # Función para aplicar estilos de layout
    def aplicar_layout(ancho_sidebar):
        ui.run_javascript(f'''
            setTimeout(() => {{
                const drawer = document.querySelector('.q-drawer');
                const header = document.querySelector('.q-header');
                const pageContainer = document.querySelector('.q-page-container');
                const footer = document.querySelector('.q-footer');
                
                if (drawer) {{
                    drawer.style.width = '{ancho_sidebar}px';
                    drawer.style.position = 'fixed';
                    drawer.style.top = '0px';
                    drawer.style.left = '0px';
                    drawer.style.height = '100vh';
                    drawer.style.zIndex = '9999';
                    drawer.style.transition = 'width 0.3s ease';
                }}
                
                if (header) {{
                    header.style.marginLeft = '{ancho_sidebar}px';
                    header.style.transition = 'margin-left 0.3s ease';
                }}
                
                if (pageContainer) {{
                    pageContainer.style.marginLeft = '{ancho_sidebar}px';
                    pageContainer.style.transition = 'margin-left 0.3s ease';
                }}
                
                if (footer) {{
                    footer.style.marginLeft = '{ancho_sidebar}px';
                    footer.style.width = 'calc(100% - {ancho_sidebar}px)';
                    footer.style.transition = 'all 0.3s ease';
                }}
            }}, 50);
        ''')
    
    with ui.left_drawer(value=True).classes('bg-[#002F2D] dark:bg-[#35B6B4]') as barra_lateral:
        
        @ui.refreshable
        def contenido_barra():
            if barra_colapsada['value']:
                # Modo colapsado - 62px
                aplicar_layout(62)
                with ui.column().classes('w-full h-full'):
                    # Header con botón
                    with ui.row().classes('w-full items-center justify-center h-16 px-2'):
                        ui.button(icon='menu', on_click=lambda: toggle_barra_lateral()).props('flat').classes('text-[#35B6B4]').style('color: #35B6B4 !important;')
                    
                    ui.separator().classes('bg-[#35B6B4] opacity-20 mx-2')
                    
                    # Iconos de navegación
                    with ui.column().classes('w-full items-center py-4 gap-4'):
                        ui.button(icon='home', on_click=lambda: ui.navigate.to('/')).props('flat').classes('text-[#35B6B4]').style('color: #35B6B4 !important;')
                        try:
                            for modulo in usuario.modulos:
                                icono = 'folder' if modulo['nombre_mostrado'] == 'Reportes' else 'dashboard'
                                ui.button(icon=icono).props('flat').classes('text-[#35B6B4]').style('color: #35B6B4 !important;')
                        except:
                            pass
            else:
                # Modo expandido - 256px
                aplicar_layout(256)
                with ui.column().classes('w-full h-full'):
                    # Header con botón y texto
                    with ui.row().classes('w-full items-center justify-start h-16 px-4'):
                        ui.button(icon='menu', on_click=lambda: toggle_barra_lateral()).props('flat').classes('text-[#35B6B4] mr-4').style('color: #35B6B4 !important;')
                        ui.label('MENÚ').classes('text-[#35B6B4] font-bold')
                    
                    ui.separator().classes('bg-[#35B6B4] opacity-20 mx-2')
                    
                    # Menú de navegación completo
                    with ui.column().classes('w-full px-2 py-4'):
                        ui.menu_item('Inicio', on_click=lambda: ui.navigate.to('/')).classes('text-[#35B6B4]')
                        try:
                            for modulo in usuario.modulos:
                                with ui.expansion(modulo['nombre_mostrado'], group='grupo_barra_lateral').classes('text-[#35B6B4] w-full'):
                                    for submodulo in modulo.get('submodulos', []):
                                        ui.menu_item(submodulo['nombre_mostrado_front'], on_click=lambda sm=submodulo: ui.navigate.to(sm['ruta'])).classes('text-[#35B6B4] w-full')
                        except:
                            pass
        
        contenido_barra()
        
        # Inicialización del layout
        ui.run_javascript('''
            // Inicializar layout cuando esté listo
            function initLayout() {
                const drawer = document.querySelector('.q-drawer');
                if (drawer) {
                    drawer.style.width = '256px';
                    drawer.style.position = 'fixed';
                    drawer.style.top = '0px';
                    drawer.style.left = '0px';
                    drawer.style.height = '100vh';
                    drawer.style.zIndex = '9999';
                }
                
                const header = document.querySelector('.q-header');
                if (header) {
                    header.style.marginLeft = '256px';
                }
                
                const pageContainer = document.querySelector('.q-page-container');
                if (pageContainer) {
                    pageContainer.style.marginLeft = '256px';
                }
                
                const footer = document.querySelector('.q-footer');
                if (footer) {
                    footer.style.marginLeft = '256px';
                    footer.style.width = 'calc(100% - 256px)';
                }
            }
            
            // Ejecutar al cargar
            setTimeout(initLayout, 100);
        ''')
        
        # Conectar el callback de refresh
        toggle_barra_lateral.refresh_callback = contenido_barra.refresh
    
    return barra_lateral


# --- Cabecera ---
def cabecera(usuario, barra_lateral: ui.left_drawer):
    '''
    Función que crea la cabecera de la aplicación.
    :param usuario: Objeto Usuario con la información del usuario actual.
    :param barra_lateral: Componente de la barra lateral para poder abrir/cerrar.
    '''
    with ui.header().classes('bg-[#005F5A] dark:bg-[#252525] text-[#005F5A] dark:text-[#35B6B4] dark:border-[#35B6B4] items-center justify-end border-b'):
        with ui.row().classes('items-center justify-end h-8 ml-auto'):
            ui.label('BACK OFFICE').classes('text-3xl font-bold text-[#FFFFFF] mr-4')
            ui.image('static/img/Logo-color-TT.png').classes('h-full w-12 mr-4')
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
    with ui.footer().classes("bg-[#F0F0F0] border-[#FFFFFF] p-2 justify-between items-center"):
        # Etiqueta de versión pegada al menú lateral
        ui.label('Versión 1.0').classes('text-[#FFFFFF] text-sm font-medium bg-[#949494] px-3 py-1 rounded-full ml-2')
        
        # Controles de modo oscuro en el lado derecho
        with ui.row().classes('items-center gap-2'):
            ui.icon('light_mode').classes('text-[#FFFFFF] dark:text-[#005F5A]')
            ui.switch().bind_value(modo_oscuro).props('color=grisoscuro')
            ui.icon('dark_mode').classes('text-[#35B6B4] dark:text-[#252525]')
            
