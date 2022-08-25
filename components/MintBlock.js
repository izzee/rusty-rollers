import Image from 'next/image'
import styles from '../styles/MintBlock.module.scss'
import { useState } from 'react';

const MintBlock = ({
  supply, 
  maxPerWallet,
  publicMintActive, 
  freeMintActive,
  publicMintCount,
  freeMintCount,
  allowlistVerified,
  merkleProof,
  freeQuantity,
  publicQuantity,
  changeFreeMintQuantity,
  changePublicMintQuantity,
  handleFreeMint,
}) => {

  const freeMintBtnDisabled = () => {
    const validQuantity = freeQuantity > 0 && freeQuantity + freeMintCount <= 2
    return !validQuantity && !freeMintActive
  }

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        {supply || 0} of 500 minted
      </div>
      {
        freeMintActive && allowlistVerified && 
        <div className={styles.content}>
          <div className={styles.quantitybutton}>
            <button onClick={() => changeFreeMintQuantity(-1)} disabled={freeQuantity == 0}>
              <Image src='/images/down.svg' width='16px' height='8px' alt='Rusty Roller image'/>
            </button>
            <button onClick={() => changeFreeMintQuantity(1)} disabled={freeQuantity + freeMintCount == 2}>
              <Image src='/images/up.svg' width='16px' height='8px' alt='Rusty Roller image'/>
            </button>
          </div>
          <div className={styles.mintquantity}>
            <span>
              <p>{freeQuantity || 0} x 0.00 = 0 ETH</p>
            </span>
          </div>
          <button className={styles.mintbutton} disabled={freeMintBtnDisabled()} onClick={() => handleFreeMint(freeQuantity)}>Free Mint</button>
        </div>
      }
      {
        publicMintActive &&
        <div className={styles.content}>
          <div className={styles.quantitybutton}>
            <button onClick={() => changePublicMintQuantity(-1)} disabled={publicQuantity == 0}>
              <Image src='/images/down.svg' width='16px' height='8px' alt='Rusty Roller image'/>
            </button>
            <button onClick={() => changePublicMintQuantity(1)} disabled={publicQuantity + freeMintCount == maxPerWallet}>
              <Image src='/images/up.svg' width='16px' height='8px' alt='Rusty Roller image'/>
            </button>
          </div>
          <div className={styles.mintquantity}>
            <span>
              <p>{publicQuantity || 0} x 0.00 = 0 ETH</p>
            </span>
          </div>
          <button className={styles.mintbutton} disabled={freeMintBtnDisabled()}>Mint</button>
        </div>
      }
      
    </div>
  );
};

export default MintBlock