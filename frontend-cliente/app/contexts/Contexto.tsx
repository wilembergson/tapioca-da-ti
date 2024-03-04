'use client'

import { Dispatch, SetStateAction, createContext, useContext, useState } from "react"
import { Item } from "../page"

interface ContextProps {
    item: Item| null
    setItem: Dispatch<SetStateAction<Item| null>>
    showModal: boolean
    setShowModal: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<ContextProps>({
    item: null,
    setItem: (): Item| null => null,
    showModal: false,
    setShowModal: (): void => {}
})

export const GlobalContextProvider = ({ children }: any) => {
    const [item, setItem] = useState<Item| null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)

    return (
        <GlobalContext.Provider value={{ item, setItem, showModal, setShowModal }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => useContext(GlobalContext)