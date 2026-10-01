import { useWatch, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form"
import Button from "../../../../components/ui/Button"
import Input from "../../../../components/ui/Input"
import type { RegisterFormData } from "../../schemas/register.schema"

interface EmailStepProps {
    isLoad: boolean,
    control: Control<RegisterFormData>,
    register: UseFormRegister<RegisterFormData>
    errors: FieldErrors<RegisterFormData>
    sendCode: () => Promise<void>
}

const subtitleStyles = "text-sm font-light text-white mb-6 text-center" 

const EmailStep = ({ isLoad, control, register, sendCode, errors }: EmailStepProps) => {
    const emailValue = useWatch({
        control,
        name: 'email'
    })

    const emailIsCorrect = emailValue.length <= 10

    return (
        <div>
            <h3 className={subtitleStyles}>To register, you need to verify your email</h3>
            
            <Input 
                { ...register('email') }
                placeholder = "Email" 
                error={ errors.email?.message }
            />
            <Button 
                onClick={ () => sendCode() } 
                title = "Send code"
                disabled={emailIsCorrect}
                type="button"
                isLoad={isLoad}
            />
        </div>
    )
}

export default EmailStep