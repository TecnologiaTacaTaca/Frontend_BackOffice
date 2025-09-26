import React, { createContext, useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import {
  adquirirTokenGraph,
  llamarGraphApi,
  obtenerGruposUsuarioDesdeGraph,
  obtenerNombreUsuario,
  obtenerFotoUsuario,
} from "./servicios/ServicioApiGraph";
import { loginAzure } from "./servicios/ServicioAutenticacionAzure";
import { metodos } from "../config/metodos";
import { modulos } from "../config/modulos";
import { InteractionStatus } from "@azure/msal-browser";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { instance, accounts, inProgress } = useMsal();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      console.log("initUser llamado. Entorno:", process.env.NODE_ENV); // Debug: Ver entorno
      console.log("Cuentas MSAL:", accounts.length, accounts); // Debug: Ver si hay cuentas
      console.log("Estado de interacción:", inProgress); // Debug: Ver inProgress

      if (process.env.NODE_ENV === "development") {
        // Modo dev: Usuario root con todos los permisos
        const modulosList = Object.entries(modulos).map(([_, value]) => ({
          nombre_mostrado: value.nombre_mostrado,
          descripcion: value.descripcion,
          ruta: value.ruta,
          submodulos: value.submodulos,
        }));
        setUser({
          id_usuario: "root-dev",
          email: "root@dev.local",
          name: "UserRoot",
          grupos: [
            { displayName: "SuperAdmin", description: "Area-group" },
            { displayName: "SuperAdmin", description: "Level-group" },
          ],
          photo: "",
          metodos: Object.keys(metodos),
          modulos: modulosList,
        });
      } else {
        if (accounts.length === 0 && inProgress === InteractionStatus.None) {
          console.log("Iniciando loginAzure..."); // Debug: Confirma si entra aquí
          try {
            await loginAzure(instance);
            console.log("loginAzure completado."); // Debug: Si llega aquí después del login

            // Setear cuenta activa después del login
            const allAccounts = instance.getAllAccounts();
            if (allAccounts.length > 0) {
              instance.setActiveAccount(allAccounts[0]);
              console.log("Cuenta activa seteada:", allAccounts[0]);
            } else {
              console.log("No hay cuentas después del login.");
            }
          } catch (loginError) {
            console.error("Error en loginAzure:", loginError);
          }
          return; // Después del login, useEffect se re-ejecutará
        } else {
          console.log(
            "No se inicia login: Cuentas existen o interacción en progreso."
          ); // Debug: Razón por no iniciar
        }
        // Token acquisition with try/catch
        try {
          const token = await adquirirTokenGraph(instance, accounts, [
            "User.Read",
            "GroupMember.Read.All",
          ]);
          const graphData = await llamarGraphApi("/me", token);

          const idUsuario = graphData.id;
          const email =
            graphData.mail?.toLowerCase() || "email@desconocido.com";
          const grupos = await obtenerGruposUsuarioDesdeGraph(token, idUsuario);
          const nombre = await obtenerNombreUsuario(token, idUsuario);
          const foto = await obtenerFotoUsuario(token, idUsuario);

          const gruposArea = grupos
            .filter((g) => g.description === "Area-group")
            .map((g) => g.displayName);
          const gruposLevel = grupos
            .filter((g) => g.description === "Level-group")
            .map((g) => g.displayName);

          const metodosList = Object.entries(metodos)
            .filter(
              ([_, value]) =>
                gruposArea.some((area) => value["Area-group"].includes(area)) &&
                gruposLevel.some((level) =>
                  value["Level-group"].includes(level)
                )
            )
            .map(([key]) => key);

          const modulosFiltered = Object.entries(modulos)
            .map(([_, value]) => {
              const submodulos = value.submodulos.filter((sub) =>
                sub.metodos_contenidos.some((metodo) =>
                  metodosList.includes(metodo)
                )
              );
              if (submodulos.length > 0) {
                return {
                  nombre_mostrado: value.nombre_mostrado,
                  descripcion: value.descripcion,
                  ruta: value.ruta,
                  submodulos,
                };
              }
              return null;
            })
            .filter(Boolean);

          setUser({
            id_usuario: idUsuario,
            email,
            name: nombre,
            grupos,
            photo: foto ? `data:image/jpeg;base64,${foto}` : "",
            metodos: metodosList,
            modulos: modulosFiltered,
          });
        } catch (tokenError) {
          console.error("Error adquiriendo token:", tokenError);
          // Opcional: Set isLoading(false) o maneja error en UI
        }
      }
      setIsLoading(false);
    };

    initUser();
  }, [instance, accounts, inProgress]); // Agrega inProgress a dependencias si no está

  return (
    <UserContext.Provider value={{ user, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
