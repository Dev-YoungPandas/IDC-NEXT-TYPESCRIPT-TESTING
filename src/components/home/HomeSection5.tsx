{/* <style>
.camilla-text{
opacity: 0;
}
</style>
<script>
// Hero text animation with traffic light pattern
(function() {
function setupAnimation() {
var tl = gsap.timeline();
tl.fromTo(".camilla-text", 
{ y: 100, opacity: 0 },
{ y: 0, opacity: 1, duration: 1, delay: 0.4 }
);
}

// Use the traffic light pattern for compatibility
if (window.animationOrder && window.animationOrder.domReady) {
setTimeout(setupAnimation, 200); // Using 200ms delay for hero elements
} else {
document.addEventListener('DOMContentLoaded', function() {
setTimeout(setupAnimation, 200);
});
}
})();
</script>
<style> 
.color-white {
background-color: #ffffff !important;
}
.color-black {
background-color: #000000 !important;
}
.full-body-container-camilla {
background-color: #fff;
transition: background-color 0.5s ease-in-out;
}
</style>

<script>
// Background color change with improved practices
(function() {
function initBackgroundColorChange() {
gsap.registerPlugin(ScrollTrigger);

const fullBodyContainer = document.querySelector(".full-body-container-camilla");
const panels = document.querySelectorAll(".panel");

// Check if elements exist
if (!fullBodyContainer || panels.length === 0) {
console.warn("Background color change: Required elements not found");
return;
}

// Create triggers with responsive behavior
ScrollTrigger.matchMedia({
// Default settings for desktops and larger screens
"(min-width: 769px)": function() {
panels.forEach((panel) => {
ScrollTrigger.create({
trigger: panel,
start: "top 75%",
end: "bottom 20%",
// markers: true, 
onEnter: () => updateContainerClass(fullBodyContainer, panel),
onEnterBack: () => updateContainerClass(fullBodyContainer, panel),
});
});
},
// Settings for mobile screens (768px and below)
"(max-width: 768px)": function() {
panels.forEach((panel) => {
ScrollTrigger.create({
trigger: panel,
start: "top 95%", 
end: "bottom 15%", 
// markers: true,
onEnter: () => updateContainerClass(fullBodyContainer, panel),
onEnterBack: () => updateContainerClass(fullBodyContainer, panel),
});
});
}
});

function updateContainerClass(container, panel) {
let newColorClass = "color-" + (panel.dataset.color || "white");
if (!container.classList.contains(newColorClass)) {
container.classList.forEach((cls) => {
if (cls.startsWith("color-")) {
container.classList.remove(cls);
}
});
container.classList.add(newColorClass);
}
}
}

// Use the traffic light pattern for compatibility
if (window.animationOrder && window.animationOrder.domReady) {
setTimeout(initBackgroundColorChange, 300);
} else {
document.addEventListener('DOMContentLoaded', function() {
setTimeout(initBackgroundColorChange, 300);
});
}
})();
</script>
.blend-text {
mix-blend-mode: exclusion;
} */}