import type { ButtonHTMLAttributes } from "react"
import Loader from "./Loader"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    isLoad?: boolean,
    title: string,
    className?: string
}

const baseStyles = `w-full bg-white border-r border-1 border-white uppercase  
text-black hover:text-white outline-0 cursor-pointer rounded-[5px] p-2 hover:bg-transparent duration-150
disabled:text-gray-400 disabled:border-gray-400 disabled:bg-[#ffffff87]! disabled:cursor-auto
`

const Button = ({ isLoad, title, className = '', ...props }: ButtonProps) => {
    return (
        <button
            className={`${baseStyles} ${className}`}
            {...props}
        >
            {isLoad ?
                <Loader />
                :
                title
            }
        </button>
    )
}

export default Button