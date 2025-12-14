const animated = document.querySelectorAll(".fade-up");

const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) e.target.classList.add("visible");
    });
  },
  { threshold: 0.16 }
);

animated.forEach((el) => io.observe(el));


const header = document.querySelector("[data-header]");
let lastY = 0;

window.addEventListener(
  "scroll",
  () => {
    const y = window.scrollY || 0;
    header.classList.toggle("is-scrolled", y > 10);
    lastY = y;
  },
  { passive: true }
);


const root = document.documentElement;

window.addEventListener(
  "mousemove",
  (e) => {
    const x = (e.clientX / window.innerWidth) * 100;
    const y = (e.clientY / window.innerHeight) * 100;
    root.style.setProperty("--mouse-x", `${x}%`);
    root.style.setProperty("--mouse-y", `${y}%`);
  },
  { passive: true }
);


const parallax = document.querySelector("[data-parallax]");
let targetX = 0,
  targetY = 0;
let currentX = 0,
  currentY = 0;

function animateParallax() {
  currentX += (targetX - currentX) * 0.07;
  currentY += (targetY - currentY) * 0.07;

  if (parallax) {
    parallax.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
  }
  requestAnimationFrame(animateParallax);
}

window.addEventListener(
  "mousemove",
  (e) => {
    const px = e.clientX / window.innerWidth - 0.5;
    const py = e.clientY / window.innerHeight - 0.5;
    targetX = px * 10; // amplitude horizontal
    targetY = py * 8; // amplitude vertical
  },
  { passive: true }
);

animateParallax();


const tiltEl = document.querySelector("[data-tilt]");

if (tiltEl) {
  tiltEl.addEventListener("mousemove", (e) => {
    const rect = tiltEl.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = (-y * 8).toFixed(2);
    const rotateY = (x * 10).toFixed(2);

    tiltEl.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-1px)`;
  });

  tiltEl.addEventListener("mouseleave", () => {
    tiltEl.style.transform =
      "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)";
  });
}



const charts = document.querySelectorAll(".chart-bar span");

const chartObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const value = entry.target.getAttribute("data-value");
        entry.target.style.width = value + "%";
      }
    });
  },
  { threshold: 0.4 }
);

charts.forEach(bar => chartObserver.observe(bar));



const rows = document.querySelectorAll(".comparison-table tbody tr");

rows.forEach(row => {
  row.addEventListener("mouseenter", () => {
    row.classList.add("row-active");
  });
  row.addEventListener("mouseleave", () => {
    row.classList.remove("row-active");
  });
});



const hotspots = document.querySelectorAll(".hotspot");
const panels = document.querySelectorAll(".panel-item");

hotspots.forEach(hs => {
  hs.addEventListener("click", () => {
    const target = hs.getAttribute("data-target");

    panels.forEach(panel => {
      panel.classList.toggle(
        "active",
        panel.getAttribute("data-panel") === target
      );
    });
  });
});


const galleryParallax = document.querySelector("[data-gallery-parallax]");
let gx = 0, gy = 0, tx = 0, ty = 0;

function animateGalleryParallax() {
  gx += (tx - gx) * 0.06;
  gy += (ty - gy) * 0.06;

  if (galleryParallax) {
    galleryParallax.style.transform =
      `translate3d(${gx}px, ${gy}px, 0)`;
  }
  requestAnimationFrame(animateGalleryParallax);
}

window.addEventListener("mousemove", (e) => {
  tx = (e.clientX / window.innerWidth - 0.5) * 12;
  ty = (e.clientY / window.innerHeight - 0.5) * 10;
}, { passive: true });

animateGalleryParallax();


document.addEventListener("mousemove", e => {
  document.body.style.setProperty(
    "--mx",
    `${(e.clientX / window.innerWidth) * 100}%`
  );
  document.body.style.setProperty(
    "--my",
    `${(e.clientY / window.innerHeight) * 100}%`
  );
});


const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -60px 0px"
};

const fadeObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-up").forEach(el => {
  fadeObserver.observe(el);
});