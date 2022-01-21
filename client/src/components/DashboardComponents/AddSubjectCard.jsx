import React from "react";
import { Card, Typography, IconButton } from "@material-ui/core";
import EditRoundedIcon from "@material-ui/icons/EditRounded";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";

import useStyles from "./style";

const AddSubjectCard = ({ subjects, handleEdit, handleDelete }) => {
  const classes = useStyles();

  return (
    <div>
      {subjects.map((subject) => {
        return (
          <Card
            key={subject._id}
            className={classes.addSubjectCard}
            elevation={3}
          >
            <div className={classes.addSubjectContent}>
              <div className={classes.textContent}>
                <Typography variant="h6">{subject.subjectName}</Typography>
                <Typography variant="caption">
                  Grade {subject.subjectGrade}
                </Typography>
              </div>
              <div>
                <IconButton
                  aria-label="edit"
                  className={classes.addSubIcon}
                  onClick={() => handleEdit(subject)}
                >
                  <EditRoundedIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className={classes.addSubIcon}
                  onClick={() => handleDelete(subject)}
                >
                  <DeleteRoundedIcon />
                </IconButton>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default AddSubjectCard;
