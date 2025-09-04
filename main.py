#Importación del framework
from nicegui import ui, App

# ------------------------------------------------------------------------------
# Importación de las páginas con sus rutas para la aplicación
#-----------------------------------------
## Módulo principal
import modulos.principal.rutas

## Módulo de reportes
import modulos.reportes.rutas
#-----------------------------------------
# ------------------------------------------------------------------------------


# Configuración y despliege de la aplicación
app_ng = App()
ui.run_with(app_ng, title='Back Office', favicon='static/img/favicon.ico')