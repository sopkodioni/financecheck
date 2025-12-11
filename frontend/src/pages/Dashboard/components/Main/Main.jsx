import { Outlet } from 'react-router'
import baseStyles from '../base.module.scss'
import mainStyles from './Main.module.scss'

export const Main = () => {
    return (
        <main className={`${baseStyles.dashboardBox} ${mainStyles.main}`}>
            <Outlet />
        </main>
    )
}