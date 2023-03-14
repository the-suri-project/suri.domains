import { PublicKey } from '@solana/web3.js';

export function isPublicKey(address: string): boolean {
    try {
        new PublicKey(address);
        return true;
    } catch (e) {
        return false;
    }
}

export function shortenAddress(address: PublicKey, chars = 4): string {
    const addressString = address.toBase58();
    const prefix = addressString.substring(0, chars);
    const suffix = addressString.substring(addressString.length - chars);
    return `${prefix}...${suffix}`;
}
