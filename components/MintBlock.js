import styles from '../styles/MintBlock.module.scss'
import FreeMint from '../components/FreeMint'

const MintBlock = ({
  address,
  supply,
  freeMintActive,
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

  return (
    <div className={styles.block}>
      <div className={styles.blocktitle}>
        {supply || 0} of 500 minted
      </div>
      {
        !!merkleProof && !!freeMintActive &&
        <FreeMint {...mintBlockProps}/>
      }
    </div>
  );
};

export default MintBlock