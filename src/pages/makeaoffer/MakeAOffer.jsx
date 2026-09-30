import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { Slide, toast } from "react-toastify";

import { fetchSingleMovie } from "../../redux/slice/movieSlice/movieSlice";

import StepOneForm from "./stepOneForm/StepOneForm";
import StepTwoForm from "./stepTwoForm/StepTwoForm";
import StepThreeForm from "./stepThreeForm/StepThreeForm";

import arrowImg from "../../assets/images/Login/Breadcrumb_Arrow.png";
import progressImg from "../../assets/images/MakeAnOffer/progress_Icon.png";

import "./style/makeaOfferResStyle.css";

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

const MakeAOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [singleMovie, setSingleMovie] = useState(null);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    stepOne: {},
    stepTwo: {},
    stepThree: {},
  });

  useEffect(() => {
    const getSingleMovie = async () => {
      try {
        const movies = await dispatch(fetchSingleMovie(id)).unwrap();
        setSingleMovie(movies);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleMovie();
  }, [dispatch, id]);

  const handleStepOneNext = async (data) => {
    setFormData((prev) => ({
      ...prev,
      stepOne: data,
    }));

    setStep(2);
  };

  const handleStepTwoNext = async (data) => {
    setFormData((prev) => ({
      ...prev,
      stepTwo: data,
    }));

    setStep(3);
  };

  const handleStepTwoPrevious = (data) => {
    setFormData((prev) => ({
      ...prev,
      stepTwo: data,
    }));

    setStep(1);
  };

  const handleStepThreePrevious = (data) => {
    setFormData((prev) => ({
      ...prev,
      stepThree: data,
    }));

    setStep(2);
  };

  const handleFinalSubmit = async (data) => {
    const finalData = {
      ...formData,
      stepThree: data,
    };

    console.log("FINAL DATA:", finalData);
    toast.success("Offer has been Placed", TOAST_OPTIONS);
    navigate("/");
  };

  return (
    <section className="make-offer-content">
      <div className="top-nav">
        <h1 className="page-title">Make an Offer</h1>

        <div className="breadcrumbs">
          <Link to="/">Home</Link>

          <img src={arrowImg} alt="arrowImg" />

          <div className="prev-page" onClick={() => navigate(-1)}>
            {singleMovie?.original_title}
          </div>

          <img src={arrowImg} alt="arrowImg" />

          <div className="current-page">Make an Offer</div>
        </div>
      </div>

      <div className="license-section">
        <aside className="stepper">
          <div
            className={`step ${
              step === 1 ? "active" : ""
            } ${step > 1 ? "step-complete" : ""}`}
          >
            <span className="circle">
              {step > 1 ? <img src={progressImg} alt="progressImg" /> : "1"}
            </span>

            <span className="label">Step 1</span>

            {step > 1 && <span className="status">Completed</span>}
          </div>

          <div
            className={`line ${step > 1 ? "line1-complete" : ""} ${step === 1 ? "line-on" : ""}`}
          />

          <div
            className={`step ${
              step === 2 ? "active" : ""
            } ${step > 2 ? "step-complete" : ""}`}
          >
            <span className="circle">
              {step > 2 ? <img src={progressImg} alt="progressImg" /> : "2"}
            </span>

            <span className="label">Step 2</span>

            {step > 2 && <span className="status">Completed</span>}
          </div>

          <div
            className={`line ${step > 2 ? "line2-complete" : ""}  ${step === 2 ? "line-on" : ""}`}
          />

          <div className={`step ${step === 3 ? "active" : ""}`}>
            <span className="circle">3</span>

            <span className="label">Step 3</span>
          </div>
        </aside>

        <div className="license-content">
          {step === 1 && (
            <StepOneForm
              previousData={formData.stepOne}
              onNext={handleStepOneNext}
            />
          )}

          {step === 2 && (
            <StepTwoForm
              previousData={formData.stepTwo}
              onPrevious={handleStepTwoPrevious}
              onNext={handleStepTwoNext}
            />
          )}

          {step === 3 && (
            <StepThreeForm
              previousData={formData.stepThree}
              stepTwoData={formData.stepTwo}
              onPrevious={handleStepThreePrevious}
              onSubmit={handleFinalSubmit}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default MakeAOffer;
