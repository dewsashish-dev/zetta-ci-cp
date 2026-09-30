import * as yup from "yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Slide, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useSignUp } from "@clerk/react";

import { login } from "../../redux/slice/userStateSlice";
import { addUser } from "../../redux/slice/authUserSlice";

import "./style/SignupeResStyle.css";

import logoImg from "../../assets/images/Login/loginLogo.png";

const TOAST_OPTIONS = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  transition: Slide,
};

const signupSchema = yup.object({
  fullname: yup
    .string()
    .trim()
    .required("Full name is required")
    .min(3, "Name must be at least 3 characters"),

  email: yup
    .string()
    .trim()
    .email("Enter a valid email address")
    .required("Email address is required"),

  userType: yup
    .string()
    .oneOf(["buyer", "seller"], "Please select a user type")
    .required("Please select a user type"),
});

const SignupSection = ({ openOtp, emailName, userTypeSets }) => {
  const authUsers = useSelector((state) => state.authUser);
  const { signUp } = useSignUp();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      fullname: "",
      email: "",
      userType: "buyer",
    },
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const timer = setTimeout(() => {
      clearErrors();
    }, 4000);

    return () => clearTimeout(timer);
  }, [errors, clearErrors]);

  const onSignup = async (data) => {
    const email = data.email.trim().toLowerCase();

    const nameParts = data.fullname.trim().split(/\s+/);

    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(" ");

    const userExists = authUsers.some(
      (user) => user.email.trim().toLowerCase() === email,
    );

    if (userExists) {
      toast.error("User already exists", TOAST_OPTIONS);
      return;
    }

    try {
      const { error } = await signUp.create({
        emailAddress: email,
        firstName,
        lastName,
      });

      if (error) {
        console.error("Clerk signup error:", error);

        toast.error(error.message || "Unable to create account", TOAST_OPTIONS);

        return;
      }

      const { error: codeError } = await signUp.verifications.sendEmailCode();

      if (codeError) {
        console.error("OTP send error:", codeError);

        toast.error(codeError.message || "Unable to send OTP", TOAST_OPTIONS);

        return;
      }

      dispatch(
        addUser({
          email,
          name: data.fullname.trim(),
          type: data.userType,
        }),
      );
      dispatch(login());
      userTypeSets(data.userType);
      emailName(email);
      openOtp("signup");
    } catch (error) {
      console.error("FULL CLERK SIGNUP ERROR:", error);

      toast.error(error?.message || "Unable to create account", TOAST_OPTIONS);
    }
  };

  return (
    <section className="signup-section">
      <form className="create-account-card" onSubmit={handleSubmit(onSignup)}>
        <div className="logo">
          <img src={logoImg} alt="Logo" />
        </div>

        <h1 className="card-title">Create New Account</h1>

        <div className="form-group">
          <label htmlFor="fullname">Full Name</label>

          <input
            type="text"
            id="fullname"
            placeholder="Enter Your Name"
            className={`email-input ${errors.fullname ? "input-error" : ""}`}
            {...register("fullname")}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>

          <input
            type="email"
            id="email"
            placeholder="Enter Your Email Address"
            className={`email-input ${errors.email ? "input-error" : ""}`}
            {...register("email")}
          />
        </div>

        <div className="user-type">
          <label htmlFor="buyer">
            <input
              type="radio"
              id="buyer"
              value="buyer"
              {...register("userType")}
            />
            Buyer
          </label>

          <label htmlFor="seller">
            <input
              type="radio"
              id="seller"
              value="seller"
              {...register("userType")}
            />
            Seller
          </label>
        </div>

        <button className="next-btn" type="submit">
          Next
        </button>
      </form>
    </section>
  );
};

export default SignupSection;
