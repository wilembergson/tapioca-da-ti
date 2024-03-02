import axios from "axios";
import API_URL from "./api-url";

async function getPedidoAtual(){
    return await axios.get(`http://localhost:8080/pedido/atual`)
}

const api = {
    getPedidoAtual
}

export default api