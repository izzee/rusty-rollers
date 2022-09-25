import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.scss'
import TopNav from '../components/TopNav'

const Gallery = () => {
  const [blocksToRender, setBlocksToRender] = useState(5);
  
  const imageArr = [...Array(blocksToRender).keys()];

  const renderNewBlock = () => {
    const newBlockCount = blocksToRender + 10
    setBlocksToRender(newBlockCount)
    console.log(blocksToRender)
  }

  return (
    <main className={styles.main}>
      <TopNav/>
      <div>
      {
        imageArr.map((image,index) => (
        <div key={index}>
          <Image alt={`rusty roller ${index}`} src={`https://ipfs.io/ipfs/bafybeiblu5ugrvbtqbdmyaobueoixlwm4q6mbgualpizv5ox4t7ejbkoqq/car ${index + 1}.png`} width="200px" height="200px"/>
        </div>
      ))}
      <div onClick={renderNewBlock}>Show More</div>
      </div>
    </main>

  )
}


export default Gallery