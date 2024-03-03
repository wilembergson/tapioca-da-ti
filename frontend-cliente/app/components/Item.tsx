import { Item } from "../page"

type Props = {
    dados: Item
}

export default function Item({dados}:Props){
    return(
        <section className="flex justify-between shadow-lg rounded-md bg-red-200 my-2 p-2">
            <div className="flex flex-col w-full">
                <h2 className="flex text-md">{dados.sabor.descricao}</h2>
                <h2 className="font-sm">QUANTIDADE: {dados.quantidade}</h2>   
                <h2>{dados.nomeCliente}</h2>
            </div>
            
                <h2 className="flex text-lg font-bold">R${dados.sabor.preco.toFixed(2)}</h2>
            
        </section>
    )
}