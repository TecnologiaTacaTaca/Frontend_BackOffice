import axios from "axios";

const getComercios = async () => {
  try {
    const response = await axios.get(`http://127.0.0.1:8001/comercios`);
    // Manejar la nueva estructura de respuesta
    const responseData = response?.data;
    const data = responseData?.data || responseData || [];
    return data;
  } catch (error) {
    console.error("Error al obtener comercios:", error);
    return error;
  }
};

export { getComercios };
