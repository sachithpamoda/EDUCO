/* ============================================================
   SDG 06: Clean Water and Sanitation - Interactivity Logic
   Student 1: Implementation Lead
   File Name: script.js
   ============================================================ */

// 1. Data Array for Gallery Items (Requirement A & B)
// Updated with correct paths for the "images/" subfolder
const data = [
    {
        t: "Rainwater Harvesting",
        d: "Capturing roof runoff to provide sustainable local water sources. This reduces reliance on municipal systems.",
        i: "images/full1.jpg"
    },
    {
        t: "Clay Filtration",
        d: "Using porous ceramic and natural charcoal to remove pathogens and provide safe drinking water to communities.",
        i: "images/full2.jpg"
    },
    {
        t: "Smart Irrigation",
        d: "AI-driven sensors that monitor soil moisture and optimize water delivery for agriculture, saving up to 40% more water.",
        i: "images/full3.jpg"
    },
    {
        t: "Clean Sanitation",
        d: "Advanced biodigester treatment that prevents groundwater contamination and converts waste into energy.",
        i: "images/full4.jpg"
    },
    {
        t: "Solar Desalination",
        d: "Converting seawater into fresh drinking water using zero-emission solar thermal energy.",
        i: "images/full5.jpg"
    },
    {
        t: "Wastewater Recovery",
        d: "Recycling greywater from sinks and showers to reuse it for toilets and industrial cooling systems.",
        i: "images/full6.jpg"
    }
];

/**
 * Opens the modal and populates it with data from the array
 * @param {number} index - The index of the item in the data array
 */
function openModal(index) {
    const modal = document.getElementById('gallery-modal');

    // Update content using DOM manipulation
    document.getElementById('modal-title').innerText = data[index].t;
    document.getElementById('modal-desc').innerText = data[index].d;
    document.getElementById('modal-img').src = data[index].i;

    // Show modal and disable background scrolling for UX
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * Closes the modal and restores background scrolling
 */
function closeModal() {
    const modal = document.getElementById('gallery-modal');
    modal.classList.remove('open');
    document.body.style.overflow = 'auto';
}

/**
 * Requirement C: JavaScript Style Change
 * Toggles a global accessibility class on the body tag
 */
function toggleGlobalTextSize() {
    document.body.classList.toggle('large-text-mode');

    // Console log helps during your final presentation/defense
    console.log("Accessibility: Large text mode is now " +
        (document.body.classList.contains('large-text-mode') ? "ON" : "OFF"));
}

/**
 * Global click listener to close modal if the user clicks the dark background
 */
window.onclick = function (event) {
    const modal = document.getElementById('gallery-modal');
    // If the click target is the overlay background (not the content box)
    if (event.target == modal) {
        closeModal();
    }
}