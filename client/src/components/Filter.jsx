import "./css/filter.css";
function Filter({ filterValue, setFilterValue }) {
  const category = [
    "all",
    "UI/UX developer",
    "Web developer",
    "HR",
    "Technical support",
    "Proposal development",
    "Business Analyst",
  ];
  return (
    <div className="filter-wrapper">
      <label htmlFor="filter-category">Filter by Category</label>
      <select
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
        id="filter-category"
      >
        {category.map((ele) => (
          <option value={ele} key={ele}>
            {ele}
          </option>
        ))}
      </select>
    </div>
  );
}
export default Filter;
