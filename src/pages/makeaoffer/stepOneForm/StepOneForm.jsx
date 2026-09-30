import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const countries = [
  "Global",
  "Sri Lanka",
  "India",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
];

const schema = yup.object({
  selectedCountry: yup
    .array()
    .min(1, "Please select at least one country")
    .required("Country is required"),

  excludeCountry: yup.array(),

  startDate: yup.string().required("Start date is required"),

  endDate: yup
    .string()
    .required("End date is required")
    .test("after-start", "End date must be after start date", function (value) {
      const { startDate } = this.parent;

      if (!startDate || !value) {
        return true;
      }

      return new Date(value) >= new Date(startDate);
    }),
});

const StepOneForm = ({ previousData, onNext }) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      selectedCountry: previousData?.selectedCountry || [],

      excludeCountry: previousData?.excludeCountry || [],

      startDate: previousData?.startDate || "",

      endDate: previousData?.endDate || "",
    },
  });

  const startDateValue = watch("startDate");
  const endDateValue = watch("endDate");

  const getYearsMonths = (start, end) => {
    if (!start || !end) {
      return {
        years: 0,
        months: 0,
      };
    }

    const startD = new Date(start);
    const endD = new Date(end);

    if (endD < startD) {
      return {
        years: 0,
        months: 0,
      };
    }

    let totalMonths =
      (endD.getFullYear() - startD.getFullYear()) * 12 +
      (endD.getMonth() - startD.getMonth());

    if (endD.getDate() < startD.getDate()) {
      totalMonths -= 1;
    }

    return {
      years: Math.floor(Math.max(totalMonths, 0) / 12),

      months: Math.max(totalMonths, 0) % 12,
    };
  };

  const { years, months } = getYearsMonths(startDateValue, endDateValue);

  const [selectedCountry, setSelectedCountry] = useState(
    previousData?.selectedCountry || [],
  );

  const [excludeCountry, setExcludeCountry] = useState(
    previousData?.excludeCountry || [],
  );

  const [countrySearch, setCountrySearch] = useState("");

  const [excludeSearch, setExcludeSearch] = useState("");

  const [countryOpen, setCountryOpen] = useState(false);

  const [excludeOpen, setExcludeOpen] = useState(false);

  const countryDropdownRef = useRef(null);
  const excludeDropdownRef = useRef(null);

  useEffect(() => {
    setValue("selectedCountry", selectedCountry);
  }, [selectedCountry, setValue]);

  useEffect(() => {
    setValue("excludeCountry", excludeCountry);
  }, [excludeCountry, setValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(event.target)
      ) {
        setCountryOpen(false);
      }

      if (
        excludeDropdownRef.current &&
        !excludeDropdownRef.current.contains(event.target)
      ) {
        setExcludeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelectCountry = (country) => {
    if (selectedCountry.includes("Global")) {
      setCountryOpen(false);
      setCountrySearch("");
      return;
    }

    if (country === "Global") {
      setSelectedCountry(["Global"]);
      setExcludeCountry([]);

      setCountryOpen(false);
      setExcludeOpen(false);

      setCountrySearch("");
      setExcludeSearch("");

      return;
    }

    if (excludeCountry.includes(country)) {
      setCountryOpen(false);
      setCountrySearch("");
      return;
    }

    if (selectedCountry.includes(country)) {
      setCountryOpen(false);
      setCountrySearch("");
      return;
    }

    setSelectedCountry((prev) => [...prev, country]);

    setCountryOpen(false);
    setCountrySearch("");
  };

  const handleSelectExcludeCountry = (country) => {
    if (selectedCountry.includes("Global")) {
      return;
    }

    if (selectedCountry.includes(country)) {
      return;
    }

    if (excludeCountry.includes(country)) {
      return;
    }

    setExcludeCountry((prev) => [...prev, country]);

    setExcludeOpen(false);
    setExcludeSearch("");
  };

  const removeSelectedCountry = (country) => {
    setSelectedCountry((prev) => prev.filter((item) => item !== country));
  };

  const removeExcludeCountry = (country) => {
    setExcludeCountry((prev) => prev.filter((item) => item !== country));
  };

  const filteredCountries = countries.filter((country) => {
    const search = countrySearch.toLowerCase();

    return country.toLowerCase().includes(search);
  });

  const filteredExcludeCountries = countries
    .filter((country) => country !== "Global")
    .filter((country) => {
      const search = excludeSearch.toLowerCase();

      return country.toLowerCase().includes(search);
    });

  const handleNext = (data) => {
    console.log("STEP 1:", data);

    onNext(data);
  };

  return (
    <form className="step-section" onSubmit={handleSubmit(handleNext)}>
      <div className="license-region">
        <h2 className="region-title">License Region</h2>

        <div className="region-wrapper">
          <div className="select-countries">
            <p>
              Specify the countries you wish to license this content in. If you
              want Global rights, please select "Global"
            </p>

            <div className="select-dropdown" ref={countryDropdownRef}>
              <div
                className="select-box"
                onClick={() => {
                  setCountryOpen(true);
                  setExcludeOpen(false);
                }}
              >
                <input
                  type="search"
                  placeholder="Select Countries"
                  value={countrySearch}
                  onChange={(e) => {
                    setCountrySearch(e.target.value);

                    setCountryOpen(true);
                    setExcludeOpen(false);
                  }}
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setSelectedCountry([]);
                    setCountrySearch("");
                  }}
                >
                  Clear All
                </button>
              </div>

              {countryOpen && (
                <ul className="dropdown-menu">
                  {filteredCountries.map((country) => {
                    const disabled =
                      selectedCountry.includes("Global") &&
                      country !== "Global";

                    const alreadySelected = selectedCountry.includes(country);

                    const excluded = excludeCountry.includes(country);

                    return (
                      <li
                        key={country}
                        className={
                          disabled || alreadySelected || excluded
                            ? "disabled"
                            : ""
                        }
                        onClick={() => {
                          if (!disabled && !alreadySelected && !excluded) {
                            handleSelectCountry(country);
                          }
                        }}
                      >
                        {country}

                        {excluded && " (Excluded)"}
                      </li>
                    );
                  })}

                  {filteredCountries.length === 0 && (
                    <li className="no-data">No data found</li>
                  )}
                </ul>
              )}
            </div>

            <div className="tags-container">
              {selectedCountry.map((country) => (
                <div className="tag" key={country}>
                  <span className="tag-text">{country}</span>

                  <button
                    type="button"
                    className="tag-close"
                    onClick={() => removeSelectedCountry(country)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            {errors.selectedCountry && (
              <small className="error-text">
                {errors.selectedCountry.message}
              </small>
            )}
          </div>

          {/* EXCLUDE COUNTRIES */}
          <div className="exclude-countries">
            <p>
              If you'd like to exclude certain countries/regions, select them
              here. This is optional.
            </p>

            <div className="select-dropdown" ref={excludeDropdownRef}>
              <div
                className="select-box"
                onClick={() => {
                  setExcludeOpen(true);
                  setCountryOpen(false);
                }}
              >
                <input
                  type="search"
                  placeholder="Select Countries"
                  value={excludeSearch}
                  onChange={(e) => {
                    setExcludeSearch(e.target.value);

                    setExcludeOpen(true);
                    setCountryOpen(false);
                  }}
                />

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();

                    setExcludeCountry([]);
                    setExcludeSearch("");
                  }}
                >
                  Clear All
                </button>
              </div>

              {excludeOpen && (
                <ul className="dropdown-menu">
                  {filteredExcludeCountries.map((country) => {
                    const selected = selectedCountry.includes(country);

                    const alreadyExcluded = excludeCountry.includes(country);

                    const globalSelected = selectedCountry.includes("Global");

                    return (
                      <li
                        key={country}
                        className={
                          selected || alreadyExcluded || globalSelected
                            ? "disabled"
                            : ""
                        }
                        onClick={() => {
                          if (
                            !selected &&
                            !alreadyExcluded &&
                            !globalSelected
                          ) {
                            handleSelectExcludeCountry(country);
                          }
                        }}
                      >
                        {country}

                        {selected && " (Licensed)"}
                      </li>
                    );
                  })}

                  {filteredExcludeCountries.length === 0 && (
                    <li className="no-data">No data found</li>
                  )}
                </ul>
              )}
            </div>

            <div className="tags-container">
              {excludeCountry.map((country) => (
                <div className="tag" key={country}>
                  <span className="tag-text">{country}</span>

                  <button
                    type="button"
                    className="tag-close"
                    onClick={() => removeExcludeCountry(country)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="license-period">
        <h2 className="region-title">License Period</h2>

        <div className="period-wrapper">
          <div className="years-wrapper">
            <div className="form-group">
              <label htmlFor="start-date">Start Date</label>

              <input type="date" id="start-date" {...register("startDate")} />

              {errors.startDate && (
                <small className="error-text">{errors.startDate.message}</small>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="end-date">End Date</label>

              <input type="date" id="end-date" {...register("endDate")} />

              {errors.endDate && (
                <small className="error-text">{errors.endDate.message}</small>
              )}
            </div>
          </div>

          <div className="col">
            <div className="form-group">
              <label htmlFor="years">Years</label>

              <input type="number" id="years" min="0" readOnly value={years} />
            </div>

            <div className="form-group">
              <label htmlFor="months">Months</label>

              <input
                type="number"
                id="months"
                min="0"
                readOnly
                value={months}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="cta-buttons">
        <button
          type="button"
          className="prev-btn active"
          style={{ visibility: "hidden" }}
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

export default StepOneForm;
