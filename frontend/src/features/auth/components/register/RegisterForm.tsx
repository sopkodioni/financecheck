import { useState } from "react"
import { useForm } from "react-hook-form"
import { registerSchema, type RegisterFormData } from "../../schemas/register.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import EmailStep from "./EmailStep"
import VerifyCodeStep from "./VerifyCodeStep"
import CredentialsStep from "./CredentialsStep"
import type { RegisterStep } from "../../types"
import { authApi } from "../../api/authApi"
import { useDispatch } from "react-redux"
import { setCredentials } from "../../authSlice"
import { useNavigate } from "react-router"

const RegisterForm = () => {
    const [step, setStep] = useState<RegisterStep>('EMAIL')
    const [isLoad, setIsLoad] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {
        register,
        handleSubmit,
        getValues,
        setError,
        trigger,
        control,
        formState: { errors }
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: '',
            code: ['','','',''],
            name: '',
            password: '',
            confirmPassword: ''
        },
        mode: 'onTouched'
    })

    const sendCode = async () => {
        const email = getValues('email')
        const isValid = await trigger(['email'])
        if(!isValid) return

        try{
            setIsLoad(true)
            await authApi.sendCode({ email })            
            setStep('CODE')
        } catch (error) {
            const serverErrorMessage = error.response?.data?.message
            setError('email', { message: serverErrorMessage })
        } finally {
            setIsLoad(false)
        }
    }

    const verifyCode = async () => {
        const { email, code } = getValues()
        const isValid = await trigger(['code'])
        if(!isValid) return
        
        try{
            setIsLoad(true)
            const enteredCode = code.join('')
            const data = await authApi.verifyCode({ email, enteredCode })
            localStorage.setItem('emailToken', data.emailToken)
            setStep('CREDENTIALS')
        } catch (error){
            const serverErrorMessage = error.response?.data?.message
            setError('code', { message: serverErrorMessage })
        } finally {
            setIsLoad(false)
        }
    }

    const onSubmit = async (data: RegisterFormData) => {
        const { name, password } = data
        const emailToken = localStorage.getItem('emailToken')
        
        try{
            setIsLoad(true)
            const { accessToken } = await authApi.register({ name, password, emailToken })
            localStorage.removeItem('emailToken')
            const user = await authApi.getMe(accessToken)
            dispatch(setCredentials({ user, accessToken }))
            navigate('/dashboard')
        } catch(error){
            const serverErrorMessage = error.response?.data?.message
            alert(serverErrorMessage)
        } finally{
            setIsLoad(false)
        }
    }

    return (
        <form onSubmit={ handleSubmit(onSubmit) } className="relative">
            <h1 className="text-2xl font-bold text-white text-center tracking-widest uppercase">Sign Up</h1>

            {step === 'EMAIL' && (
                <EmailStep
                    control={ control } 
                    register={ register }
                    isLoad={isLoad} 
                    sendCode={ sendCode }
                    errors={ errors } 
                />
            )}

            {step === 'CODE' && (
                <VerifyCodeStep 
                    control={ control }
                    verifyCode={ verifyCode }
                    isLoad={isLoad}
                    setStep={ setStep }
                    errors={ errors }
                />
            )}

            {step === 'CREDENTIALS' && (
                <CredentialsStep 
                    register={ register }
                    isLoad={isLoad}
                    errors={ errors }
                />
            )}

            {/* {isLoad && <Loader />} */}
        </form>
    )
}

export default RegisterForm