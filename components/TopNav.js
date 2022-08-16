import { ConnectButton } from '@rainbow-me/rainbowkit';
import styles from '../styles/TopNav.module.scss'


const TopNav = () => {

  return (
    <div className={styles.topnav}>
      <ConnectButton />
      <div className={styles.socials}>
      </div>
    </div>
  );
};

export default TopNav