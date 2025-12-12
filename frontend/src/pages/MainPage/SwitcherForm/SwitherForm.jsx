import styles from '../MainPage.module.scss'

export const SwitcherForm = ({setMode, mode}) => {
    
    return (
        <div className={styles.switcher}>
            <button
                className={mode === 'login' ? styles.active : ''}
                onClick={() => setMode('login')}
            >
                Войти
            </button>

            <button
                className={mode === 'register' ? styles.active : ''}
                onClick={() => setMode('register')}
            >
                Регистрация
            </button>
        </div>
    )
}