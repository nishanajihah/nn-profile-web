import { animate, createTimeline, stagger } from "animejs";
import { writable } from "svelte/store";

// Carousel click pulse store for 3D Threlte burst animations
export const carouselClickPulse = writable(0);

export function initCodeInteractions(cursorDot: HTMLElement | null, cursorRing: HTMLElement | null, root: HTMLElement | null) {
  document.documentElement.classList.add("code-page-active");
  document.body.classList.add("code-page-active");

  // ═══ Custom Cursor ═══
  const moveCursor = (e: MouseEvent) => {
    if (cursorDot) {
      cursorDot.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }
    if (cursorRing) {
      animate(cursorRing, {
        translateX: e.clientX - 15,
        translateY: e.clientY - 15,
        duration: 300,
        ease: "easeOutExpo",
      });
    }
  };
  window.addEventListener("mousemove", moveCursor);

  // ═══ Hero Title Stagger Animation ═══
  createTimeline({ defaults: { ease: "easeOutExpo" } })
    .add(".giant-hero-title .char", {
      translateY: [100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: stagger(40),
    });

  // ═══ Deployments 2x2 Grid Animation ═══
  const deploymentsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animate(".deployment-card", {
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 800,
          delay: stagger(100),
          ease: "easeOutExpo",
        });
        deploymentsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, root });

  const deploymentsSection = document.querySelector(".deployments-section");
  if (deploymentsSection) deploymentsObserver.observe(deploymentsSection);

  const cleanup = () => {
    window.removeEventListener("mousemove", moveCursor);
    deploymentsObserver.disconnect();
    document.documentElement.classList.remove("code-page-active");
    document.body.classList.remove("code-page-active");
  };

  return { cleanup };
}

export function splitText(target: string | HTMLElement | null): string {
  if (!target) return "";
  let text = "";
  if (typeof target === "string") {
    text = target;
  } else {
    text = target.textContent || "";
  }
  const result = text
    .split("")
    .map((char) => `<span class="char" style="display:inline-block">${char === " " ? "&nbsp;" : char}</span>`)
    .join("");

  if (typeof target !== "string") {
    target.innerHTML = result;
  }
  return result;
}
