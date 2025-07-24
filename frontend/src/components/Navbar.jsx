import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>Feedback</div>
            <div className={styles.links}>
                <Link to="/submit" className={styles.link}>Add New</Link>
                <Link to="/show" className={styles.link}>Show</Link>
            </div>
        </nav>
    );
};

export default Navbar;