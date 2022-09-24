import Image from 'next/image'
import styles from '../styles/InfoBlock.module.scss'

const InfoBlock = () => {

  return (
    <div className={styles.block}>
      
      <div className={styles.content}>
        <p>Rusty Rollers is a PFP collection of 500 cars perpetually rolling through the&nbsp;metaverse.</p>
        <p>Each car has been animated by hand and comes with a personalized soundtrack, constructed generatively from manually-recorded stems.&nbsp;</p>
        <p>Created by gremlin_bb and bb__guapo, the collection delivers 1/1 quality at a PFP scale. Mint date September&nbsp;2022.</p>
      </div>
      <div className={styles.image}>
        <Image src='/images/car.gif' width='270px' height='270px' alt='Rusty Roller image'/>
        <p>Total Supply: 500</p>
      </div>
    </div>
  );
};

export default InfoBlock