import React from "react";
import * as taskActions from "../../redux/actions/taskActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { taskSelector } from "../../redux/selectors/taskSelector";
import CardHeader from "@mui/material/CardHeader";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import "./detail.css";

const Detail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector(taskSelector);
  const handleClickCancel = () => {
    navigate(-1);
  };
  const handleClickUpdate = () => {
    let item = { ...data.item };

    let items = item.items.map((task) => {
      if (task.id === data.data.id) {
        return {
          ...task,
          done: true,
        };
      } else {
        return {
          ...task,
        };
      }
    });

    let payload = { ...item, items };
    dispatch(taskActions.updateTask({ payload: payload }));
    navigate(-1);
  };

  return (
    <div className="detail">
      <Card sx={{ width: 400, height: 220 }}>
        <CardHeader title={`Tarea #${data.data.id}`} className="card-title" />
        <Divider />
        <CardContent className="card-content">
          <Button
            variant="outlined"
            color="error"
            onClick={() => handleClickCancel()}
          >
            Cancelar
          </Button>
          <br></br>
          <Button
            variant="contained"
            color="success"
            onClick={() => handleClickUpdate()}
          >
            Completar Tarea
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default Detail;
