import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import InfoBlock from '../components/InfoBlock'
import MintBlock from '../components/MintBlock'
import BioBlock from '../components/BioBlock'

const App = () => {
  return (
    <main className={styles.main}>
      <div className={styles.titleimg}>
        <Image src='/images/rusty-rollers-title.svg' width='960' height='144' layout="intrinsic" alt='Rusty Rollers Title'/>
      </div>
      <InfoBlock />
      <MintBlock />
      <BioBlock text=""/>

    </main>
  );
}

export default App
