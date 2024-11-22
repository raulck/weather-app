function Form({ city, setCity, error, handleSubmit }) {
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={String(city).charAt(0).toUpperCase() + String(city).slice(1)}
          onChange={(event) => setCity(event.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </>
  );
}

export default Form;
