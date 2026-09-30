import * as yup from "yup";
// import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Slide, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import "./style/LoginResStyle.css";

import logoImg from "../../assets/images/Login/loginLogo.png";
import { useSignIn } from "@clerk/react";

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

const loginSchema = yup.object({
  email: yup.string().email().required("Email is required"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "You must accept the terms and conditions"),
});

const LoginSection = ({ activeAuthTab, openOtp, emailName }) => {
  // const authUsers = useSelector((state) => state.authUser);
  const { signIn } = useSignIn();

  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0) return;

    const timer = setTimeout(() => {
      clearErrors();
    }, 4000);

    return () => clearTimeout(timer);
  }, [errors, clearErrors]);

  const onLogin = async (userData) => {
    const email = userData.email.trim().toLowerCase();

    try {
      const { error } = await signIn.create({
        identifier: email,
      });

      if (error) {
        console.error("Clerk error:", error);
        toast.error(error.message || "Unable to login", TOAST_OPTIONS);
        return;
      }

      await signIn.emailCode.sendCode();

      emailName(email);
      openOtp("login");
      activeAuthTab("otp");
      reset();
    } catch (error) {
      console.log("FULL CLERK ERROR:", error);
      console.log("CLERK ERRORS:", error?.errors);

      const message =
        error?.errors?.[0]?.longMessage ||
        error?.errors?.[0]?.message ||
        "Unable to send OTP";

      toast.error(message, TOAST_OPTIONS);
    }
  };

  const onValidationError = (errors) => {
    if (errors.acceptTerms) {
      toast.error("Accept T&C", TOAST_OPTIONS);
      return;
    }
  };

  return (
    <section className="login-section">
      <form
        className="login-card"
        onSubmit={handleSubmit(onLogin, onValidationError)}
      >
        <div className="logo">
          <img src={logoImg} alt="logoImg" />
        </div>
        <h1 className="login-title">Login</h1>
        <p className="login-desc">Join Us Now!</p>
        <div className="email-group">
          <input
            type="email"
            className={`email-input ${errors.email ? "emailError" : ""}`}
            placeholder="Enter Your Email"
            {...register("email")}
          />
        </div>
        <div className="checkbox-group">
          <input
            type="checkbox"
            name="terms"
            id="terms"
            {...register("acceptTerms")}
          />
          <label htmlFor="terms" className="terms-label">
            By creating an account, you agree to ZettaRights{" "}
            <span>Terms and Conditions</span> and <span>Privacy Notice</span>
          </label>
        </div>
        <button className="request-otp-btn" type="submit">
          Request OTP
        </button>
        <div className="create-new" onClick={() => activeAuthTab("signup")}>
          Create a new account?
        </div>
      </form>
    </section>
  );
};

export default LoginSection;
