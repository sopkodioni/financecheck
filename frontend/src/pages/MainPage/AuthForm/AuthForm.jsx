import { useState, useContext } from 'react';
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from '../MainPage.module.scss';
import { api } from '../../../../../backend/services/api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';

export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await api.loginUser(email, password);
            login(user);
            navigate('/dashboard'); // редирект на личный кабинет
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input placeholder='Пошта' value={email} onChange={e => setEmail(e.target.value)} />
            <Input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type='submit'>Увiйти</Button>
        </form>
    );
};