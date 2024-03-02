import {PedidoTipo} from '../page'

type Props = {
    dados:PedidoTipo
}

export default function Pedido({dados}:Props){
    return(
        <div>
            <h1>Pix: {dados?.pix}</h1>
        </div>
    )
}