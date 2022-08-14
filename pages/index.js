import Head from 'next/head'
import Image from 'next/image'

import styles from '../styles/Home.module.scss'

import InfoBlock from '../components/InfoBlock'
import MintBlock from '../components/MintBlock'

import WalletConnect from '../components/WalletConnect'


const App = () => {
  return (
    <main className={styles.main}>
      <div className={styles.titleimg}>
        <Image src='/images/rusty-rollers-title.svg' width='960' height='144' layout="intrinsic" alt='Rusty Rollers Title'/>
      </div>
      <InfoBlock />
      <MintBlock />
    </main>
  );
}

export default App
