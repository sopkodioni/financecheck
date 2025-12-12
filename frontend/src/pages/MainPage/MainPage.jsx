import { useState } from 'react';
import styles from './MainPage.module.scss';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { AuthForm } from './AuthForm/AuthForm';
import { RegisterForm } from './RegisterForm/RegisterForm';
import { SwitcherForm } from './SwitcherForm/SwitherForm';

export const MainPage = () => {
    const [mode, setMode] = useState('login');

    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                <SwitcherForm setMode={setMode} mode={mode}/>
                {mode == 'login' ? <AuthForm /> : <RegisterForm />}
            </div>
        </div>
    );
};