from nicegui import ui

# ------------------------------------------------------------------------------
# TODO: Eliminar  una vez que se implementen los reportes reales
from modulos.principal.plantilla import plantilla


@ui.page('/reportes/transacciones')
@plantilla
async def reporte_transacciones():
    ui.label('Reporte de Transacciones').classes('text-2xl text-[#005F5A] font-bold text-center mt-8')


@ui.page('/reportes/movimientos')
@plantilla
async def reporte_movimientos():
    ui.label('Reporte de Movimientos').classes('text-2xl text-[#005F5A] font-bold text-center mt-8')
# ------------------------------------------------------------------------------