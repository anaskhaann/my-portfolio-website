import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  // List of greetings
  const greetings = [
    "Hello",
    "Hola",
    "Hallo",
    "Bonjour",
    "السلام عليكم",
    "Ciao",
    "你好",
    "こんにちは",
    "안녕하세요",
  ];

  useEffect(() => {
    let index = 0;
    const intervalTime = 600; // speed of greeting changes
    const fadeDuration = 0.25; // used for both fade-in and fade-out
    const totalDuration = greetings.length * intervalTime; // finish after full cycle

    const interval = setInterval(() => {
      gsap
        .timeline()
        .to(textRef.current, {
          opacity: 0,
          duration: fadeDuration,
          ease: "power2.out",
        })
        .add(() => {
          index = (index + 1) % greetings.length;
          if (textRef.current) {
            textRef.current.innerText = greetings[index];
          }
        })
        .to(textRef.current, {
          opacity: 1,
          duration: fadeDuration,
          ease: "power2.in",
        });
    }, intervalTime);

    // Exit loader after one full greeting cycle
    const timeout = setTimeout(() => {
      clearInterval(interval);
      gsap.to(preloaderRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onLoadingComplete,
      });
    }, totalDuration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onLoadingComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50"
    >
      <h1
        ref={textRef}
        className="text-4xl font-light bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
      >
        {greetings[0]}
      </h1>
    </div>
  );
};

export default LoadingScreen;
