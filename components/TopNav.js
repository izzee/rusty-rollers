import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image'
import styles from '../styles/TopNav.module.scss'



const TopNav = () => {

  return (
    <div className={styles.topnav} >
      <ConnectButton showBalance={false} />    
      <div className={styles.socials}>
        <Image src='/images/twitter.svg' width='40px' height='40px'/>
        <Image src='/images/opensea.svg' width='40px' height='40px'/>
        <Image src='/images/etherscan.svg' width='40px' height='40px'/>


      </div>
    </div>
  );
};

export default TopNav