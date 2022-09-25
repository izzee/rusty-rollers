import { useState, useMemo, useEffect } from 'react';
import { useContractRead, usePrepareContractWrite, useContractWrite} from 'wagmi'

export const useFreeMint = (address, contractInfo, merkleProof, bigNumToNum, freeMintActive) => {
  const [freeQuantity, setFreeQuantity] = useState(0)
  const [freeMintCount, setFreeMintCount] = useState(0)
  const [allowlistVerified, setAllowlistVerified] = useState(false)
  const [mintTextNumber, setMintTextNumber] = useState('0 x 0.00 = 0 ETH')
  const [showMintTextNumber, setShowMintTextNumber] = useState(true)


  // Contract Reads
  const contractReadFreeMintCount = useContractRead({
    ...contractInfo,
    functionName: 'getFreeMintCount',
    args: address,
    watch: true,
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
  
  useEffect(() => {
    if (allowlistVerified && !freeMintActive) {
      setMintTextNumber('Allowlisted')
    } else if (!allowlistVerified) {
      setMintTextNumber('Not allowlisted')
    } else {
      setMintTextNumber(`${freeQuantity} x 0.00 = 0 ETH`)
    }
  }, [freeQuantity, allowlistVerified, freeMintActive])

  // Contract Writes
  const {config: freeMintConfig} = usePrepareContractWrite({
    ...contractInfo,
    functionName: 'freeMint',
    args: [merkleProof, freeQuantity],
    enabled: freeQuantity > 0 && freeQuantity + freeMintCount <= 2
  })
  const {write, isSuccess, isLoading} = useContractWrite(freeMintConfig)
  
  // Methods
  const handleFreeMint = (quantity) => {
    write?.(merkleProof, quantity || 0)
    setShowMintTextNumber(false)
  }
  const changeFreeMintQuantity = (direction) => {
    setShowMintTextNumber(true)
    if (freeQuantity + direction >= 0 && (freeQuantity + direction + freeMintCount) <= 2) {
      setFreeQuantity(freeQuantity + direction)
    }
  }
  const freeMintBtnDisabled = () => {
    const validQuantity = freeQuantity > 0 && freeQuantity + freeMintCount <= 2
    return !validQuantity || !allowlistVerified
  }
  const mintIndicatorCopy = useMemo( () => {
    if (isLoading) {
      return 'Loading...'
    } else if (isSuccess) {
      return 'Success!'
    }
  }, [isLoading, isSuccess])

  return {
    changeFreeMintQuantity,
    freeQuantity,
    freeMintCount,
    freeMintBtnDisabled,
    handleFreeMint,
    mintIndicatorCopy,
    mintTextNumber,
    showMintTextNumber,
    allowlistVerified
  } 
}