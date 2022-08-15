import { useAddress, useDisconnect, useMetamask, useWalletConnect } from "@thirdweb-dev/react";

const WalletConnect = () => {
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnect = useDisconnect();

  const address = useAddress();
  return (
    <div>
      {address ? (
        <>
          <h4>Connected as {address}</h4>
          <button onClick={disconnect}>Disconnect</button>
        </>
      ) : (
        <>
          <button onClick={connectWithMetamask}>Connect Metamask Wallet</button>
          <button onClick={connectWithWalletConnect}>Connect Wallet Connect</button>
        </>
      )}
    </div>
  );
};

export default WalletConnect