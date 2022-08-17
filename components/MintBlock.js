import Image from 'next/image'
import styles from '../styles/MintBlock.module.scss'
import { useState } from 'react';

const MintBlock = ({supply}) => {

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        {supply} of 500 minted
      </div>
      <div className={styles.content}>
        <div className={styles.quantitybutton}>
          <button><Image src='/images/down.svg' width='16px' height='8px' alt='Rusty Roller image'/></button>
          <button><Image src='/images/up.svg' width='16px' height='8px' alt='Rusty Roller image'/></button>
        </div>
        <div className={styles.mintquantity}>
          <span>
            <p>Coming Soon... </p>
            
          </span>
        </div>
        <button className={styles.mintbutton}>Mint</button>
      </div>
    </div>
  );
};

export default MintBlock