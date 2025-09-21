import { NavLink } from 'react-router'
import styles from './AppSettings.module.scss'
import { ROUTES } from '../../routes/routesPaths'

export const AppSettings = () => {
    return (
        <div className={styles.appsettings}>
            <h1>Settings page</h1>
            <NavLink to={ROUTES.DASHDOARD}>
                DASHDOARD
            </NavLink>
        </div>
    )
}