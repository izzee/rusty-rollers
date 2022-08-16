import '../styles/globals.scss'
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";

const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Rusty Rollers',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

const rainbowTheme = lightTheme({
  accentColor: '#F5AF37',
  accentColorForeground: 'black',
  borderRadius: 'medium',
  overlayBlur: 'large'
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={rainbowTheme}>
        <ThirdwebProvider desiredChainId={ChainId}>
          <Component {...pageProps} />
        </ThirdwebProvider>
      </RainbowKitProvider>
    </WagmiConfig>
   
  )
}

export default MyApp
