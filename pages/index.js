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
  const { address, isConnecting, isDisconnected } = useAccount()

  useEffect(()=> {
    getMerkleProof(address)
  },[address])

  const getMerkleProof = async (address) => {
    const bodyadd = {
      test: address
    }
    const response = await fetch('/api/verify', {
      method: 'POST',
      body: JSON.stringify(bodyadd)
    })
    const data = await response.json()
    console.log(data)
    return response
  }

  const rustyRollersContract = {
    addressOrName: '0x5d7EfC6C1F9618A3821EeEcCa66E7B5FAFA5399D',
    contractInterface: abi,
  }

  const contractReadSupply = useContractRead({
    ...rustyRollersContract,
    functionName: 'totalSupply',
  })

  useEffect(() => {
    const collectionSupply = ethers.BigNumber.from(contractReadSupply.data).toNumber()
    if (collectionSupply !== supply) {
      setSupply(collectionSupply)
    }
  }, [contractReadSupply])

  const [supply, setSupply] = useState('')

  return (
    <main className={styles.main}>
      <TopNav/>
    
      <div className={styles.titleimg}>

        <Image src='/images/rusty-rollers-title.svg' width='960' height='144' layout="intrinsic" alt='Rusty Rollers Title'/>
      </div>
      <InfoBlock />
      <MintBlock supply={supply}/>
      <BioBlock />

    </main>
  );
}

export default App
