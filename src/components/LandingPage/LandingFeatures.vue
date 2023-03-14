<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
import userImage from '../../assets/landing/user-feature.png';
import defiImage from '../../assets/landing/defi-feature.png';
import techImage from '../../assets/landing/technical-feature.png';
import { computed } from 'vue';
import { useGlobalStore } from 'stores/global';

const { t, locale } = useI18n();
const globalStore = useGlobalStore();

// REFS -----------------------------------------------------------------------
// COMPUTED -------------------------------------------------------------------
const localeLink = computed(() => {
    if (locale.value === 'en') {
        return '';
    } else {
        return `/${locale.value}`;
    }
});
const sections = computed(() => [
    {
        id: 'general',
        img: userImage,
        title: t('general.title'),
        features: [
            {
                title: t('general.feature1.title'),
                description: t('general.feature1.description'),
            },
            {
                title: t('general.feature2.title'),
                description: t('general.feature2.description').replace(
                    '--tagged-suris--',
                    `<a href="https://docs.suri.domains${
                        localeLink.value
                    }/domains/tagged" target="_blank">${t(
                        'general.feature2.taggedSuris'
                    )}</a>`
                ),
            },
            {
                title: t('general.feature3.title'),
                description: t('general.feature3.description'),
            },
            {
                title: t('general.feature4.title'),
                description: t('general.feature4.description'),
            },
        ],
        docsUrl: `https://docs.suri.domains${localeLink.value}/use-cases#user-benefits`,
    },
    {
        id: 'defi',
        img: defiImage,
        title: t('defi.title'),
        features: [
            {
                title: t('defi.feature1.title'),
                description: t('defi.feature1.description'),
            },
            {
                title: t('defi.feature2.title'),
                description: t('defi.feature2.description'),
            },
            {
                title: t('defi.feature3.title'),
                description: t('defi.feature3.description').replace(
                    '--SVC--',
                    `<a href="https://docs.suri.domains${localeLink.value}/domains/nfts#security" target="_blank">SVC</a>`
                ),
            },
            {
                title: t('defi.feature4.title'),
                description: t('defi.feature4.description'),
            },
        ],
        docsUrl: `https://docs.suri.domains${localeLink.value}/protocol/subscription`,
    },
    {
        id: 'tech',
        img: techImage,
        title: t('tech.title'),
        features: [
            {
                title: t('tech.feature1.title'),
                description: t('tech.feature1.description'),
            },
            {
                title: t('tech.feature2.title'),
                description: t('tech.feature2.description'),
            },
            {
                title: t('tech.feature3.title'),
                description: t('tech.feature3.description'),
            },
        ],
        docsUrl: `https://docs.suri.domains${localeLink.value}/use-cases#technical-improvements`,
    },
]);

// METHODS --------------------------------------------------------------------
function goTo(url: string) {
    window.open(url, '_blank');
}

// WATCHES --------------------------------------------------------------------
// HOOKS ----------------------------------------------------------------------
</script>

<template>
    <div
        class="landing-features max-page-width q-px-xl"
        :class="{ 'suri-mobile': globalStore.isMobile }"
    >
        <div
            class="section row"
            :class="{ left: index % 2 === 0, right: index % 2 === 1 }"
            v-for="(section, index) in sections"
            :key="section.id"
        >
            <div class="col-6 flex flex-center content">
                <div>
                    <div class="title" v-if="!globalStore.isMobile">
                        {{ section.title }}
                    </div>
                    <div class="feature-list">
                        <div
                            class="feature-entry row items-center no-wrap"
                            v-for="entry in section.features"
                            :key="entry"
                        >
                            <img
                                src="~assets/landing/feature-icon.png"
                                class="q-mr-lg"
                                alt=""
                            />
                            <div>
                                <span class="text-bold">{{ entry.title }}</span
                                >:
                                <span
                                    class="content"
                                    v-html="entry.description"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-center">
                    <div class="text-center description">
                        <q-btn
                            class="gradient-button q-px-lg"
                            flat
                            dense
                            rounded
                            no-caps
                            @click="goTo(section.docsUrl)"
                        >
                            {{ t('readDocsButton') }}
                        </q-btn>
                    </div>
                </div>
            </div>
            <div class="col-6 flex flex-center img-container">
                <img :src="section.img" :alt="t(`${section.id}.title`)" />
            </div>
            <div class="title" v-if="globalStore.isMobile">
                {{ section.title }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.landing-features {
    z-index: 1000;
    position: relative;

    &:deep(a:hover) {
        color: $secondary;
    }
}

.section {
    $gap: 90px;
    gap: $gap;
    margin-bottom: 150px;

    .content {
        width: calc(50% - #{$gap / 2});
    }

    .img-container {
        width: calc(50% - #{$gap / 2});
    }

    &.right {
        flex-flow: row-reverse;
    }

    .title {
        font-size: 27px;
        line-height: 27px;
        padding-bottom: 20px;
        font-weight: bold;
    }

    .feature-entry {
        font-size: 16px;
        line-height: 19px;
        padding-bottom: 40px;

        img {
            $size: 40px;
            max-height: $size;
            max-width: $size;
            object-fit: contain;
            display: block;
        }

        .content {
            color: rgba(255, 255, 255, 0.7);
        }
    }

    img {
        max-width: 100%;
    }
}

// Mobile ---------------------------------------------------------------------

.landing-features.suri-mobile {
    h1 {
        font-size: 62px;
        line-height: 62px;
        text-align: center;
    }

    .section {
        flex-flow: column-reverse;
        gap: 30px;
        margin-bottom: 80px;

        .feature-entry {
            img {
                display: none;
            }
        }

        .title {
            text-align: center;
        }

        & > div {
            width: 100%;
        }

        .img-container img {
            max-width: 50%;
        }
    }
}
</style>

<i18n lang="yaml">
en:
    general:
        title: General features
        feature1:
            title: Backward compatibility
            description: Suri has all the DNS capabilities of a web2 domain, but with the added benefit of being able to use it as a web3 domain.
        feature2:
            title: Tagged Suris
            description: these suris are meant to add extra semantic meaning, useful for brand empowerment and management. Click --tagged-suris-- to know all about the possibilities of tagged suris.
            taggedSuris: here
        feature3:
            title: Identity provider
            description: not just domains. Suri supports new kinds of protocols so users will be able to store any kind of public or private information from which others can perform zero knowledge proof checks.
        feature4:
            title: Social network integration
            description: remember, your personal or corporate information can be stored in Suri, so if you update it in Suri, it is propagated at once to all networks.
    defi:
        title: Business & DeFi
        feature1:
            title: Market decentralization
            description: anyone can buy or sell suris, following Smart contract conditions set by the parent owner.
        feature2:
            title: Market resellability
            description: Suris can be traded in secondary markets, and owners can market any children domains coming from their suri.
        feature3:
            title: NFTs
            description: ownership of suri domains are reflected by their corresponding NFTs. This allows users to interact with suris in their preferred NFT platforms. When trading, buyers can verify validity by using the --SVC-- service.
        feature4:
            title: Subscription model
            description: Suris can be bought on a subscription-based model, and owners can devise a model as well for their children
    tech:
        title: Technical Improvements
        feature1:
            title: Full routing
            description: Suri does not only translate the domain name but searches using customizable queries, allowing users to resolve a suri to any kind of data.
        feature2:
            title: Built-in load balancing
            description: Suri integrates some of the most common algorithms to distribute load between servers. This prevents users from paying expensive services for that purpose.
        feature3:
            title: Custom protocols for enhanced capabilities
            description: unlike DNS, suri is not limited to a small set of protocols. Its routing system allows users to use any custom protocol. Thus, any kind of information can be associated with a suri (name, email, website, wallet, etc.)
    readDocsButton: Read more...
es:
    general:
        title: Características Generales
        feature1:
            title: Compatibilidad con Web2
            description: Suri tiene todas las capacidades DNS de un dominio web2, pero con la ventaja añadida de poder ser utilizado como un dominio web3.
        feature2:
            title: Suri etiquetados ({'@'}dominio)
            description: los usuarios pueden usar --tagged-suris-- como menciones ({'@'}nombreusuario) para añadir un significado semántico extra (usuario o empresa en este caso) y construir una marca alrededor de ellos.
            taggedSuris: suris etiquetados
        feature3:
            title: Proveedor de identidad
            description: los suris pueden almacenar cualquier tipo de información pública y privada, por lo que pueden usarse como un proveedor de identidad. Otros servicios pueden verificar esa información posteriormente mediante operaciones criptográficas como ZK-Proofs (Pruebas de Zero Knowledge).
        feature4:
            title: Integración con redes sociales
            description: almacenar tus datos públicos en tu Suri permite que redes sociales existentes y nuevas lo usen como fuente de información. Con este enfoque, podrías cambiar tus datos una vez para todas las redes.
    defi:
        title: Business & DeFi
        feature1:
            title: Descentralización del mercado
            description: cualquiera puede comprar o vender suris, siguiendo las condiciones del Smart Contract establecidas por el propietario principal.
        feature2:
            title: Reventa
            description: los suris pueden ser comercializados en mercados secundarios. Los propietarios pueden comercializar cualquier dominio hijo procedente de su suri.
        feature3:
            title: NFTs
            description: la propiedad de los dominios suri se refleja en sus correspondientes NFTs. Esto permite a los usuarios gestionar sus suris en sus plataformas NFT preferidas. Al comerciar, los compradores pueden verificar la validez de un suri utilizando el servicio --SVC--.
        feature4:
            title: Modelo de suscripciones
            description: los suris pueden ser adquiridos bajo un modelo de suscripción. Los propietarios también pueden diseñar un modelo personalizado para sus hijos.
    tech:
        title: Mejoras Técnicas
        feature1:
            title: Enrutamiento completo
            description: Suri no sólo traduce el nombre de dominio, sino que resuelve consultas personalizables. Esto permite a los usuarios resolver un suri a cualquier tipo de registro de datos.
        feature2:
            title: Balanceo de carga innato
            description: Suri integra algunos de los algoritmos más comunes para distribuir la carga entre servidores. Esto evita la necesidad de contratar un servicio de pago de forma extraordinaria para el desempeño de esta tarea.
        feature3:
            title: Protocolos personalizados
            description: 'a diferencia del DNS, suri no se limita a un pequeño conjunto de protocolos tales como IP. Su sistema de enrutamiento permite a los usuarios utilizar cualquier protocolo personalizado. Así, cualquier tipo de información puede asociarse a un suri (nombre, correo electrónico, sitio web, wallet crypto, etc.)'
    readDocsButton: Saber más...
</i18n>
