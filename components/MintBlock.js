import Image from 'next/image'
import styles from '../styles/MintBlock.module.scss'
import { useState } from 'react';

const MintBlock = ({supply,  publicMintActive,  freeMintActive, publicMintCount, freeMintCount }) => {

  const [quantity, setQuantity] = useState(0)

  const changeFreeMintQuantity = (direction) => {
    console.log(direction, quantity, freeMintCount)
    if (quantity + direction >= 0 && (quantity + direction + freeMintCount) <= 2) {
      setQuantity(quantity + direction)
    }
  }

  const freeMintBtnDisabled = () => {
    const validQuantity = quantity > 0 && quantity + freeMintCount <= 2
    console.log(validQuantity)
    return !validQuantity && !freeMintActive
  }

  const incrementBtnActive = () => {
    return 
  }

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        {supply || 0} of 500 minted
      </div>
      <div className={styles.content}>
        <div className={styles.quantitybutton}>
          <button onClick={() => changeFreeMintQuantity(-1)} disabled={quantity == 0}>
            <Image src='/images/down.svg' width='16px' height='8px' alt='Rusty Roller image'/>
          </button>
          <button onClick={() => changeFreeMintQuantity(1)} disabled={quantity == 2}>
            <Image src='/images/up.svg' width='16px' height='8px' alt='Rusty Roller image'/>
          </button>
        </div>
        <div className={styles.mintquantity}>
          <span>
            <p>{quantity || 0} x 0.00 = 0 ETH</p>
          </span>
        </div>
        <button className={styles.mintbutton} disabled={freeMintBtnDisabled()}>Free Mint</button>
      </div>
    </div>
  );
};

export default MintBlock