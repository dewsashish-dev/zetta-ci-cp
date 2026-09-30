import * as yup from "yup";
import { Link, useNavigate } from "react-router";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FooterSection from "../../components/footer/FooterSection";

import "./style/UserAddDataResStyle.css";

import logoImg from "../../assets/images/Home/Header/logo.png";
import camImg from "../../assets/images/Login/Camera_Icon.png";
import dropdownImg from "../../assets/images/Login/Down_Arrow.png";
import profileImg from "../../assets/images/Login/Companylogo.png";
import breadArrow from "../../assets/images/Login/Breadcrumb_Arrow.png";

const userDataSchema = yup.object({
  companyName: yup.string().trim().required("Company name is required"),

  address: yup.string().trim().required("Address is required"),

  city: yup.string().trim().required("City is required"),

  state: yup.string().required("Please select a state"),

  country: yup.string().required("Please select a country"),

  taxNumber: yup
    .string()
    .trim()
    .required("Tax identification number is required"),

  category: yup.string().required("Please select a category"),
});

const states = ["Tamilnadu", "Kerala", "Karnataka", "Andhra Pradesh"];

const countries = ["India", "USA", "Canada", "Australia"];

const categories = ["Action", "Adventure", "Fantasy", "Cartoon"];

const UserAddData = ({ userType }) => {
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [profilePreview, setProfilePreview] = useState(profileImg);

  const dropdownRef = useRef(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userDataSchema),

    defaultValues: {
      companyName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      taxNumber: "",
      category: "",
    },
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProfileImage = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfilePreview(imageUrl);
  };

  const onSubmit = (data) => {
    console.log("User Data:", data);
    navigate("/");
  };

  const renderDropdown = (name, label, placeholder, options) => {
    return (
      <div className="form-group">
        <label>{label}</label>

        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            const isActive = activeDropdown === name;

            return (
              <div
                className={`dropdown ${isActive ? "dropdown-active" : ""} ${
                  errors[name] ? "dropdown-error" : ""
                }`}
              >
                <div
                  className="dropdown-select"
                  tabIndex={0}
                  onClick={() => {
                    setActiveDropdown(isActive ? null : name);
                  }}
                >
                  <span
                    className={
                      field.value ? "selected-value" : "placeholder-value"
                    }
                  >
                    {field.value || placeholder}
                  </span>

                  <img
                    src={dropdownImg}
                    className={`dropdown-icon ${isActive ? "rotate" : ""}`}
                    alt="Dropdown"
                  />
                </div>

                <ul className={`dropdown-menu ${isActive ? "show" : ""}`}>
                  {options.map((item) => (
                    <li
                      key={item}
                      className={field.value === item ? "selected-option" : ""}
                      onClick={() => {
                        field.onChange(item);
                        setActiveDropdown(null);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          }}
        />

        {errors[name] && (
          <small className="error-message">{errors[name].message}</small>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="header-primary">
        <Link to="/" className="logo">
          <img src={logoImg} alt="Logo" />
        </Link>
      </header>

      <main className="main-content">
        <div className="top-nav">
          <h1 className="page-title">{userType}</h1>

          <div className="bread-crumbs">
            <button type="button">Create New Account</button>

            <img src={breadArrow} alt="Breadcrumb arrow" />

            <span>{userType}</span>
          </div>
        </div>

        <div className="profile-upload">
          <div className="profile-img">
            <img src={profilePreview} alt="Profile" className="preview-img" />

            <label htmlFor="profile-image" className="camera-label">
              <img src={camImg} className="camera-icon" alt="Upload" />
            </label>

            <input
              id="profile-image"
              type="file"
              className="file-input"
              accept="image/*"
              onChange={handleProfileImage}
            />
          </div>

          <div className="profile-desc">
            Upload Your
            <br />
            Company Logo
          </div>
        </div>

        <form
          className="seller-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="form-wrapper">
            <div className="form-group">
              <label htmlFor="company-name">Company Name</label>

              <input
                type="text"
                id="company-name"
                className={errors.companyName ? "input-error" : ""}
                {...register("companyName")}
              />

              {errors.companyName && (
                <small className="error-message">
                  {errors.companyName.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>

              <input
                type="text"
                id="address"
                className={errors.address ? "input-error" : ""}
                {...register("address")}
              />

              {errors.address && (
                <small className="error-message">
                  {errors.address.message}
                </small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="city">City</label>

              <input
                type="text"
                id="city"
                className={errors.city ? "input-error" : ""}
                {...register("city")}
              />

              {errors.city && (
                <small className="error-message">{errors.city.message}</small>
              )}
            </div>

            {renderDropdown("state", "State", "Select State", states)}

            {renderDropdown("country", "Country", "Select Country", countries)}

            <div className="form-group">
              <label htmlFor="tax-number">Tax Identification Number</label>

              <input
                type="text"
                id="tax-number"
                className={errors.taxNumber ? "input-error" : ""}
                {...register("taxNumber")}
              />

              {errors.taxNumber && (
                <small className="error-message">
                  {errors.taxNumber.message}
                </small>
              )}
            </div>

            {renderDropdown(
              "category",
              "Category",
              "Select Category",
              categories,
            )}
          </div>

          <div className="form-footer">
            <button className="save-btn" type="submit">
              Save
            </button>
          </div>
        </form>
      </main>

      <FooterSection />
    </>
  );
};

export default UserAddData;
