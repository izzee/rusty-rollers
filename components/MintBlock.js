import {useMemo } from 'react';

import styles from '../styles/MintBlock.module.scss'
import FreeMint from '../components/FreeMint'
import PublicMint from '../components/PublicMint'


const MintBlock = ({
  address,
  supply,
  freeMintActive,
  publicMintActive,
  merkleProof,
  contractInfo,
  bigNumToNum
}) => {

  const mintBlockProps = {
    address,
    contractInfo,
    merkleProof,
    bigNumToNum,
    freeMintActive
  }

  const showLaunchDate = !freeMintActive && !publicMintActive && (supply < 500)
  const mintedOut = supply == 500

  const titleCopy = useMemo(() => {
    if (showLaunchDate) {
      return 'Launching on 9.26.22'
    } else if (mintedOut) {
      return 'Sold Out!'
    } else {
      return `${supply || 0} of 500 minted`
    }
  }, [showLaunchDate, mintedOut, supply])

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        {titleCopy}
      </div>
      <FreeMint {...mintBlockProps}/>
      { 
        publicMintActive && 
        <PublicMint {...mintBlockProps}/>
      }
    </div>
  );
};

export default MintBlock