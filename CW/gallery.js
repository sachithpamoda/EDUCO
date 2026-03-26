/* ============================================================
   Gallery Page Logic
   Extracted from main interactivity script
   ============================================================ */

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

function openModal(index) {
    const modal = document.getElementById("gallery-modal");
    document.getElementById("modal-title").innerText = data[index].t;
    document.getElementById("modal-desc").innerText = data[index].d;
    document.getElementById("modal-img").src = data[index].i;
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("gallery-modal");
    modal.classList.remove("open");
    document.body.style.overflow = "auto";
}

function toggleGlobalTextSize() {
    document.body.classList.toggle("large-text-mode");

    console.log("Accessibility: Large text mode is now " +
        (document.body.classList.contains("large-text-mode") ? "ON" : "OFF"));
}

window.onclick = function (event) {
    const modal = document.getElementById("gallery-modal");
    if (event.target == modal) {
        closeModal();
    }
};
