// Counter Animation
const counters = document.querySelectorAll(".stat-value");
const speed = 200;

const animateCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace(/\D/g, "");
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment + (counter.innerText.includes("%") ? "%" : "+");
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes("%") ? "%" : "+");
            }
        };
        updateCount();
    });
};

// Counter Animation for Impact Section
const impactCounters = document.querySelectorAll(".impact-metrics .stat-value");

const animateImpactCounters = () => {
    impactCounters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText.replace(/\D/g, "");
            const increment = Math.ceil(target / speed);

            if (count < target) {
                counter.innerText = count + increment + (counter.innerText.includes("%") ? "%" : counter.innerText.includes("X") ? "X" : "");
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target + (counter.innerText.includes("%") ? "%" : counter.innerText.includes("X") ? "X" : "");
            }
        };
        updateCount();
    });
};

const impactObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateImpactCounters();
            impactObserver.disconnect();
        }
    });
}, { threshold: 0.5 });

impactObserver.observe(document.querySelector(".impact-metrics"));

// Universal Counter Animation
const initCounters = (selector) => {
    const counters = document.querySelectorAll(`${selector} .stat-value`);
    const speed = 200;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const count = +counter.innerText.replace(/\D/g, "");
                const increment = Math.ceil(target / speed);

                if (count < target) {
                    // Preserve suffixes like %, +, X
                    let suffix = "";
                    if (counter.innerText.includes("%")) suffix = "%";
                    else if (counter.innerText.includes("+")) suffix = "+";
                    else if (counter.innerText.includes("X")) suffix = "X";

                    counter.innerText = count + increment + suffix;
                    setTimeout(updateCount, 20);
                } else {
                    let suffix = "";
                    if (counter.innerText.includes("%")) suffix = "%";
                    else if (counter.innerText.includes("+")) suffix = "+";
                    else if (counter.innerText.includes("X")) suffix = "X";

                    counter.innerText = target + suffix;
                }
            };
            updateCount();
        });
    };

    // Observe section visibility
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect(); // run only once per section
            }
        });
    }, { threshold: 0.5 });

    const section = document.querySelector(selector);
    if (section) observer.observe(section);
};

// Init counters for different sections
initCounters(".stats");
initCounters(".impact-metrics");
initCounters(".metrics-row");

// gallery
// Lightbox functionality
const images = document.querySelectorAll('.event-images img');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const viewBtn = document.getElementById('view-btn');
const closeBtn = document.querySelector('.close-btn');

images.forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        viewBtn.href = img.src;
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});


// Video Gallery functionality
document.querySelectorAll(".mute-btn").forEach(button => {
    button.addEventListener("click", () => {
        const videoId = button.getAttribute("data-video");
        const video = document.getElementById(videoId);

        if (video.muted) {
            video.muted = false;
            button.innerHTML = '<i class="fas fa-volume-up"></i>';
        } else {
            video.muted = true;
            button.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    });
});