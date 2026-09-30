import { useState } from "react";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import dropDownImg from "../../../assets/images/Login/Down_Arrow.png";

const schema = yup.object({
  paymentType: yup.string().required("Please select payment type"),

  flatAmount: yup.number().when("paymentType", {
    is: "flat",
    then: (schema) =>
      schema
        .typeError("Amount is required")
        .min(0, "Amount cannot be negative")
        .required("Amount is required"),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  priceListing: yup.string().when("paymentType", {
    is: "flat",
    then: (schema) => schema.required("Please select price listing"),

    otherwise: (schema) => schema.notRequired(),
  }),

  transactionMin: yup.number().when("paymentType", {
    is: "share",
    then: (schema) =>
      schema
        .typeError("Minimum amount is required")
        .min(0, "Amount cannot be negative")
        .required("Minimum amount is required"),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  transactionMax: yup.number().when("paymentType", {
    is: "share",
    then: (schema) =>
      schema
        .typeError("Maximum amount is required")
        .min(0, "Amount cannot be negative")
        .required("Maximum amount is required")
        .test(
          "greater-than-min",
          "Maximum must be greater than minimum",
          function (value) {
            const { transactionMin } = this.parent;

            if (value === undefined || transactionMin === undefined) {
              return true;
            }

            return value >= transactionMin;
          },
        ),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  revenueShare: yup.number().when("paymentType", {
    is: "share",
    then: (schema) =>
      schema
        .typeError("Revenue share is required")
        .min(0, "Cannot be less than 0%")
        .max(100, "Cannot be more than 100%")
        .required("Revenue share is required"),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  monthlyMin: yup.number().when("paymentType", {
    is: "share",
    then: (schema) =>
      schema
        .typeError("Minimum amount is required")
        .min(0, "Amount cannot be negative")
        .required("Minimum amount is required"),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  monthlyMax: yup.number().when("paymentType", {
    is: "share",
    then: (schema) =>
      schema
        .typeError("Maximum amount is required")
        .min(0, "Amount cannot be negative")
        .required("Maximum amount is required"),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  minimumGuarantee: yup.boolean(),

  guaranteeAmount: yup.number().when("minimumGuarantee", {
    is: true,
    then: (schema) =>
      schema
        .typeError("Guarantee amount is required")
        .min(0, "Amount cannot be negative")
        .required("Guarantee amount is required"),

    otherwise: (schema) =>
      schema
        .notRequired()
        .nullable()
        .transform(() => undefined),
  }),

  guaranteePeriod: yup.string().when("minimumGuarantee", {
    is: true,
    then: (schema) => schema.required("Please select period"),

    otherwise: (schema) => schema.notRequired(),
  }),

  guaranteeFor: yup.string().when("minimumGuarantee", {
    is: true,
    then: (schema) => schema.required("Please select bundle"),

    otherwise: (schema) => schema.notRequired(),
  }),
});

const StepThreeForm = ({ previousData, stepTwoData, onPrevious, onSubmit }) => {
  const currency = stepTwoData?.currency || "₹ - Indian Rupee";

  const {
    register,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      paymentType: previousData?.paymentType || "flat",

      flatAmount: previousData?.flatAmount || "",

      priceListing: previousData?.priceListing || "",

      transactionMin: previousData?.transactionMin || "",

      transactionMax: previousData?.transactionMax || "",

      revenueShare: previousData?.revenueShare || "",

      monthlyMin: previousData?.monthlyMin || "",

      monthlyMax: previousData?.monthlyMax || "",

      minimumGuarantee: previousData?.minimumGuarantee || false,

      guaranteeAmount: previousData?.guaranteeAmount || "",

      guaranteePeriod: previousData?.guaranteePeriod || "",

      guaranteeFor: previousData?.guaranteeFor || "",
    },
  });

  const paymentType = watch("paymentType");

  const [priceListingOpen, setPriceListingOpen] = useState(false);

  const [priceListing, setPriceListing] = useState(
    previousData?.priceListing || "",
  );

  const [guaranteePeriodOpen, setGuaranteePeriodOpen] = useState(false);

  const [guaranteePeriod, setGuaranteePeriod] = useState(
    previousData?.guaranteePeriod || "",
  );

  const [guaranteeForOpen, setGuaranteeForOpen] = useState(false);

  const [guaranteeFor, setGuaranteeFor] = useState(
    previousData?.guaranteeFor || "",
  );

  const currencySymbol = currency.split(" ")[0];

  const handlePriceListing = (value) => {
    setPriceListing(value);

    setValue("priceListing", value, {
      shouldValidate: true,
    });

    setPriceListingOpen(false);
  };

  const handleGuaranteePeriod = (value) => {
    setGuaranteePeriod(value);

    setValue("guaranteePeriod", value, {
      shouldValidate: true,
    });

    setGuaranteePeriodOpen(false);
  };

  const handleGuaranteeFor = (value) => {
    setGuaranteeFor(value);

    setValue("guaranteeFor", value, {
      shouldValidate: true,
    });

    setGuaranteeForOpen(false);
  };

  const handlePrevious = () => {
    const data = getValues();

    onPrevious(data);
  };

  const handleFinalSubmit = (data) => {
    onSubmit(data);
  };

  return (
    <form className="step-section" onSubmit={handleSubmit(handleFinalSubmit)}>
      <div className="payment-options">
        <div className={`option ${paymentType === "flat" ? "active" : ""}`}>
          <input
            type="radio"
            id="flat-rate"
            value="flat"
            {...register("paymentType")}
          />

          <label htmlFor="flat-rate">By Flat Rate</label>
        </div>

        <div className={`option ${paymentType === "share" ? "active" : ""}`}>
          <input
            type="radio"
            id="share-revenue"
            value="share"
            {...register("paymentType")}
          />

          <label htmlFor="share-revenue">By Share Revenue</label>
        </div>
      </div>

      {paymentType === "flat" && (
        <div className="flat-rate-container">
          <h2 className="region-title">
            Select this if you wish to make a fixed price Offer.
          </h2>

          <div className="form-group">
            <p>
              Licensee (Buyer) will pay Licensor (Seller) a fixed amount of:
            </p>

            <div className="inputs-wrapper">
              <div className="amount-input">
                <input
                  id="fixed-amount"
                  type="number"
                  min="0"
                  {...register("flatAmount")}
                />

                <div className="currency">
                  {currencySymbol === "₹" && "₹ INR"}

                  {currencySymbol === "$" && "$ USD"}

                  {currencySymbol === "€" && "€ EUR"}

                  {currencySymbol === "£" && "£ GBP"}
                </div>

                {errors.flatAmount && (
                  <small className="error-text">
                    {errors.flatAmount.message}
                  </small>
                )}
              </div>

              <span className="inbetween">for the/a</span>

              <div className="price-listing">
                <div className="custom-select-wrapper">
                  <div
                    className="select-box"
                    onClick={() => setPriceListingOpen((prev) => !prev)}
                  >
                    <input
                      type="text"
                      className="dropdown-input"
                      placeholder="Select Price Listing"
                      autoComplete="off"
                      readOnly
                      value={priceListing}
                    />

                    <span className="chevron-icon">
                      <img src={dropDownImg} alt="dropdown" />
                    </span>
                  </div>

                  {priceListingOpen && (
                    <ul className="dropdown-menu">
                      {[
                        "Per View",
                        "Per Stream",
                        "Per Day",
                        "One-Time License",
                      ].map((item) => (
                        <li key={item} onClick={() => handlePriceListing(item)}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {errors.priceListing && (
                  <small className="error-text">
                    {errors.priceListing.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="total-amount">
            <p>Total amount to be paid by Licensee (Buyer) is</p>

            <div className="amount">
              <span className="currency">{currencySymbol}</span>

              <span className="amount-value">
                {Number(watch("flatAmount") || 0).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {paymentType === "share" && (
        <div className="share-revenue-container">
          <h2 className="region-title">
            Select this if you wish to pay by sharing the transaction revenue
            earned.
            <br />
            Select the Rights Types T-VOD and/or EST to enable this pricing
            model.
          </h2>

          <div className="form-group">
            <label>
              Licensee (Buyer) will price the transactions according to the
              following range.
            </label>

            <div className="inputs-wrapper">
              <div className="amount-input">
                <input type="number" min="0" {...register("transactionMin")} />

                {errors.transactionMin && (
                  <small className="error-text">
                    {errors.transactionMin.message}
                  </small>
                )}
              </div>

              <span>to</span>

              <div className="amount-input">
                <input type="number" min="0" {...register("transactionMax")} />

                <div className="currency">
                  {currencySymbol === "₹" && "₹ INR"}

                  {currencySymbol === "$" && "$ USD"}

                  {currencySymbol === "€" && "€ EUR"}

                  {currencySymbol === "£" && "£ GBP"}
                </div>

                {errors.transactionMax && (
                  <small className="error-text">
                    {errors.transactionMax.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          <h2 className="region-title">per T-VOD transaction</h2>

          <div className="form-group">
            <p>
              Share of transaction revenue Licensee (Buyer) shall pay to
              Licensor (Seller):
            </p>

            <div className="small-amount-input extra-space">
              <input
                type="number"
                min="0"
                max="100"
                {...register("revenueShare")}
              />

              <div className="currency">%</div>

              {errors.revenueShare && (
                <small className="error-text">
                  {errors.revenueShare.message}
                </small>
              )}
            </div>
          </div>

          <h2 className="region-title">
            The estimated monthly license fee by transaction revenue is between:
          </h2>

          <div className="form-group">
            <div className="inputs-wrapper">
              <div className="amount-input">
                <input type="number" min="0" {...register("monthlyMin")} />

                <div className="currency">
                  {currencySymbol === "₹" && "₹ INR"}

                  {currencySymbol === "$" && "$ USD"}

                  {currencySymbol === "€" && "€ EUR"}

                  {currencySymbol === "£" && "£ GBP"}
                </div>

                {errors.monthlyMin && (
                  <small className="error-text">
                    {errors.monthlyMin.message}
                  </small>
                )}
              </div>

              <span>and</span>

              <div className="amount-input">
                <input type="number" min="0" {...register("monthlyMax")} />

                <div className="currency">
                  {currencySymbol === "₹" && "₹ INR"}

                  {currencySymbol === "$" && "$ USD"}

                  {currencySymbol === "€" && "€ EUR"}

                  {currencySymbol === "£" && "£ GBP"}
                </div>

                {errors.monthlyMax && (
                  <small className="error-text">
                    {errors.monthlyMax.message}
                  </small>
                )}
              </div>
            </div>
          </div>

          <div className="check-region-title">
            <input
              type="checkbox"
              id="min-guarantee"
              {...register("minimumGuarantee")}
            />

            <label htmlFor="min-guarantee">
              Licensee (Buyer) offers a Minimum Guarantee of
            </label>
          </div>

          <div className="form-group">
            <div className="small-inputs-wrapper">
              <div className="small-amount-input">
                <input type="number" min="0" {...register("guaranteeAmount")} />

                <div className="currency">{currencySymbol}</div>

                {errors.guaranteeAmount && (
                  <small className="error-text">
                    {errors.guaranteeAmount.message}
                  </small>
                )}
              </div>

              <span className="inbetween">for the/a</span>

              <div className="custom-select-wrapper">
                <div
                  className="select-box"
                  onClick={() => setGuaranteePeriodOpen((prev) => !prev)}
                >
                  <input
                    type="text"
                    className="dropdown-input"
                    placeholder="Select Period"
                    readOnly
                    value={guaranteePeriod}
                  />

                  <span className="chevron-icon">
                    <img src={dropDownImg} alt="dropdown" />
                  </span>

                  {errors.guaranteePeriod && (
                    <small className="error-text">
                      {errors.guaranteePeriod.message}
                    </small>
                  )}
                </div>

                {guaranteePeriodOpen && (
                  <ul className="dropdown-menu">
                    {["Month", "Day", "Week", "Year"].map((item) => (
                      <li
                        key={item}
                        onClick={() => handleGuaranteePeriod(item)}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <span className="inbetween">for</span>

              <div className="custom-select-wrapper">
                <div
                  className="select-box"
                  onClick={() => setGuaranteeForOpen((prev) => !prev)}
                >
                  <input
                    type="text"
                    className="dropdown-input"
                    placeholder="Select"
                    readOnly
                    value={guaranteeFor}
                  />

                  <span className="chevron-icon">
                    <img src={dropDownImg} alt="dropdown" />
                  </span>

                  {errors.guaranteeFor && (
                    <small className="error-text">
                      {errors.guaranteeFor.message}
                    </small>
                  )}
                </div>

                {guaranteeForOpen && (
                  <ul className="dropdown-menu">
                    {["Entire Bundle", "Single Movie", "Season", "Channel"].map(
                      (item) => (
                        <li key={item} onClick={() => handleGuaranteeFor(item)}>
                          {item}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cta-buttons">
        <button
          type="button"
          className="prev-btn active"
          onClick={handlePrevious}
        >
          Previous
        </button>

        <button type="submit" className="next-btn">
          Send an Offer
        </button>
      </div>
    </form>
  );
};

export default StepThreeForm;
