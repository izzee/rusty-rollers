import styles from '../styles/Marquee.module.css'

const Marquee = () => {

  const n = 10
  const text = 'CONNECT WALLET'
  const joinedText = Array(n).fill(text).join(' • ')

  return (
    <div className={styles.marquee}>
      <p>{joinedText}</p>
    </div>
  )
}

export default Marquee