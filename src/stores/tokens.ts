import { defineStore } from 'pinia';
import { solanaConnection } from 'boot/wallets';
import {
    AccountLayout,
    getAssociatedTokenAddress,
    RawAccount,
    TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Metadata, PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
import { SURI_COLLECTION_MINT, UDSC_TOKEN } from 'src/constant';

export type TokenAccountWithMetadata = RawAccount & {
    meta?: Metadata | null;
    externalMeta?: any;
};

export const useTokenStore = defineStore('token', {
    state: () => ({
        tokens: [] as TokenAccountWithMetadata[],
    }),
    getters: {
        UsdcAmount: (state) =>
            Number(
                state.tokens.find((token) => token.mint.equals(UDSC_TOKEN))
                    ?.amount ?? 0
            ),
        SuriNFTs: (state) =>
            state.tokens.filter(
                (t) =>
                    t.amount == BigInt(1) &&
                    t.meta?.collection?.verified &&
                    t.meta?.collection?.key?.equals(SURI_COLLECTION_MINT)
            ),
    },
    actions: {
        async fetchTokens(
            address: PublicKey
        ): Promise<TokenAccountWithMetadata[]> {
            const tokenAccounts =
                await solanaConnection.getTokenAccountsByOwner(address, {
                    programId: TOKEN_PROGRAM_ID,
                });

            this.tokens = tokenAccounts.value.map((account) =>
                AccountLayout.decode(account.account.data)
            );

            // Get metadata.
            const metaPubkeys = await Promise.all(
                this.tokens.map(
                    async (account) =>
                        (
                            await PublicKey.findProgramAddress(
                                [
                                    Buffer.from('metadata'),
                                    PROGRAM_ID.toBuffer(),
                                    account.mint.toBuffer(),
                                ],
                                PROGRAM_ID
                            )
                        )[0]
                )
            );

            const metaAccounts = await solanaConnection.getMultipleAccountsInfo(
                metaPubkeys
            );
            const deserializedAccounts = metaAccounts.map((account) => {
                if (account === null) {
                    return null;
                }

                return Metadata.fromAccountInfo(account)[0];
            });

            const externalMeta = await Promise.all(
                deserializedAccounts.map(async (meta) => {
                    if (
                        !meta ||
                        !meta.collection?.verified ||
                        !meta.collection.key.equals(SURI_COLLECTION_MINT)
                    ) {
                        return null;
                    }

                    try {
                        const data = await fetch(meta.data.uri);
                        return await data.json();
                    } catch (e) {
                        return null;
                    }
                })
            );

            for (let i = 0; i < this.tokens.length; i++) {
                this.tokens[i].meta = deserializedAccounts[i];
                this.tokens[i].externalMeta = externalMeta[i];
            }

            return this.tokens;
        },

        async reloadUsdcTokenAccount(
            address: PublicKey
        ): Promise<TokenAccountWithMetadata | null> {
            const tokenAccountPubkey = await getAssociatedTokenAddress(
                UDSC_TOKEN,
                address
            );
            const accountInfo = await solanaConnection.getAccountInfo(
                tokenAccountPubkey
            );

            if (accountInfo === null) {
                return null;
            }

            const tokenAccount = AccountLayout.decode(accountInfo.data);
            let position = this.tokens.findIndex((t) =>
                t.mint.equals(tokenAccount.mint)
            );

            if (position < 0) {
                position = this.tokens.length;
                this.tokens.push(tokenAccount);
            } else {
                this.tokens[position] = tokenAccount;
            }

            // Get metadata.
            const [metaPubkey] = await PublicKey.findProgramAddress(
                [
                    Buffer.from('metadata'),
                    PROGRAM_ID.toBuffer(),
                    tokenAccount.mint.toBuffer(),
                ],
                PROGRAM_ID
            );

            try {
                const metaAccount = await solanaConnection.getAccountInfo(
                    metaPubkey
                );
                if (metaAccount) {
                    const deserializedAccount =
                        Metadata.fromAccountInfo(metaAccount)[0];
                    this.tokens[position].meta = deserializedAccount;
                }
            } catch (e) {}

            return this.tokens[position];
        },

        clearState() {
            this.tokens = [];
        },
    },
});
