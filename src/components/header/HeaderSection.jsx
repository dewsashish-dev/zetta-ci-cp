import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { userLogout } from "../../redux/slice/userStateSlice";

import logoImg from "../../assets/images/Home/Header/logo.png";
import darkImg from "../../assets/images/Home/Header/moon.png";
import menuImg from "../../assets/images/Home/Header/hamburger.png";
import searchImg from "../../assets/images/Home/Header/search_Icon.png";
import lightImg from "../../assets/images/Home/Header/lightMode_Icon.png";
import addContentImg from "../../assets/images/Home/Header/addcontent_Icon.png";
import profileDefaultImg from "../../assets/images/Home/Header/profileIcon.png";

import "./style/headerResStyle.css";
import { useClerk } from "@clerk/react";

const oprtionList = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Explore",
    path: "/productlist",
  },
  {
    name: "Blog",
    path: "",
  },
];

const imageOptions = [
  {
    name: "search",
    img: searchImg,
    function: false,
  },
  {
    name: "search",
    img: addContentImg,
    function: false,
  },
  {
    name: "theme",
    img: lightImg,
    function: true,
  },
];

const HeaderSection = () => {
  const { signOut } = useClerk();
  const doesUserExist = useSelector((state) => state.userAuthState);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileNavActive, setMobileNavActive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const profileRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    let previousScroll = window.scrollY;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= 0) {
        setIsHeaderVisible(true);
      } else if (currentScroll > previousScroll) {
        setIsHeaderVisible(false);
      } else if (currentScroll < previousScroll) {
        setIsHeaderVisible(true);
      }

      previousScroll = currentScroll;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const HandleLogOut = async () => {
    try {
      await signOut();
      dispatch(userLogout());
      setIsProfileOpen(false);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const HandleLogIn = () => {
    setIsProfileOpen(false);
    navigate("/auth");
  };

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <header
      className={`header-section ${
        isHeaderVisible ? "header-show" : "header-hide"
      } ${isMobileNavActive ? "active" : ""}`}
    >
      <div className="left">
        <div className="logo">
          <img
            className="will-invert"
            src={logoImg}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <ul className="options">
          {oprtionList.map((each, index) => (
            <li key={`option-${index}`}>
              <Link
                to={each.path}
                className={`${location.pathname === each.path ? "active" : ""}`}
              >
                {each.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="right">
        <ul className="image-options">
          {imageOptions.map((each, index) => (
            <li
              className="image"
              key={`imageOption-${index}`}
              onClick={each.function ? toggleTheme : undefined}
            >
              <img
                className="will-invert"
                src={
                  each.name === "theme"
                    ? theme === "dark"
                      ? each.img
                      : darkImg
                    : each.img
                }
                alt={each.name}
              />
            </li>
          ))}
        </ul>
        <div className="line will-invert"></div>
        <div className="profile-wrapper" ref={profileRef}>
          <img
            className="will-invert"
            src={profileDefaultImg}
            alt="profileDefaultImg"
            onClick={() => setIsProfileOpen((prev) => !prev)}
          />
          <div
            className={`profile-dropdown ${
              isProfileOpen ? "profile-dropdown-show" : ""
            }`}
          >
            <ul>
              {doesUserExist.isLoggedIn && (
                <li onClick={() => HandleLogOut()}>Log Out</li>
              )}
              {!doesUserExist.isLoggedIn && (
                <>
                  <li onClick={() => HandleLogIn()}>Log In</li>
                  <li onClick={() => HandleLogIn()}>Sign In</li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className={`mobile-options ${isMobileNavActive ? "active" : ""}`}>
          <ul className="mobile-image-wrapper">
            {imageOptions.map((each, index) => (
              <li
                className="image"
                key={`imageOption-${index}`}
                onClick={each.function ? toggleTheme : undefined}
              >
                <img
                  className="will-invert"
                  src={
                    each.img === "theme"
                      ? theme === "dark"
                        ? each.img
                        : darkImg
                      : each.img
                  }
                  alt={each.name}
                />
              </li>
            ))}
          </ul>
          <ul className="mobile-options-wrapper">
            {oprtionList.map((each, index) => (
              <li
                key={`mobile-options-${index}`}
                className={`${location.pathname === each.path ? "active" : ""}`}
              >
                <Link
                  to={each.path ? each.path : ""}
                  onClick={() => setMobileNavActive(false)}
                >
                  {each.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mobile-menu-img">
          <img
            className="will-invert"
            src={menuImg}
            alt="Menu Image"
            onClick={() => setMobileNavActive((prev) => !prev)}
          />
        </div>
      </div>
    </header>
  );
};

export default HeaderSection;
