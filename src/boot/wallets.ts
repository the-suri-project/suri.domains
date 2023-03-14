import { boot } from 'quasar/wrappers';
import {
    BraveWalletAdapter,
    CoinbaseWalletAdapter,
    ExodusWalletAdapter,
    PhantomWalletAdapter,
    SafePalWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    TorusWalletAdapter,
    TrustWalletAdapter,
    WalletConnectWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { SolanaWalletVuePlugin, WalletStoreProps } from 'src/lib/WalletAdapter';
import { Connection } from '@solana/web3.js';
import { SOLANA_NETWORK, SOLANA_NETWORK_URL } from 'src/constant';

const network =
    SOLANA_NETWORK == 'devnet'
        ? WalletAdapterNetwork.Devnet
        : WalletAdapterNetwork.Mainnet;
export const solanaConnection = new Connection(SOLANA_NETWORK_URL, 'confirmed');

const walletOptions: WalletStoreProps = {
    wallets: [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new BraveWalletAdapter(),
        new CoinbaseWalletAdapter(),
        new ExodusWalletAdapter(),
        new SafePalWalletAdapter(),
        new TorusWalletAdapter({
            params: {
                network,
            },
        }),
        new TrustWalletAdapter(),
        new WalletConnectWalletAdapter({
            network,
            options: {},
        }),
        new SlopeWalletAdapter(),
    ],
    autoConnect: false,
};

export default boot(({ app }) => {
    app.use(SolanaWalletVuePlugin, walletOptions);
});
