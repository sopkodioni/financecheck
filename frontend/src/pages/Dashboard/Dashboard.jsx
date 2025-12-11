import { Aside } from './components/Aside/Aside'
import { HeaderNav } from './components/HeaderNav/HeaderNav'
import { Main } from './components/Main/Main'
import styles from './Dashboard.module.scss'
import baseStyles from './components/base.module.scss'

export const Dashboard = () => {
    const tempStyles= {display: 'flex', justifyContent: 'center', alignItems: 'center'}

    return (
        <div className={styles.dashboard}>
            <Aside />
            <div className={styles.rightContainer}>
                <header className={styles.header}>
                    <div className={`${baseStyles.walletsListBox}`} style={tempStyles}>
                        wallet
                    </div>
                    <HeaderNav />
                </header>
                <Main />
            </div>
        </div>
    )
}