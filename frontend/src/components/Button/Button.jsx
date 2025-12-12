import styles from './Button.module.scss';

export const Button = ({ children, onClick, type = 'button' }) => {
    return (
        <button type={type} onClick={onClick} className={styles.button}>
            {children}
        </button>
    );
};