import { NavLink } from 'react-router'
import styles from './MainPage.module.scss'

export const MainPage = () => {
    return (
        <div className={styles.mainpage}>
            <h1>Main Page</h1>
            <NavLink to='/dashboard'>
                LK
            </NavLink>
        </div>
    )
}