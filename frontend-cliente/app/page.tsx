'use client'

import 'aos/dist/aos.css'
import Aos from 'aos'
import { useEffect, useState } from "react";
import Header from "./components/Header";
import api, { NovoItem } from "./api/api-connection";
import Pedido from "./components/Pedido";
import { TbShoppingCartX } from "react-icons/tb";
import { useGlobalContext } from "./contexts/Contexto"
import { BsCartPlusFill } from "react-icons/bs";
import NovoItemModal from "./components/NovoItemModal";


export default function Home() {
  const {item, setShowNovoItemModal} = useGlobalContext()
  const [nomeUsuario, setNomeUsuario] = useState<string|null>(null)
  const [nomeHadleChange, setNomeHandleChange] = useState<string>('')
  const [pedido, setPedido] = useState<PedidoTipo>()

  useEffect(() => {
    Aos.init({ duration: 500 })
  }, [])

  async function obterPedido(){
    const pedido = await api.getPedidoAtual()
    setPedido(pedido.data)
  }

  function setarNomeUsuario(){
    localStorage.setItem('nomeUsuario', nomeHadleChange)
  }

  function obterNomeLocalStorage(){
    const nome = localStorage.getItem('nomeUsuario')
    nome ? setNomeUsuario(nome) : setNomeUsuario(null)
  }

  useEffect(() => {
    obterPedido()
    obterNomeLocalStorage()
  },[pedido, item, nomeUsuario])

  return (
    <main className="flex min-h-screen flex-col items-center pb-20">
          <Header/>
          {nomeUsuario ? 
            <>
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
            </>
            : 
            <div className="flex mt-10">
                <form className="flex flex-col justify-center"
                      onSubmit={setarNomeUsuario}>
                  <h2 className="flex text-xl justify-center">
                    Bota teu nome aí
                  </h2>
                  <input className='flex my-4 bg-gray-100 p-2 rounded-md'
                    type="text"
                    placeholder='aí'
                    onChange={(e: any) => setNomeHandleChange(e.target.value)}
                    value={item?.quantidade}
                    required
                />
                <button className="flex bg-blue-400 w-auto rounded-md text-white justify-center p-2">
                  Entrar
                </button>
                </form>
            </div>  
        }
        {nomeUsuario ? 
          <button className="fixed right-4 bottom-4 bg-blue-400 w-auto rounded-full
                  text-white justify-center p-4 shadow-[5px 7px 9px -1px rgba(0,0,0,0.75)] z-10"
                  onClick={() => setShowNovoItemModal(true)}>
          <BsCartPlusFill size={34}/>
        </button> 
        : <></>
      }
      <NovoItemModal obterPedido={obterPedido}/>
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