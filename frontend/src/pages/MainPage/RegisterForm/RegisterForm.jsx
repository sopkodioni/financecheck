import { Button } from "../../../components/Button/Button"
import { Input } from "../../../components/Input/Input"
import styles from '../MainPage.module.scss'

export const RegisterForm = () => {
    return (
        <form className={styles.form}>
            <Input placeholder={'Нiкнейм'} />
            <Input type='email' placeholder={'Пошта'} />
            <Input type='password' placeholder={'Пароль'} />
            <Input type='password' placeholder={'Повтор паролю'} />
            <Button>Створити аккаунт</Button>
        </form>
    )
}