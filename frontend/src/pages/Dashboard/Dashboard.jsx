import { NavLink } from 'react-router'
import styles from './Dashboard.module.scss'

export const Dashboard = () => {
    return (
        <div className={styles.dashboard}>
            <h1>Dashboard</h1>
            <NavLink to='/'>
                main page
            </NavLink>
        </div>
    )
}