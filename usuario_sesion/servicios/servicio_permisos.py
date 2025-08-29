import json, logging
from typing import List, Dict
from usuario_sesion.modelos.usuario import Usuario

class ServicioPermisos:
    """Servicio para manejar permisos y módulos del usuario."""

    def __init__(self):
        self.logger = logging.getLogger(__name__)
        self.metodos_config = self._cargar_configuracion_metodos()
        self.modulos_config = self._cargar_configuracion_modulos()

    def _cargar_configuracion_metodos(self) -> Dict:
        """Carga los métodos y permisos desde un archivo JSON."""
        try:
            with open('config/metodos.json', 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            self.logger.error("No fue posible acceder a la configuración de métodos.")
            return {}

    def _cargar_configuracion_modulos(self) -> Dict:
        """Carga la configuración de módulos desde un archivo JSON."""
        try:
            with open('config/modulos.json', 'r') as file:
                return json.load(file)
        except FileNotFoundError:
            self.logger.error("No fue posible acceder a la configuración de módulos.")
            return {}

    def obtener_permisos_metodo(self, usuario: Usuario) -> List[str]:
        """
        Obtiene los permisos del usuario a partir de los grupos a los que pertenece el usuario.
        :param usuario: Instancia del usuario.
        :return: Lista de métodos permitidos.
        """
        # Crea lista de permisos basados en los grupos del usuario.
        try:
            grupos_area = [grupo['displayName'] for grupo in usuario.grupos if grupo["description"] == "Area-group"]
            grupos_level = [grupo['displayName'] for grupo in usuario.grupos if grupo["description"] == "Level-group"]
        except:
            self.logger.error("Error al obtener los grupos del usuario.")
            grupos_area = []
            grupos_level = []

        # Filtra los permisos según los grupos del usuario.
        permisos = []
        try:
            for key, value in self.metodos_config.items():
                if any(area in value['Area-group'] for area in grupos_area) and any(level in value['Level-group'] for level in grupos_level):
                    permisos.append(key)
            return permisos
        except:
            self.logger.error("Error al filtrar los métodos del usuario.")
            return []

    def obtener_modulos_usuario(self, metodos_usuario: List[str]) -> List[Dict]:
        """
        Obtiene los módulos a los que tiene acceso el usuario a partir de los métodos a los que tiene permiso.
        :param metodos_usuario: Lista de métodos del usuario.
        :return: Lista de módulos con submodulos filtrados.
        """
        # Filtra los módulos según los métodos del usuario.
        modulos = []
        lista_metodos_set = set(metodos_usuario)
        try:
            for modulo, value in self.modulos_config.items():
                submodulos = []
                for submodulo in value['submodulos']:
                    if any(metodo in lista_metodos_set for metodo in submodulo['metodos_contenidos']):
                        submodulos.append(submodulo)
                if len(submodulos) > 0:
                    modulos.append({
                        "nombre_mostrado": value['nombre_mostrado'],
                        "descripcion": value['descripcion'],
                        "ruta": value['ruta'],
                        "submodulos": submodulos
                    })
            return modulos
        except:
            self.logger.error("Error al obtener los módulos del usuario.")
            return []