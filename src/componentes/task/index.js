import * as React from "react";
import CardHeader from "@mui/material/CardHeader";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Check";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import "./task.css";

const Task = ({ item, handleClickOpen, handleClickDone }) => {
  return (
    <Card sx={{ width: 200, height: 220 }}>
      <CardHeader title={`${item.title} #${item.id}`} className="card-title" />
      <Divider />
      <CardContent className="card-content">
        {item.items.map((data) =>
          data.done ? (
            <Chip
              key={data.id}
              label={`Tarea #${
                item.items.length > 1 ? item.id + "." + data.id : item.id
              }`}
              icon={<DoneIcon />}
              color="success"
              className="item"
              onClick={() => handleClickOpen(data)}
            />
          ) : (
            <Chip
              key={data.id}
              label={`Hacer tarea #${
                item.items.length > 1 ? item.id + "." + data.id : item.id
              }`}
              variant="outlined"
              color="primary"
              className="item"
              onClick={() => handleClickDone(data)}
            />
          )
        )}
      </CardContent>
    </Card>
  );
};
export default Task;
