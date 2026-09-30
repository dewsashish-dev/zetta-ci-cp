import { useEffect, useState } from "react";

import arrowImg from "../../assets/images/Home/Header/gotoTop.png";

import "./style/backToTopStyle.css";

const BackToTop = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;

      setScrollProgress(progress);
      setIsActive(scrollTop > 80);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top-btn ${isActive ? "active" : ""}`}
      onClick={handleBackToTop}
      style={{
        background: `conic-gradient(
          #ffcc00 ${scrollProgress}%,
          #1a1a1a ${scrollProgress}%
        )`,
      }}
      aria-label="Back to top"
    >
      <img src={arrowImg} alt="" />
    </button>
  );
};

export default BackToTop;
