const ITEMS_PER_PAGE = 9; // Počet dinosaurů na stránku
let currentPage = 1;
let filteredDinosaurs = [...dinosaurs]; // Kopie pro filtrování

// DOM prvky
const dinoList = document.getElementById("dino-list");
const pagination = document.getElementById("pagination");
const sortSelect = document.getElementById("sort");
const searchInput = document.getElementById("search");
const resetButton = document.getElementById("reset-filters");
const checkboxes = document.querySelectorAll("input[type=checkbox]");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const modalName = document.getElementById("modal-name");
const modalDescription = document.getElementById("modal-description");
const modalImg = document.getElementById("modal-img");

// -------------------- ZOBRAZENÍ DINOSAURŮ --------------------
function renderDinosaurs() {
    dinoList.innerHTML = "";

    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageItems = filteredDinosaurs.slice(start, end);

    if (pageItems.length === 0) {
        dinoList.innerHTML = "<p>Žádní dinosauři neodpovídají filtrům.</p>";
        pagination.innerHTML = "";
        return;
    }

    pageItems.forEach(dino => {
        const div = document.createElement("div");
        div.className = "dino-item";
        div.setAttribute("data-name", dino.name.toLowerCase());
        div.setAttribute("data-obdobi", dino.obdobi);
        div.setAttribute("data-velikost", dino.velikost);
        div.setAttribute("data-potrava", dino.potrava);
        div.setAttribute("data-chodidla", dino.chodidla);
        div.setAttribute("data-kridla", dino.kridla || "ne");
        div.setAttribute("data-description", dino.description);
        div.setAttribute("data-image", dino.image);

        div.innerHTML = `
            <img src="${dino.image}" alt="${dino.name}" class="dino-image">
            <h2>${dino.name}</h2>
            <div class="hover-text">Pro více informací klikni</div>
        `;

        div.addEventListener("click", () => openModal(dino));
        dinoList.appendChild(div);
    });

    renderPagination();
}
// -------------------- MODÁLNÍ OKNO --------------------
function openModal(dino) {
    modalName.textContent = dino.name;
    modalDescription.textContent = dino.description;
    modalImg.src = dino.image;
    modalImg.alt = dino.name;
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
}

modalClose.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
});

function closeModal() {
    modal.classList.add("hidden");
    document.body.classList.remove("modal-open");
}

// -------------------- STRÁNKOVÁNÍ --------------------
function renderPagination() {
    const totalPages = Math.ceil(filteredDinosaurs.length / ITEMS_PER_PAGE);
    pagination.innerHTML = "";

    if (totalPages <= 1) {
        return; // Pokud je pouze jedna stránka, nezobrazujeme stránkování
    }

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.addEventListener("click", () => {
            currentPage = i;
            renderDinosaurs();
            window.scrollTo({ top: 0, behavior: 'smooth'});
        });
        pagination.appendChild(btn);
    }
}

// -------------------- FILTROVÁNÍ --------------------
function applyFilters() {
    const selected = {
        obdobi: getChecked("obdobi[]"),
        velikost: getChecked("velikost[]"),
        potrava: getChecked("potrava[]"),
        chodidla: getChecked("chodidla[]"),
        kridla: getChecked("kridla[]")
    };
    const searchTerm = searchInput.value.toLowerCase();

    filteredDinosaurs = dinosaurs.filter(d => {
        return (
            (selected.obdobi.length === 0 || selected.obdobi.includes(d.obdobi)) &&
            (selected.velikost.length === 0 || selected.velikost.includes(d.velikost)) &&
            (selected.potrava.length === 0 || selected.potrava.includes(d.potrava)) &&
            (selected.chodidla.length === 0 || selected.chodidla.includes(String(d.chodidla))) &&
            (selected.kridla.length === 0 || selected.kridla.includes(d.kridla || "ne")) &&
            d.name.toLowerCase().includes(searchTerm)
        );
    });

    sortDinosaurs();
    currentPage = 1;  // Resetování stránky na první po aplikování filtrů
    renderDinosaurs();
}

function getChecked(name) {
    return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(i => i.value);
}

// -------------------- ŘAZENÍ --------------------
function sortDinosaurs() {
    const value = sortSelect.value;

    filteredDinosaurs.sort((a, b) => {
        if (value === "name-asc") return a.name.localeCompare(b.name);
        if (value === "name-desc") return b.name.localeCompare(a.name);
        if (value === "chodidla") return a.chodidla - b.chodidla;
        if (value === "velikost") return a.velikost.localeCompare(b.velikost); // lze upravit na číselné porovnání
        return 0;
    });
}

// -------------------- MODÁLNÍ OKNO --------------------
function openModal(dino) {
    modalName.textContent = dino.name;
    modalDescription.textContent = dino.description;
    modalImg.src = dino.image;
    modal.classList.remove("hidden");
}

modalClose.addEventListener("click", () => modal.classList.add("hidden"));
window.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
});

// -------------------- UDÁLOSTI --------------------
sortSelect.addEventListener("change", applyFilters);
searchInput.addEventListener("input", applyFilters);
resetButton.addEventListener("click", () => {
    checkboxes.forEach(cb => cb.checked = false);
    searchInput.value = "";
    currentPage = 1;
    filteredDinosaurs = [...dinosaurs];
    sortSelect.value = "name-asc";
    renderDinosaurs();
});
checkboxes.forEach(cb => cb.addEventListener("change", applyFilters));

// Klikací události pro PHP-renderované položky
document.querySelectorAll(".dino-item").forEach(item => {
    item.addEventListener("click", () => {
        const dino = {
            name: item.getAttribute("data-name"),
            description: item.getAttribute("data-description"),
            image: item.getAttribute("data-image")
        };
        openModal(dino);
    });
});

// Výchozí třídění při načtení stránky
filteredDinosaurs.sort((a, b) => a.name.localeCompare(b.name));
renderDinosaurs();

// -------------------- START --------------------
renderDinosaurs();
