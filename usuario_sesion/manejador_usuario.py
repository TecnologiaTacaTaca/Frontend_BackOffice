from nicegui import ui, app
from usuario_sesion.constructor_usuario import ConstructorUsuario

# Función para manejar el usuario de la sesión
async def constructor_usuario():
    """
    Construye y retorna un objeto Usuario basado en la información almacenada en la sesión del cliente.
    Si el usuario no está en la sesión, lo crea a partir de los headers de la solicitud (inyectados por Azure) y lo almacena en el tab storage de la sesión.
    """
    # Espera a que el cliente esté conectado antes de tocar app.storage.tab
    await ui.context.client.connected()
    almacenamiento = app.storage.tab

    # Si el usuario ya está almacenado en la sesión, lo devuelve
    if 'usuario' in almacenamiento:
        return almacenamiento['usuario']

    # Construye un nuevo usuario
    constructor = ConstructorUsuario()
    encabezados_sesion = dict(ui.context.client.request.headers)
    usuario = constructor.construir_usuario(encabezados_sesion)

    # Lo almacena en el tab storage ligado al cliente
    almacenamiento['usuario'] = usuario
    
    return usuario