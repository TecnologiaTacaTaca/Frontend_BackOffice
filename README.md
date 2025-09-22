# Documentación del Proyecto Frontend BackOffice React

## Decisión sobre nomenclatura e idioma

Se ha definido que toda la nomenclatura del código (clases, funciones, variables, rutas, carpetas, archivos, loggeos y comentarios) se mantendrá en idioma español. El propósito principal de esta decisión es garantizar la trazabilidad y detección de autoría del código, y poder diferenciarlo del Framework y demás dependencias.

## 1. Modo de uso Local

Para ejecutar el servicio en modo desarrollo localmente y realizar pruebas y vistas, sigue estos pasos:

1. Asegúrate de tener Node.js y npm instalados en tu máquina.
2. Navega al directorio del proyecto: `cd Frontend_BackOffice_React`.
3. Instala las dependencias: `npm install`.
4. Inicia el servidor de desarrollo: `npm start`.
5. Abre un navegador y accede a `http://localhost:3000` para ver la aplicación.

Esto levantará la aplicación en modo desarrollo con recarga automática para facilitar las pruebas.

## 2. Modo de uso Producción

Para desplegar la aplicación de manera productiva en Azure utilizando Portainer con Dockerfile y/o docker-compose, sigue estos pasos:

### Construcción y Despliegue

1. **Construir la aplicación**: Ejecuta `npm run build` para generar los archivos estáticos optimizados en la carpeta `build`.

2. **Crear un Dockerfile** (si no existe, crea uno similar a este en la raíz del proyecto):

```
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

3. **Construir la imagen Docker**: `docker build -t frontend-backoffice-react .`.

4. **Despliegue en Azure con Portainer**:
   - Sube la imagen a un registro de contenedores en Azure (Azure Container Registry).
   - En Azure, crea un Azure Container Instance o usa App Service para contenedores.
   - Utiliza Portainer para gestionar el contenedor: crea un stack con el docker-compose si es necesario, o despliega directamente la imagen.
   - Configura el puerto 80 para exposición.

### Ejemplo de docker-compose.yml:

```
version: '3'
services:
  frontend:
    image: frontend-backoffice-react
    ports:
      - "80:80"
```

- Despliega en Portainer subiendo este compose y configurando variables de entorno si es necesario.

Asegúrate de configurar la autenticación con Azure AD en el despliegue.

## 5. Funcionamiento del Logueo con Microsoft

El login utiliza la biblioteca MSAL para autenticación con Azure Active Directory. El flujo es el siguiente:

1. El usuario accede a la aplicación.
2. Se invoca `loginAzure` que usa `instance.loginPopup` con scopes ["User.Read", "GroupMember.Read.All"] para autenticar vía popup.
3. Una vez autenticado, se obtienen los tokens y datos del usuario (como grupos y permisos) mediante Microsoft Graph API.
4. Los permisos se validan contra configuraciones locales (modulos.js y metodos.js) para renderizar el menú y rutas accesibles.
5. La sesión se mantiene en el contexto de React, y se valida en cada carga.

Esto asegura una autenticación segura y centralizada.

## 3. Cómo Crear un Nuevo Módulo e Integrarlo al Menú Principal

Esta guía es para crear un nuevo modulo de uso en la plataforma. Nos enfocamos solo en crear componentes visuales y su estructura, sin lógica compleja. Usaremos como ejemplo la creación de un módulo "Ejemplo" con una tabla principal y una card de detalle para cada objeto.

### Pasos Generales:

1. **Estructura de Carpetas**: Los módulos se ubican en `src/modulos/`. Crea una carpeta para tu nuevo módulo, e.g., `src/modulos/ejemplo`.

2. **Crear Componentes**:

   - Crea archivos JSX para componentes visuales.
   - Usa componentes hijos para estructurar (e.g., una tabla como hijo de la página principal).

3. **Integrar al Menú**: Actualiza `src/config/modulos.js` para agregar el módulo y submódulos. Luego, agrega rutas en `src/App.js`.

### Ejemplo: Módulo "Ejemplo"

- Estructura:

```
modulos/ejemplo
-- Ejemplos.jsx  (Página principal con tabla)
-- Tabla
--- TablaDeEjemplos.jsx  (Componente de tabla con modal)
-- Detalle
--- Card_Detalle_Ejemplo.jsx  (Componente de card de detalle)
```

- **Ejemplos.jsx** (Página principal):

```jsx
import React from "react";
import TablaDeEjemplos from "./Tabla/TablaDeEjemplos";

const Ejemplos = () => {
  return (
    <div>
      <h1>Ejemplos</h1>
      <TablaDeEjemplos />
    </div>
  );
};

export default Ejemplos;
```

- **Tabla/TablaDeEjemplos.jsx** (Componente hijo - Tabla con modal):

```jsx
import React, { useState } from "react";
import Card_Detalle_Ejemplo from "../Detalle/Card_Detalle_Ejemplo";

const datos = [{ id: 1, nombre: "Ejemplo 1" }]; // Datos de ejemplo

const TablaDeEjemplos = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [itemSeleccionado, setItemSeleccionado] = useState(null);

  const abrirModal = (item) => {
    setItemSeleccionado(item);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setItemSeleccionado(null);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {datos.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.nombre}</td>
              <td>
                <button onClick={() => abrirModal(item)}>Ver detalle</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalAbierto && itemSeleccionado && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            padding: "20px",
            border: "1px solid black",
          }}
        >
          <Card_Detalle_Ejemplo item={itemSeleccionado} />
          <button onClick={cerrarModal}>Cerrar</button>
        </div>
      )}
    </>
  );
};

export default TablaDeEjemplos;
```

- **Detalle/Card_Detalle_Ejemplo.jsx** (Componente hijo - Card):

```jsx
import React from "react";

const Card_Detalle_Ejemplo = ({ item }) => {
  return (
    <div style={{ padding: "10px" }}>
      <h2>Detalle de {item.nombre}</h2>
      <p>ID: {item.id}</p>
      {/* Agrega más detalles de la fila aquí */}
    </div>
  );
};

export default Card_Detalle_Ejemplo;
```

4. **Agregar al Menú y Rutas**:
   - En `src/config/modulos.js`, agrega:
     ```js
     ejemplo: {
       nombre_mostrado: "Ejemplo",
       descripcion: "Módulo de ejemplo.",
       ruta: "/ejemplo",
       submodulos: [{ nombre: "ejemplos", ruta: "/ejemplo/lista", nombre_mostrado_front: "Lista de Ejemplos" }]
     }
     ```
   - En `src/App.js`, agrega la ruta:
     ```jsx
     <Route
       path="/ejemplo/lista"
       element={
         <Plantilla>
           <Ejemplos />
         </Plantilla>
       }
     />
     ```

Reinicia la app. El módulo aparecerá en el menú principal si los permisos lo permiten.

## 4. Descripción de Módulos Desarrollados y Rutas de Acceso

Cada módulo proporciona componentes visuales para funcionalidades específicas, con rutas accesibles vía el menú principal (según permisos).

- **Principal**: Módulo base con página de inicio y plantilla. Ruta: `/` (Inicio).
- **Fraude**: Gestión de fraude, incluye auditoría, gestión y lista negra.
  - Gestión de Fraude: Visualiza y gestiona fraudes. Ruta: `/fraude/gestion`.
  - Auditoría: Reportes de auditoría. Ruta: `/fraude/auditoria`.
  - Lista Negra: Manejo de listas negras. Ruta: `/fraude/lista-negra`.
- **Reportes**: Reportes de transacciones y movimientos.
  - Transacciones: Ver y descargar reportes. Ruta: `/reportes/transacciones`.
  - Movimientos: Ver y descargar reportes. Ruta: `/reportes/movimientos`.
- **Ejemplo**: Módulo de ejemplo (si agregado). Ruta: `/ejemplo/lista`.

Los módulos usan configuraciones de `modulos.js` y `metodos.js` para permisos y descripciones.
