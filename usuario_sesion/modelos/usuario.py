import base64

class Usuario:
    """ Clase que representa un usuario en la aplicación.
    Atributos:
        id_usuario (str): ID del usuario.
        grupos (list): Lista de grupos de AAD a los que pertenece el usuario.
        nombre (str): Nombre del usuario.
        foto (str): Foto del usuario en formato base64.
        metodos (list): Lista de métodos a los que tiene acceso el usuario.
        modulos (list): Lista de módulos a los que tiene acceso el usuario.
    """

    def __init__(self, id_usuario: str = None, email: str = None):
        self.id_usuario = id_usuario
        self.email = email.lower() if email else None
        self.grupos = []
        self.nombre = 'usuario desconocido'
        self.foto = self._cargar_foto_por_defecto()
        self.metodos = []
        self.modulos = []

    def __str__(self):
        return f"Usuario(id_usuario={self.id_usuario})"

    def _cargar_foto_por_defecto(self) -> str:
        """Carga la foto por defecto del usuario."""
        try:
            with open('static/img/defaultUserLogo.png', 'rb') as f:
                return base64.b64encode(f.read()).decode("utf-8")
        except FileNotFoundError:
            return None