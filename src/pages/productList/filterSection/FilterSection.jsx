import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import closeImg from "../../../assets/images/Explore/close_Icon.png";
import searchImg from "../../../assets/images/Explore/search_Icon.png";
import filterImg from "../../../assets/images/Explore/filter_Icon.png";
import backImg from "../../../assets/images/Explore/backarrow_Icon.png";
import nextImg from "../../../assets/images/Explore/nextarrow_Icon.png";
import dropDownImg from "../../../assets/images/Explore/downarrow_Icon.png";

import dramaImg from "../../../assets/images/Explore/drama.png";
import scifiImg from "../../../assets/images/Explore/scifi.png";
import actionImg from "../../../assets/images/Explore/action.png";
import comedyImg from "../../../assets/images/Explore/comedy.png";
import shortImg from "../../../assets/images/Explore/short_Icon.png";
import horrerImg from "../../../assets/images/Explore/horrer_Icon.png";
import romenceImg from "../../../assets/images/Explore/romence_Icon.png";
import musicalImg from "../../../assets/images/Explore/musical_Icon.png";
import thrillerImg from "../../../assets/images/Explore/thriller_Icon.png";
import adventureImg from "../../../assets/images/Explore/adventure_Icon.png";

const genreOptions = [
  {
    image: adventureImg,
    name: "Adventure",
    value: "12",
  },
  {
    image: dramaImg,
    name: "Drama",
    value: "18",
  },
  {
    image: comedyImg,
    name: "Comedy",
    value: "35",
  },
  {
    image: thrillerImg,
    name: "Thriller",
    value: "53",
  },
  {
    image: horrerImg,
    name: "Horror",
    value: "27",
  },
  {
    image: romenceImg,
    name: "Romance",
    value: "10749",
  },
  {
    image: musicalImg,
    name: "Music",
    value: "10402",
  },
  {
    image: shortImg,
    name: "Short",
    value: "short",
  },
  {
    image: actionImg,
    name: "Action",
    value: "28",
  },
  {
    image: scifiImg,
    name: "Sci-Fi",
    value: "878",
  },
];

const contentTypeOptions = [
  {
    label: "All Content",
    value: "all",
  },
  {
    label: "Movies",
    value: "movie",
  },
  {
    label: "TV Series",
    value: "tv",
  },
  {
    label: "Documentaries",
    value: "documentary",
  },
  {
    label: "Kids Content",
    value: "kids",
  },
];

const yearOptions = [
  {
    label: "Any Year",
    value: "any",
  },
  {
    label: "2026",
    value: "2026",
  },
  {
    label: "2025",
    value: "2025",
  },
  {
    label: "2024",
    value: "2024",
  },
  {
    label: "2023",
    value: "2023",
  },
];

const popupGenreOptions = [
  {
    label: "Action",
    value: "28",
  },
  {
    label: "Comedy",
    value: "35",
  },
  {
    label: "Drama",
    value: "18",
  },
  {
    label: "Sci-Fi",
    value: "878",
  },
  {
    label: "Romance",
    value: "10749",
  },
  {
    label: "Horror",
    value: "27",
  },
  {
    label: "Thriller",
    value: "53",
  },
  {
    label: "Fantasy",
    value: "14",
  },
];

const languageOptions = [
  {
    label: "Tamil",
    value: "ta",
  },
  {
    label: "Kannada",
    value: "kn",
  },
  {
    label: "Telugu",
    value: "te",
  },
  {
    label: "English",
    value: "en",
  },
  {
    label: "Hindi",
    value: "hi",
  },
];

const formatOptions = [
  {
    label: "HD",
    value: "hd",
  },
  {
    label: "Full HD",
    value: "full_hd",
  },
  {
    label: "DVD",
    value: "dvd",
  },
  {
    label: "4K",
    value: "4k",
  },
  {
    label: "Dolby Digital",
    value: "dolby",
  },
];

const FilterSection = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
}) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const filterDialogRef = useRef(null);

  const [isModelActive, setModelActive] = useState(false);

  const [openDropdown, setOpenDropdown] = useState(null);

  const [tempFilters, setTempFilters] = useState(filters);

  const handleOpenFilter = () => {
    setTempFilters({
      ...filters,
      genre: [...(filters.genre || [])],
      contentType: [...(filters.contentType || [])],
      language: [...(filters.language || [])],
      format: [...(filters.format || [])],
      sortBy: [...(filters.sortBy || [])],
      year: [...(filters.year || [])],
    });

    setModelActive(true);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".custom-select-wrapper")) {
        setOpenDropdown(null);
      }
      if (
        isModelActive &&
        filterDialogRef.current &&
        event.target === filterDialogRef.current
      ) {
        setModelActive(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModelActive]);

  const toggleFilter = (filterName, value) => {
    setTempFilters((previous) => {
      const currentValues = previous[filterName] || [];

      const alreadySelected = currentValues.includes(value);

      return {
        ...previous,

        [filterName]: alreadySelected
          ? currentValues.filter((item) => item !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleDropdownSelect = (filterName, value) => {
    if (value === "all" || value === "any") {
      onFilterChange(filterName, []);

      setOpenDropdown(null);

      return;
    }

    const currentValues = filters[filterName] || [];

    const alreadySelected = currentValues.includes(value);

    const updatedValues = alreadySelected
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];

    onFilterChange(filterName, updatedValues);
  };

  const handleGenreSelect = (genre) => {
    const currentGenres = filters.genre || [];

    const alreadySelected = currentGenres.includes(genre.value);

    const updatedGenres = alreadySelected
      ? currentGenres.filter((item) => item !== genre.value)
      : [...currentGenres, genre.value];

    onFilterChange("genre", updatedGenres);
  };

  const handleSearchChange = (event) => {
    onFilterChange("search", event.target.value);
  };

  const handleApplyFilter = () => {
    onApplyFilters({
      ...tempFilters,
      genre: [...(tempFilters.genre || [])],
      contentType: [...(tempFilters.contentType || [])],
      language: [...(tempFilters.language || [])],
      format: [...(tempFilters.format || [])],
      sortBy: [...(tempFilters.sortBy || [])],
      year: [...(tempFilters.year || [])],
    });

    setModelActive(false);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      genre: [],
      contentType: [],
      language: [],
      format: [],
      sortBy: [],
      year: [],
      search: "",
    };

    setTempFilters(clearedFilters);

    onClearFilters();

    setModelActive(false);
    setOpenDropdown(null);
  };

  // const getSelectedLabel = (options, values, defaultLabel) => {
  //   if (!Array.isArray(values) || values.length === 0) {
  //     return defaultLabel;
  //   }

  //   const labels = options
  //     .filter((option) => values.includes(option.value))
  //     .map((option) => option.label);

  //   return labels.length > 0 ? labels : defaultLabel;
  // };

  const renderDropdown = ({ name, options, placeholder }) => {
    const isOpen = openDropdown === name;

    const selectedValues = filters[name] || [];

    return (
      <div className="custom-select-wrapper">
        <button
          type="button"
          className="select-box"
          onClick={() => {
            setOpenDropdown(isOpen ? null : name);
          }}
        >
          <span className="dropdown-input">
            {selectedValues.length > 0
              ? `(${selectedValues.length}) Selected`
              : placeholder}
          </span>

          <span className="chevron-icon">
            <img src={dropDownImg} alt="dropdown" />
          </span>
        </button>

        {isOpen && (
          <ul className="dropdown-menu">
            {options.map((option) => {
              const isActive = selectedValues.includes(option.value);

              return (
                <li
                  key={option.value}
                  className={isActive ? "active" : ""}
                  onClick={() => handleDropdownSelect(name, option.value)}
                >
                  <span>{option.label}</span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div className="filter-cnt-wrapper">
      <div className="genre-wrapper">
        <button type="button" ref={prevRef} className="filter-prev-btn">
          <span>
            <img src={backImg} alt="Previous" />
          </span>
        </button>

        <div className="genre-slider">
          <Swiper
            slidesPerView={8}
            spaceBetween={20}
            modules={[Navigation]}
            breakpoints={{
              340: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              400: {
                slidesPerView: 2,
                spaceBetween: 12,
              },
              576: {
                slidesPerView: 4,
                spaceBetween: 14,
              },
              768: {
                slidesPerView: 6,
                spaceBetween: 16,
              },
              992: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
            navigation={{
              prevEl: ".filter-prev-btn",
              nextEl: ".filter-next-btn",
            }}
            // onBeforeInit={(swiper) => {
            //   swiper.params.navigation.prevEl = prevRef.current;

            //   swiper.params.navigation.nextEl = nextRef.current;
            // }}
          >
            {genreOptions.map((each) => {
              const isActive = filters.genre?.includes(each.value);

              return (
                <SwiperSlide
                  key={`swiper-filter-${each.value}`}
                  className="gener-slide"
                >
                  <button
                    type="button"
                    className={`genre-item ${isActive ? "active" : ""}`}
                    onClick={() => handleGenreSelect(each)}
                  >
                    <span className="icon">
                      <img src={each.image} alt={each.name} />
                    </span>

                    <span className="genre-name">{each.name}</span>
                  </button>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>

        <button type="button" ref={nextRef} className="filter-next-btn">
          <span>
            <img src={nextImg} alt="Next" />
          </span>
        </button>
      </div>

      <div className="filter-container">
        <div className="search-group">
          {renderDropdown({
            name: "contentType",
            options: contentTypeOptions,
            placeholder: "All Content",
          })}

          <div className="search-filter">
            <input
              type="text"
              placeholder="Search Your Favourite Movies, Short Films..."
              value={filters.search || ""}
              onChange={handleSearchChange}
            />

            <div className="search-icon">
              <img src={searchImg} alt="Search" />
            </div>
          </div>
        </div>

        <div className="filter-group">
          <button
            type="button"
            className="filter-btn"
            onClick={handleOpenFilter}
          >
            <img src={filterImg} alt="Filter" className="filter-icon" />

            <span>Filter By</span>
          </button>

          {renderDropdown({
            name: "year",
            options: yearOptions,
            placeholder: "Release Year",
          })}
        </div>
      </div>

      {isModelActive && (
        <div ref={filterDialogRef} className="filter-dialog">
          <div className="filter-dialog-wrapper">
            <div className="filter-header">
              <h1>Filter</h1>

              <button
                type="button"
                className="dialog-close"
                onClick={() => setModelActive(false)}
              >
                <img src={closeImg} alt="Close" />
              </button>
            </div>

            <div className="filters-container">
              <div className="filter-group">
                <h2 className="filter-title">Content Types</h2>

                <div className="filter-items">
                  {contentTypeOptions
                    .filter((item) => item.value !== "all")
                    .map((item) => {
                      const isActive = tempFilters.contentType?.includes(
                        item.value,
                      );

                      return (
                        <button
                          type="button"
                          key={item.value}
                          className={`item ${isActive ? "active" : ""}`}
                          onClick={() =>
                            toggleFilter("contentType", item.value)
                          }
                        >
                          {item.label}
                        </button>
                      );
                    })}
                </div>
              </div>

              <div className="filter-group">
                <h2 className="filter-title">Genres</h2>

                <div className="filter-items">
                  {popupGenreOptions.map((item) => {
                    const isActive = tempFilters.genre?.includes(item.value);

                    return (
                      <button
                        type="button"
                        key={item.value}
                        className={`item ${isActive ? "active" : ""}`}
                        onClick={() => toggleFilter("genre", item.value)}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="filter-group">
                <h2 className="filter-title">Languages</h2>

                <div className="filter-items">
                  {languageOptions.map((item) => {
                    const isActive = tempFilters.language?.includes(item.value);

                    return (
                      <button
                        type="button"
                        key={item.value}
                        className={`item ${isActive ? "active" : ""}`}
                        onClick={() => toggleFilter("language", item.value)}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="filter-group">
                <h2 className="filter-title">Formats</h2>

                <div className="filter-items">
                  {formatOptions.map((item) => {
                    const isActive = tempFilters.format?.includes(item.value);

                    return (
                      <button
                        type="button"
                        key={item.value}
                        className={`item ${isActive ? "active" : ""}`}
                        onClick={() => toggleFilter("format", item.value)}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="filter-buttons">
              <button
                type="button"
                className="clear-filter"
                onClick={handleClearAll}
              >
                Clear All
              </button>

              <button
                type="button"
                className="apply-filter"
                onClick={handleApplyFilter}
              >
                Apply Filter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;
