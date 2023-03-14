export default {
    words: {
        error: 'Error|Errores',
    },
    languages: {
        en: 'Inglés',
        es: 'Español',
    },
    errors: {
        notAnAddress: 'No es una dirección válida',
        networkError:
            'Error conectando con el servidor. Reinténtalo más tarde o contacta con soporte',
        unknown: 'Error desconocido. Por favor, contacta con soporte',
        api: {
            // SERVER ---------------------------------------------------------
            not_found: 'No encontrado',
            bad_request: 'Petición incorrecta',
            payload_too_large: 'Payload demasiado grande',
            method_not_allowed: 'Método no permitido',
            internal_server_error: 'Error interno del servidor',
            too_many_requests:
                'Demasiadas peticiones. Espera hasta las {retryAt} para volver a intentarlo',
            too_many_requests_without_retry_at:
                'Demasiadas peticiones. Espera unos minutos para volver a intentarlo',
            invalid_jwt:
                'Tu sesión ha caducado. Por favor, vuelve a iniciar sesión',

            // CLIENTS --------------------------------------------------------
            solana_network_error:
                'Hay un problema con la red de Solana. Por favor, inténtalo de nuevo más tarde',

            // DATABASE -------------------------------------------------------
            challenge_not_found: 'El reto no existe',
            booking_not_found: 'La reserva no existe',

            // CHALLENGES -----------------------------------------------------
            locked_suri:
                'El suri {suri} está bloqueado. Por favor, inténtalo de nuevo más tarde',
            dns_unreachable_domain: 'El DNS {domain} no es accesible',
            dns_missing_txt_record:
                'El DNS {domain} no tiene ningún registro TXT',
            dns_verification_failed:
                'La verificación del DNS ha fallado. Quizás el registro no se haya propagado aún',
            twitter_not_following:
                "El usuario de Twitter {'@'}{username} no sigue a las cuentas de Suri",
            twitter_not_mentioning:
                "El usuario de Twitter {'@'}{username} no menciona a las cuentas de Suri en un tweet reciente",
            nft_generation_failed:
                'La generación del NFT ha fallado. Por favor, inténtalo de nuevo más tarde',

            // VALIDATION -----------------------------------------------------
            forbidden: 'Prohibido',
            concurrent_access:
                'Acceso concurrente al servidor. No puedes hacer más de una petición al mismo tiempo',
            incorrect_suri_length:
                'La longitud del suri debe ser inferior a {maximum} caracteres. Actual: {length}',
            incorrect_suri_format: 'El formato del suri es incorrecto',
            incorrect_suri_case: 'Debes usar letras minúsculas en el suri',
            incorrect_suri_level: 'El nivel del suri ({level}) es incorrecto',
            suri_already_booked: 'El suri {suri} ya está reservado',
            challenge_already_completed:
                'El reto {challenge} ya está completado',
            incorrect_challenge_type:
                'El reto {challenge} es de un tipo incorrecto',
            incorrect_signature: 'La firma especificada es incorrecta',
            incorrect_sns_account: 'El dominio SNS indicado no es válido',
            incorrect_sns_domain:
                'El dominio {domain} no es un dominio SNS válido',
            incorrect_ens_domain:
                'El dominio {domain} no es un dominio ENS válido',
            incorrect_eth_wallet_format:
                'El wallet especificado no es una dirección válida de Ethereum',
            incorrect_nft_state: 'El NFT tiene un estado erróneo',
            twitter_id_already_used:
                'Ya has usado tu cuenta de Twitter para reservar un suri',
            incorrect_email: 'El email es incorrecto',
            incorrect_discount_code: 'El código de descuento es incorrecto',
        },
    },
};
