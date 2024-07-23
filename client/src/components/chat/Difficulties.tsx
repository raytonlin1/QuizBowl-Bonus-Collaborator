import { Box, Button, Modal, Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { UNKNOWN_ERROR_MESSAGE } from "../../constants/errors";
// TODO: ADD FUNCTIONALITY

interface DifficultiesProps {
    open: boolean;
    handleClose: () => void;
}

const Difficulties = ({ open, handleClose }: DifficultiesProps) => {
    // const params = useParams();
    // const [currentBonusPart, setCurrentBonusPart] = useState(-1);
    // const [maxPacketNumber, setMaxPacketNumber] = useState(24);
    // const [questionNumber, setQuestionNumber] = useState(0);
    // const [randomBonuses, setRandomBonuses] = useState([]);
    // const [bonuses, setBonuses] = useState([{}]);

    const [error, setError] = useState("");
    const [name, setName] = useState("");
  
    const onClose = () => {
      setError("");
      setName("");
      handleClose();
    };

    return (
    <Modal open={open} onClose={onClose}>
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h6" component="h2">
              Add Chat
            </Typography>
            <TextField
              label="Name"
              error={!!error}
              helperText={error}
              onChange={(event) => setName(event.target.value)}
            />
            <Button
              variant="outlined"
              onClick={async () => {
                try {
                  
                } catch (err) {
                  setError(UNKNOWN_ERROR_MESSAGE);
                }
              }}
            >
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>)
};

export default Difficulties;