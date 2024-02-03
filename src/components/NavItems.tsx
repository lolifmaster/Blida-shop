"use client";
import { PRODUCT_CATEGORIES } from "@/config";
import { useEffect, useState } from "react";
import NavItem from "./NavItem";
import { useClickAway } from "@uidotdev/usehooks";

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const ref = useClickAway<HTMLDivElement>(() => {
    setActiveIndex(null);
  });

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <div className="flex h-full gap-4" ref={ref}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const handleOpen = () => {
          if (activeIndex === index) {
            setActiveIndex(null);
          } else {
            setActiveIndex(index);
          }
        };
        return (
          <NavItem
            key={index}
            category={category}
            handleOpen={handleOpen}
            isOpen={index === activeIndex}
            isAnyOpen={activeIndex !== null}
          />
        );
      })}
    </div>
  );
};

export default NavItems;
