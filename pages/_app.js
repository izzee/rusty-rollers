import '../styles/globals.scss'
import '@rainbow-me/rainbowkit/styles.css';

import { getDefaultWallets, RainbowKitProvider, lightTheme } from '@rainbow-me/rainbowkit';
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
const { chains, provider } = configureChains(
  [chain.mainnet],
  [
    alchemyProvider({ apiKey: 'eZYUuCVfJaqilCSQv3dbCEXSeoQ7-IAo' }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Rusty Rollers',
  chains
});

const wagmiClient = createClient({
  connectors,
  provider
})

const rainbowTheme = lightTheme({
  accentColorForeground: '#000',
  borderRadius: 'medium',
  overlayBlur: 'large',
})

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={rainbowTheme}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
   
  )
}

export default MyApp
