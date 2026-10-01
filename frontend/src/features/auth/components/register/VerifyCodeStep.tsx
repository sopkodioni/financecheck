import { Controller, useWatch, type Control, type FieldErrors } from "react-hook-form"
import Button from "../../../../components/ui/Button"
import CodeInput from "../../../../components/ui/CodeInput"
import type { RegisterFormData } from "../../schemas/register.schema"
import type { RegisterStep } from "../../types"

interface VerifyCodeStepProps {
    isLoad: boolean,
    control: Control<RegisterFormData>
    errors: FieldErrors<RegisterFormData>
    verifyCode: () => Promise<void>
    setStep: (step: RegisterStep) => void
}

const subtitleStyles = "text-sm font-light text-white mb-6 text-center" 

const VerifyCodeStep = ({ isLoad, control, errors, verifyCode, setStep }: VerifyCodeStepProps) => {
    const codeValue = useWatch({
        control,
        name: 'code'
    })
    
    const isCodeIncomplete = !codeValue || codeValue.some(digit => digit.trim() === '')

    return (
        <div>
            <h3 className={subtitleStyles}>We have sent the code to your email</h3>

            <Controller 
                name="code"
                control={ control }
                render={({ field }) => (
                    <CodeInput 
                        codeList={ field.value } 
                        setCodeList={ field.onChange } 
                    />
                )}
            />
            {errors.code?.message && (
                <span className="text-sm text-center block text-red-500">{errors.code.message}</span>
            )}

            <Button
                onClick={() => verifyCode()}
                type="button"
                disabled={isCodeIncomplete}
                title = "Verify" 
                className="mb-3"
                isLoad={isLoad}
            />
            <Button
                onClick={() => setStep('EMAIL')}    
                title = "Back"
                type="button"
                className="bg-transparent! text-white" 
            />
        </div>
    )
}

export default VerifyCodeStep