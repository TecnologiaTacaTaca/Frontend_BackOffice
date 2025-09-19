import axios from "axios";

const getComercios = async () => {
  try {
    console.log(process.env.REACT_APP_BACKEND_APIHUB_COMERCIOS);
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_APIHUB_COMERCIOS}/comercios`
    );
    // Manejar la nueva estructura de respuesta
    const responseData = response?.data;
    const data = responseData?.data || responseData || [];
    return data;
  } catch (error) {
    console.error("Error al obtener comercios:", error);
    return [];
  }
};

export { getComercios };
