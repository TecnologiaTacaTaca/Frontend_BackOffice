// Replicación de modulos.json para React
export const modulos = {
  inicio: {
    nombre_mostrado: "Inicio",
    descripcion: "Página principal de inicio.",
    ruta: "/",
    icono: "HomeIcon",
  },
  comercios: {
    nombre_mostrado: "Comercios",
    descripcion: "Módulo para gestión de comercios.",
    ruta: "/comercios",
    icono: "StoreIcon",
  },
  reportes: {
    nombre_mostrado: "Reportes",
    descripcion: "Módulo para gestionar reportes.",
    ruta: "/reportes",
    icono: "FolderIcon",
    submodulos: [
      {
        nombre: "reporte_transacciones",
        ruta: "/reportes/transacciones",
        nombre_mostrado_front: "Transacciones",
        descripcion: "Permite ver y descargar el reporte de transacciones.",
        metodos_contenidos: [
          "ver_reporte_transacciones",
          "descargar_reporte_transacciones",
        ],
      },
      {
        nombre: "reporte_movimientos",
        ruta: "/reportes/movimientos",
        nombre_mostrado_front: "Movimientos",
        descripcion: "Permite ver y descargar el reporte de movimientos.",
        metodos_contenidos: [
          "ver_reporte_movimientos",
          "descargar_reporte_movimientos",
        ],
      },
    ],
  },
  fraude: {
    nombre_mostrado: "Fraude",
    descripcion: "Módulo para gestión de fraude y seguridad.",
    ruta: "/fraude",
    icono: "SecurityIcon",
    submodulos: [
      {
        nombre: "gestion_fraude",
        ruta: "/fraude/gestion",
        nombre_mostrado_front: "Gestion de Fraude",
        descripcion: "Permite gestionar y monitorear actividades fraudulentas.",
        metodos_contenidos: [
          "ver_fraudes",
          "investigar_fraude",
          "actualizar_estado_fraude",
        ],
      },
      {
        nombre: "lista_negra",
        ruta: "/fraude/lista-negra",
        nombre_mostrado_front: "Gestion de Lista Negra",
        descripcion: "Permite gestionar listas negras de usuarios y entidades.",
        metodos_contenidos: [
          "ver_lista_negra",
          "agregar_lista_negra",
          "remover_lista_negra",
        ],
      },
      {
        nombre: "auditoria",
        ruta: "/fraude/auditoria",
        nombre_mostrado_front: "Auditoria",
        descripcion: "Permite realizar auditorías de seguridad y fraude.",
        metodos_contenidos: [
          "ver_auditoria",
          "generar_reporte_auditoria",
          "exportar_auditoria",
        ],
      },
    ],
  },
};
