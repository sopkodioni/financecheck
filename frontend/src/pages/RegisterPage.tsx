import RegisterForm from "../features/auth/components/register/RegisterForm"
import AuthLayout from "../components/layout/AuthLayout"

const RegisterPage = () => {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    )
}

export default RegisterPage