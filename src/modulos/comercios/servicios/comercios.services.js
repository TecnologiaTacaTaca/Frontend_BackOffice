import axios from "axios";
import mockComercios from "../../../mock/mockComercios.json";

const getComercios = async () => {
  try {
    const response = await axios.get(
      `${process.env.BACKEND_APIHUB_COMERCIOS}/comercios`
    );
    const data = response?.data?.length > 0 ? response.data : [];
    return data;
  } catch (error) {
    console.error("Error al obtener comercios:", error);
    return mockComercios;
  }
};

export { getComercios };
