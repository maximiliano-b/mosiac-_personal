import "./App.css";
import { Grid, Box, Button, Container, TextField } from "@mui/material";
import AcceptDeclineButton from "./Components/Accept_decline";
import { gql, useMutation, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Vehicle from "./Components/Vehicle";

const SEARCH_VEHICLE = gql`
  query SearchVehicle($id: uuid!) {
    vehicle_information_by_pk(id: $id) {
      car
      id
      created_at
      photo_url
      violation
    }
  }
`;

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

const UPDATE_VEHICLE = gql`
  mutation updateVehicleViolation($id: uuid!, $violation: Boolean!) {
    update_vehicle_information_by_pk(
      pk_columns: { id: $id }
      _set: { violation: $violation }
    ) {
      created_at
      updated_at
      violation
    }
  }
`;

function App() {
  const [searchId, setSearchId] = useState("");
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [updateVehicleViolation] = useMutation(UPDATE_VEHICLE);
  const [
    searchItem,
    { loading: loadingSearch, error: errorSearch, data: dataSearch, refetch },
  ] = useLazyQuery(SEARCH_VEHICLE);

  const nav = new useNavigate();
  refetch();
  function handleInputChange(event) {
    setSearchId(event.target.value);
  }

  const handleSearch = () => {
    searchItem({ variables: { id: searchId } });
  };

  const handleAction = async (isAccept) => {
    try {
      console.log("Handle Action", isAccept);
      const id = currentVehicle.id;
      const violation = isAccept;
      await updateVehicleViolation({
        variables: {
          id,
          violation,
        },
      });
      setCurrentVehicle({ ...currentVehicle, violation });
      console.log("Vehicle violation updated successfully");
    } catch (error) {
      console.error("Error updating vehicle violation:", error);
    }
  };

  useEffect(() => {
    if (dataSearch && dataSearch.vehicle_information_by_pk) {
      console.log("Data violation updated effect");
      setCurrentVehicle(dataSearch.vehicle_information_by_pk);
    }
  }, [dataSearch]);

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
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <TextField
              type="text"
              placeholder="Search task"
              value={searchId}
              onChange={handleInputChange}
            />
            <Button onClick={handleSearch}>Search</Button>
          </Grid>
          {currentVehicle && (
            <>
              <Grid item xs={12}>
                <Vehicle car={currentVehicle} />
              </Grid>
              <Grid item xs={12}>
                <AcceptDeclineButton
                  onAccept={() => handleAction(true)}
                  onDecline={() => handleAction(false)}
                />
              </Grid>
              <Grid item xs={12} container justifyContent="flex-end">
                <Button onClick={() => nav("/list")}>Show Vehicles</Button>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
