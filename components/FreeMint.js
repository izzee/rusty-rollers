
import { useState, useEffect } from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite} from 'wagmi'
import Image from 'next/image'
import styles from '../styles/MintBlock.module.scss'

const FreeMint = ({
  address,
  merkleProof,
  contractInfo,
  bigNumToNum
}) => {

  const [freeQuantity, setFreeQuantity] = useState(0)
  const [freeMintCount, setFreeMintCount] = useState(0)
  const [allowlistVerified, setAllowlistVerified] = useState(false)

  // Contract Reads
  const contractReadFreeMintCount = useContractRead({
    ...contractInfo,
    functionName: 'getFreeMintCount',
    args: address,
  })

  const contractReadUserVerified = useContractRead({
    ...contractInfo,
    functionName: 'getUserVerifed',
    args: [merkleProof, address]
  })

  useEffect(() => {
    const freeCount = contractReadFreeMintCount.data
    const freeMintCountIfActive = bigNumToNum(freeCount) || 0
    setFreeMintCount(freeMintCountIfActive)
    setAllowlistVerified(contractReadUserVerified.data)
  },[address, bigNumToNum, setAllowlistVerified, contractReadFreeMintCount.data, contractReadUserVerified.data])

  // Contract Writes
  const {config: freeMintConfig, error: prepareError, isError: isPrepareError} = usePrepareContractWrite({
    ...contractInfo,
    functionName: 'freeMint',
    args: [merkleProof, freeQuantity],
    enabled: freeQuantity > 0 && freeQuantity + freeMintCount <= 2
  })
  const {write, isSuccess, isLoading, isFetching} = useContractWrite(freeMintConfig)

  // Methods
  const handleFreeMint = (quantity) => {
    write?.(merkleProof, quantity || 0)
  }
  const changeFreeMintQuantity = (direction) => {
    if (freeQuantity + direction >= 0 && (freeQuantity + direction + freeMintCount) <= 2) {
      setFreeQuantity(freeQuantity + direction)
    }
  }
  const freeMintBtnDisabled = () => {
    const validQuantity = freeQuantity > 0 && freeQuantity + freeMintCount <= 2
    return !validQuantity || !allowlistVerified
  }
  const mintIndicatorCopy = () => {
    if (isSuccess) {
      return 'Success!'
    } else if (isLoading) {
      return 'Loading...'
    } else {
      return `${freeQuantity || 0} x 0.00 = 0 ETH`
    }
  }

  return (
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
          <p>{mintIndicatorCopy()}</p>
        </span>
      </div>
      <button className={styles.mintbutton} disabled={freeMintBtnDisabled()} onClick={() => handleFreeMint(freeQuantity)}>Free Mint</button>
    </div>
  );
};

export default FreeMint