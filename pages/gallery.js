import { useState } from 'react';
import styles from '../styles/Home.module.scss'
import TopNav from '../components/TopNav'
import GalleryTile from '../components/GalleryTile'


const Gallery = () => {
  const [blocksToRender, setBlocksToRender] = useState(2);
  
  const imageArr = [...Array(blocksToRender).keys()];

  const renderNewBlock = () => {
    const newBlockCount = blocksToRender + 10
    setBlocksToRender(newBlockCount)
    console.log(blocksToRender)
  }

  return (
    <main className={styles.main}>
      <TopNav/>
      <div className={styles.gallery}>
      {
        imageArr.map((image,index) => (
        <div key={index}>
          <GalleryTile index={index}/>
        </div>
      ))}
      </div>
      <button onClick={renderNewBlock}>Show More</button>
    </main>

  )
}


export default Gallery