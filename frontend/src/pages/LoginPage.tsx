import AuthLayout from "../components/layout/AuthLayout"
import LoginForm from "../features/auth/components/login/LoginForm"

const LoginPage = () => {
    return (
        <AuthLayout title="Login">
            <LoginForm />
        </AuthLayout>
    )
}

export default LoginPage