import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Slide, toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { login } from "../../redux/slice/userStateSlice";

import { useSignIn, useSignUp } from "@clerk/react";

import logoImg from "../../assets/images/Login/loginLogo.png";

import "./style/otpResStyle.css";

const otpSchema = yup.object({
  otp1: yup.string().matches(/^\d$/, "Enter a number").required("Required"),
  otp2: yup.string().matches(/^\d$/, "Enter a number").required("Required"),
  otp3: yup.string().matches(/^\d$/, "Enter a number").required("Required"),
  otp4: yup.string().matches(/^\d$/, "Enter a number").required("Required"),
  otp5: yup.string().matches(/^\d$/, "Enter a number").required("Required"),
  otp6: yup.string().matches(/^\d$/, "Enter a number").required("Required"),
});

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

const OtpSection = ({ source, emailValue, activeAuthTab }) => {
  const { signIn, isLoaded: signInLoaded } = useSignIn();
  const { signUp, isLoaded: signUpLoaded } = useSignUp();

  const [timeLeft, setTimeLeft] = useState(65);

  const navigation = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpSchema),
  });

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const onVerify = async (data) => {
    const otp = `${data.otp1}${data.otp2}${data.otp3}${data.otp4}${data.otp5}${data.otp6}`;

    try {
      if (source === "login") {
        const { error } = await signIn.emailCode.verifyCode({
          code: otp,
        });

        if (error) {
          console.error("Login OTP error:", error);

          toast.error(error.message || "Invalid OTP", TOAST_OPTIONS);

          return;
        }

        await signIn.finalize();

        dispatch(login());

        toast.success("Login successful", TOAST_OPTIONS);

        navigation("/");
      } else {
        const { error } = await signUp.verifications.verifyEmailCode({
          code: otp,
        });

        if (error) {
          console.error("Signup OTP error:", error);

          toast.error(error.message || "Invalid OTP", TOAST_OPTIONS);

          return;
        }
        console.log("STATUS:", signUp.status);
        console.log("MISSING:", signUp.missingFields);
        console.log("UNVERIFIED:", signUp.unverifiedFields);
        await signUp.finalize();
        toast.success("Account created successfully", TOAST_OPTIONS);

        activeAuthTab("userData");
      }
    } catch (error) {
      console.error("OTP verification error:", error);

      toast.error(error?.message || "OTP verification failed", TOAST_OPTIONS);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;

    try {
      if (source === "login") {
        if (!signInLoaded) return;

        const { error } = await signIn.emailCode.sendCode();

        if (error) {
          toast.error(error.message || "Unable to resend OTP", TOAST_OPTIONS);

          return;
        }
      } else {
        if (!signUpLoaded) return;

        const { error } = await signUp.verifications.sendEmailCode();

        if (error) {
          toast.error(error.message || "Unable to resend OTP", TOAST_OPTIONS);

          return;
        }
      }

      setTimeLeft(65);

      toast.success("OTP resent successfully", TOAST_OPTIONS);
    } catch (error) {
      console.error("Resend OTP error:", error);

      toast.error(error?.message || "Unable to resend OTP", TOAST_OPTIONS);
    }
  };

  const onValidationError = (errors) => {
    if (Object.keys(errors).length > 0) {
      toast.error("OTP Required", TOAST_OPTIONS);
      return;
    }
  };

  const handleOtpChange = (event, nextInput) => {
    const inputValue = event.target.value;

    if (!/^\d*$/.test(inputValue)) {
      event.target.value = "";
      return;
    }

    if (inputValue && nextInput) {
      setFocus(nextInput);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  return (
    <section className="otp-section">
      <form
        className="otp-card"
        onSubmit={handleSubmit(onVerify, onValidationError)}
      >
        <div className="logo">
          <img src={logoImg} alt="logoImg" />
        </div>

        <h1 className="otp-title">OTP Verify</h1>

        <p className="subtitle">
          Enter the OTP sent to <span>{emailValue}</span>
        </p>

        <div className="otp-boxes">
          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${errors.otp1 ? "otp-error-input" : ""}`}
            {...register("otp1")}
            onChange={(e) => handleOtpChange(e, "otp2")}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${errors.otp2 ? "otp-error-input" : ""}`}
            {...register("otp2")}
            onChange={(e) => handleOtpChange(e, "otp3")}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${errors.otp3 ? "otp-error-input" : ""}`}
            {...register("otp3")}
            onChange={(e) => handleOtpChange(e, "otp4")}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${errors.otp4 ? "otp-error-input" : ""}`}
            {...register("otp4")}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${errors.otp5 ? "otp-error-input" : ""}`}
            {...register("otp5")}
          />

          <input
            type="text"
            inputMode="numeric"
            maxLength={1}
            className={`otp-input ${errors.otp6 ? "otp-error-input" : ""}`}
            {...register("otp6")}
          />
        </div>

        <button type="submit" className="verify-btn">
          Verify
        </button>

        <p className="verify-dec">
          Didn't receive the OTP? <span onClick={handleResend}>Resend</span>
        </p>

        <p className="timer">
          {timeLeft > 0 ? `${formattedTime} Mins` : "OTP Expired"}
        </p>
      </form>
    </section>
  );
};

export default OtpSection;
