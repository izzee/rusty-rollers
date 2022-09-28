import { useState } from 'react';
import Image from 'next/image'

import styles from '../styles/Home.module.scss'
import TopNav from '../components/TopNavGallery'
import GalleryTile from '../components/GalleryTile'


const Gallery = () => {
  const [blocksToRender, setBlocksToRender] = useState(12);
  
  const imageArr = [...Array(blocksToRender).keys()];

  const renderNewBlock = () => {
    const newBlockCount = blocksToRender + 12
    if (newBlockCount <= 500) {
      setBlocksToRender(newBlockCount)
    } else {
      setBlocksToRender(500)
    }
  }

  return (
    <main className={styles.main}>
      <TopNav/>
      <div className={styles.titleimg}>
        <Image src='/images/rusty-rollers-title.svg' width='960' height='144' layout="intrinsic" alt='Rusty Rollers Title'/>
      </div>
      <div className={styles.gallery}>
      {
        imageArr.map((image,index) => (
        <div key={index}>
          <GalleryTile index={index}/>
        </div>
      ))}
      </div>
      <button disabled={blocksToRender >= 30} className={styles.showmore} onClick={renderNewBlock}>Show More</button>
    </main>

  )
}


export default Gallery