// Solana
import { PublicKey } from '@solana/web3.js';

export const SOLANA_NETWORK_URL = process.env.NETWORK_URL!;
export const SOLANA_NETWORK = process.env.NETWORK!;

// Server
export const API_URL = process.env.API_URL!;

// Tokens
export const UDSC_TOKEN = new PublicKey(
    'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'
);
export const SURI_COLLECTION_MINT = new PublicKey(
    'srbmMLUaWc49ux2i9GpsYvkqHNZ8cC5jTuv5ZfHGKrz'
);
