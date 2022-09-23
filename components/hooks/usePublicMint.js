import { useState, useEffect, useMemo } from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite, useWaitForTransaction} from 'wagmi'
const Web3 = require('web3');

export const usePublicMint = (address, contractInfo, bigNumToNum) => {
  const [publicQuantity, setPublicQuantity] = useState(0)
  const [publicMintCount, setPublicMintCount] = useState(0)
  const [mintPrice, setMintPrice] = useState(0)
  const [mintPriceWei, setMintPriceWei] = useState(0)
  const [mintPriceEth, setMintPriceEth] = useState(0)
  const [showMintTextNumber, setShowMintTextNumber] = useState(true)
  const [mintTextNumber, setMintTextNumber] = useState('0 x 0.00 = 0 ETH')
  
  // Contract Reads
  const contractReadPublicMintCount = useContractRead({
    ...contractInfo,
    functionName: 'numberMinted',
    args: address,
    watch: true,
  })

  const contractReadGetMintPrice = useContractRead({
    ...contractInfo,
    functionName: 'getMintPrice',
  })

  useEffect(() => {
    setMintPriceWei(contractReadGetMintPrice.data)
    setMintPriceEth(contractReadGetMintPrice.data && Web3.utils.fromWei(`${contractReadGetMintPrice.data}`, 'ether'))
  }, [contractReadGetMintPrice.data])

  useEffect(() => {
    setMintTextNumber(`${publicQuantity} x ${mintPriceEth} = ${mintPrice} ETH`)
  }, [publicQuantity, mintPrice, mintPriceEth])

  useEffect(() => {
    const publicCount = contractReadPublicMintCount.data
    const publicMintCountIfActive = bigNumToNum(publicCount) || 0
    setPublicMintCount(publicMintCountIfActive)
  },[address, bigNumToNum, contractReadPublicMintCount.data])

  // Contract Writes
  const {config: publicMintConfig} = usePrepareContractWrite({
    ...contractInfo,
    functionName: 'mint',
    args: [publicQuantity],
    overrides: {
      value:  Web3.utils.toBN(Web3.utils.toWei(`${publicQuantity * 0.025.toFixed(3)}`, 'ether')).toString()
    },
    enabled: publicQuantity > 0 && publicQuantity + publicMintCount <= 10,
  })
  
  const {write, isLoading, isSuccess} = useContractWrite(publicMintConfig)

  // Methods
  const handlePublicMint = () => {
    write?.(mintPriceWei)
    setPublicQuantity(0)
    setMintTextNumber('')
    setShowMintTextNumber(false)
  }

  const changePublicMintQuantity = (direction) => {
    setShowMintTextNumber(true)
    const newQuantity = publicQuantity + direction;
    if (newQuantity >= 0 && (newQuantity + publicMintCount) <= 10) {
      setMintTextNumber(`${publicQuantity} x ${mintPriceEth} = ${mintPrice} ETH`)
      setMintPrice(newQuantity * mintPriceEth)
      setPublicQuantity(newQuantity)
    }
  }
  const publicMintBtnDisabled = () => {
    const validQuantity = publicQuantity > 0 && publicQuantity + publicMintCount <= 10
    return !validQuantity
  }
  const mintIndicatorCopy = useMemo( () => {
    if (isLoading) {
      return 'Loading...'
    } else if (isSuccess) {
      return 'Success!'
    }
  }, [isLoading, isSuccess])

  return {
    changePublicMintQuantity,
    publicQuantity,
    publicMintCount,
    publicMintBtnDisabled,
    handlePublicMint,
    mintIndicatorCopy,
    mintTextNumber,
    showMintTextNumber
  }

}