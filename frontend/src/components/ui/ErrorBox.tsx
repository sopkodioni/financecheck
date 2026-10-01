
const errorBoxStyles = `w-full max-w-md 
rounded-2xl p-3 bg-[#0000003d] 
inset-shadow-green-300
absolute
-top-[110px]
text-center
`

interface ErrorBoxProps {
    error: string,
    className?: string
}

const ErrorBox = ({ error, className } : ErrorBoxProps) => {
    return (
        <div className={`${errorBoxStyles} ${className} duration-75`}>
            <span className={`text-amber-600 text-shadow-green-200 ${error
                    ? 'grid-rows-[1fr] opacity-100 mt-2'
                    : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                { error }
            </span>
        </div>
    )
}

export default ErrorBox