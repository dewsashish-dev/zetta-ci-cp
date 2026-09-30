import backImg from "../../../assets/images/Explore/backarrow_Icon.png";
import nextImg from "../../../assets/images/Explore/nextarrow_Icon.png";

const PaginationSection = ({ page, setPage }) => {
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  return (
    <div className="pagination">
      <button
        type="button"
        className="page-btn"
        disabled={page === 1}
        onClick={handlePrevious}
      >
        <img src={backImg} alt="Previous" />
      </button>

      <div className="page-numbers">
        <button
          className={`page-number ${page === 1 ? "active" : ""}`}
          onClick={() => setPage(1)}
        >
          1
        </button>

        <button
          className={`page-number ${page === 2 ? "active" : ""}`}
          onClick={() => setPage(2)}
        >
          2
        </button>

        <button
          className={`page-number ${page === 3 ? "active" : ""}`}
          onClick={() => setPage(3)}
        >
          3
        </button>

        <button
          className={`page-number ${page === 4 ? "active" : ""}`}
          onClick={() => setPage(4)}
        >
          4
        </button>
      </div>

      <button type="button" className="page-btn" onClick={handleNext}>
        <img src={nextImg} alt="Next" />
      </button>
    </div>
  );
};

export default PaginationSection;
