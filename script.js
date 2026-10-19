// =====================================================
// SETTINGS
// =====================================================

// TRUE = bisa langsung dites sekarang
// FALSE = menunggu sampai 20 Oktober 2026

const TEST_MODE = true;


// =====================================================
// BIRTHDAY DATE
// =====================================================

// 20 Oktober 2026
// 00:00 WITA

const birthdayDate =
    new Date(
        "2026-10-20T00:00:00+08:00"
    ).getTime();


// =====================================================
// ELEMENTS
// =====================================================

const accessScreen =
    document.getElementById(
        "accessScreen"
    );

const countdownScreen =
    document.getElementById(
        "countdownScreen"
    );

const birthdayScreen =
    document.getElementById(
        "birthdayScreen"
    );

const menuScreen =
    document.getElementById(
        "menuScreen"
    );

const waxSeal =
    document.getElementById(
        "waxSeal"
    );

const continueButton =
    document.getElementById(
        "continueButton"
    );

const testNextButton =
    document.getElementById(
        "testNextButton"
    );

const music =
    document.getElementById(
        "bgMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );



// =====================================================
// SHOW SCREEN
// =====================================================

function showScreen(target) {

    const screens =
        document.querySelectorAll(
            ".screen, .detail-screen"
        );


    screens.forEach(
        function(screen) {

            screen.classList.remove(
                "active"
            );

        }
    );


    if (target) {

        target.classList.add(
            "active"
        );

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}



// =====================================================
// MUSIC
// =====================================================

let musicPlaying = false;


window.addEventListener(
    "load",
    function() {

        music.volume = 0.6;


        music.play()
            .then(
                function() {

                    musicPlaying = true;

                    musicButton.innerText =
                        "♫";

                }
            )
            .catch(
                function() {

                    musicPlaying = false;

                    musicButton.innerText =
                        "🔇";

                }
            );

    }
);



// =====================================================
// OPEN ENVELOPE
// =====================================================

waxSeal.addEventListener(
    "click",
    function() {


        // Jalankan musik setelah user
        // melakukan interaksi

        music.volume = 0.6;


        music.play()
            .then(
                function() {

                    musicPlaying = true;

                    musicButton.innerText =
                        "♫";

                }
            )
            .catch(
                function(error) {

                    console.log(
                        "Music blocked:",
                        error
                    );

                }
            );


        // Animasi seal

        waxSeal.style.transform =
            "translate(-50%, -50%) scale(1.25)";

        waxSeal.style.opacity = "0";


        setTimeout(
            function() {

                showScreen(
                    countdownScreen
                );

            },
            600
        );

    }
);



// =====================================================
// COUNTDOWN
// =====================================================

function updateCountdown() {

    const now =
        new Date().getTime();


    const distance =
        birthdayDate - now;


    if (distance <= 0) {

        document.getElementById(
            "days"
        ).innerText = "00";

        document.getElementById(
            "hours"
        ).innerText = "00";

        document.getElementById(
            "minutes"
        ).innerText = "00";

        document.getElementById(
            "seconds"
        ).innerText = "00";


        if (!TEST_MODE) {

            showScreen(
                birthdayScreen
            );

        }

        return;

    }


    const days =
        Math.floor(
            distance /
            (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60 * 24)
            ) /
            (1000 * 60 * 60)
        );


    const minutes =
        Math.floor(
            (
                distance %
                (1000 * 60 * 60)
            ) /
            (1000 * 60)
        );


    const seconds =
        Math.floor(
            (
                distance %
                (1000 * 60)
            ) /
            1000
        );


    document.getElementById(
        "days"
    ).innerText =
        String(days).padStart(
            2,
            "0"
        );


    document.getElementById(
        "hours"
    ).innerText =
        String(hours).padStart(
            2,
            "0"
        );


    document.getElementById(
        "minutes"
    ).innerText =
        String(minutes).padStart(
            2,
            "0"
        );


    document.getElementById(
        "seconds"
    ).innerText =
        String(seconds).padStart(
            2,
            "0"
        );

}


updateCountdown();

setInterval(
    updateCountdown,
    1000
);



// =====================================================
// TEST BUTTON
// =====================================================

if (TEST_MODE) {

    testNextButton.style.display =
        "inline-block";


    testNextButton.addEventListener(
        "click",
        function() {

            showScreen(
                birthdayScreen
            );

        }
    );

} else {

    testNextButton.style.display =
        "none";

}



// =====================================================
// BIRTHDAY → MENU
// =====================================================

continueButton.addEventListener(
    "click",
    function() {

        showScreen(
            menuScreen
        );

    }
);



// =====================================================
// FEATURE CARDS
// =====================================================

const featureCards =
    document.querySelectorAll(
        ".feature-card"
    );


featureCards.forEach(
    function(card) {

        card.addEventListener(
            "click",
            function() {

                const pageId =
                    this.getAttribute(
                        "data-page"
                    );


                const page =
                    document.getElementById(
                        pageId
                    );


                if (page) {

                    showScreen(page);

                } else {

                    console.error(
                        "Page tidak ditemukan:",
                        pageId
                    );

                }

            }
        );

    }
);



// =====================================================
// BACK BUTTON
// =====================================================

const backButtons =
    document.querySelectorAll(
        ".back-button"
    );


backButtons.forEach(
    function(button) {

        button.addEventListener(
            "click",
            function() {

                showScreen(
                    menuScreen
                );

            }
        );

    }
);



// =====================================================
// INVITATION → RUNDOWN
// =====================================================

const showRundown =
    document.getElementById(
        "showRundown"
    );


showRundown.addEventListener(
    "click",
    function() {

        const rundownPage =
            document.getElementById(
                "rundownPage"
            );


        showScreen(
            rundownPage
        );

    }
);



// =====================================================
// MUSIC TOGGLE
// =====================================================

musicButton.addEventListener(
    "click",
    function() {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.innerText =
                "🔇";

        } else {

            music.play()
                .then(
                    function() {

                        musicPlaying = true;

                        musicButton.innerText =
                            "♫";

                    }
                )
                .catch(
                    function() {

                        console.log(
                            "Music blocked"
                        );

                    }
                );

        }

    }
);



// =====================================================
// =====================================================
//                    MEMORIES
// =====================================================
// =====================================================


// =====================================================
// DATA MEMORY
// =====================================================

const memories = [

    {
        image:
            "assets/memory1.jpeg",

        title:
            "Our First Memory",

        text:
                "Sayang, inget ga ini moment apa? " +
                " wkwk ditraktir pertama kali karena udah ngajarin kalkulus, " +
                "kangen banget, ini juga hari pertama aku punya hp baru hihi.. " +
                "kita boncengan pertama kali, eh aku udah suka kamu tau di sini wkwk " +
                "pasti kamu juga kan? hayo ngakuuu"
    },


    {
        image:
            "assets/memory2.jpeg",

        title:
            "A Day With You",

        text:
            "Ini waktu kita pertama kali kencan hahah, " +
            "mbul ngajakin yola sunsetan lho ini, sunset with tahu krispi. " +
            "trs lucu banget waktu itu mbul suruh yola nyender wkwk, " +
            "ah jadi kangen, nanti kita sisihkan waktu buat gini lagi ya?? " 
    },


    {
        image:
            "assets/memory3.jpeg",

        title:
            "One Of My Favorites",

        text:
            "hihi masih belum move on sama foto ini sayang " +
            "seru seru seru banget, yola pengen ngulang lagi sama mbul. " +
            "esok kita kasi fayuyu liat ya mas hahaha, trs kita ceritain dia semuanyaa. " +
            "infokan mdpl selanjutnya bosku."
    },


    {
        image:
            "assets/memory4.jpeg",

        title:
            "Another Little Moment",

        text:
            "ini pertama kali kita ketemu after sayang pakai behel, " +
            "langsung yola cari dimana jual bubur di mataram karena ga tega liat sayangku ndabisa mumm. " +
            "salah satu moment yang bakal yola inget karena ini jg hal besar yang berani mbul lakuin, " +
            "pakai behel hahaha keren sayangkuu."
    },


    {
        image:
            "assets/memory5.jpeg",

        title:
            "More To Come",

        text:
            "PRAKTIKUM!!! " +
            " kita berawal dari sini sayang, terimakasih infor telah mengadakan praktikum " +
            "dan membuatku sekelompok dengan kesayanganku ini " 
    }

];



// =====================================================
// MEMORY ELEMENTS
// =====================================================

let currentMemory = 0;


const memoryImage =
    document.getElementById(
        "memoryImage"
    );


const memoryCounter =
    document.getElementById(
        "memoryCounter"
    );


const memoryTitle =
    document.getElementById(
        "memoryTitle"
    );


const memoryText =
    document.getElementById(
        "memoryText"
    );


const prevMemory =
    document.getElementById(
        "prevMemory"
    );


const nextMemory =
    document.getElementById(
        "nextMemory"
    );


const memoryTouchArea =
    document.getElementById(
        "memoryTouchArea"
    );



// =====================================================
// SHOW MEMORY
// =====================================================

function showMemory(index) {


    // Lewat akhir

    if (
        index >= memories.length
    ) {

        index = 0;

    }


    // Mundur dari awal

    if (index < 0) {

        index =
            memories.length - 1;

    }


    currentMemory = index;


    const memory =
        memories[currentMemory];


    // Fade

    memoryImage.style.opacity =
        "0";


    setTimeout(
        function() {

            memoryImage.src =
                memory.image;

            memoryImage.alt =
                memory.title;

            memoryImage.style.opacity =
                "1";

        },
        150
    );


    // Judul

    memoryTitle.innerText =
        memory.title;


    // Cerita

    memoryText.innerText =
        memory.text;


    // Counter

    memoryCounter.innerText =
        String(
            currentMemory + 1
        ).padStart(
            2,
            "0"
        )
        +
        " / "
        +
        String(
            memories.length
        ).padStart(
            2,
            "0"
        );

}



// =====================================================
// NEXT MEMORY
// =====================================================

nextMemory.addEventListener(
    "click",
    function() {

        showMemory(
            currentMemory + 1
        );

    }
);



// =====================================================
// PREVIOUS MEMORY
// =====================================================

prevMemory.addEventListener(
    "click",
    function() {

        showMemory(
            currentMemory - 1
        );

    }
);



// =====================================================
// SWIPE
// =====================================================

let touchStartX = 0;

let touchEndX = 0;


memoryTouchArea.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


memoryTouchArea.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        const distance =
            touchEndX -
            touchStartX;


        // Swipe kiri

        if (
            distance < -50
        ) {

            showMemory(
                currentMemory + 1
            );

        }


        // Swipe kanan

        if (
            distance > 50
        ) {

            showMemory(
                currentMemory - 1
            );

        }

    },
    {
        passive: true
    }
);



// =====================================================
// INITIAL MEMORY
// =====================================================

showMemory(0);