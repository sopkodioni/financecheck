import { NavLink } from 'react-router'
import styles from './MainPage.module.scss'
import { ROUTES } from '../../routes/routesPaths'

export const MainPage = () => {
    return (
        <div className={styles.mainpage}>
            <h1>Main Page</h1>
            <NavLink to={ROUTES.DASHDOARD}>
                DASHDOARD
            </NavLink>
        </div>
    )
}