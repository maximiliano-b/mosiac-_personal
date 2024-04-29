import { Button, Box } from "@mui/material";

function AcceptDeclineButton({ onAccept, onDecline }) {
  return (
    <Box display="flex" justifyContent="center">
      <Button
        variant="contained"
        color="success"
        style={{ marginRight: "8px" }}
        onClick={onAccept}
      >
        Accept
      </Button>
      <Button variant="contained" color="error" onClick={onDecline}>
        Decline
      </Button>
    </Box>
  );
}

export default AcceptDeclineButton;
