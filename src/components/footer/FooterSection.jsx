import { Link } from "react-router";

import "./style/footerResStyle.css";

import fbImg from "../../assets/images/Home/Footer/fb.png";
import logoImg from "../../assets/images/Home/Header/logo.png";
import xImg from "../../assets/images/Home/Footer/twitter.png";
import ytImg from "../../assets/images/Home/Footer/youtube.png";
import instaImg from "../../assets/images/Home/Footer/insta.png";
import appStoreImg from "../../assets/images/Home/Footer/appstore_Icon.png";
import playStoreImg from "../../assets/images/Home/Footer/googleplay_Icon.png";

const footerLink = [
  {
    name: "About Us",
    path: "/",
  },
  {
    name: "Terms of Use",
    path: "/",
  },
  {
    name: "Privacy Policy",
    path: "/",
  },
  {
    name: "FAQ",
    path: "/",
  },
];

const footerHelp = [
  {
    name: "Visit Help Center",
    path: "/",
  },
  {
    name: "Share Feedback",
    path: "/",
  },
];

const footerSocial = [
  {
    name: "Facebook",
    img: fbImg,
    path: "/",
  },
  {
    name: "Instagram",
    img: instaImg,
    path: "/",
  },
  {
    name: "X",
    img: xImg,
    path: "/",
  },
  {
    name: "Youtube",
    img: ytImg,
    path: "/",
  },
];

const footerStore = [
  {
    name: "Play Store",
    img: playStoreImg,
    path: "/",
  },
  {
    name: "App Store",
    img: appStoreImg,
    path: "/",
  },
];

const FooterSection = () => {
  return (
    <footer className="footer-section">
      <div className="content-wrapper">
        <div className="footer-desc">
          <Link className="footer-logo" href="./index.html">
            <img className="will-invert" src={logoImg} alt="Logo" />
          </Link>
          <p className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            error assumenda recusandae beatae, ab blanditiis id necessitatibus
            vitae temporibus odio.
          </p>
        </div>
        <div className="footer-links">
          <ul className="links-list">
            {footerLink.map((each, index) => (
              <li className="link-item" key={`footer-Link-${index}`}>
                <Link to={each.path}>{each.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="need-help">
          <div className="need-help-wrapper">
            <div className="need-help-header">Need Help</div>
            <ul className="help-links">
              {footerHelp.map((each, index) => (
                <li className="link-item" key={`footer-help-${index}`}>
                  <Link to={each.path}>{each.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="connect-with">
          <div className="connect-with-wrapper">
            <h3 className="connect-with-title">Connect With Us</h3>
            <div className="social-links">
              {footerSocial.map((each, index) => (
                <div className="link-item" key={`footer-social-${index}`}>
                  <Link to={each.path}>
                    <img
                      className="will-invert"
                      src={each.img}
                      alt={each.name}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="stores">
        {footerStore.map((each, index) => (
          <div className="link-item" key={`footer-app-${index}`}>
            <Link to={each.path}>
              <img className="will-invert" src={each.img} alt={each.name} />
            </Link>
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <p className="copyright-text">
          Copyrights © ZettaRights 2024. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
