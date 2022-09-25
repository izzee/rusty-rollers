import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image'
import styles from '../styles/TopNav.module.scss'

const TopNav = () => {

  return (
    <div className={styles.topnav} >
      <ConnectButton showBalance={false} />    
      <div className={styles.socials}>
        <a href="https://twitter.com/rusty_rollers" target="_blank" rel="noreferrer">
          <Image src='/images/twitter.svg' alt='twitter icon' width='40px' height='40px'/>
        </a>
        <a href="https://opensea.io/collection/rustyrollers" target="_blank" rel="noreferrer">
          <Image src='/images/opensea.svg' alt='opensea icon' width='40px' height='40px'/>
        </a>
        <a href="https://etherscan.io/address/0x0c537f8F6780628aFdf866E41A81d2ED97CFC8a2" target="_blank" rel="noreferrer">
          <Image src='/images/etherscan.svg' alt='etherscan icon' width='40px' height='40px'/>
        </a>
      </div>
    </div>
  );
};

export default TopNav