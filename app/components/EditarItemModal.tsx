import { useEffect, useState } from "react";
import api, { AtualizarItem } from "../api/api-connection";
import Modal from "./Modal";
import { Sabor } from "../page";
import { useGlobalContext } from "../contexts/Contexto";
import { erroMessage, sucessMessage } from "../utils/Toasts";
import LoaderCircle from "./LoaderCircle";

export default function EditarItemModal() {
    const {item, setItem, showModal, setShowModal} = useGlobalContext()
    const [sabores, setSabores] = useState<Sabor[]>()
    const [saborAtual, setSaborAtual] = useState<Sabor>(item?.sabor!)
    const [loading, setLoading] = useState(false)

    function handleChange({ target }: any) {
        setItem({ ...item!, [target.name]: target.value })
    }

    function mudarSabor(id:number){
        const sabor = sabores?.find(item => item.id === id)
        setSaborAtual(sabor!)
    }
    async function obterSabores() {
        try {
            const response = await api.listarSabores()
            setSabores(response.data)
        } catch (error: any) {
            erroMessage(error.response.data.mensagem)
        }
    }

    async function atualizar(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault()
        setLoading(true)
        const dados:AtualizarItem = {
            id:item!.id,
            quantidade: item!.quantidade,
            sabor_id: saborAtual!.id
        }
        try {
            const response = await api.atualizarItem(dados)
            setItem(null)
            setShowModal(false)
            sucessMessage(response.data.mensagem)
            setLoading(false)
        } catch (error: any) {
            setLoading(false)
            erroMessage(error.response.data.mensagem)
        }
    }

    function cancelar(){
        setShowModal(false)
    }

    useEffect(() => {
        obterSabores()
        setSaborAtual(item?.sabor!)
    }, [item?.quantidade])

    return (
        <Modal isVisible={showModal}>
            <div className="flex flex-col bg-white w-full h-52 shadow-lg rounded-lg items-center" 
                            data-aos="zoom-in">
                <h1 className="flex justify-center w-full font-black text-lg p-2 bg-azul text-laranja rounded-t-lg">
                    Editar pedido
                </h1>
                {!loading ?
                    <form className='flex flex-col w-full p-4 bg-white rounded-lg'>
                        {sabores !== undefined 
                            ? <select id="seletor"
                                    className='flex mb-4 font-md bg-gray-100 p-2 rounded-md'
                                    defaultValue={item?.sabor.id}
                                    onChange={(e) => mudarSabor(parseInt(e.target.value))}
                                >
                            {sabores!.map(option => (
                              <option className='flex mb-4 bg-blue-200 my-2 font-sm bg-gray-100 p-2 rounded-md'
                                        key={option.id} value={option.id}>
                                {option.descricao} - R${option.preco.toFixed(2)}
                              </option>
                            ))}
                            </select>
                            : <></>
                        }
                         <input className='flex mb-4 bg-gray-100 p-2 rounded-md'
                            type="number"
                            placeholder='quantidade'
                            name='quantidade'
                            onChange={(e: any) => handleChange(e)}
                            value={item?.quantidade}
                            required
                        />
                        <div className="flex">
                            <button className='flex bg-blue-500 text-white font-white rounded-md p-2 mr-2'
                                onClick={atualizar}>
                                Atualizar
                            </button>
                            <button className='flex bg-red-500 text-white font-white rounded-md p-2'
                                onClick={() => cancelar()}>
                                Cancelar
                            </button>
                        </div>
                    </form>
                :   <div className="flex w-full h-full items-center justify-center">
                        <LoaderCircle/>
                    </div>
                }

            </div>
        </Modal>
    )
}