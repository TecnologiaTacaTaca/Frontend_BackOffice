from nicegui import ui, app

async def pagina_cierre_sesion():
    '''
    Cierra la sesión del usuario y lo redirige a la página de logout de Azure AD.
    '''
    await ui.context.client.connected()
    app.storage.tab.clear()
    ui.navigate.to('/.auth/logout?post_logout_redirect_uri=/')
    ui.notify('Sesión cerrada correctamente.', color='verdeoscuro')
    