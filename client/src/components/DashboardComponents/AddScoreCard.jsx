import React from "react";
import { Paper, Typography, Button } from "@material-ui/core";

import InputField from "../InputField/InputField";
import useStyle from "./style.js";

const AddScoreCard = () => {
  const classes = useStyle();
  const handleChange = () => {};
  const reset = () => {};

  return (
    <Paper className={classes.scorePaper} elevation={5}>
      <Typography variant="h5" component="p" gutterBottom>
        Scores
      </Typography>
      <form autoComplete="off" style={{ marginTop: "1.5rem" }}>
        <div className={classes.flex}>
          <InputField
            name="hwScore"
            id="hwScore"
            handleChange={handleChange}
            label="Homework"
            helperText="Enter the homework score"
            autoFocus={true}
            type="number"
          />
          <InputField
            name="hwTotal"
            id="hwTotal"
            handleChange={handleChange}
            label="Total"
            helperText="Enter the homework total"
            type="number"
          />
        </div>
        <div className={classes.flex}>
          <InputField
            name="quizScore"
            id="quizScore"
            handleChange={handleChange}
            label="Quiz"
            helperText="Enter the quiz score"
            type="number"
          />
          <InputField
            name="quizTotal"
            id="quizTotal"
            handleChange={handleChange}
            label="Total"
            helperText="Enter the quiz total"
            type="number"
          />
        </div>
        <div className={classes.flex}>
          <InputField
            name="examScore"
            id="examScore"
            handleChange={handleChange}
            label="Exam"
            helperText="Enter the exam score"
            type="number"
          />
          <InputField
            name="examTotal"
            id="examTotal"
            handleChange={handleChange}
            label="Total"
            helperText="Enter the exam total"
            type="number"
          />
        </div>
        <div className={classes.scoreBtnContainer}>
          <Button
            className={classes.scoreBtn}
            type="submit"
            variant="contained"
            color="secondary"
            fullWidth
          >
            Submit Scores
          </Button>
          <Button
            className={classes.scoreBtn}
            variant="contained"
            color="primary"
            onClick={reset}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default AddScoreCard;
