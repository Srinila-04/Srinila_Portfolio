// HEADER

/* Sticky Header Scroll Effect */
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

/* Mobile Menu */
const menuIcon = document.querySelector("#menu-icon");
const navList = document.querySelector(".navlist");

menuIcon.addEventListener("click", () => {
    navList.classList.toggle("active");
});

/* Close Menu When Link Is Clicked */
const navLinks = document.querySelectorAll(".navlist a");

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navList.classList.remove("active");
    });
});


// HOME

/* Text Animation */
let words = document.querySelectorAll(".word");

words.forEach((word) => {
    let letters = word.textContent.split("");
    word.textContent = "";

    letters.forEach((letter) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.className = "letter";
        word.appendChild(span);
    });
});

let currentWordIndex = 0;

words.forEach((word, index) => {
    word.style.opacity = index === 0 ? "1" : "0";
});

let changeText = () => {
    let currentWord = words[currentWordIndex];

    let nextWord =
        currentWordIndex === words.length - 1
            ? words[0]
            : words[currentWordIndex + 1];

    Array.from(currentWord.children).forEach((letter, i) => {
        setTimeout(() => {
            letter.className = "letter out";
        }, i * 80);
    });

    setTimeout(() => {
        currentWord.style.opacity = "0";
    }, currentWord.children.length * 80 + 100);

    nextWord.style.opacity = "1";

    Array.from(nextWord.children).forEach((letter, i) => {
        letter.className = "letter behind";

        setTimeout(() => {
            letter.className = "letter in";
        }, 340 + i * 80);
    });

    currentWordIndex =
        currentWordIndex === words.length - 1
            ? 0
            : currentWordIndex + 1;
};

setInterval(changeText, 3000);

/* Initial Page Load Animation */
const homeContent = document.querySelector(".home-content");
const homeImage = document.querySelector(".home-image");

window.addEventListener("load", () => {
    homeContent.classList.add("show");
    homeImage.classList.add("show");
});


// SKILLS

/* Skills Filter */
const skillTabs = document.querySelectorAll(".filter-tabs .tab");
const skillPanels = document.querySelectorAll(".skill-panel");
const allSkillsView = document.getElementById("allSkillsView");
const skillPills = document.querySelectorAll(".tool-pill");
const skillsGrid = document.getElementById("skillsGrid");

/* Show All Skills */
function showAllSkills() {
    allSkillsView.style.display = "flex";

    skillsGrid.classList.remove("single-visible");

    requestAnimationFrame(() => {
        allSkillsView.classList.add("visible");
    });

    skillPanels.forEach((panel) => {
        panel.classList.remove("visible");
        panel.classList.add("hidden-panel");
    });
}

/* Show Selected Skill Category */
function showCategory(category) {
    skillsGrid.classList.add("single-visible");

    allSkillsView.classList.remove("visible");
    allSkillsView.style.display = "none";

    skillPanels.forEach((panel) => {
        const panelCategory = panel.dataset.category;

        if (panelCategory === category) {
            panel.classList.remove("hidden-panel");

            requestAnimationFrame(() => {
                panel.classList.add("visible");
            });
        } else {
            panel.classList.remove("visible");
            panel.classList.add("hidden-panel");
        }
    });

    /* Animate Progress Bars */
    const activePanel = document.querySelector(
        `.skill-panel[data-category="${category}"]`
    );

    if (activePanel) {
        const bars = activePanel.querySelectorAll(".bar");

        bars.forEach((bar) => {
            bar.style.width = "0%";
        });

        requestAnimationFrame(() => {
            bars.forEach((bar) => {
                const level = bar.dataset.level;

                setTimeout(() => {
                    bar.style.width = `${level}%`;
                }, 150);
            });
        });
    }
}

/* Filter Tab Click */
skillTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        skillTabs.forEach((item) => {
            item.classList.remove("active");
        });

        tab.classList.add("active");

        const filter = tab.dataset.filter;

        if (filter === "all") {
            showAllSkills();
        } else {
            showCategory(filter);
        }
    });
});

/* All View → Category Navigation */
skillPills.forEach((pill) => {
    pill.addEventListener("click", () => {
        const category = pill.dataset.skill;

        if (!category) {
            return;
        }

        /* Find the Corresponding Filter Button */
        const targetTab = document.querySelector(
            `.filter-tabs .tab[data-filter="${category}"]`
        );

        if (targetTab) {
            /* Activate the Category */
            skillTabs.forEach((tab) => {
                tab.classList.remove("active");
            });

            targetTab.classList.add("active");

            /* Show the Category */
            showCategory(category);

            /* Scroll to Skills Section */
            document.getElementById("skills").scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });
});

/* Initial State */
showAllSkills();

/* Skills Scroll Animation */
const skillsSection = document.querySelector("#skills");

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            skillsSection.classList.add("show");
        } else {
            skillsSection.classList.remove("show");
        }
    });
}, {
    threshold: 0.2
});

skillsObserver.observe(skillsSection);


// ABOUT

/* About Scroll Animation */
const aboutSection = document.querySelector("#about");
const aboutImage = document.querySelector(".img-about");
const aboutContent = document.querySelector(".about-content");

const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            aboutImage.classList.add("show");
            aboutContent.classList.add("show");
        } else {
            aboutImage.classList.remove("show");
            aboutContent.classList.remove("show");
        }
    });
}, {
    threshold: 0.2
});

aboutObserver.observe(aboutSection);

/* Read More */
const readMoreBtn = document.getElementById("readMoreBtn");
const aboutDetails = document.getElementById("aboutDetails");
const readMoreTooltip = document.getElementById("readMoreTooltip");

if (readMoreBtn && aboutDetails) {
    readMoreBtn.addEventListener("click", function(event) {
        event.preventDefault();

        const isOpen = aboutDetails.classList.toggle("show");

        if (isOpen) {
            readMoreBtn.textContent = "Read Less!";

            if (readMoreTooltip) {
                readMoreTooltip.classList.add("hide");
            }
        } else {
            readMoreBtn.textContent = "Read More!";

            if (readMoreTooltip) {
                readMoreTooltip.classList.remove("hide");
            }

            const aboutSec = document.getElementById("about");

            if (aboutSec) {
                aboutSec.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });

    if (readMoreTooltip) {
        readMoreTooltip.addEventListener("click", function() {
            readMoreBtn.click();
        });
    }
}


// PROJECTS

/* Project Filter Buttons */
const filterButtons = document.querySelectorAll(".filter-btn");

/* Project Cards */
const projectCards = document.querySelectorAll(".project-card");

// /* Project Filter */
// filterButtons.forEach(function(button) {
//     button.addEventListener("click", function() {
//         /* Get the Selected Category */
//         const selectedFilter = button.dataset.filter;

//         /* Remove Active Class from All Buttons */
//         filterButtons.forEach(function(btn) {
//             btn.classList.remove("active");
//         });

//         /* Add Active Class to the Clicked Button */
//         button.classList.add("active");

//         /* Show or Hide Project Cards */
//         projectCards.forEach(function(card) {
//             const projectCategories = card.dataset.category;

//             if (
//                 selectedFilter === "all" ||
//                 projectCategories.includes(selectedFilter)
//             ) {
//                 card.classList.remove("hide");
//             } else {
//                 card.classList.add("hide");
//             }
//         });
//     });
// });

/* Projects Scroll Reveal */
const projectsSection = document.querySelector(".projects");

if (projectsSection) {
    const projectsObserver = new IntersectionObserver(
        function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    /* Start the Animation */
                    projectsSection.classList.add("projects-visible");

                    /* Animate Only Once */
                    observer.unobserve(projectsSection);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    projectsObserver.observe(projectsSection);
}


// CONTACT

/* EmailJS Initialization */
emailjs.init({
    publicKey: "kdZ6vtz_3YPONg2EM"
});

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        /* Check Empty Fields */
        if (
            name === "" ||
            email === "" ||
            subject === "" ||
            message === ""
        ) {
            formMessage.textContent = "Please fill in all the fields.";
            return;
        }

        /* Check Email Format */
        if (!email.includes("@") || !email.includes(".")) {
            formMessage.textContent = "Please enter a valid email address.";
            return;
        }

        formMessage.textContent = "Sending message...";

        /* Send Email */
        emailjs.sendForm(
            "service_ojtu02h",
            "template_622z6ls",
            contactForm
        )
        .then(function() {
            formMessage.textContent =
                "Thank you! Your message has been sent successfully.";

            contactForm.reset();
        })
        .catch(function(error) {
            formMessage.textContent =
                "Sorry, something went wrong. Please try again.";

            console.log("EmailJS Error:", error);
        });
    });
}

/* Contact Scroll Reveal */
const contactSection = document.querySelector(".contact");

if (contactSection) {
    const contactObserver = new IntersectionObserver(
        function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    contactSection.classList.add("contact-visible");

                    /* Run Animation Only Once */
                    observer.unobserve(contactSection);
                }
            });
        },
        {
            threshold: 0.15
        }
    );

    contactObserver.observe(contactSection);
}

