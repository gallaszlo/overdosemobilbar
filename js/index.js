document.addEventListener("DOMContentLoaded", () => {
    // Alapértelmezett nyelv beállítása
    const defaultLanguage = "hu";
    useLanguage(defaultLanguage);

    // const languageSelector = document.getElementById("language");
    // // Nyelv változtatásának eseményfigyelője
    // languageSelector.addEventListener("change", (event) => {
    //     const selectedLanguage = event.target.value;
    //     useLanguage(selectedLanguage);
    // });
});

// JSON fájl betöltése a kiválasztott nyelv alapján
function useLanguage(language) {
    const filePath = 'json/' + language + '.json'; // Fájl elérési útja
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Could not load language file: ${filePath}`);
            }
            return response.json();
        })
        .then(translations => {
            updateTexts(translations, language);
        })
        .catch(error => {
            console.error("Error loading language file:", error);
        });
}

// HTML tartalom frissítése
function updateTexts(translations, language) {
    const elements = document.querySelectorAll("[data-key]");
    elements.forEach((element) => {
        const key = element.getAttribute("data-key");
        element.innerHTML = translations[key]; // HTML tartalom frissítése
    });
    const languageIcon = document.getElementById("language-icon");
    languageIcon.src='images/' + language + '.png'
}