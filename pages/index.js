import { useAccount, useContractRead} from 'wagmi'
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
  const [merkleProof, setMerkleProof] = useState(0)
  
  const { address, isConnecting, isDisconnected } = useAccount()

  
  // Contract Reads
  const contractInfo = {
    addressOrName: '0x286c3Bd2f5fD88a7bba588a03Ee6d7C1138eB0E0',
    contractInterface: abi,
  }
  const contractReadSupply = useContractRead({
    ...contractInfo,
    functionName: 'totalSupply',
    watch: true,
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
  
  // Utility Methods
  const bigNumToNum = (bigNumber) => {
    if (bigNumber) {
      return ethers.BigNumber.from(bigNumber).toNumber() || 0
    }
    return 0
  }

  // Contract reads to trigger on pageload
  useEffect(() => {
    const collectionSupply = contractReadSupply.data && bigNumToNum(contractReadSupply.data)
    collectionSupply !== supply && setSupply(collectionSupply)
    setMaxPerWallet(contractReadMaxPerWallet.data)
    setPublicMintActive(contractReadIsMintActive.data)
    setFreeMintActive(contractReadIsFreeMintActive.data)
  }, [supply, contractReadSupply.data, contractReadMaxPerWallet.data, contractReadIsMintActive.data, contractReadIsFreeMintActive.data])

  // Get merkle proof for address once address is connected
  useEffect(() => {
    const checkIfAllowlisted = async () => {
      const response = await fetch('/api/allowlist', {
        method: 'POST',
        body: JSON.stringify({address}),
      })
      const {proof} = await response.json()
      console.log(proof)
      setMerkleProof(proof)
    }
    checkIfAllowlisted()
  },[address])

  const mintBlockProps = {
    address,
    supply,
    freeMintActive,
    publicMintActive,
    merkleProof,
    contractInfo,
    bigNumToNum
  }

  const mintedOut = supply == 500;

  return (
    <main className={styles.main}>
      <TopNav/>
      <div className={styles.titleimg}>
        <Image src='/images/rusty-rollers-title.svg' width='960' height='144' layout="intrinsic" alt='Rusty Rollers Title'/>
      </div>
      <InfoBlock />
      {
        address && 
        <MintBlock {...mintBlockProps} />
      }
      <BioBlock />
    </main>
  );
}

export default App
