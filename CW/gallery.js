/* ============================================================
   Gallery Page Logic
   Extracted from main interactivity script
   ============================================================ */

const data = [
    {
        t: "Rainwater Harvesting",
        d: "A multi-stage harvesting system that captures roof runoff and utilizes sand filtration to provide a sustainable water source for daily household activities.",
        i: "images/full1.jpg"
    },
    {
        t: "Clay Filtration",
        d: "A gravity-fed purification system utilizing a porous ceramic pot for micro-filtration. This method removes sediment and harmful pathogens from raw water, storing the clean result in a protected receptacle.",
        i: "images/full2.jpg"
    },
    {
        t: "Smart Irrigation",
        d: "Precision agricultural technology that utilizes soil moisture sensors and automated controllers to deliver water only when plants need it, significantly reducing evaporation and runoff waste.",
        i: "images/full3.jpg"
    },
    {
        t: "Clean Sanitation",
        d: "Advanced waste management systems designed to prevent groundwater contamination, ensuring that local water sources remain pure and safe for human consumption.",
        i: "images/full4.jpg"
    },
    {
        t: "Solar Desalination",
        d: "An integrated solar thermal and photovoltaic system that extracts fresh water from seawater. It utilizes renewable energy for both thermal storage and mechanical pumping to produce potable municipal water.",
        i: "images/full5.jpg"
    },
    {
        t: "Wastewater Recovery",
        d: "A specialized Membrane Bioreactor (MBR) system that treats domestic wastewater through anoxic and oxic biological stages. This process purifies water to a high standard, allowing it to be safely reused for toilet flushing and non-potable needs.",
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
