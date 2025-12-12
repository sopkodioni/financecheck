import { Button } from "../../../components/Button/Button"
import { Input } from "../../../components/Input/Input"
import styles from '../MainPage.module.scss'

export const AuthForm = () => {
    return (
        <form className={styles.form}>
            <Input placeholder={'Нiкнейм'} />
            <Input type="password" placeholder="Пароль" />
            <Button>Увiйти</Button>
        </form>
    )
}