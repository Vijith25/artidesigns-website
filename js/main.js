/* ==========================================
   ArtiDéSigns Website V7
   main.js
========================================== */


/* ==========================================
   LOADER
========================================== */

window.addEventListener('load', () => {

    document.body.classList.add('loaded');

    const loader =
        document.getElementById('loader');

    if (loader) {

        loader.classList.add('hide');

        setTimeout(() => {

            loader.remove();

        }, 700);

    }

});


/* ==========================================
   SMOOTH REVEAL ANIMATION
========================================== */

const revealElements =
    document.querySelectorAll('.reveal');

if (revealElements.length) {

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add('active');

                    }

                });

            },

            {
                threshold: 0.15
            }

        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });

}


/* ==========================================
   ACTIVE NAVIGATION HIGHLIGHT
========================================== */

const sections =
    document.querySelectorAll('section[id]');

const navLinks =
    document.querySelectorAll('.nav-menu a');


window.addEventListener('scroll', () => {

    let current = '';


    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 140;


        if (window.scrollY >= sectionTop) {

            current =
                section.getAttribute('id');

        }

    });


    navLinks.forEach(link => {

        link.classList.remove('active');


        if (
            link.getAttribute('href') ===
            '#' + current
        ) {

            link.classList.add('active');

        }

    });

});


/* ==========================================
   NAVBAR ENHANCEMENT
========================================== */

const navbar =
    document.querySelector('.navbar');


window.addEventListener('scroll', () => {

    if (!navbar) return;


    if (window.scrollY > 50) {

        navbar.style.background =
            'rgba(0,0,0,.95)';

        navbar.style.backdropFilter =
            'blur(18px)';

    } else {

        navbar.style.background =
            'rgba(0,0,0,.78)';

        navbar.style.backdropFilter =
            'blur(18px)';

    }

});


/* ==========================================
   CURRENT YEAR AUTO UPDATE
========================================== */

const yearElement =
    document.getElementById('year');


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* ==========================================
   INSTAGRAM PORTFOLIO
========================================== */

/*
    Instagram architecture:

    Instagram
        ↓
    Meta Instagram API
        ↓
    Cloudflare Pages Function
        ↓
    /api/instagram
        ↓
    This JavaScript
        ↓
    Portfolio Gallery

    The Instagram access token is NEVER
    stored in this JavaScript file.
*/


const INSTAGRAM_API =
    '/api/instagram';


/* ------------------------------------------
   Instagram Feed Container
------------------------------------------ */

const instagramFeed =
    document.getElementById('instagram-feed');


/* ------------------------------------------
   Format Instagram Date
------------------------------------------ */

function formatInstagramDate(timestamp) {

    if (!timestamp) {

        return '';

    }


    const date =
        new Date(timestamp);


    if (Number.isNaN(date.getTime())) {

        return '';

    }


    return date.toLocaleDateString(
        'en-IN',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
    );

}


/* ------------------------------------------
   Create Instagram Portfolio Card
------------------------------------------ */

function createInstagramCard(post) {

    const card =
        document.createElement('article');


    card.className =
        'card portfolio-card instagram-card';


    /* --------------------------------------
       Main Media Link
    -------------------------------------- */

    const mediaLink =
        document.createElement('a');


    mediaLink.href =
        post.permalink || '#';


    mediaLink.target =
        '_blank';


    mediaLink.rel =
        'noopener noreferrer';


    mediaLink.className =
        'instagram-media-link';


    mediaLink.setAttribute(
        'aria-label',
        'View this ArtiDéSigns post on Instagram'
    );


    /* --------------------------------------
       Media Container
    -------------------------------------- */

    const mediaContainer =
        document.createElement('div');


    mediaContainer.className =
        'instagram-media';


    /* --------------------------------------
       IMAGE
    -------------------------------------- */

    if (
        post.media_type === 'IMAGE' ||
        post.media_type === 'CAROUSEL_ALBUM'
    ) {

        const image =
            document.createElement('img');


        image.src =
            post.media_url;


        image.alt =
            post.caption
                ? post.caption.substring(0, 120)
                : 'ArtiDéSigns Portfolio';


        image.loading =
            'lazy';


        image.decoding =
            'async';


        image.className =
            'instagram-image';


        /* ----------------------------------
           Image Error Handling
        ---------------------------------- */

        image.addEventListener(
            'error',
            () => {

                mediaContainer.classList.add(
                    'instagram-image-error'
                );


                image.style.display =
                    'none';


                const fallback =
                    document.createElement('span');


                fallback.className =
                    'instagram-image-fallback';


                fallback.textContent =
                    'View on Instagram';


                mediaContainer.appendChild(
                    fallback
                );

            }
        );


        mediaContainer.appendChild(
            image
        );

    }


    /* --------------------------------------
       VIDEO
    -------------------------------------- */

    else if (
        post.media_type === 'VIDEO'
    ) {

        const video =
            document.createElement('video');


        video.src =
            post.media_url;


        video.className =
            'instagram-video';


        video.controls =
            true;


        video.muted =
            true;


        video.playsInline =
            true;


        video.preload =
            'metadata';


        mediaContainer.appendChild(
            video
        );

    }


    /* --------------------------------------
       Unknown Media Type
    -------------------------------------- */

    else {

        const fallback =
            document.createElement('div');


        fallback.className =
            'instagram-image-fallback';


        fallback.textContent =
            'View on Instagram';


        mediaContainer.appendChild(
            fallback
        );

    }


    mediaLink.appendChild(
        mediaContainer
    );


    card.appendChild(
        mediaLink
    );


    /* --------------------------------------
       Card Content
    -------------------------------------- */

    const content =
        document.createElement('div');


    content.className =
        'instagram-card-content';


    /* --------------------------------------
       Caption
    -------------------------------------- */

    if (post.caption) {

        const caption =
            document.createElement('p');


        caption.className =
            'instagram-caption';


        let captionText =
            post.caption.trim();


        /*
           Keep the portfolio cards visually
           clean by limiting very long captions.
        */

        if (captionText.length > 180) {

            captionText =
                captionText.substring(0, 177)
                + '...';

        }


        caption.textContent =
            captionText;


        content.appendChild(
            caption
        );

    }


    /* --------------------------------------
       Date + Instagram Link
    -------------------------------------- */

    const meta =
        document.createElement('div');


    meta.className =
        'instagram-meta';


    const date =
        document.createElement('span');


    date.className =
        'instagram-date';


    date.textContent =
        formatInstagramDate(
            post.timestamp
        );


    meta.appendChild(
        date
    );


    const viewLink =
        document.createElement('a');


    viewLink.href =
        post.permalink || '#';


    viewLink.target =
        '_blank';


    viewLink.rel =
        'noopener noreferrer';


    viewLink.className =
        'instagram-view-link';


    viewLink.textContent =
        'View on Instagram ↗';


    meta.appendChild(
        viewLink
    );


    content.appendChild(
        meta
    );


    card.appendChild(
        content
    );


    return card;

}


/* ------------------------------------------
   Loading State
------------------------------------------ */

function showInstagramLoading() {

    if (!instagramFeed) return;


    instagramFeed.innerHTML = '';


    const loadingCard =
        document.createElement('div');


    loadingCard.className =
        'card portfolio-card instagram-loading';


    const placeholder =
        document.createElement('div');


    placeholder.className =
        'portfolio-placeholder';


    const loadingText =
        document.createElement('span');


    loadingText.textContent =
        'Loading';


    placeholder.appendChild(
        loadingText
    );


    loadingCard.appendChild(
        placeholder
    );


    const title =
        document.createElement('h3');


    title.textContent =
        'Loading Portfolio...';


    loadingCard.appendChild(
        title
    );


    const description =
        document.createElement('p');


    description.textContent =
        'Fetching the latest work from ArtiDéSigns.';


    loadingCard.appendChild(
        description
    );


    instagramFeed.appendChild(
        loadingCard
    );

}


/* ------------------------------------------
   Error State
------------------------------------------ */

function showInstagramError() {

    if (!instagramFeed) return;


    instagramFeed.innerHTML = '';


    const errorCard =
        document.createElement('div');


    errorCard.className =
        'card portfolio-card instagram-error';


    const placeholder =
        document.createElement('div');


    placeholder.className =
        'portfolio-placeholder';


    placeholder.textContent =
        '✦';


    errorCard.appendChild(
        placeholder
    );


    const title =
        document.createElement('h3');


    title.textContent =
        'Portfolio Temporarily Unavailable';


    errorCard.appendChild(
        title
    );


    const description =
        document.createElement('p');


    description.textContent =
        'Please visit our Instagram profile to see our latest work.';


    errorCard.appendChild(
        description
    );


    const instagramLink =
        document.createElement('a');


    instagramLink.href =
        'https://instagram.com/arti.de_signs';


    instagramLink.target =
        '_blank';


    instagramLink.rel =
        'noopener noreferrer';


    instagramLink.className =
        'btn btn-secondary';


    instagramLink.textContent =
        'Open Instagram ↗';


    errorCard.appendChild(
        instagramLink
    );


    instagramFeed.appendChild(
        errorCard
    );

}


/* ------------------------------------------
   Load Instagram Portfolio
------------------------------------------ */

async function loadInstagramPortfolio() {

    if (!instagramFeed) {

        console.warn(
            'ArtiDéSigns: Instagram feed container not found.'
        );

        return;

    }


    showInstagramLoading();


    try {

        /*
           Create a timeout so the website does
           not remain stuck on "Loading" forever.
        */

        const controller =
            new AbortController();


        const timeout =
            setTimeout(() => {

                controller.abort();

            }, 15000);


        const response =
            await fetch(
                INSTAGRAM_API,
                {
                    method: 'GET',
                    headers: {
                        'Accept':
                            'application/json'
                    },
                    cache: 'no-store',
                    signal:
                        controller.signal
                }
            );


        clearTimeout(timeout);


        if (!response.ok) {

            throw new Error(
                'Instagram API returned HTTP ' +
                response.status
            );

        }


        const data =
            await response.json();


        if (
            !data ||
            data.success !== true ||
            !Array.isArray(data.media)
        ) {

            throw new Error(
                'Invalid Instagram API response.'
            );

        }


        /*
           Remove posts without a usable
           media URL.
        */

        const posts =
            data.media.filter(post => {

                return (
                    post &&
                    post.media_url
                );

            });


        if (!posts.length) {

            throw new Error(
                'No Instagram media available.'
            );

        }


        /*
           Clear loading state.
        */

        instagramFeed.innerHTML =
            '';


        /*
           Render each Instagram post.
        */

        posts.forEach(post => {

            const card =
                createInstagramCard(post);


            instagramFeed.appendChild(
                card
            );

        });


        /*
           Update portfolio status.
        */

        window.ArtiPortfolio = {

            status: 'connected',

            version: 'v7',

            source: 'Instagram',

            username:
                data.username ||
                'arti.de_signs',

            count:
                posts.length,

            message:
                'Instagram portfolio loaded successfully.'

        };


        console.log(
            'ArtiDéSigns Instagram Portfolio:',
            window.ArtiPortfolio
        );

    }


    catch (error) {

        console.error(
            'ArtiDéSigns Instagram Portfolio Error:',
            error
        );


        showInstagramError();


        /*
           Update portfolio status.
        */

        window.ArtiPortfolio = {

            status: 'error',

            version: 'v7',

            source: 'Instagram',

            message:
                'Unable to load Instagram portfolio.',

            error:
                error.message

        };

    }

}


/* ------------------------------------------
   Start Instagram Portfolio
------------------------------------------ */

if (instagramFeed) {

    loadInstagramPortfolio();

}


/* ==========================================
   DIGITAL DESIGN STUDIO HOOK
========================================== */

window.ArtiDesignStudio = {

    status: 'ready',

    version: 'v7',

    message:
        'Digital Design Studio reserved for future integration.'

};


console.log(
    window.ArtiDesignStudio
);


/* ==========================================
   FUTURE AI ASSISTANT HOOK
========================================== */

window.ArtiAI = {

    status: 'reserved',

    version: 'future',

    message:
        'Arti AI Assistant reserved for future integration.'

};


console.log(
    window.ArtiAI
);


/* ==========================================
   CONSOLE SIGNATURE
========================================== */

console.log(
    '%cArtiDéSigns',
    'color:#ff1414;font-size:20px;font-weight:bold;'
);


console.log(
    'Design Is Intelligence Made Visible.'
);
