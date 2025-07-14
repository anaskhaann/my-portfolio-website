import React, {
  createContext,
  ReactNode,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 1. Define the shape of the context
interface LenisContextType {
  lenis: Lenis | null;
}

// 2. Create the context
const LenisContext = createContext<LenisContextType | undefined>(undefined);

// 3. Create a custom hook for easy consumption
export const useLenis = () => {
  const context = useContext(LenisContext);
  if (!context) {
    throw new Error("useLenis must be used within a LenisProvider");
  }
  return context;
};

// 4. Create the Provider component
interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider: React.FC<LenisProviderProps> = ({ children }) => {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    const newLenis = new Lenis();

    // Integrate with GSAP ScrollTrigger using the official proxy method
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          newLenis.scrollTo(value, { immediate: true });
        }
        return newLenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    const scrollUpdate = () => ScrollTrigger.update();
    newLenis.on("scroll", scrollUpdate);

    // Drive the animation loop
    const update = (time: number) => {
      newLenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    const resizeObserver = new ResizeObserver(() => {
      newLenis.resize();
      ScrollTrigger.refresh();
    });
    resizeObserver.observe(document.body);

    setLenis(newLenis);

    // Cleanup on unmount
    return () => {
      ScrollTrigger.scrollerProxy(document.body, undefined);
      newLenis.off("scroll", scrollUpdate);
      gsap.ticker.remove(update);
      resizeObserver.disconnect();
      newLenis.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
};
