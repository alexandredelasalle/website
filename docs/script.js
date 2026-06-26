let angle = 0;
let colorMode = false;
let italicMode = false;
let pokeMode = 0;

document.addEventListener("DOMContentLoaded", () => {

    const btns = document.querySelectorAll(".rotateBtn");
    const images = document.querySelectorAll(".rotate-img");

    const email = document.getElementById("emailCopy");
    const phone = document.getElementById("phoneCopy");

    let wallpaperContainer = null;

    /* ---------------- */
    /* DEVICE DETECTION */
    /* ---------------- */
    const hasHover = window.matchMedia("(hover: hover)").matches;

    /* ---------------- */
    /* ROTATION */
    /* ---------------- */
    function rotateEffect() {
        if (images.length === 0) return false;

        angle += 180;
        images.forEach(img => {
            img.style.transform = `rotate(${angle}deg)`;
        });

        return true;
    }

    /* ---------------- */
    /* COLOR MODE */
    /* ---------------- */
    function colorModeEffect() {
        if (!hasHover) return false;

        colorMode = !colorMode;
        document.body.classList.toggle("color-mode");

        return true;
    }

    /* ---------------- */
    /* ITALIC MODE (replaces bold) */
    /* ---------------- */
    function italicEffect() {

        italicMode = !italicMode;

        const targets = document.querySelectorAll(
            ".btn, .link-internal, .link-external"
        );

        targets.forEach(el => {
            el.style.fontStyle = italicMode ? "italic" : "normal";
        });

        return true;
    }

    /* ---------------- */
    /* POKE CURSOR */
    /* ---------------- */
    function pokeCursorEffect() {

        if (!hasHover) return false;

        const cursors = [
            "../img/zapdos.png",
            "../img/rayquaza.png",
            "../img/slowbro.png"
        ];

        pokeMode = (pokeMode + 1) % cursors.length;

        const cursorFile = cursors[pokeMode];

        let x = 0;
        let y = 0;

        if (cursorFile.includes("rayquaza")) {
            x = 5;
            y = 10;
        }

        if (cursorFile.includes("zapdos")) {
            x = 5;
            y = 3;
        }

        if (cursorFile.includes("slowbro")) {
            x = 8;
            y = 3;
        }

        const cursor = `url('${cursorFile}') ${x} ${y}, auto`;

        document.body.style.cursor = cursor;

        const style = document.createElement("style");
        style.innerHTML = `
            * {
                cursor: ${cursor} !important;
            }
        `;
        document.head.appendChild(style);

        return true;
    }

    /* ---------------- */
    /* WALLPAPER */
    /* ---------------- */
    function wallpaperEffect() {

        if (!wallpaperContainer) {
            wallpaperContainer = document.createElement("div");
            wallpaperContainer.className = "wallpaper-container";
            document.body.appendChild(wallpaperContainer);
        }

        const sources = [
            "../img/pikmin_img01.png",
            "../img/zelda_img01.png"
        ];

        const src = sources[Math.floor(Math.random() * sources.length)];

        const img = document.createElement("img");
        img.src = src;
        img.className = "wallpaper-img";

        img.style.opacity = "0";

        img.onload = () => {
            const w = img.naturalWidth;
            const h = img.naturalHeight;

            img.style.left = Math.random() * (window.innerWidth - w) + "px";
            img.style.top  = Math.random() * (window.innerHeight - h) + "px";

            img.style.opacity = "1";
        };

        wallpaperContainer.appendChild(img);

        return true;
    }

    /* ---------------- */
    /* SCREEN SAVER */
    /* ---------------- */
    function screensaverEffect() {

        const img = document.createElement("img");
        img.src = "../img/tennis.png";

        img.style.position = "fixed";
        img.style.pointerEvents = "none";
        img.style.zIndex = "9999";

        document.body.appendChild(img);

        let x = Math.random() * (window.innerWidth - 100);
        let y = Math.random() * (window.innerHeight - 100);

        let dx = (Math.random() * 6 + 4) * (Math.random() < 0.5 ? 1 : -1);
        let dy = (Math.random() * 6 + 4) * (Math.random() < 0.5 ? 1 : -1);

        function animate() {

            const w = img.offsetWidth;
            const h = img.offsetHeight;

            x += dx;
            y += dy;

            if (x <= 0 || x + w >= window.innerWidth) {
                dx *= -1;
                x = Math.max(0, Math.min(x, window.innerWidth - w));
            }

            if (y <= 0 || y + h >= window.innerHeight) {
                dy *= -1;
                y = Math.max(0, Math.min(y, window.innerHeight - h));
            }

            img.style.left = x + "px";
            img.style.top = y + "px";

            requestAnimationFrame(animate);
        }

        animate();

        return true;
    }

    /* ---------------- */
    /* EFFECTS */
    /* ---------------- */
    const effects = [
        rotateEffect,
        colorModeEffect,
        wallpaperEffect,
        italicEffect,
        pokeCursorEffect,
        screensaverEffect
    ];

    btns.forEach(btn => {
        btn.addEventListener("click", () => {

            let success = false;

            while (!success) {
                const random = effects[Math.floor(Math.random() * effects.length)];
                success = random();
            }

        });
    });

    /* ---------------- */
    /* EMAIL COPY */
    /* ---------------- */
    if (email) {
        email.addEventListener("click", () => {
            navigator.clipboard.writeText("contact@alexandredelasalle.com");

            email.classList.add("copied");
            email.textContent = "copied ✓";

            setTimeout(() => {
                email.classList.remove("copied");
                email.textContent = "contact@alexandredelasalle.com❏";
            }, 1200);
        });
    }

    /* ---------------- */
    /* PHONE COPY */
    /* ---------------- */
    if (phone) {
        phone.addEventListener("click", () => {
            navigator.clipboard.writeText("+33674562177");

            phone.classList.add("copied");
            phone.textContent = "copied ✓";

            setTimeout(() => {
                phone.classList.remove("copied");
                phone.textContent = "+33674562177❏";
            }, 1200);
        });
    }

});