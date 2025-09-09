#Importación del framework
from nicegui import ui, App
from dotenv import load_dotenv
import os

# Cargar variables de entorno desde archivo config.env
load_dotenv('config.env')

# ------------------------------------------------------------------------------
# Importación de las páginas con sus rutas para la aplicación
#-----------------------------------------
## Módulo principal
import modulos.principal.rutas

## Módulo de reportes
import modulos.reportes.rutas

## Módulo de fraude
import modulos.fraude.rutas
#-----------------------------------------
# ------------------------------------------------------------------------------


# Configuración y despliege de la aplicación
app_ng = App()
ui.run(title='Back Office', favicon='static/img/favicon.ico')