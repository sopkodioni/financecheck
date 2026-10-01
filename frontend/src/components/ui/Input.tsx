import { forwardRef, type InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    error?: string
}
const baseStyles = `border-b-2 border-white w-full p-2 text-center placeholder:text-gray-400 text-white tracking-wide mb-3 outline-none mb-4
disabled:border-gray-400 text-gray outline-none focus:shadow-[0_7px_6px_-4px_rgba(255,255,255,0.4)] [&&:-webkit-autofill]:[transition:background-color_999999s_ease-in-out_0s]
    [&&:-webkit-autofill]:bg-transparent [&&:-webkit-autofill]:[-webkit-text-fill-color:#fff]`

const Input = forwardRef<HTMLInputElement, InputProps>( ({ error, className = '', ...props }, ref) => {
    return (
        <div className="w-full">
            <input
                ref={ref}
                className={`${baseStyles} ${className} duration-300 `}
                {...props}
            />
            { error && <span className="text-sm text-center w-full block mb-1 text-red-500">{error}</span> }
        </div>
    )
})

export default Input