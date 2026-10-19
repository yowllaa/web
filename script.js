
"use strict";

// =====================================================
// SETTINGS
// =====================================================
const TEST_MODE = false;
const birthdayDate = new Date("2026-10-20T00:00:00+08:00").getTime();

// =====================================================
// ELEMENTS
// =====================================================
const accessScreen = document.getElementById("accessScreen");
const countdownScreen = document.getElementById("countdownScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const menuScreen = document.getElementById("menuScreen");
const waxSeal = document.getElementById("waxSeal");
const continueButton = document.getElementById("continueButton");
const testNextButton = document.getElementById("testNextButton");
const music = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");

// =====================================================
// SCREEN NAVIGATION
// =====================================================
let currentScreen = null;
let birthdayOpenedAutomatically = false;

function showScreen(target) {
    if (typeof target === "string") {
        target = document.getElementById(target);
    }

    if (!target) {
        console.error("Halaman tujuan tidak ditemukan.");
        return;
    }

    document.querySelectorAll(".screen, .detail-screen").forEach(function (screen) {
        screen.classList.remove("active");
    });

    target.classList.add("active");
    currentScreen = target;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// =====================================================
// MUSIC
// =====================================================
let musicPlaying = false;

function playMusic() {
    if (!music) return;

    music.volume = 0.6;

    const playPromise = music.play();

    if (playPromise && typeof playPromise.then === "function") {
        playPromise
            .then(function () {
                musicPlaying = true;

                if (musicButton) {
                    musicButton.innerText = "♫";
                }
            })
            .catch(function (error) {
                musicPlaying = false;

                if (musicButton) {
                    musicButton.innerText = "🔇";
                }

                console.log("Musik tidak bisa diputar otomatis:", error);
            });
    }
}

window.addEventListener("load", function () {
    playMusic();
});

// =====================================================
// OPEN ENVELOPE
// =====================================================
if (waxSeal) {
    waxSeal.addEventListener("click", function () {
        playMusic();

        waxSeal.style.transform =
            "translate(-50%, -50%) scale(1.25)";

        waxSeal.style.opacity = "0";

        window.setTimeout(function () {
            showScreen(countdownScreen);
            updateCountdown();
        }, 600);
    });
}

// =====================================================
// COUNTDOWN
// =====================================================
function setCountdownValue(id, value) {
    const element = document.getElementById(id);

    if (element) {
        element.innerText = value;
    }
}

function updateCountdown() {
    const distance = birthdayDate - Date.now();

    if (distance <= 0) {
        setCountdownValue("days", "00");
        setCountdownValue("hours", "00");
        setCountdownValue("minutes", "00");
        setCountdownValue("seconds", "00");

        // PENTING:
        // Buka halaman ulang tahun otomatis hanya sekali.
        // Jangan memanggil showScreen setiap detik,
        // karena itu akan mengembalikan user dari menu.
        if (!TEST_MODE && !birthdayOpenedAutomatically) {
            birthdayOpenedAutomatically = true;

            if (birthdayScreen) {
                showScreen(birthdayScreen);
            }
        }

        return;
    }

    const days = Math.floor(
        distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
    );

    setCountdownValue("days", String(days).padStart(2, "0"));
    setCountdownValue("hours", String(hours).padStart(2, "0"));
    setCountdownValue("minutes", String(minutes).padStart(2, "0"));
    setCountdownValue("seconds", String(seconds).padStart(2, "0"));
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

// =====================================================
// TEST BUTTON (OPTIONAL)
// =====================================================
if (testNextButton) {
    if (TEST_MODE) {
        testNextButton.style.display = "inline-block";

        testNextButton.addEventListener("click", function (event) {
            event.preventDefault();
            showScreen(birthdayScreen);
        });
    } else {
        testNextButton.style.display = "none";
    }
}

// =====================================================
// BIRTHDAY → MENU
// =====================================================
if (continueButton) {
    continueButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();

        if (menuScreen) {
            showScreen(menuScreen);
        } else {
            console.error("Elemen #menuScreen tidak ditemukan.");
        }
    });
} else {
    console.error("Tombol #continueButton tidak ditemukan.");
}

// =====================================================
// FEATURE CARDS → DETAIL PAGES
// =====================================================
document.querySelectorAll(".feature-card").forEach(function (card) {
    card.addEventListener("click", function () {
        const pageId = card.getAttribute("data-page");
        const page = pageId ? document.getElementById(pageId) : null;

        if (page) {
            showScreen(page);
        } else {
            console.error("Halaman fitur tidak ditemukan:", pageId);
        }
    });
});

// =====================================================
// BACK BUTTONS → MENU
// =====================================================
document.querySelectorAll(".back-button").forEach(function (button) {
    button.addEventListener("click", function (event) {
        event.preventDefault();

        if (menuScreen) {
            showScreen(menuScreen);
        }
    });
});

// =====================================================
// INVITATION → RUNDOWN
// =====================================================
const showRundownButton = document.getElementById("showRundown");
const rundownPage = document.getElementById("rundownPage");

if (showRundownButton) {
    showRundownButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (rundownPage) {
            showScreen(rundownPage);
        }
    });
}

// =====================================================
// MUSIC TOGGLE
// =====================================================
if (musicButton) {
    musicButton.addEventListener("click", function (event) {
        event.preventDefault();

        if (!music) return;

        if (musicPlaying) {
            music.pause();
            musicPlaying = false;
            musicButton.innerText = "🔇";
        } else {
            playMusic();
        }
    });
}

// =====================================================
// MEMORIES DATA
// =====================================================
const memories = [
    {
        image: "assets/memory1.jpeg",
        title: "Our First Memory",
        text: "Sayang, inget ga ini moment apa? wkwk ditraktir pertama kali karena udah ngajarin kalkulus, kangen banget, ini juga hari pertama aku punya hp baru hihi.. kita boncengan pertama kali, eh aku udah suka kamu tau di sini wkwk pasti kamu juga kan? hayo ngakuuu"
    },
    {
        image: "assets/memory2.jpeg",
        title: "A Day With You",
        text: "Ini waktu kita pertama kali kencan hahah, mbul ngajakin yola sunsetan lho ini, sunset with tahu krispi. trs lucu banget waktu itu mbul suruh yola nyender wkwk, ah jadi kangen, nanti kita sisihkan waktu buat gini lagi ya??"
    },
    {
        image: "assets/memory3.jpeg",
        title: "One Of My Favorites",
        text: "hihi masih belum move on sama foto ini sayang. seru seru seru banget, yola pengen ngulang lagi sama mbul. esok kita kasi fayuyu liat ya mas hahaha, trs kita ceritain dia semuanyaa. infokan mdpl selanjutnya bosku."
    },
    {
        image: "assets/memory4.jpeg",
        title: "Another Little Moment",
        text: "ini pertama kali kita ketemu after sayang pakai behel, langsung yola cari dimana jual bubur di mataram karena ga tega liat sayangku ndabisa mumm. salah satu moment yang bakal yola inget karena ini jg hal besar yang berani mbul lakuin, pakai behel hahaha keren sayangkuu."
    },
    {
        image: "assets/memory5.jpeg",
        title: "More To Come",
        text: "PRAKTIKUM!!! kita berawal dari sini sayang, terimakasih infor telah mengadakan praktikum dan membuatku sekelompok dengan kesayanganku ini"
    }
];

// =====================================================
// MEMORY ELEMENTS
// =====================================================
let currentMemory = 0;

const memoryImage = document.getElementById("memoryImage");
const memoryCounter = document.getElementById("memoryCounter");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const prevMemory = document.getElementById("prevMemory");
const nextMemory = document.getElementById("nextMemory");
const memoryTouchArea = document.getElementById("memoryTouchArea");

// =====================================================
// SHOW MEMORY
// =====================================================
function showMemory(index) {
    if (memories.length === 0) return;

    if (index >= memories.length) {
        index = 0;
    }

    if (index < 0) {
        index = memories.length - 1;
    }

    currentMemory = index;

    const memory = memories[currentMemory];

    if (memoryImage) {
        memoryImage.style.opacity = "0";

        window.setTimeout(function () {
            memoryImage.src = memory.image;
            memoryImage.alt = memory.title;
            memoryImage.style.opacity = "1";
        }, 150);
    }

    if (memoryTitle) {
        memoryTitle.innerText = memory.title;
    }

    if (memoryText) {
        memoryText.innerText = memory.text;
    }

    if (memoryCounter) {
        memoryCounter.innerText =
            String(currentMemory + 1).padStart(2, "0") +
            " / " +
            String(memories.length).padStart(2, "0");
    }
}

// =====================================================
// NEXT / PREVIOUS MEMORY
// =====================================================
if (nextMemory) {
    nextMemory.addEventListener("click", function (event) {
        event.preventDefault();
        showMemory(currentMemory + 1);
    });
}

if (prevMemory) {
    prevMemory.addEventListener("click", function (event) {
        event.preventDefault();
        showMemory(currentMemory - 1);
    });
}

// =====================================================
// SWIPE MEMORY ON TOUCH DEVICES
// =====================================================
let touchStartX = 0;

if (memoryTouchArea) {
    memoryTouchArea.addEventListener("touchstart", function (event) {
        if (event.changedTouches && event.changedTouches[0]) {
            touchStartX = event.changedTouches[0].screenX;
        }
    }, { passive: true });

    memoryTouchArea.addEventListener("touchend", function (event) {
        if (!event.changedTouches || !event.changedTouches[0]) {
            return;
        }

        const touchEndX = event.changedTouches[0].screenX;
        const distance = touchEndX - touchStartX;

        if (distance < -50) {
            showMemory(currentMemory + 1);
        }

        if (distance > 50) {
            showMemory(currentMemory - 1);
        }
    }, { passive: true });
}

// Tampilkan memori pertama saat halaman dimuat
showMemory(0);
