
import Image from 'next/image'
import { useState } from 'react';




const GalleryTile = ({index}) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    console.log(loaded)
    setLoaded(true)
  }

  const handleImageClick = (e) => {
    e.target.src = `https://ipfs.io/ipfs/bafybeiblu5ugrvbtqbdmyaobueoixlwm4q6mbgualpizv5ox4t7ejbkoqq/car ${index + 1}.png`
    console.log(index)
  }

  return (
    <div >
        <div>{`${loaded}`}</div>
        <Image 
          alt={`rusty roller`} 
          placeholder="blur"
          blurDataURL={`https://ipfs.io/ipfs/bafybeiblu5ugrvbtqbdmyaobueoixlwm4q6mbgualpizv5ox4t7ejbkoqq/car ${index + 1}.png`}
          src={`https://ipfs.io/ipfs/bafybeiblu5ugrvbtqbdmyaobueoixlwm4q6mbgualpizv5ox4t7ejbkoqq/car ${index + 1}.png`} 
          width="200px" 
          height="200px"
          onLoad={handleImageLoad} 
          onClick={handleImageClick}
          onError={handleImageClick}
        />
    </div>
  )
}

export default GalleryTile