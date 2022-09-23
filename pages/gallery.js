import Image from 'next/image'
import { useState } from 'react';

const Gallery = () => {
  const [blocksToRender, setBlocksToRender] = useState(10);
  
  const imageArr = [...Array(blocksToRender).keys()];

  const renderNewBlock = () => {
    const newBlockCount = blocksToRender + 10
    setBlocksToRender(newBlockCount)
    console.log(blocksToRender)
  }

  return (
    <div>
    {
      imageArr.map((image,index) => (
      <div key={index}>
        <Image alt={`rusty roller ${index}`}src={`https://ipfs.io/ipfs/bafybeiblu5ugrvbtqbdmyaobueoixlwm4q6mbgualpizv5ox4t7ejbkoqq/car ${index + 1}.png`} width="200px" height="200px"/>
      </div>
    ))}
    <div onClick={renderNewBlock}>Show More</div>
    </div>
  )
}


export default Gallery