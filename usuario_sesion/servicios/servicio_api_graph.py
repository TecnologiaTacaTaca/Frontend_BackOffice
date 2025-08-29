import requests, base64, logging, time
from typing import List, Dict, Optional

class ServicioApiGraph:
    """Servicio para interactuar con Microsoft Graph API."""

    def __init__(self, token: str):
        self.token = token
        self.encabezados = {
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json"
        }
        self.logger = logging.getLogger(__name__)

    def obtener_grupos_usuario_desde_graph(self, id_usuario: str) -> List[Dict]:
        """
        Obtiene los grupos del usuario desde Graph API.
        :param id_usuario: ID del usuario en Azure.
        :return: Lista de grupos organizados del usuario.
        """
        url = f"https://graph.microsoft.com/v1.0/users/{id_usuario}/memberOf"
        grupos_az = ['Area-group', 'Level-group']
        grupos = []

        # Realiza solicitudes iterativas a Graph API para obtener los grupos del usuario.
        try:
            while url:
                respuesta = requests.get(url, headers=self.encabezados)
                if respuesta.status_code != 200:
                    self.logger.error(f"Error al obtener los grupos del usuario desde Graph API: {respuesta.status_code} - {respuesta.text}")
                    raise Exception(f"Error al obtener los grupos del usuario desde Graph API.")
                datos = respuesta.json()
                grupos.extend(datos.get("value", []))
                url = datos.get("@odata.nextLink", False)

            grupos = [grupo for grupo in grupos 
                     if grupo.get("description") 
                     and any(grupo_az in grupo["description"] for grupo_az in grupos_az)]

            grupos_organizados = [
                {
                    "displayName": g["displayName"],
                    "description": g["description"]
                }
                for g in grupos
            ]

            # Verifica si el usuario pertenece a algún grupo.
            if len(grupos_organizados) == 0:
                self.logger.warning("El usuario no pertenece a ningún grupo de Azure.")
                return []
            else:
                return grupos_organizados
        except Exception as e:
            self.logger.error(f"Error al obtener los grupos del usuario desde Graph API: {str(e)}")
            raise Exception(f"Error al obtener los grupos del usuario desde Graph API.")

    def obtener_nombre_usuario(self, id_usuario: str) -> str:
        """
        Obtiene el nombre del usuario desde Microsoft Graph a partir de su ID.
        :param id_usuario: ID del usuario en Azure.
        :return: Nombre del usuario.
        """
        url_nombre = f"https://graph.microsoft.com/v1.0/users/{id_usuario}"
        
        # Obtiene el nombre del usuario.
        for i in range(3):
            try:
                respuesta_nombre = requests.get(url_nombre, headers=self.encabezados)
                if respuesta_nombre.status_code != 200:
                    raise Exception(f"Error al obtener el nombre del usuario. Status code: {respuesta_nombre.text}")
                datos_usuario = respuesta_nombre.json()
                nombre_usuario = datos_usuario.get("givenName", "Usuario Desconocido")
                return nombre_usuario
            except Exception as e:
                self.logger.error(f"Error al obtener el nombre del usuario: {str(e)}.")
                time.sleep(1)  # Espera antes de reintentar
                pass
        raise Exception(f"Error al obtener el nombre del usuario.")

    def obtener_foto_usuario(self, id_usuario: str) -> Optional[str]:
        """
        Obtiene la foto del usuario desde Microsoft Graph a partir de su ID.
        :param id_usuario: ID del usuario en Azure.
        :return: Foto del usuario en formato base64 o None si no se encuentra.
        """
        url_foto = f"https://graph.microsoft.com/v1.0/users/{id_usuario}/photo/$value"

        # Obtiene la foto del usuario.
        for i in range(3):
            try:
                respuesta_foto = requests.get(url_foto, headers=self.encabezados)
                if respuesta_foto.status_code != 200:
                    self.logger.error(f"Error al obtener la foto del usuario: {respuesta_foto.status_code} - {respuesta_foto.text}.")
                    return None
                else:
                    foto_usuario = base64.b64encode(respuesta_foto.content).decode("utf-8")
                    return foto_usuario
            except Exception as e:
                self.logger.error(f"Error al obtener la foto del usuario. {str(e)}.")
                time.sleep(1)  # Espera antes de reintentar
                pass
        return None