import { useAccount, useContractRead } from 'wagmi'
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
  const [freeMintCount, setFreeMintCount] = useState(0)
  const [publicMintCount, setPublicMintCount] = useState(0)

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
  
  const bigNumToNum = (bigNumber) => {
    return ethers.BigNumber.from(bigNumber).toNumber() || 0
  }

  // Contract reads to trigger on pageload
  useEffect(() => {
    const collectionSupply = contractReadSupply.data && bigNumToNum(contractReadSupply.data)
    if (collectionSupply !== supply) {
      setSupply(collectionSupply)
    }
    setPublicMintActive(contractReadIsMintActive.data)
    setFreeMintActive(contractReadIsFreeMintActive.data)

  }, [])

  // Contract reads to trigger once address is connected
  useEffect(() => {
    const freeCount = contractReadFreeMintCount.data
    const freeMintCountIfActive = (freeMintActive && freeCount) ? bigNumToNum(freeCount) : 0
    setFreeMintCount(freeMintCountIfActive)
    
    const publicCount = contractReadPublicMintCount.data
    const publicMintCountIfActive = (publicMintActive && publicCount) ? bigNumToNum(publicCount) : 0
    setPublicMintCount(publicMintCountIfActive)
  },[address])


  const mintBlockProps = {
    supply, 
    publicMintActive, 
    freeMintActive,
    publicMintCount,
    freeMintCount
  }

  return (
    <main className={styles.main}>
      <TopNav/>
    
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
