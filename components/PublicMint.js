// import { useState, useEffect } from 'react';
// import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi'
import Image from 'next/image';
import { usePublicMint } from './hooks/usePublicMint';
import styles from '../styles/MintBlock.module.scss';

const PublicMint = ({ address, contractInfo, bigNumToNum }) => {
  const {
    changePublicMintQuantity,
    publicQuantity,
    publicMintCount,
    publicMintBtnDisabled,
    handlePublicMint,
    mintIndicatorCopy,
    mintTextNumber,
    showMintTextNumber
  } = usePublicMint(address, contractInfo, bigNumToNum);

  return (
    <div className={styles.content}>
      <h3>Public Mint</h3>
      <div className={styles.flexwrap}>
          <div className={styles.quantitybutton}>
            <button
              onClick={() => changePublicMintQuantity(-1)}
              disabled={publicQuantity == 0}
            >
              <Image
                src="/images/down.svg"
                width="16px"
                height="8px"
                alt="decrease quantity"
              />
            </button>
            <button
              onClick={() => changePublicMintQuantity(1)}
              disabled={publicQuantity + publicMintCount == 10}
            >
              <Image
                src="/images/up.svg"
                width="16px"
                height="8px"
                alt="increase quantity"
              />
            </button>
          </div>
          <div className={styles.mintquantity}>
            <span>
              <p>{!showMintTextNumber && mintIndicatorCopy ||  mintTextNumber }</p>
            </span>
          </div>
          <button
            className={styles.mintbutton}
            disabled={publicMintBtnDisabled()}
            onClick={() => handlePublicMint()}
          >
            Mint
          </button>
      </div>
    </div>
  );
};

export default PublicMint;
