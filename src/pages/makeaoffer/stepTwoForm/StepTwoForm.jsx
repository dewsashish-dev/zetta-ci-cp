import { useState } from "react";

import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import dropDownImg from "../../../assets/images/Login/Down_Arrow.png";
import rightImg from "../../../assets/images/MakeAnOffer/right_Icon.png";
import exclusiveImg from "../../../assets/images/MakeAnOffer/exclusive_Icon.png";
import unavailableImg from "../../../assets/images/MakeAnOffer/unavailable_Icon.png";

const currencyOptions = [
  "₹ - Indian Rupee",
  "$ - US Dollar",
  "€ - Euro",
  "£ - British Pound",
];

const rightsOptions = [
  "T-VOD (Rental)",
  "S-VOD (Subscription)",
  "A-VOD (Advertiser Supported)",
  "F-VOD (Free)",
];

const schema = yup.object({
  currency: yup.string().required("Please select a currency"),

  rightsType: yup.string().required("Please select a rights type"),
});

const StepTwoForm = ({ previousData, onPrevious, onNext }) => {
  const {
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      currency: previousData?.currency || "₹ - Indian Rupee",

      rightsType: previousData?.rightsType || "T-VOD (Rental)",
    },
  });

  const [currencyOpen, setCurrencyOpen] = useState(false);

  const [rightsOpen, setRightsOpen] = useState(false);

  const [currency, setCurrency] = useState(
    previousData?.currency || "₹ - Indian Rupee",
  );

  const [rightsType, setRightsType] = useState(
    previousData?.rightsType || "T-VOD (Rental)",
  );

  const handleCurrencySelect = (value) => {
    setCurrency(value);

    setValue("currency", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setCurrencyOpen(false);
  };

  const handleRightsSelect = (value) => {
    setRightsType(value);

    setValue("rightsType", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setRightsOpen(false);
  };

  const handleNext = (data) => {
    console.log("STEP 2:", data);

    onNext(data);
  };

  const handlePrevious = () => {
    const data = getValues();

    onPrevious(data);
  };

  return (
    <form className="step-section" onSubmit={handleSubmit(handleNext)}>
      <div className="currency-group">
        <h2 className="region-title">Rights &amp; Commercials</h2>

        <div className="form-group">
          <label htmlFor="currency">Offer Currency</label>

          <div className="custom-select-wrapper">
            <div
              className="select-box"
              onClick={() => setCurrencyOpen((prev) => !prev)}
            >
              <input
                type="text"
                className="dropdown-input"
                placeholder="Select Currency"
                autoComplete="off"
                readOnly
                value={currency}
              />

              <span className="chevron-icon">
                <img src={dropDownImg} alt="dropdown" />
              </span>
            </div>

            {currencyOpen && (
              <ul className="dropdown-menu currency-selector">
                {currencyOptions.map((item) => (
                  <li key={item} onClick={() => handleCurrencySelect(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {errors.currency && (
            <small className="error-text">{errors.currency.message}</small>
          )}
        </div>
      </div>

      <div className="types-group">
        <h2 className="group-title">Rights Types</h2>

        <div className="form-group">
          <div className="custom-select-wrapper">
            <div
              className="select-box"
              onClick={() => setRightsOpen((prev) => !prev)}
            >
              <input
                type="text"
                className="dropdown-input"
                placeholder="Select Rights Type"
                autoComplete="off"
                readOnly
                value={rightsType}
              />

              <span className="chevron-icon">
                <img src={dropDownImg} alt="dropdown" />
              </span>
            </div>

            {rightsOpen && (
              <ul className="dropdown-menu">
                {rightsOptions.map((item) => (
                  <li key={item} onClick={() => handleRightsSelect(item)}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {errors.rightsType && (
            <small className="error-text">{errors.rightsType.message}</small>
          )}
        </div>
      </div>

      <div className="config-section">
        <table className="config-table">
          <thead>
            <tr>
              <th>Exclusivity</th>
              <th>Holdback</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>
                <div className="status-item">
                  <span className="check-icon">
                    <img src={exclusiveImg} alt="exclusive" />
                  </span>
                  Exclusive
                </div>

                <div className="status-item">
                  <span className="check-icon">
                    <img src={exclusiveImg} alt="exclusive" />
                  </span>
                  Non Exclusive
                </div>
              </td>

              <td>
                <div className="status-item">
                  <span className="check-icon">
                    <img src={exclusiveImg} alt="exclusive" />
                  </span>
                  1 Month
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* LEGEND */}
        <div className="legend-panel">
          <div className="legend-item text-available">
            <span className="legend-icon">
              <img src={exclusiveImg} alt="available" />
            </span>
            Available
          </div>

          <div className="legend-item text-unavailable">
            <span className="legend-icon">
              <img src={unavailableImg} alt="unavailable" />
            </span>
            Unavailable
          </div>

          <div className="legend-item text-expired">
            <span className="legend-icon">
              <img src={rightImg} alt="right" />
            </span>
            Right is no longer
          </div>
        </div>
      </div>

      <div className="cta-buttons">
        <button
          type="button"
          className="prev-btn active"
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button type="submit" className="next-btn">
          Next
        </button>
      </div>
    </form>
  );
};

export default StepTwoForm;
