const lastSevenDates = () => {
  var results = [];
  for (var i = 0; i < 7; ++i) {
    var date = new Date();
    date.setDate(date.getDate() - i);
    results.push(dateToString(date));
  }
  return results;
};

const dateToString = (date: Date) => {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  return month + "/" + day + "/" + year;
};

function Picker() {
  const dates = lastSevenDates();
  return (
    <div
      className="picker container-fluid d-flex flex-column justify-content-center"
      style={{ backgroundColor: "#d3d3d3" }}
    >
      {dates.map((d, i) => {
        return (
          <div className="row">
            <div className="col-12 text-center p-2 m-2">
              <button type="button" className="btn btn-success">
                {d} {`- Published ${i + 1} days ago`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Picker;
