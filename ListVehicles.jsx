import { Grid, Box, Button, Container, TextField } from "@mui/material";
import { useQuery, gql } from "@apollo/client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Vehicle from "./Vehicle";

const GET_VEHICLE = gql`
  query getProfileAction {
    vehicle_information {
      car
      id
      created_at
      photo_url
      violation
    }
  }
`;

function GetVehicles() {
  const { loading, error, data, refetch } = useQuery(GET_VEHICLE, {
    nextFetchPolicy: "cache-first",
  });
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex + 1) % data.vehicle_information.length
    );
  };
  refetch();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(data);
  const currentVehicle = data.vehicle_information[currentIndex];
  console.log(currentVehicle);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Vehicle car={currentVehicle} />
      <Button onClick={handleNext}>Next</Button>
    </Box>
  );
}

function ListVehicles() {
  const nav = new useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid container spacing={1} justifyContent="center">
          <GetVehicles />
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Button onClick={() => nav("/")}>Show Vehicles</Button>
        </Grid>
      </Box>
    </Container>
  );
}

export default ListVehicles;
