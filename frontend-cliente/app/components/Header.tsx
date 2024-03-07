import { useEffect, useState } from "react"
import { FaPowerOff } from "react-icons/fa";

export default function Header(){
    const [nomeUsuario, setNomeUsuario] = useState<string|null>(null)

    function logout(){
        localStorage.clear()
        window.location.reload()
    }

    useEffect(() => {
        const nome = localStorage.getItem("nomeUsuario")?.toString()
        nome ? setNomeUsuario(nome) : setNomeUsuario(null)
    }, [nomeUsuario])
    return(
        <header className="flex bg-[#581845] w-full justify-between py-4 px-2 shadow-md">
            <h1 className="text-[#FF5733] text-2xl font-bold">
                Tapioca da T.I
            </h1>
            {nomeUsuario !== null ? 
                <div className="flex text-[#FF5733] text-md items-center">
                    <h3 className="text-[#FF5733] text-md mr-1">
                        {nomeUsuario}
                    </h3> 
                    <button onClick={() => logout()}>
                        <FaPowerOff size={20}/>
                    </button>
                </div>
            : <></>
            }
        </header>
    )
}