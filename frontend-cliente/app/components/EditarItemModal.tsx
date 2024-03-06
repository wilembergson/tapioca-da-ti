import { useEffect, useState } from "react";
import api from "../api/api-connection";
import Modal from "./Modal";
import { Item, Sabor } from "../page";
import { useGlobalContext } from "../contexts/Contexto";

export default function EditarItemModal() {
    const {item, setItem, showModal, setShowModal} = useGlobalContext()
    //const [item, setItem] = useState<Item>()
    const [sabores, setSabores] = useState<Sabor[]>()
    const [saborAtual, setSaborAtual] = useState<Sabor>()

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
            alert(error)
            //alerts.ErrorAlert(error.response.data.mensagem)
        }
    }



    /*function confirmarAtualizacao(event: any) {
        event.preventDefault()
        alerts.ConfirmarAlert(
            atualizarEnquete,
            'Cofirmar atualização?',
            'As mudanças seram exibidas na votação.'
        )
    }*/

    /*async function atualizarEnquete() {
        try {
            const response = await api.atualizarEnquete(enquete?.tempo!)
            setEnqueteAtiva({
                id: enqueteAtiva?.id!,
                pergunta: enqueteAtiva!.pergunta!,
                tempo: enquete.tempo,
                ativo: enqueteAtiva?.ativo!,
                data_hora: enqueteAtiva?.data_hora!
            })
            setVisible(false)
            //alerts.SucessoAlert(response.data.mensagem)
        } catch (error: any) {
            alert(error)
            //alerts.ErrorAlert(error.response.data.mensagem)
        }
    }*/

    function cancelar(){
        setShowModal(false)
    }

    useEffect(() => {
        obterSabores()
        alert(item?.sabor.descricao)
        setSaborAtual(item?.sabor!)
    }, [])

    return (
        <Modal isVisible={showModal}>
            <div className="flex flex-col bg-white w-full mx-10 h-52 shadow-lg" data-aos="zoom-in">
                <h1 className="`flex font-black text-lg p-2 bg-[#581845] text-[#FF5733]">
                    Editar pedido
                </h1>
                <form className='flex flex-col p-4 bg-white'>
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
                        <button className='flex bg-red-500 text-white font-white rounded-md p-2'
                            onClick={() => cancelar()}>
                            Cancelar
                        </button>
    </div>
                </form>

            </div>
        </Modal>
    )
}