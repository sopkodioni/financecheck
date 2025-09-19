import { NavLink } from 'react-router'
import styles from './AppSettings.module.scss'

export const AppSettings = () => {
    return (
        <div className={styles.appsettings}>
            <h1>Settings page</h1>
            <NavLink to='/dashboard'>
                LK
            </NavLink>
        </div>
    )
}