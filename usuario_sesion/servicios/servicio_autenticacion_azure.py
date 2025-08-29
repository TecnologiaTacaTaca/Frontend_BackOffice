from azure.identity import ManagedIdentityCredential
from azure.core.credentials import AccessToken
import base64, json, logging
from typing import Dict

class ServicioAutenticacionAzure:
    """Servicio para manejar la autenticación con Azure AD."""

    def __init__(self):
        self.logger = logging.getLogger(__name__)

    def obtener_token_graph(self) -> str:
        """
        Obtiene un token de acceso para Graph API usando ManagedIdentityCredential.
        :return: Token de acceso en formato string.
        """
        credencial = ManagedIdentityCredential()
        for i in range(3):
            try:
                token = credencial.get_token("https://graph.microsoft.com/.default")
                if isinstance(token, AccessToken):
                    return token.token
            except Exception as e:
                self.logger.error(f"Error al obtener el token de acceso de Graph API.")
                pass
        raise Exception("No se pudo obtener un token de acceso válido para Graph API.")

    def extraer_principal_cliente(self, encabezados_sesion: Dict) -> str:
        """ 
        Extrae el principal del cliente de los encabezados de sesión.
        :param encabezados_sesion: Encabezados de la sesión HTTP.
        :return: Principal del cliente en formato base64.
        """
        try:
            principal_cliente = encabezados_sesion.get("x-ms-client-principal", None)
            if not principal_cliente:
                self.logger.error("No se encontró el principal del cliente en los encabezados de sesión.")
                raise ValueError("No se encontró el principal del cliente en los encabezados de sesión.")
            return principal_cliente
        except Exception as e:
            raise Exception(f"Error al extraer el principal del cliente de los encabezados de sesión.")

    def obtener_claims_desde_principal_cliente(self, encabezados_sesion: Dict) -> str:
        """
        Obtiene los claims del usuario a partir del principal del cliente.
        :param encabezados_sesion: Encabezados de la sesión HTTP.
        :return: Claims del usuario.
        """
        try:
            json_principal_cliente = base64.b64decode(self.extraer_principal_cliente(encabezados_sesion)).decode('utf-8')
            datos_claims = json.loads(json_principal_cliente)

            # Busca el claim específico para el ID del usuario.
            for claim in datos_claims.get("claims", []):
                if claim.get("typ") == "http://schemas.microsoft.com/identity/claims/objectidentifier":
                    return claim.get("val")
            
            # Si no se encuentra el claim, lanza un error.
            self.logger.error("No se encontró el ID del usuario en el principal del cliente.")
            raise ValueError("No se encontró el ID del usuario en el principal del cliente.")
            
        except Exception as e:
            raise Exception(f"Error al obtener los claims del usuario a partir del principal del cliente.")

    def obtener_email_usuario(self, encabezados_sesion: Dict) -> str:
        """
        Obtiene el email del usuario a partir de los encabezados de sesión.
        :param encabezados_sesion: Encabezados de la sesión HTTP.
        :return: Email del usuario.
        """
        try:
            email = encabezados_sesion.get("x-ms-client-principal-name", None)
            if not email:
                self.logger.error("No se encontró el email del usuario en los encabezados.")
                raise ValueError("No se encontró el email del usuario en los encabezados.")
            return email.lower()
        except:
            raise Exception(f"Error al obtener el email del usuario.")