import type { FieldErrors, UseFormRegister } from "react-hook-form"
import Button from "../../../../components/ui/Button"
import Input from "../../../../components/ui/Input"
import type { RegisterFormData } from "../../schemas/register.schema"
import { Link } from "react-router"

interface CredentialsStepProps {
    isLoad: boolean,
    register: UseFormRegister<RegisterFormData>
    errors: FieldErrors<RegisterFormData>
}

const subtitleStyles = "text-sm font-light text-white mb-6 text-center" 

const CredentialsStep = ({isLoad, register, errors}: CredentialsStepProps) => {
    return (
        <div>
            <h3 className={subtitleStyles}>Enter username and password</h3>
            <Input
                {...register('name')} 
                placeholder = "Name"
                error={errors.name?.message} 
            />
            <Input
                {...register('password')} 
                placeholder = "Password"
                type="password"
                error={errors.password?.message} 
            />
            <Input 
                {...register('confirmPassword')}
                placeholder = "Password"
                type="password"
                error={errors.confirmPassword?.message} 
            />
            <Input 
                {...register('email')}
                disabled
                className="border-green-400! text-green-400!" 
            />
            <Button
                type="submit"
                title = "Sign Up" 
                isLoad={isLoad}
            />

            <div className="bg-gray-700 h-px mb-3"></div>
        </div>
    )
}

export default CredentialsStep