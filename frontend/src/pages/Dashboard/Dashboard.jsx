import { NavLink } from 'react-router'
import styles from './Dashboard.module.scss'
import { ROUTES } from '../../routes/routesPaths'

export const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <NavLink to={ROUTES.MAIN}>
                main page
            </NavLink>
        </div>
    )
}