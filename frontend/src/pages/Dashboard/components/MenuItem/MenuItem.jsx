import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./MenuItem.module.scss";
import { Icon } from "../../../../components/Icon";
import { ItemSubmenu } from "../../../../components/ItemSubmenu/ItemSubmenu";

export const MenuItem = ({ iconTitle, path, colorClassMod, submenuList = null, isLink = true }) => {
    const [isOpen, setIsOpen] = useState(true); // состояние для отображения сабменю
    const Wrapper = isLink ? NavLink : "div"; 

    return (
        <div
            className={`${styles.menuItem} ${styles[colorClassMod]}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(true)}
        >
            <Wrapper
                to={isLink ? path : undefined}
                className={`${styles.menuLink} ${!isLink ? styles.nonLink : ''}`}
            >
                <Icon name={iconTitle} />
            </Wrapper>

            {submenuList && isOpen && <ItemSubmenu items={submenuList} />}
        </div>
    );
};