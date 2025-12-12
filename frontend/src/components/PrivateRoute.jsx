import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router';

export const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // пока мы проверяем localStorage, не рендерим редирект
        return <div>Loading...</div>;
    }

    if (!user) return <Navigate to="/" replace />;

    return children;
};