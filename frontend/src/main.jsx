import { createRoot } from 'react-dom/client'
import {RouterProvider, createBrowserRouter} from 'react-router'
import {router} from './routes/routes'
import 'reset-css'
import './styles/index.scss'


const root = createRoot(document.getElementById('root'))
root.render(<RouterProvider router = {router} />)
