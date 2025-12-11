import baseStyles from '../base.module.scss'
import { MenuItem } from '../MenuItem/MenuItem'
import asideStyles from './Aside.module.scss'
import { asideItemsList } from './asideItemsList.jsx'

export const Aside = () => {
    return (
        <aside className={`${baseStyles.dashboardBox} ${asideStyles.aside}`}>
            <nav>
                <ul>
                    {
                        asideItemsList.map(item => (
                            <li key={item.id}>
                                <MenuItem 
                                    colorClassMod={item.colorClassMod} 
                                    iconTitle={item.iconTitle} 
                                    title={item.title} 
                                    path={item.path}
                                    submenuList={item.submenuList}
                                />
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </aside>
    )
}