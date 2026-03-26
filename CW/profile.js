const totalSteps = 3;
const promptsPerStep = 3;

const profileState = {
    basics: {
        fullName: "",
        username: "",
        role: ""
    },
    interests: {
        sdgInterest: "",
        preferredFocus: "",
        weeklyAction: ""
    },
    actions: {
        currentAction: "",
        goal: "",
        commitment: ""
    },
    stepStatus: {
        1: "pending",
        2: "pending",
        3: "pending"
    }
};

const stepConfigs = {
    1: {
        key: "basics",
        title: "Step 1: Basics",
        statusLabel: "basic details",
        targetCardId: "profile-basics-card",
        targetListId: "profile-basics-list",
        prompts: [
            { field: "fullName", label: "Name", question: "Step 1 of 3: Enter your full name for your SDG 06 profile." },
            { field: "username", label: "Username", question: "Step 1 of 3: Enter a username." },
            { field: "role", label: "Role", question: "Step 1 of 3: Enter your role or title." }
        ]
    },
    2: {
        key: "interests",
        title: "Step 2: Interests",
        statusLabel: "interests and preferences",
        targetCardId: "profile-interests-card",
        targetListId: "profile-interests-list",
        prompts: [
            { field: "sdgInterest", label: "SDG Interest", question: "Step 2 of 3: What part of clean water and sanitation interests you most?" },
            { field: "preferredFocus", label: "Preferred Focus", question: "Step 2 of 3: Which area do you prefer to focus on?" },
            { field: "weeklyAction", label: "Weekly Action", question: "Step 2 of 3: What weekly action can you take for SDG 06?" }
        ]
    },
    3: {
        key: "actions",
        title: "Step 3: Actions",
        statusLabel: "actions and commitments",
        targetCardId: "profile-actions-card",
        targetListId: "profile-actions-list",
        prompts: [
            { field: "currentAction", label: "Current Action", question: "Step 3 of 3: Name one action you already take to protect water." },
            { field: "goal", label: "Goal", question: "Step 3 of 3: Enter one clean water goal you want to achieve." },
            { field: "commitment", label: "Commitment", question: "Step 3 of 3: Write a short commitment for the future." }
        ]
    }
};

function sanitizePromptValue(value) {
    if (value === null) {
        return "";
    }

    return value.trim();
}

function getAnsweredCount(stepNumber) {
    const sectionKey = stepConfigs[stepNumber].key;
    const values = Object.values(profileState[sectionKey]);
    return values.filter((value) => value !== "").length;
}

function updateStepStatus(stepNumber) {
    const answeredCount = getAnsweredCount(stepNumber);

    if (answeredCount === promptsPerStep) {
        profileState.stepStatus[stepNumber] = "completed";
    } else if (answeredCount === 0) {
        profileState.stepStatus[stepNumber] = "skipped";
    } else {
        profileState.stepStatus[stepNumber] = "partial";
    }
}

function createProfileMarkup(stepNumber) {
    const sectionKey = stepConfigs[stepNumber].key;
    const promptList = stepConfigs[stepNumber].prompts;
    const answeredItems = promptList.filter((item) => profileState[sectionKey][item.field] !== "");

    return answeredItems.map((item) => {
        return `<dt>${item.label}</dt><dd>${profileState[sectionKey][item.field]}</dd>`;
    }).join("");
}

function renderStep(stepNumber) {
    const card = document.getElementById(stepConfigs[stepNumber].targetCardId);
    const list = document.getElementById(stepConfigs[stepNumber].targetListId);
    const outputSection = document.getElementById("profile-output-section");

    const answeredCount = getAnsweredCount(stepNumber);

    if (answeredCount > 0) {
        outputSection.classList.remove("hidden-section");
        card.classList.remove("hidden-section");
        list.innerHTML = createProfileMarkup(stepNumber);
    } else {
        card.classList.add("hidden-section");
        list.innerHTML = "";
    }

    const visibleCards = document.querySelectorAll(".profile-output-card:not(.hidden-section)");
    if (visibleCards.length === 0) {
        outputSection.classList.add("hidden-section");
    }
}

function updateProgress() {
    let completedSteps = 0;
    let totalAnswered = 0;

    for (let step = 1; step <= totalSteps; step += 1) {
        const status = profileState.stepStatus[step];
        const chip = document.getElementById(`chip-step-${step}`);
        totalAnswered += getAnsweredCount(step);

        chip.classList.remove("completed", "skipped");

        if (status === "completed") {
            completedSteps += 1;
            chip.classList.add("completed");
        } else if (status === "skipped") {
            chip.classList.add("skipped");
        }
    }

    const completionPercent = Math.round((totalAnswered / (totalSteps * promptsPerStep)) * 100);
    document.getElementById("progress-fill").style.width = `${completionPercent}%`;
    document.getElementById("progress-text").textContent =
        `${completionPercent}% completed • Step ${completedSteps} of ${totalSteps} completed`;

    const confirmationMessage = document.getElementById("profile-confirmation-message");
    if (completedSteps === totalSteps) {
        confirmationMessage.textContent =
            "All steps are completed. Your progressive SDG 06 user profile is now fully built.";
    } else {
        confirmationMessage.textContent =
            "Complete all three steps to finish your profile. Skipped steps can be revisited at any time.";
    }
}

function setStatusMessage(message) {
    document.getElementById("profile-status").textContent = `Status: ${message}`;
}

function runStep(stepNumber) {
    const config = stepConfigs[stepNumber];
    const skipStep = window.confirm(`Open ${config.title}? Press OK to continue with prompts, or Cancel to skip this step for now.`);

    if (!skipStep) {
        profileState.stepStatus[stepNumber] = "skipped";
        renderStep(stepNumber);
        updateProgress();
        setStatusMessage(`You skipped ${config.statusLabel}. You can revisit this step later.`);
        return;
    }

    config.prompts.forEach((promptItem) => {
        const promptText = `${promptItem.question}\n\nLeave blank and press OK if you want to skip this item.`;
        const answer = sanitizePromptValue(window.prompt(promptText, profileState[config.key][promptItem.field]));
        profileState[config.key][promptItem.field] = answer;
    });

    updateStepStatus(stepNumber);
    renderStep(stepNumber);
    updateProgress();

    if (profileState.stepStatus[stepNumber] === "completed") {
        setStatusMessage(`${config.title} completed successfully.`);
    } else if (profileState.stepStatus[stepNumber] === "partial") {
        setStatusMessage(`${config.title} saved with some skipped prompts.`);
    } else {
        setStatusMessage(`${config.title} was left empty and marked as skipped.`);
    }
}

function attachStepEvents() {
    document.getElementById("start-profile-btn").addEventListener("click", () => {
        setStatusMessage("Profile building started. Begin with Step 1, then continue through the remaining steps.");
        runStep(1);
    });

    document.getElementById("step-1-btn").addEventListener("click", () => runStep(1));
    document.getElementById("step-2-btn").addEventListener("click", () => runStep(2));
    document.getElementById("step-3-btn").addEventListener("click", () => runStep(3));
}

document.addEventListener("DOMContentLoaded", () => {
    attachStepEvents();
    updateProgress();
});
