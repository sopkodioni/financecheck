import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router'
import {router} from './routes/routes'
import './styles/index.scss'
import 'reset-css'


const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router = {router} />)
