import type { ReactNode } from "react"

interface AuthLayoutProps {
    children: ReactNode,
    title?: string,
    subtitle?: string,
}

const baseContainerStyles = "min-h-screen bg-[linear-gradient(221deg,#59004d_0%,#000f52_58%,#3e0959_100%)] flex flex-col items-center justify-center p-4"
const innerContainerStyles = "w-full max-w-md rounded-2xl p-6 bg-[#0000003d] shadow-2xl"

const AuthLayout = ({ children }: AuthLayoutProps) => {
    return (
        <div className={baseContainerStyles}>
            <div className={`${innerContainerStyles} relative`}>
                { children }
            </div>
        </div>
    )
}

export default AuthLayout