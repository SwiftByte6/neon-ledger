import { useState, useRef, useEffect } from "react";
import { Bell, Search, ChevronDown, Check } from "lucide-react";
import { gsap } from "gsap";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";

const MODELS = [
  { id: "gpt-4", name: "GPT-4", description: "Most capable" },
  { id: "gpt-3.5", name: "GPT-3.5", description: "Fast & efficient" },
  { id: "claude", name: "Claude", description: "Context aware" },
  { id: "custom", name: "Custom Model", description: "Fine-tuned" },
];

const GLOW_COLOR = "132, 0, 255";
const DEFAULT_PARTICLE_COUNT = 8;

const createParticleElement = (x: number, y: number, color = GLOW_COLOR) => {
  const el = document.createElement("div");
  el.className = "particle";
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

export function TopBar() {
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const profileCardRef = useRef<HTMLButtonElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = () => {
    if (particlesInitialized.current || !profileCardRef.current) return;

    const { width, height } = profileCardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: DEFAULT_PARTICLE_COUNT }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, GLOW_COLOR)
    );
    particlesInitialized.current = true;
  };

  const clearAllParticles = () => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.7)",
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  };

  const animateParticles = () => {
    if (!profileCardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !profileCardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLElement;
        profileCardRef.current!.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.7)" }
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 80,
          y: (Math.random() - 0.5) * 80,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: "none",
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }, index * 80);

      timeoutsRef.current.push(timeoutId);
    });
  };

  useEffect(() => {
    if (!profileCardRef.current) return;

    const element = profileCardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      gsap.to(element, {
        boxShadow: `0 0 30px rgba(${GLOW_COLOR}, 0.4), 0 4px 20px rgba(0, 0, 0, 0.2)`,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      gsap.to(element, {
        boxShadow: "0 0 0px rgba(0, 0, 0, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleClick = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height)
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${GLOW_COLOR}, 0.4) 0%, rgba(${GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          onComplete: () => ripple.remove(),
        }
      );
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);
    element.addEventListener("click", handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
      element.removeEventListener("click", handleClick);
      clearAllParticles();
    };
  }, []);

  return (
    <>
      <style>
        {`
          @keyframes glow-pulse {
            0%, 100% {
              opacity: 0.5;
            }
            50% {
              opacity: 1;
            }
          }

          .profile-card-glow::after {
            content: '';
            position: absolute;
            inset: -1px;
            border-radius: inherit;
            padding: 1px;
            background: radial-gradient(circle at 50% 50%, rgba(132, 0, 255, 0.3), rgba(132, 0, 255, 0.1), transparent 70%);
            -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 1;
          }

          .profile-card-glow:hover::after {
            opacity: 1;
          }
        `}
      </style>

      <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/60 border-b border-border">
        <div className="flex items-center gap-3 px-4 sm:px-6 h-16">
          <div className="md:hidden font-bold tracking-tight text-primary text-lg">LIMEX</div>
          <div className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              placeholder="Search markets, assets, news…"
              className="w-full h-10 pl-10 pr-16 rounded-xl bg-[var(--surface-2)]/70 border border-border text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/60 focus:shadow-[0_0_0_3px_rgba(212,255,63,0.12)] transition"
            />
            <kbd className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 h-6 px-1.5 items-center text-[10px] rounded-md border border-border bg-background/60 font-mono text-muted-foreground">
              ⌘K
            </kbd>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative h-10 w-10 rounded-xl border border-border bg-[var(--surface-2)]/70 grid place-items-center hover:border-primary/40 transition">
              <Bell className="h-4 w-4" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(212,255,63,0.8)]" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  ref={profileCardRef}
                  className="profile-card-glow flex items-center gap-2 pl-1 pr-2 h-10 rounded-xl border border-border bg-[var(--surface-2)]/70 hover:border-purple-500/60 transition cursor-pointer relative overflow-hidden"
                >
                  <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-purple-500 to-emerald-400 grid place-items-center text-primary-foreground text-xs font-bold relative z-10">
                    AX
                  </div>
                  <div className="hidden sm:block text-xs leading-tight relative z-10">
                    <div className="font-medium">Alex Chen</div>
                    <div className="text-muted-foreground">Pro</div>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 text-muted-foreground relative z-10" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-2 mb-2 border-b">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">SELECT MODEL</p>
                  {MODELS.map((model) => (
                    <DropdownMenuItem
                      key={model.id}
                      onClick={() => setSelectedModel(model.id)}
                      className="cursor-pointer hover:bg-purple-500/10 transition"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{model.name}</span>
                          {selectedModel === model.id && (
                            <Check className="h-4 w-4 text-purple-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{model.description}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
    </>
  );
}
