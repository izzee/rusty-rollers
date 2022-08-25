import { useAccount, useContractRead, usePrepareContractWrite, useContractWrite} from 'wagmi'
import { useState, useEffect } from 'react';
import { ethers } from "ethers";

import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import TopNav from '../components/TopNav'
import InfoBlock from '../components/InfoBlock'
import MintBlock from '../components/MintBlock'
import BioBlock from '../components/BioBlock'
import abi from "../data/abi.json";

const App = () => {
  // State
  const [publicMintActive, setPublicMintActive] = useState(false)
  const [freeMintActive, setFreeMintActive] = useState(false)
  const [supply, setSupply] = useState(0)
  const [maxPerWallet, setMaxPerWallet] = useState(10)
  const [freeMintCount, setFreeMintCount] = useState(0)
  const [publicMintCount, setPublicMintCount] = useState(0)
  const [merkleProof, setMerkleProof] = useState(0)
  const [freeQuantity, setFreeQuantity] = useState(0)
  const [publicQuantity, setPublicQuantity] = useState(0)
  const [allowlistVerified, setAllowlistVerified] = useState(false)
  

  const { address, isConnecting, isDisconnected } = useAccount()
  
  // Contract Reads
  const contractInfo = {
    addressOrName: '0x5d7EfC6C1F9618A3821EeEcCa66E7B5FAFA5399D',
    contractInterface: abi,
  }
  const contractReadSupply = useContractRead({
    ...contractInfo,
    functionName: 'totalSupply',
  })
  const contractReadMaxPerWallet = useContractRead({
    ...contractInfo,
    functionName: 'maxPerWallet',
  })
  const contractReadIsMintActive = useContractRead({
    ...contractInfo,
    functionName: 'isMintActive',
  })
  const contractReadIsFreeMintActive = useContractRead({
    ...contractInfo,
    functionName: 'isFreeMintActive',
  })
  const contractReadFreeMintCount = useContractRead({
    ...contractInfo,
    functionName: 'getFreeMintCount',
    args: address,
  })
  const contractReadPublicMintCount = useContractRead({
    ...contractInfo,
    functionName: 'numberMinted',
    args: address,
  })
  const contractReadUserVerified = useContractRead({
    ...contractInfo,
    functionName: 'getUserVerifed',
    args: [merkleProof, address],
  })

  // Contract Writes
  const {config: freeMintConfig} = usePrepareContractWrite({
    ...contractInfo,
    functionName: 'freeMint',
    args: [merkleProof, freeQuantity],
    enabled: freeQuantity > 0 && freeQuantity + freeMintCount <= 2

  })
  const {write: freeMint, isSuccess: freeMintSuccess} = useContractWrite(freeMintConfig)
  
  // Utility Methods
  const bigNumToNum = (bigNumber) => {
    if (bigNumber) {
      return ethers.BigNumber.from(bigNumber).toNumber() || 0
    }
    return 0
  }
  const checkIfAllowlisted = async () => {
    if(address) {
      const response = await fetch('/api/allowlist', {
        method: 'POST',
        body: JSON.stringify({address}),
      })
      const {proof } = await response.json()
      setMerkleProof(proof)
    }
  }
  const handleFreeMint = (quantity) => {
    freeMint?.(merkleProof, quantity || 0)
  }
  const changeFreeMintQuantity = (direction) => {
    if (freeQuantity + direction >= 0 && (freeQuantity + direction + freeMintCount) <= 2) {
      setFreeQuantity(freeQuantity + direction)
    }
  }
  const changePublicMintQuantity = (direction) => {
    if (publicQuantity + direction >= 0 && (publicQuantity + direction + publicMintCount) <= maxPerWallet) {
      setPublicQuantity(publicQuantity + direction)
    }
  }

  // Contract reads to trigger on pageload
  useEffect(() => {
    const collectionSupply = contractReadSupply.data && bigNumToNum(contractReadSupply.data)
    if (collectionSupply !== supply) {
      setSupply(collectionSupply)
    }
    setMaxPerWallet(contractReadMaxPerWallet.data)
    setPublicMintActive(contractReadIsMintActive.data)
    setFreeMintActive(contractReadIsFreeMintActive.data)
  }, [])

  // Contract reads to trigger once address is connected
  useEffect(() => {
    const freeCount = contractReadFreeMintCount.data
    const freeMintCountIfActive = bigNumToNum(freeCount) || 0
    setFreeMintCount(freeMintCountIfActive)
    const publicCount = contractReadPublicMintCount.data
    const publicMintCountIfActive = (publicMintActive && publicCount) ? bigNumToNum(publicCount) : 0
    setPublicMintCount(publicMintCountIfActive)
    checkIfAllowlisted()
  },[address])

  // Contract reads to trigger once merkle proof is calculated
  useEffect(() => {
    setAllowlistVerified(contractReadUserVerified.data)
  },[merkleProof])

  const mintBlockProps = {
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
  }

  return (
    <main className={styles.main}>
      <TopNav/>
      <p>{allowlistVerified}</p>
      <div className={styles.titleimg}>
        <Image src='/images/rusty-rollers-title.svg' width='960' height='144' layout="intrinsic" alt='Rusty Rollers Title'/>
      </div>
      <InfoBlock />
      <MintBlock {...mintBlockProps} />
      <BioBlock />

    </main>
  );
}

export default App
