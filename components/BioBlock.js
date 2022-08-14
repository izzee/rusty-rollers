import styles from '../styles/BioBlock.module.scss'

const BioBlock = () => {

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        Bios
      </div>
      <div className={styles.content}>
        <p><b>gremlin_bb</b> (audio, contract) is a Los-Angeles based creator who specializes in digital audio art. She makes pop music under the name Boule Goes Boing and creates experimental generative audio as gremlin_bb. Gremlin started her NFT career as a radio host for the Larva Lads community, and interviews NFT artists and creators when not making music. She loves analog synthesizers and heavy 808s.</p>
        <p><b>bb__guapo</b> (animation), also known as Bradley Boboc, is a Los Angeles-based painter who also specializes in video and animation. He conceived the idea for Rusty Rollers through cataloging different vehicles on Google Street View. Each token derives from automobiles captured throughout the Los Angeles area in 2007.</p>
      </div>
    </div>

  );
};

export default BioBlock