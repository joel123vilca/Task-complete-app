import React, { useState, useEffect } from "react";
import * as taskActions from "../../redux/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { tasksSelector } from "../../redux/selectors/taskSelector";
import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Task from ".././task";
import "./tasks.css";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const results = useSelector(tasksSelector);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenAlert = () => {
    setAlert(true);
  };
  const handleCloseAlert = () => {
    setAlert(false);
  };

  const updateItem = (item, data) => {
    dispatch(taskActions.setData(item, data));
    navigate(`/update-item/${item.id}`);
  };

  const handleClickDone = (item, data) => {
    if (results[0].items[0].done) {
      if (item.items.length > 1) {
        if (
          [4, 5].includes(item.id) &&
          data.id === 1 &&
          results[item.id - 2].items[results[item.id - 2].items.length - 1].done
        ) {
          updateItem(item, data);
        } else if (item.id === 3) {
          if (data.id === 1) {
            updateItem(item, data);
          } else if (item.items[data.id - 2].done) {
            updateItem(item, data);
          } else {
            validationAlert(`Necesitas completar la tarea #${item.id}`);
          }
        } else {
          if (data.id !== 1 && item.items[data.id - 2].done) {
            updateItem(item, data);
          } else if (data.id !== 1) {
            validationAlert(`Necesitas completar la tarea #${item.id}`);
          } else {
            validationAlert(`Necesitas completar la tarea #${item.id - 1}`);
          }
        }
      } else {
        updateItem(item, data);
      }
    } else if (item.id === 1 && !data.done) {
      updateItem(item, data);
    } else {
      validationAlert("Necesita completar la tarea 1");
    }
  };

  const validationAlert = (text) => {
    setMessage(text);
    handleClickOpenAlert();
  };
  // get list of tasks
  useEffect(() => {
    dispatch(taskActions.getTasks());
  }, [dispatch]);

  return (
    <Container maxWidth="sm">
      <AppBar component="nav">
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          Tareas
        </Typography>
      </AppBar>
      <div className="contain">
        {results.map((item) => (
          <Task
            key={item.id}
            item={item}
            handleClickOpen={() => handleClickOpen()}
            handleClickDone={(data) => handleClickDone(item, data)}
          />
        ))}
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="success">
          <IconButton
            aria-label="delete"
            size="small"
            className="btn-close"
            onClick={handleClose}
          >
            <HighlightOffIcon fontSize="inherit" />
          </IconButton>
          <AlertTitle>Tarea Completada</AlertTitle>
          Esta tarea se completo — <strong>continua con las siguientes!</strong>
        </Alert>
      </Dialog>
      <Dialog
        open={alert}
        onClose={handleCloseAlert}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Alert severity="warning">
          <IconButton
            aria-label="delete"
            size="small"
            className="btn-close"
            onClick={handleCloseAlert}
          >
            <HighlightOffIcon fontSize="inherit" />
          </IconButton>
          <AlertTitle>Alerta</AlertTitle>
          {message} — <strong>revisa de nuevo!</strong>
        </Alert>
      </Dialog>
    </Container>
  );
};
export default Tasks;
