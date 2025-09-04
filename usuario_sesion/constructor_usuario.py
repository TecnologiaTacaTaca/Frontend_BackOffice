import logging
from typing import Dict
from usuario_sesion.modelos.usuario import Usuario
from usuario_sesion.servicios.servicio_autenticacion_azure import ServicioAutenticacionAzure
from usuario_sesion.servicios.servicio_api_graph import ServicioApiGraph
from usuario_sesion.servicios.servicio_permisos import ServicioPermisos

class ConstructorUsuario:
    """Constructor que ensambla un usuario completo con todos sus datos."""

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.azure_service = ServicioAutenticacionAzure()
        self.permissions_service = ServicioPermisos()

    def construir_usuario(self, encabezados_sesion: Dict) -> Usuario:
        """
        Construye y retorna un objeto Usuario basado en la información almacenada en la sesión del cliente.
        :param encabezados_sesion: Encabezados de la sesión HTTP.
        :return: Usuario: Objeto Usuario completamente inicializado.
        """
        usuario = Usuario()

        try:
            # Obtiene un token de acceso para Graph API
            token = self.azure_service.obtener_token_graph()
        except Exception as e:
            self.logger.error(f"Error al obtener token: {e}")
            return usuario

        try:
            # Obtiene el ID del usuario de Azure
            usuario.id_usuario = self.azure_service.obtener_claims_desde_principal_cliente(encabezados_sesion)
        except Exception as e:
            self.logger.error(f"Error al obtener ID de usuario: {e}")

        try:
            # Obtiene el email del usuario
            usuario.email = self.azure_service.obtener_email_usuario(encabezados_sesion)
        except Exception as e:
            self.logger.error(f"Error al obtener email: {e}")

        # Inicializa el servicio de Graph API con el token
        graph_service = ServicioApiGraph(token)

        try:
            # Obtiene los grupos del usuario desde Graph API
            usuario.grupos = graph_service.obtener_grupos_usuario_desde_graph(usuario.id_usuario)
        except Exception as e:
            self.logger.error(f"Error al obtener grupos: {e}")

        try:
            # Obtiene el nombre del usuario
            usuario.nombre = graph_service.obtener_nombre_usuario(usuario.id_usuario)
        except Exception as e:
            self.logger.error(f"Error al obtener nombre: {e}")

        try:
            # Obtiene la foto del usuario
            foto_usuario = graph_service.obtener_foto_usuario(usuario.id_usuario)
            if foto_usuario:
                usuario.foto = foto_usuario
        except Exception as e:
            self.logger.error(f"Error al obtener foto: {e}")

        try:
            # Obtiene los permisos del usuario
            usuario.metodos = self.permissions_service.obtener_permisos_metodo(usuario)
        except Exception as e:
            self.logger.error(f"Error al obtener permisos: {e}")

        try:
            # Obtiene los módulos del usuario
            usuario.modulos = self.permissions_service.obtener_modulos_usuario(usuario.metodos)
        except Exception as e:
            self.logger.error(f"Error al obtener módulos: {e}")

        return usuario