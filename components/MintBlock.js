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
  }

  const displayFreeMint = !!merkleProof.length && !!freeMintActive

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        {supply || 0} of 500 minted
      </div>
      {
        displayFreeMint && 
        <FreeMint {...mintBlockProps}/>
      }
      { 
        publicMintActive && 
        <PublicMint {...mintBlockProps}/>
      }
    </div>
  );
};

export default MintBlock