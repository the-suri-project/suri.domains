export default {
    words: {
        error: 'Error|Errors',
    },
    languagesInOrigin: {
        en: 'English',
        es: 'Español',
    },
    languages: {
        en: 'English',
        es: 'Spanish',
    },
    errors: {
        notAnAddress: 'Invalid address',
        networkError:
            'Error connecting to the server. Retry it later or contact support',
        unknown: 'Unknown error. Please contact support',
        api: {
            // SERVER ---------------------------------------------------------
            not_found: 'Not found',
            bad_request: 'Bad request',
            payload_too_large: 'Payload too large',
            method_not_allowed: 'Method not allowed',
            internal_server_error: 'Internal server error',
            too_many_requests:
                'Too many requests. Wait until {retryAt} to retry',
            too_many_requests_without_retry_at:
                'Too many requests. Wait a few minutes to retry',
            invalid_jwt: 'Your session has expired. Please login again',

            // CLIENTS --------------------------------------------------------
            solana_network_error:
                "There's a problem with the Solana network. Please try again later",

            // DATABASE -------------------------------------------------------
            challenge_not_found: 'The challenge does not exist',
            booking_not_found: 'The booking does not exist',

            // CHALLENGES -----------------------------------------------------
            locked_suri: 'The suri {suri} is locked. Please try again later',
            dns_unreachable_domain: 'The DNS {domain} is unreachable',
            dns_missing_txt_record:
                'The DNS {domain} does not have any TXT record',
            dns_verification_failed:
                'The DNS verification failed. Maybe the record is not yet spread',
            twitter_not_following:
                "Twitter user {'@'}{username} is not following Suri accounts",
            twitter_not_mentioning:
                "Twitter user {'@'}{username} is not mentioning Suri accounts in a recent tweet",
            nft_generation_failed:
                'The NFT generation failed. Please try again later or contact support',

            // VALIDATION -----------------------------------------------------
            forbidden: 'Forbidden',
            concurrent_access:
                'Concurrent access to the server. You cannot do more than one request at the same time',
            incorrect_suri_length:
                'Suri length must be lower than {maximum} characters. Current: {length}',
            incorrect_suri_format: 'The format of the suri is incorrect',
            incorrect_suri_case: 'You must use lowercase letters in the suri',
            incorrect_suri_level: "The Suri's level ({level}) is incorrect",
            suri_already_booked: 'The suri {suri} is already booked',
            challenge_already_completed:
                'The challenge {challenge} is already completed',
            incorrect_challenge_type:
                'The challenge {challenge} has an incorrect type',
            incorrect_signature: 'The provided signature is incorrect',
            incorrect_sns_account: 'The provided SNS account is incorrect',
            incorrect_sns_domain:
                'The domain {domain} is not a valid SNS domain',
            incorrect_ens_domain:
                'The domain {domain} is not a valid ENS domain',
            incorrect_eth_wallet_format:
                'The specified wallet is not a valid Ethereum address',
            incorrect_nft_state: "The NFT's state is incorrect",
            twitter_id_already_used:
                'You have already used your twitter account to book a suri',
            incorrect_email: 'The email is incorrect',
            Incorrect_discount_code: 'The discount code is incorrect',
        },
    },
};
