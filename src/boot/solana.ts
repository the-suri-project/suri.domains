import {Connection} from '@solana/web3.js';
import {SOLANA_NETWORK_URL} from 'src/constant';

export const solanaConnection = new Connection(SOLANA_NETWORK_URL, 'confirmed');
