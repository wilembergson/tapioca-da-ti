import { ReactNode } from "react"

type Props = {
    isVisible: boolean
    children: ReactNode

}

export default function Modal({ isVisible, children}: Props) {
    if(!isVisible) return null
    return (
        <div className="fixed px-2 inset-0 bg-black bg-opacity-25 backdrop-blur-sm
            flex justify-center items-center z-20">
            {children}
        </div>
    )
}