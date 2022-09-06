
import { useState, useEffect } from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi'
import Image from 'next/image'
import styles from '../styles/MintBlock.module.scss'
const Web3 = require('web3');

const PublicMint = ({
  address,
  contractInfo,
  bigNumToNum
  
}) => {

  const [publicQuantity, setPublicQuantity] = useState(0)
  const [publicMintCount, setPublicMintCount] = useState(0)
  const [mintPrice, setMintPrice] = useState(0)
  const [mintPriceWei, setMintPriceWei] = useState(0)

  // Contract Reads
  const contractReadPublicMintCount = useContractRead({
    ...contractInfo,
    functionName: 'numberMinted',
    args: address,
  })
  const contractReadGetMintPrice = useContractRead({
    ...contractInfo,
    functionName: 'getMintPrice',
  })

  useEffect(() => {
    const publicCount = contractReadPublicMintCount.data
    const publicMintCountIfActive = bigNumToNum(publicCount) || 0
    setPublicMintCount(publicMintCountIfActive)
  },[address, bigNumToNum, contractReadPublicMintCount.data])

  useEffect(() => {
    setMintPrice(publicQuantity * 0.01.toFixed(2))
    const WeiPrice = Web3.utils.toWei(`${publicQuantity * 0.01.toFixed(2)}`, 'ether')
    const WeiBigNum = Web3.utils.toBN(WeiPrice).toString()
    setMintPriceWei(WeiBigNum)
  },[publicQuantity])

  // Contract Writes
  const {config: publicMintConfig, error: prepareError, isError: isPrepareError} = usePrepareContractWrite({
    ...contractInfo,
    functionName: 'mint',
    args: [publicQuantity],
    overrides: {
      value: mintPriceWei
    },
    enabled: (publicQuantity > 0 && publicQuantity + publicMintCount <= 10),
  })
  
  const {write, data, error, isError} = useContractWrite(publicMintConfig)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash
  })

  // Methods
  const handlePublicMint = () => {
    write?.(mintPriceWei)
  }
  const changePublicMintQuantity = (direction) => {
    if (publicQuantity + direction >= 0 && (publicQuantity + direction + publicMintCount) <= 10) {
      setPublicQuantity(publicQuantity + direction)
    }
  }
  const publicMintBtnDisabled = () => {
    const validQuantity = publicQuantity > 0 && publicQuantity + publicMintCount <= 10
    return !validQuantity
  }
  const mintIndicatorCopy = () => {
    if (isSuccess) {
      return 'Success!'
    } else if (isLoading) {
      return 'Loading...'
    } else {
      return `${publicQuantity} x 0.01 = ${mintPrice} ETH`
    }
  }

  return (
    <div className={styles.content}>
      <div className={styles.quantitybutton}>
        <button onClick={() => changePublicMintQuantity(-1)} disabled={publicQuantity == 0}>
          <Image src='/images/down.svg' width='16px' height='8px' alt='Rusty Roller image'/>
        </button>
        <button onClick={() => changePublicMintQuantity(1)} disabled={publicQuantity + publicMintCount == 10}>
          <Image src='/images/up.svg' width='16px' height='8px' alt='Rusty Roller image'/>
        </button>
      </div>
      <div className={styles.mintquantity}>
        <span>
          <p>{mintIndicatorCopy()}</p>
        </span>
      </div>
      <button className={styles.mintbutton} disabled={publicMintBtnDisabled()} onClick={() => handlePublicMint()}>Mint</button>
    </div>
  );
};

export default PublicMint