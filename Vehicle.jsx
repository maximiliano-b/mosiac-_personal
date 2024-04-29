const Vehicle = ({ car }) => {
  console.log(car);
  return (
    <ul style={{ textAlign: "center" }}>
      <img
        src={car.photo_url}
        style={{
          display: "block",
          margin: "0 auto",
          width: "300px",
          height: "200px",
          objectFit: "cover",
        }}
        alt=""
      />
      <div>
        <p>CAR: {car.car}</p>
        {car.violation ? (
          <p>VIOLATION: Accepted</p>
        ) : (
          <p>VIOLATION: Not Accepted</p>
        )}
        <p>DATE: {car.created_at}</p>
      </div>
    </ul>
  );
};

export default Vehicle;
