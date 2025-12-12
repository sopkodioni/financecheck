import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './routes/routes';
import './styles/index.scss';
import 'reset-css';
import { AuthProvider } from './context/AuthContext';

const root = createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
);