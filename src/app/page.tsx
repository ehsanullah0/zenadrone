"use client";

import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ChevronRight, Play } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [navScrolled, setNavScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    // 1. HERO SECTION - SCROLLYTELLING VIDEO SWITCH
    const heroTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: 1,
      }
    });

    // Darken first video, show second video and tag
    heroTl.to(".video-1", { opacity: 0, duration: 1 })
          .to(".video-2", { opacity: 1, duration: 1 }, "<")
          .to(".hero-main-text", { y: -50, opacity: 0, duration: 1 }, "<")
          .fromTo(".ocean-tag", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.5");

    // 2. HORIZONTAL SCROLL SECTION
    const cards = gsap.utils.toArray(".h-card");
    const hScrollContainer = document.querySelector(".hscroll-container") as HTMLElement;
    
    if (hScrollContainer) {
      gsap.to(cards, {
        xPercent: -100 * (cards.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".hscroll-wrapper",
          pin: true,
          scrub: 1,
          snap: 1 / (cards.length - 1),
          // Scroll length matches container width to ensure feeling of horizontal pan
          end: () => "+=" + hScrollContainer.offsetWidth
        }
      });
    }

    // 3. ZERO-GRAVITY PRODUCT REVEAL (Antigravity Narrative Climax)
    const specTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".spec-section",
        pin: true,
        scrub: 1,
        start: "top top",
        end: "+=400%" // Extends scroll depth for cinematic pacing
      }
    });

    // Action 1: Product rises up escaping gravity
    specTl.fromTo(".antigrav-product", 
      { y: "80vh", opacity: 0, rotateX: 15, scale: 0.9 }, 
      { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 4, ease: "power2.out" }
    );

    // Action 2: Feature labels floating in & glowing lines drawing outward
    const features = gsap.utils.toArray(".antigrav-feature");
    const lines = gsap.utils.toArray(".glowing-line");
    
    features.forEach((feature, i) => {
      specTl.fromTo(feature as Element, 
        { opacity: 0, x: -30, y: 15 }, 
        { opacity: 1, x: 0, y: 0, duration: 2, ease: "power2.out" }, 
        "-=1"
      );
      specTl.fromTo(lines[i] as Element, 
        { width: "0%" }, 
        { width: "100%", duration: 2, ease: "power1.inOut" }, 
        "<" // Draw parallel with the label appearing
      );
    });

    // Action 3: Climax - Gravity breaks completely, everything drifts up and away
    specTl.to(".antigrav-container", {
      y: "-20vh",
      opacity: 0,
      scale: 0.95,
      duration: 3,
      ease: "power1.inOut" // smooth oceanic drift
    }, "+=1");

    // Action 4: Kinematic tagline assembles frozen in space
    specTl.fromTo(".antigrav-climax-char", 
      { opacity: 0, y: 100, rotation: -25, scale: 0.5 }, 
      { opacity: 1, y: 0, rotation: 0, scale: 1, stagger: 0.05, duration: 3, ease: "back.out(1.5)" }, 
      "-=2" // Assembles while the rest is drifting away
    );

    // 4. STUDIO GRID CHOREOGRAPHY (Feature Grid Section - UX Studio Prompt)
    const gridTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".ux-studio-section",
        start: "top 65%", 
      }
    });

    // Step 1: Self-drawing line and logo fade
    gridTl.fromTo(".studio-line", { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power2.inOut", transformOrigin: "left center" })
          .fromTo(".studio-mark", { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 1 }, "-=0.5");

    // Step 2: Scattered mission statement assembly
    const missionChars = gsap.utils.toArray(".mission-char");
    gridTl.fromTo(missionChars, 
      { opacity: 0, x: () => gsap.utils.random(-100, 100), y: () => gsap.utils.random(-100, 100), rotation: () => gsap.utils.random(-90, 90) },
      { opacity: 1, x: 0, y: 0, rotation: 0, duration: 2, stagger: 0.05, ease: "expo.out" },
      "-=0.5"
    );

    // Step 3: Portfolio cards flying into clean grid
    const featureCards = gsap.utils.toArray(".feature-card");
    if(featureCards.length === 3) {
      gridTl.from(featureCards[0] as Element, { opacity: 0, x: "-100vw", y: "20vh", rotationZ: -45, scale: 0.5, duration: 2, ease: "power3.out" }, "-=1")
            .from(featureCards[1] as Element, { opacity: 0, y: "100vh", scale: 0.2, duration: 2, ease: "power3.out" }, "-=1.8")
            .from(featureCards[2] as Element, { opacity: 0, x: "100vw", y: "-20vh", rotationZ: 45, scale: 0.5, duration: 2, ease: "power3.out" }, "-=1.8");
    }

    // 5. MASK WIPE REVEAL CHOREOGRAPHY (Replacing Team Section)
    const wipeElements = gsap.utils.toArray(".wipe-reveal-container");
    wipeElements.forEach(container => {
      const q = gsap.utils.selector(container as Element);
      
      gsap.fromTo(q(".wipe-mask"), 
        { scaleX: 0, transformOrigin: "left" }, 
        { scaleX: 1, duration: 1.5, ease: "power4.inOut", 
          scrollTrigger: { trigger: container as Element, start: "top 75%" } 
        }
      );
      
      gsap.fromTo(q(".wipe-img"), 
        { scale: 1.3, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 1.5, ease: "power2.out", delay: 0.8,
          scrollTrigger: { trigger: container as Element, start: "top 75%" } 
        }
      );

      gsap.fromTo(q(".wipe-text"), 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, stagger: 0.2, delay: 1, ease: "power2.out",
          scrollTrigger: { trigger: container as Element, start: "top 75%" } 
        }
      );
    });

    // GENERAL FADE UP FADE INS (For remaining sections)
    gsap.utils.toArray(".fade-up").forEach(el => {
      gsap.from(el as Element, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el as Element,
          start: "top 85%",
        }
      });
    });

    // 5. COUNTER ANIMATION
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute("data-target") || "0");
      // Only animate when scrolled into view
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: () => {
          gsap.to(counter, {
            innerHTML: target,
            duration: 2.5,
            snap: { innerHTML: 1 },
            ease: "power3.out",
            onUpdate: function() {
              // Allows formatting like '10+' to be maintained if needed, but handled statically in HTML usually.
            }
          });
        },
        once: true
      });
    });

  }, { scope: container });

  return (
    <div ref={container} className="bg-[#000000] text-white min-h-screen font-sans">
      
      {/* NAVBAR */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navScrolled ? "bg-animated backdrop-blur-xl border-b border-[#222222] py-4" : "bg-transparent py-6"}`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="cursor-pointer">
            <img src="/ZenaDrone-Logo-1.png" alt="ZenaDrone" className="h-8 md:h-10 w-auto object-contain filter invert opacity-90 hover:opacity-100 transition-opacity" />
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[13px] tracking-wide font-medium text-[#cccccc] uppercase relative">
            <a href="#" className="hover:text-white transition-colors relative group">
              Drones
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a6cf6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Compare
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a6cf6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Specs
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a6cf6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Video
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a6cf6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              Downloads
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a6cf6] transition-all duration-300 group-hover:w-full"></span>
            </a>
            <a href="#" className="hover:text-white transition-colors relative group">
              FAQ
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#1a6cf6] transition-all duration-300 group-hover:w-full"></span>
            </a>
          </div>
          <button className="relative overflow-hidden bg-white text-black px-6 py-2.5 rounded-full text-[13px] font-bold transition-transform duration-300 hover:scale-105 group uppercase tracking-wider">
            <span className="relative z-10 group-hover:text-white transition-colors duration-300">Buy Now</span>
            <div className="absolute inset-0 bg-[#1a6cf6] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0"></div>
          </button>
        </div>
      </nav>

      {/* 1. HERO SECTION - SCROLLYTELLING VIDEO SWITCH */}
      <section className="hero-section relative h-screen w-full overflow-hidden bg-black flex items-center justify-center">
        {/* User's local video 1 */}
        <video autoPlay loop muted playsInline className="video-1 absolute inset-0 w-full h-full object-cover opacity-70">
          <source src="/27a51a69-ec8e-4bb4-8d4b-68d779066af8.mp4" type="video/mp4" />
        </video>
        {/* User's local video 2 (Fades in on scroll) */}
        <video autoPlay loop muted playsInline className="video-2 absolute inset-0 w-full h-full object-cover opacity-0 scale-110">
          <source src="/27a51a69-ec8e-4bb4-8d4b-68d779066af8(1).mp4" type="video/mp4" />
        </video>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/80 via-transparent to-[#000000]" />

        <div className="relative z-10 w-full flex flex-col items-center justify-center text-center px-4 pt-20">
          {/* Main Initial State Text */}
          <div className="hero-main-text flex flex-col items-center">
            <h1 className="text-[5rem] md:text-[8rem] font-bold tracking-[0.05em] leading-none mb-6 drop-shadow-2xl text-white">
              ZENADRONE
            </h1>
            <p className="text-xl md:text-3xl font-light tracking-[0.2em] text-[#cccccc] uppercase drop-shadow-lg mb-8">
              Redefine Your Horizon
            </p>
            <div className="flex gap-6">
              <button className="bg-white text-black px-8 py-4 rounded-full text-sm font-bold transition-transform duration-300 hover:scale-105 group uppercase tracking-wider">
                <span className="relative z-10 transition-colors duration-300">Explore Models</span>
              </button>
            </div>
          </div>

          {/* Secondary State Text (Morphing Background / Ocean Reveal) */}
          <div className="ocean-tag absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center opacity-0 mt-[10vh]">
            <div className="px-8 py-3 mb-6 relative overflow-hidden bg-black/50 border border-[#222222] backdrop-blur-xl rounded-full">
              <span className="text-white text-xs font-bold tracking-[0.3em] uppercase relative z-10">Sensory Mode Engaged</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white drop-shadow-2xl">
              BOUNDLESS VISION
            </h2>
          </div>
        </div>
        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center opacity-60">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-4 text-[#cccccc]">Scroll to explore</span>
          <div className="w-[1px] h-[60px] bg-white/30 relative overflow-hidden">
            <div className="w-full h-full bg-white animate-[scrollDown_2s_infinite]" />
          </div>
        </div>
      </section>

      {/* 2. HORIZONTAL SCROLL SECTION */}
      <section className="hscroll-wrapper relative h-screen w-full bg-[#0a0a0a] overflow-hidden flex items-center border-t border-[#222222]">
        <div className="absolute top-16 left-12 md:left-24 z-10">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-2">Unleash the Power</h2>
          <p className="text-[#888888] tracking-widest text-sm uppercase">Discover the modules</p>
        </div>

        <div className="hscroll-container flex w-[300vw] h-full items-center pt-32 pb-16 px-12 md:px-24">
          
          {/* Card 01 */}
          <div className="h-card w-screen shrink-0 px-6 md:px-24 lg:px-40 flex justify-center">
            <div className="w-full max-w-[1000px] h-[45vh] bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] flex flex-col lg:flex-row relative group shadow-2xl">
              <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-center z-10 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent">
                <span className="text-[#1a6cf6] font-bold text-base mb-4">01</span>
                <span className="text-[#666666] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">Imaging System</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">Master <br/> The Light</h3>
                <p className="text-[#cccccc] text-sm max-w-sm leading-relaxed">The 1/1.3-inch CMOS sensor brings stunning clarity to low-light scenarios, mapping every shadow with brilliant precision.</p>
              </div>
              <div className="absolute inset-0 lg:left-1/3 lg:right-0 overflow-hidden">
                <img src="/03.png" alt="Camera Module" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>

          {/* Card 02 */}
          <div className="h-card w-screen shrink-0 px-6 md:px-24 lg:px-40 flex justify-center">
            <div className="w-full max-w-[1000px] h-[45vh] bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] flex flex-col lg:flex-row relative group shadow-2xl">
              <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-center z-10 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent">
                <span className="text-[#1a6cf6] font-bold text-base mb-4">02</span>
                <span className="text-[#666666] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">Control Array</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">Enterprise <br/> Command</h3>
                <p className="text-[#cccccc] text-sm max-w-sm leading-relaxed">Take absolute control with the ultra-bright 5.5-inch remote. Engineered for mission-critical operations under direct sunlight.</p>
              </div>
              <div className="absolute inset-0 lg:left-1/3 lg:right-0 overflow-hidden">
                <img src="/11.png" alt="Controller" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out" />
              </div>
            </div>
          </div>

          {/* Card 03 */}
          <div className="h-card w-screen shrink-0 px-6 md:px-24 lg:px-40 flex justify-center">
            <div className="w-full max-w-[1000px] h-[45vh] bg-[#111111] rounded-2xl overflow-hidden border border-[#222222] flex flex-col lg:flex-row relative group shadow-2xl">
              <div className="lg:w-1/2 p-8 md:p-10 flex flex-col justify-center z-10 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-transparent">
                <span className="text-[#1a6cf6] font-bold text-base mb-4">03</span>
                <span className="text-[#666666] uppercase tracking-[0.2em] text-[10px] mb-2 font-bold">Safety Mechanism</span>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white leading-tight">Absolute <br/> Awareness</h3>
                <p className="text-[#cccccc] text-sm max-w-sm leading-relaxed">Omnidirectional binocular vision systems protect your asset from every angle, ensuring a completely flawless flight arc.</p>
              </div>
              <div className="absolute inset-0 lg:left-1/3 lg:right-0 overflow-hidden">
                <img src="/Drone15.png" alt="Sensing" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 ease-out scale-x-[-1]" />
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. STICKY SCROLL - ZERO GRAVITY PRODUCT REVEAL SECTION */}
      <section className="spec-section relative h-screen w-full bg-[#000000] overflow-hidden flex items-center border-t border-[#111111]">
        
        {/* Persistent Narrative Indicator */}
        <div className="absolute top-[10%] left-12 md:left-24 text-[10px] uppercase tracking-[0.3em] text-[#444444] z-20">
          Zero Gravity Chamber // Keep Scrolling
        </div>

        {/* Escaped Gravity Kinematic Tagline Climax */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
           <h2 className="text-[7vw] lg:text-[5vw] font-bold text-white tracking-[0.2em] text-center leading-tight drop-shadow-2xl">
              {"WEIGHTLESS".split("").map((c, i) => <span key={i} className="antigrav-climax-char inline-block opacity-0">{c}</span>)}
              <br/>
              {"PERFORMANCE".split("").map((c, i) => <span key={`b${i}`} className="antigrav-climax-char inline-block opacity-0 text-[#1a6cf6]">{c}</span>)}
           </h2>
        </div>

        <div className="antigrav-container container mx-auto px-12 md:px-24 flex h-full items-center relative z-10 w-full flex-col lg:flex-row">
          
          {/* Left Side: Floating Feature Labels */}
          <div className="hidden lg:flex w-[40%] flex-col justify-center space-y-24 relative h-full shrink-0">
            
            <div className="antigrav-feature relative float-bob" style={{animationDelay: '0s'}}>
              <h4 className="text-2xl font-bold text-white mb-2 tracking-wide">Omni-Vision Matrix</h4>
              <p className="text-[#888888] text-sm max-w-[280px] leading-relaxed">360° obstacle avoidance rendering absolute spatial awareness in sub-zero environments.</p>
              {/* Glowing Line drawn via GSAP */}
              <div className="glowing-line absolute top-6 -right-[50%] w-0" />
            </div>

            <div className="antigrav-feature relative ml-16 float-bob" style={{animationDelay: '1s'}}>
              <h4 className="text-2xl font-bold text-[#1a6cf6] mb-2 tracking-wide">Carbon Airframe</h4>
              <p className="text-[#888888] text-sm max-w-[280px] leading-relaxed">Aerospace-grade composite scaling down tactical weight by an unprecedented 15%.</p>
              <div className="glowing-line absolute top-6 -right-[40%] w-0" />
            </div>

            <div className="antigrav-feature relative float-bob" style={{animationDelay: '2s'}}>
              <h4 className="text-2xl font-bold text-white mb-2 tracking-wide">O3+ Transmission</h4>
              <p className="text-[#888888] text-sm max-w-[280px] leading-relaxed">Zero-latency telemetry streaming directly to the hub across a 15km operational radius.</p>
              <div className="glowing-line absolute top-6 -right-[50%] w-0" />
            </div>

          </div>

          {/* Right/Center Side: Antigravity Rising Product */}
          <div className="w-full lg:w-[60%] relative h-[60vh] md:h-[80vh] flex items-center justify-center perspective-[1000px]">
            {/* Dramatic Rim Lighting Ambient Fill */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#1a6cf6]/10 rounded-full blur-[120px] pointer-events-none" />
            
            <div className="antigrav-product relative w-full h-full flex items-center justify-center float-bob" style={{animationDuration: '8s'}}>
               <img src="/Drone15.png" alt="Antigravity Drone Reveal" className="w-[140%] max-w-none object-contain scale-[1.3] drop-shadow-[0_50px_100px_rgba(26,108,246,0.2)] transform-gpu" />
            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURE GRID SECTION (UX Studio Prompt Complete Implementation) */}
      <section className="ux-studio-section py-32 bg-[#09101f] border-t border-[#1a2b4c] overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl">
          
          {/* Logo Reveal & Drawing Line */}
          <div className="flex flex-col items-center justify-center mb-16">
            <div className="studio-mark text-[#d4af37] tracking-[0.4em] text-xs font-bold uppercase mb-4 opacity-0 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
              Innovation Studio
              <div className="w-2 h-2 rounded-full bg-[#d4af37]" />
            </div>
            <div className="w-[1px] h-24 bg-[#1a2b4c] relative overflow-hidden">
              <div className="studio-line absolute top-0 left-0 w-full h-full bg-[#d4af37] origin-top" />
            </div>
          </div>

          {/* Scattered Mission Statement Assembly */}
          <div className="text-center mb-24 min-h-[100px]">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight flex flex-wrap justify-center gap-x-3 gap-y-2 max-w-4xl mx-auto">
              {"Designed to Redefine Excellence".split(" ").map((word, w_idx) => (
                <span key={w_idx} className="flex whitespace-nowrap">
                  {word.split("").map((c, i) => (
                    <span key={i} className="mission-char inline-block opacity-0 text-[#f8f9fa] drop-shadow-lg">{c}</span>
                  ))}
                </span>
              ))}
            </h2>
            <p className="text-[#a0b2d8] text-lg max-w-2xl mx-auto tracking-wide">
              Every curve and component has been relentlessly iterated to provide peak aerodynamic performance.
            </p>
          </div>

          {/* Portfolio Work Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-[2000px]">
            {[ 
              { title: "Aerodynamic Shell", desc: "Carbon fiber composite body reduces drag by 15%.", img: "/03.png" },
              { title: "Smart Batteries", desc: "Dual-swappable batteries for uninterrupted field deployment.", img: "/11.png" },
              { title: "Foldable Frame", desc: "Packs perfectly into ultra-compact deployments instantly.", img: "/Drone15.png" }
            ].map((feat, i) => (
              <div key={i} className="feature-card group cursor-pointer transform-gpu bg-[#0d162a] rounded-[16px] p-6 border border-[#1a2b4c] hover:border-[#d4af37]/50 shadow-2xl transition-colors duration-500">
                <div className="w-full h-64 rounded-[8px] bg-[#09101f] mb-8 overflow-hidden relative">
                  <img src={feat.img} alt={feat.title} className="w-full h-[120%] -translate-y-4 object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d162a] to-transparent" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-[1px] bg-[#d4af37]" />
                  <h4 className="text-xl font-bold text-white tracking-wide">{feat.title}</h4>
                </div>
                <p className="text-[#a0b2d8] leading-relaxed text-sm font-light">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. COUNTER ANIMATION SECTION */}
      <section className="py-32 bg-[#0a0a0a] border-t border-[#222222]">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-x-4 md:gap-y-16 text-center">
            
            <div className="fade-up flex flex-col items-center">
              <div className="flex items-baseline text-6xl md:text-7xl font-bold text-white mb-4">
                <span className="counter" data-target="45">0</span><span className="text-3xl text-[#1a6cf6] ml-2">min</span>
              </div>
              <span className="text-[#cccccc] font-medium tracking-wide">Max Flight Time</span>
              <p className="text-[#666666] text-xs mt-2">Optimal conditions</p>
            </div>

            <div className="fade-up flex flex-col items-center">
              <div className="flex items-baseline text-6xl md:text-7xl font-bold text-white mb-4">
                <span className="counter" data-target="15">0</span><span className="text-3xl text-[#1a6cf6] ml-2">km</span>
              </div>
              <span className="text-[#cccccc] font-medium tracking-wide">Transmission Range</span>
              <p className="text-[#666666] text-xs mt-2">O3+ System</p>
            </div>

            <div className="fade-up flex flex-col items-center">
              <div className="flex items-baseline text-6xl md:text-7xl font-bold text-white mb-4">
                <span className="counter" data-target="21">0</span><span className="text-3xl text-[#1a6cf6] ml-2">m/s</span>
              </div>
              <span className="text-[#cccccc] font-medium tracking-wide">Max Speed</span>
              <p className="text-[#666666] text-xs mt-2">Sport Mode engaged</p>
            </div>

            <div className="fade-up flex flex-col items-center">
              <div className="flex items-baseline text-6xl md:text-7xl font-bold text-white mb-4">
                <span className="counter" data-target="895">0</span><span className="text-3xl text-[#1a6cf6] ml-2">g</span>
              </div>
              <span className="text-[#cccccc] font-medium tracking-wide">Takeoff Weight</span>
              <p className="text-[#666666] text-xs mt-2">Lightweight compliant</p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. DRONE CAPABILITIES SECTION (Replaced Team Section) */}
      <section className="py-32 bg-[#050505] border-t border-[#111111]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="fade-up text-center mb-24">
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-widest uppercase mb-4">Core Capabilities</h3>
            <div className="w-24 h-1 bg-[#1a6cf6] mx-auto rounded-full" />
          </div>

          <div className="space-y-32">
            
            {/* Capability 1 */}
            <div className="wipe-reveal-container flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="w-full md:w-1/2 relative h-[400px] rounded-lg overflow-hidden border border-[#222222]">
                <div className="wipe-mask absolute inset-0 bg-[#0a0a0a] z-10 origin-right transition-transform" />
                <img src="/Zenadron3D0046.png" alt="3D Model" className="wipe-img absolute inset-0 w-full h-full object-cover opacity-0 scale-125" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-[5]" />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <div className="wipe-text text-[#1a6cf6] font-bold tracking-[0.2em] uppercase text-sm mb-4">01 // Advanced Scanning</div>
                <h4 className="wipe-text text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Topographical Mapping Mastery</h4>
                <p className="wipe-text text-[#888888] leading-relaxed text-lg mb-8">
                  Equipped with LiDAR arrays and photogrammetry suites, processing millions of data points per second. Extracts true-to-life 3D models from complex landmasses instantly.
                </p>
                <button className="wipe-text flex items-center gap-2 text-white font-bold group hover:text-[#1a6cf6] transition-colors">
                  VIEW IN DEPTH <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Capability 2 */}
            <div className="wipe-reveal-container flex flex-col md:flex-row-reverse items-center gap-12 lg:gap-24">
              <div className="w-full md:w-1/2 relative h-[400px] rounded-lg overflow-hidden border border-[#222222] shadow-[0_0_50px_rgba(30,30,30,0.5)]">
                <div className="wipe-mask absolute inset-0 bg-[#0a0a0a] z-10 origin-left transition-transform" />
                <img src="/Military Drones.jpg" alt="Military Drone" className="wipe-img absolute inset-0 w-full h-full object-cover opacity-0 scale-125" />
                <div className="absolute inset-0 bg-[#1a6cf6]/5 mix-blend-color z-[5]" />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <div className="wipe-text text-[#1a6cf6] font-bold tracking-[0.2em] uppercase text-sm mb-4">02 // Tactical Deployment</div>
                <h4 className="wipe-text text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Military Grade Redundancy</h4>
                <p className="wipe-text text-[#888888] leading-relaxed text-lg mb-8">
                  Built to withstand extreme atmospheric conditions. Signal shielding protects against electronic jamming, while dual-flight controllers ensure a 99.9% operational uptime during critical missions.
                </p>
                <button className="wipe-text flex items-center gap-2 text-white font-bold group hover:text-[#1a6cf6] transition-colors">
                  VIEW IN DEPTH <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

             {/* Capability 3 */}
             <div className="wipe-reveal-container flex flex-col md:flex-row items-center gap-12 lg:gap-24">
              <div className="w-full md:w-1/2 relative h-[400px] rounded-lg bg-[#080808] border border-[#222222] flex items-center justify-center p-12 overflow-hidden">
                <div className="wipe-mask absolute inset-0 bg-[#0a0a0a] z-10 origin-right transition-transform" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#1a6cf6] opacity-10 rounded-full blur-[80px]" />
                <img src="/Scanning01.jpg" alt="Payload" className="wipe-img relative z-[5] w-[130%] scale-150 rotate-[-10deg] drop-shadow-2xl" />
              </div>
              <div className="w-full md:w-1/2 text-left">
                <div className="wipe-text text-[#1a6cf6] font-bold tracking-[0.2em] uppercase text-sm mb-4">03 // Modular Payload</div>
                <h4 className="wipe-text text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">Limitless Adaptation</h4>
                <p className="wipe-text text-[#888888] leading-relaxed text-lg mb-8">
                  From thermal cameras to emergency medical supply drops, swap payloads in under 30 seconds. Seamless gravity-locked hardpoints secure heavier weights without shifting center of mass.
                </p>
                <button className="wipe-text flex items-center gap-2 text-white font-bold group hover:text-[#1a6cf6] transition-colors">
                  VIEW IN DEPTH <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. CONTACT FORM SECTION */}
      <section className="py-32 bg-[#0a0a0a] border-t border-[#222222]">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="fade-up text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Request Enterprise Evaluation</h2>
            <p className="text-[#888888]">Experience the future of autonomous telemetry directly.</p>
          </div>

          <form className="fade-up bg-[#111111] p-10 md:p-16 rounded-[12px] border border-[#222222] shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <input type="text" placeholder="First Name" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
              <input type="text" placeholder="Last Name" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <input type="email" placeholder="Business Email" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
              <input type="tel" placeholder="Phone Number" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <input type="text" placeholder="Organization" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
              <input type="text" placeholder="Job Title" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <input type="text" placeholder="Country" className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors" />
              <select className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-[#888888] focus:border-[#1a6cf6] focus:outline-none transition-colors appearance-none">
                <option value="">Industry</option>
                <option value="agriculture">Agriculture</option>
                <option value="security">Security</option>
              </select>
              <select className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-[#888888] focus:border-[#1a6cf6] focus:outline-none transition-colors appearance-none">
                <option value="">Business Type</option>
                <option value="enterprise">Enterprise</option>
                <option value="government">Government</option>
              </select>
            </div>

            <textarea placeholder="Project Overview" rows={4} className="w-full bg-[#1a1a1a] border border-[#333333] rounded px-5 py-4 text-white focus:border-[#1a6cf6] focus:outline-none transition-colors mb-10 resize-y" />

            <button type="button" className="w-full py-5 bg-white text-black font-bold uppercase tracking-widest text-sm rounded hover:bg-[#1a6cf6] hover:text-white transition-colors">
              Submit Request
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#000000] py-12 border-t border-[#111111] text-center text-xs text-[#666666] tracking-wider uppercase font-medium">
        &copy; 2026 ZENADRONE SYSTEMS. ALL RIGHTS RESERVED.
      </footer>
    </div>
  );
}
