import axios from "axios";
import API_URL from "./api-url";

export type AtualizarItem = {
    id:number
    quantidade:number
    sabor_id:number
}

async function getPedidoAtual(){
    return await axios.get(`${API_URL}/pedido/atual`)
}

async function getItemPorId(id:number){
    return await axios.get(`${API_URL}/item/${id}`)
}

async function atualizarItem(data:AtualizarItem){
    return await axios.put(`${API_URL}/item/atualizar`,    data
    )
}

async function listarSabores(){
    return await axios.get(`${API_URL}/sabor/listar`)
}

const api = {
    getPedidoAtual,
    getItemPorId,
    listarSabores,
    atualizarItem
}

export default api