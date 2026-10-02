import { useForm } from "react-hook-form"
import Button from "../../../../components/ui/Button"
import Input from "../../../../components/ui/Input"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormData } from "../../schemas/login.schema"
import { useState } from "react"
import { authApi } from "../../api/authApi"
import { Link } from "react-router"

const LoginForm = () => {
    const [isLoad, setIsLoad] = useState<boolean>(false)

    const {
        register,
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onTouched'
    })

    const onSubmit = async (data: LoginFormData) => {
        try{
            setIsLoad(true)
            const res = await authApi.login(data)
            localStorage.setItem('accessToken', res.accessToken)
        } catch(error){
            const message = error.response?.data?.message || 'Incorrect email or password'
            setError('root', { message })
        } finally {
            setIsLoad(false)
        }
    }

    return (
        <form>
            <h1 className="text-2xl font-bold text-white text-center tracking-widest uppercase mb-6">Sign In</h1>
            
            <Input {...register('email')} type="email" placeholder="Email"/>
            <Input {...register('password')} type="password" placeholder="Password"/>
            { errors.root && <span className="text-red-600 block text-center">{ errors.root.message }</span> }

            <Button 
                type="submit" 
                onClick={handleSubmit(onSubmit)} 
                isLoad={isLoad} 
                title={'Sign In'}
                className="mb-3"
            />

            <div className="bg-gray-700 h-\[1px]\ mb-3"></div>

            <Link to="/register">
                <Button title="Sign Up" className="bg-transparent! text-white!"/>
            </Link>
        </form>
    )
}

export default LoginForm