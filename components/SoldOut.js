import Image from 'next/image';
import styles from '../styles/MintBlock.module.scss';

const SoldOut = ({ address, contractInfo, bigNumToNum }) => {
  return (
    <div className={styles.content}>
      <h3>Mint</h3>
      <div className={styles.flexwrap}>
          <div className={styles.quantitybutton}>
            <button
              disabled={true}
            >
              <Image
                src="/images/down.svg"
                width="16px"
                height="8px"
                alt="decrease quantity"
              />
            </button>
            <button
              disabled={true}
            >
              <Image
                src="/images/up.svg"
                width="16px"
                height="8px"
                alt="increase quantity"
              />
            </button>
          </div>
          <div className={styles.mintquantity}>
            <span>
              <p>Sold Out!</p>
            </span>
          </div>
          <button
            className={styles.mintbutton}
            disabled={true}
          >
            Mint
          </button>
      </div>
    </div>
  );
};

export default SoldOut;
