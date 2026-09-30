import { useState } from "react";

import OtpSection from "../../auth/otp/OtpSection";
import LoginSection from "../../auth/login/LoginSection";
import SignupSection from "../../auth/signup/SignupSection";
import UserAddData from "../../auth/userAddData/UserAddData";

const AuthPage = () => {
  const [authActive, setAuthActive] = useState("login");
  const [otpSource, setOtpSource] = useState("");
  const [userType, setUserType] = useState("");
  const [otpEmail, setOtpEmail] = useState("");

  const isLogin = authActive === "login";
  const isSignup = authActive === "signup";
  const isOtp = authActive === "otp";
  const isUserAdd = authActive === "userData";

  const openOtp = (source) => {
    setOtpSource(source);
    setAuthActive("otp");
  };

  return (
    <>
      {isLogin && (
        <LoginSection
          activeAuthTab={setAuthActive}
          openOtp={openOtp}
          emailName={setOtpEmail}
        />
      )}

      {isSignup && (
        <SignupSection
          activeAuthTab={setAuthActive}
          openOtp={openOtp}
          emailName={setOtpEmail}
          userTypeSets={setUserType}
        />
      )}

      {isOtp && (
        <OtpSection
          source={otpSource}
          emailValue={otpEmail}
          activeAuthTab={setAuthActive}
        />
      )}
      {isUserAdd && (
        <UserAddData
          userType={userType}
          activeAuthTab={setAuthActive}
          emailName={setOtpEmail}
        />
      )}
    </>
  );
};

export default AuthPage;
