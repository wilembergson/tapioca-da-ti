import axios from "axios";
import API_URL from "./api-url";

async function getPedidoAtual(){
    return await axios.get(`${API_URL}/pedido/atual`)
}

async function getItemPorId(id:number){
    return await axios.get(`${API_URL}/item/${id}`)
}

async function listarSabores(){
    return await axios.get(`${API_URL}/sabor/listar`)
}

const api = {
    getPedidoAtual,
    getItemPorId,
    listarSabores
}

export default api