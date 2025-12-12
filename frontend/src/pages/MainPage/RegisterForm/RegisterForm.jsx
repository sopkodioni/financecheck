import { useState, useContext } from 'react';
import { Button } from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import styles from '../MainPage.module.scss';
import { api } from '../../../../../backend/services/api';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router';

export const RegisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirm) {
            setError('Паролі не співпадають');
            return;
        }
        try {
            const newUser = await api.registerUser({ name, email, password, currency: 'USD', avatar: '' });
            login(newUser);
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input placeholder='Нiкнейм' value={name} onChange={e => setName(e.target.value)} />
            <Input type='email' placeholder='Пошта' value={email} onChange={e => setEmail(e.target.value)} />
            <Input type='password' placeholder='Пароль' value={password} onChange={e => setPassword(e.target.value)} />
            <Input type='password' placeholder='Повтор паролю' value={confirm} onChange={e => setConfirm(e.target.value)} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <Button type='submit'>Створити аккаунт</Button>
        </form>
    );
};