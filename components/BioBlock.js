import styles from '../styles/BioBlock.module.scss'

const BioBlock = () => {

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        Bios
      </div>
      <div className={styles.content}>
        <p><a className={styles.name} href="https://twitter.com/gremlin_bb" target="_blank" rel="noreferrer">gremlin_bb</a> (audio, contract) is a Los-Angeles based creator who specializes in digital audio art. She makes pop music under the name Boule Goes Boing and creates experimental generative audio as gremlin_bb. Gremlin started her NFT career as a radio host for the Larva Lads community, and interviews NFT artists and creators when not making music. She loves analog synthesizers and heavy 808s.</p>
        <p><a className={styles.name} href="https://twitter.com/bb__guapo" target="_blank" rel="noreferrer">bb__guapo</a> (animation), also known as Bradley Boboc, is a Los Angeles-based painter who also specializes in video and animation. He conceived the idea for Rusty Rollers through cataloging different vehicles on Google Street View. Each token derives from automobiles captured throughout the Los Angeles area in 2007.</p>
        <p><a className={styles.name} href="https://twitter.com/xetamorph" target="_blank" rel="noreferrer">xetamorph</a> (website), is a NYC based web developer and digital artist. You can view their other work on their portfolio website <a href="https://www.ichabon.com" target="_blank" rel="noreferrer">ichabon.com</a> as well as their recent collaborative projects on <a href="https://www.infinity8rocks.com" target="_blank" rel="noreferrer">infinity8rocks.com</a>.</p>
      </div>
    </div>

  );
};

export default BioBlock