import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import gsap from "gsap";

export default function DragonflyHero() {
  const canvasRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      resizeTo: window,
      backgroundAlpha: 0,
      antialias: true,
      resolution: window.devicePixelRatio || 1
    });

    if (canvasRef.current) {
      canvasRef.current.appendChild(app.view);
    }

    const graphics = new PIXI.Graphics();
    for (let y = 0; y < window.innerHeight; y += 10) {
      for (let x = 0; x < window.innerWidth; x += 10) {
        graphics.beginFill(0xffffff, 0.03);
        graphics.drawRect(x, y, 1, 1);
        graphics.endFill();
      }
    }
    app.stage.addChild(graphics);

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      );
    }

    return () => app.destroy(true, { children: true });
  }, []);

  return (
    <div className="relative w-full h-screen bg-black text-white overflow-hidden">
      <div ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></div>
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <h1 ref={textRef} style={{ fontSize: "3rem", fontWeight: "bold" }}>
          DRAGONFLY BACKS <br />
          <span style={{ color: "#f0f" }}>CRYPTO PROJECTS</span>
        </h1>
        <p className="mt-6" style={{ color: "#999" }}>
          A LEADING GLOBAL CRYPTO INVESTMENT FUND — FROM DAY ONE
        </p>
      </div>
    </div>
  );
}
