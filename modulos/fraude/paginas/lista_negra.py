from nicegui import ui
from modulos.principal.plantilla import plantilla


@ui.page('/fraude/lista-negra')
@plantilla
async def lista_negra():
    """Página de Gestión de Lista Negra - Próximamente"""
    
    with ui.column().classes('w-full h-full items-center justify-center'):
        with ui.card().classes('p-8 shadow-lg border-2 border-red-500'):
            with ui.row().classes('items-center gap-4 mb-4'):
                ui.icon('warning', size='3rem').classes('text-red-500')
                ui.label('PRÓXIMAMENTE').classes('text-4xl font-bold text-red-500')
                ui.icon('construction', size='3rem').classes('text-red-500')
            
            ui.separator().classes('bg-red-500 opacity-30 my-4')
            
            with ui.row().classes('items-center gap-2'):
                ui.icon('block', size='1.5rem').classes('text-red-400')
                ui.label('Gestión de Lista Negra').classes('text-2xl font-semibold text-red-600')
                ui.icon('list', size='1.5rem').classes('text-red-400')
            
            ui.label('Esta funcionalidad estará disponible en una próxima actualización.').classes('text-gray-600 text-center mt-4')
