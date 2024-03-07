'use client'

import { useEffect, useState } from "react";
import Header from "./components/Header";
import api from "./api/api-connection";
import Pedido from "./components/Pedido";
import { TbShoppingCartX } from "react-icons/tb";
import EditarItemModal from "./components/EditarItemModal";
import { useGlobalContext } from "./contexts/Contexto";

export default function Home() {
  const {item} = useGlobalContext()
  const [pedido, setPedido] = useState<PedidoTipo>()

  async function obterPedido(){
    const pedido = await api.getPedidoAtual()
    setPedido(pedido.data)
  }

  useEffect(() => {
    obterPedido()
  },[item])

  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
          <Header/>
          {
            pedido ? <Pedido dados={pedido!}/> 
          : 
            <div className="flex flex-col flex-grow text-[#5D6D7E] items-center justify-center w-full h-full">
                <TbShoppingCartX size={56}/>
                <h1 className="flex text-2xl">
                  Nenhum pedido no momento
                </h1>
            </div>
          }
    </main>
  );
}

export type PedidoTipo = {
  id:number
  pix:string
  status:string
  data:number[]
  itens:Item[]
  total:number
  totalPago:number
  totalAPagar:number
}

export type Item = {
  id:number
  nomeCliente:string
  quantidade:number
  pago: boolean
  sabor:Sabor
  total:number
}

export type Sabor = {
  id:number
  descricao:string
  preco:number
}