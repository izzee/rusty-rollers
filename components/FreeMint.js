
import { useFreeMint } from './hooks/useFreeMint';

import Image from 'next/image'
import styles from '../styles/MintBlock.module.scss'

const FreeMint = ({
  address,
  merkleProof,
  contractInfo,
  bigNumToNum,
  freeMintActive
}) => {
  
  const {
    changeFreeMintQuantity,
    freeQuantity,
    freeMintCount,
    freeMintBtnDisabled,
    handleFreeMint,
    mintIndicatorCopy,
    mintTextNumber,
    showMintTextNumber,
    allowlistVerified

  } = useFreeMint(address, contractInfo, merkleProof, bigNumToNum, freeMintActive);

  return (
    <div className={styles.content}>
      <h3>Free Mint</h3>
      <div className={styles.flexwrap}>
        <div className={styles.quantitybutton}>
          <button onClick={() => changeFreeMintQuantity(-1)} disabled={!allowlistVerified || freeMintBtnDisabled() || (freeQuantity == 0)}>
            <Image src='/images/down.svg' width='16px' height='8px' alt='Rusty Roller image'/>
          </button>
          
          <button onClick={() => changeFreeMintQuantity(1)} disabled={!allowlistVerified || freeMintBtnDisabled() || (freeQuantity + freeMintCount == 2)}>
            <Image src='/images/up.svg' width='16px' height='8px' alt='Rusty Roller image'/>
          </button>
        </div>
        <div className={styles.mintquantity}>
          <span>
            <p>{!showMintTextNumber && mintIndicatorCopy || mintTextNumber}</p>
          </span>
        </div>
        <button className={styles.mintbutton} disabled={freeMintBtnDisabled()} onClick={() => handleFreeMint(freeQuantity)}>Mint</button>
      </div>
    </div>
  );
};

export default FreeMint