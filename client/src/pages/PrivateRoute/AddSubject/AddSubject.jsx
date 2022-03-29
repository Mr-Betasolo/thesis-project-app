import React, { useState } from "react";
import { Grid, TextField, MenuItem, Button } from "@material-ui/core";

import useStyles from "./style";
import InputField from "../../../components/InputField/InputField";
import ErrorCard from "../../../components/ErrorCard/ErrorCard";
import AddSubjectCard from "../../../components/DashboardComponents/AddSubjectCard";
import { useUserContext } from "../../../context/userContext";

const gradeLevels = [
  {
    value: "11",
    label: "Grade 11",
  },
  {
    value: "12",
    label: "Grade 12",
  },
];

const AddSubject = () => {
  const classes = useStyles();
  const [userContext, setUserContext] = useUserContext();

  const [subjectData, setSubjectData] = useState({
    subjectName: "",
    subjectGrade: "",
    details: "",
    total: 0,
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userId = userContext.details._id;
    const genericErrorMessage = "Something went wrong! Please try again later.";

    if (!isEditing) {
      fetch(`http://localhost:8081/dashboard/addSubject/${userId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
        body: JSON.stringify(subjectData),
      })
        .then(async (response) => {
          if (!response.ok) {
            if (response.status === 401) {
              setError({
                isError: true,
                message: "This subject already exist",
              });
            } else if (response.status === 404) {
              setError({
                isError: true,
                message: "User not Found",
              });
            } else {
              setError({ isError: true, message: genericErrorMessage });
            }
          } else {
            console.log("Subject Added");
            const data = await response.json();
            setUserContext((oldValues) => {
              return { ...oldValues, details: data };
            });
            reset();
          }
        })
        .catch((err) => {
          console.log("Error", err.message);
          setError({
            isError: true,
            message: genericErrorMessage,
          });
        });
    } else {
      const isDuplicate = userContext.details.subjects.some(
        (subject) =>
          subject.subjectName.toUpperCase() ===
            subjectData.subjectName.toUpperCase() &&
          subject.subjectGrade === subjectData.subjectGrade
      );

      if (isDuplicate) {
        setError({
          isError: true,
          message: "This subject already exist",
        });
        return;
      }

      fetch(`http://localhost:8081/dashboard/updateSubject/${userId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        },
        body: JSON.stringify(subjectData),
      })
        .then(async (response) => {
          if (!response.ok) {
            if (response.status === 404) {
              setError({
                isError: true,
                message: "User not Found",
              });
            } else {
              setError({ isError: true, message: genericErrorMessage });
            }
          } else {
            console.log("Subject Edited");
            const data = await response.json();
            setUserContext((oldValues) => {
              return { ...oldValues, details: data };
            });
            reset();
          }
        })
        .catch((err) => {
          console.log("Error", err.message);
          setError({
            isError: true,
            message: genericErrorMessage,
          });
        });
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setSubjectData({ ...subjectData, [name]: value });
  };

  // const handleEdit = (subject) => {
  //   setIsEditing(true);
  //   setSubjectData(subject);
  //   setError({ isError: false, message: "" });
  // };

  const handleDelete = (subject) => {
    const genericErrorMessage = "Something went wrong! Please try again later.";
    const userId = userContext.details._id;

    reset();
    fetch(`http://localhost:8081/dashboard/removeSubject/${userId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      body: JSON.stringify(subject),
    })
      .then(async (response) => {
        if (!response.ok) {
          if (response.status === 401) {
            setError({
              isError: true,
              message: "The subject does not exist",
            });
          } else if (response.status === 404) {
            setError({
              isError: true,
              message: "User not Found",
            });
          } else {
            setError({ isError: true, message: genericErrorMessage });
          }
        } else {
          console.log("Subject Deleted");
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, details: data };
          });
          reset();
        }
      })
      .catch((err) => {
        console.log("Error", err.message);
        setError({
          isError: true,
          message: genericErrorMessage,
        });
      });
  };

  const reset = () => {
    setSubjectData({
      subjectName: "",
      subjectGrade: "",
      details: "",
      total: 0,
    });
    setError({ isError: false, message: "" });
    setIsEditing(false);
  };

  return (
    <Grid container className={classes.root}>
      <Grid item className={classes.cardContainer}>
        <AddSubjectCard
          subjects={userContext.details.subjects}
          handleDelete={handleDelete}
        />
      </Grid>
      <Grid item className={classes.formContainer}>
        <form onSubmit={handleSubmit} autoComplete="off">
          {error.isError && <ErrorCard message={error.message} />}
          <div style={{ marginTop: "2rem" }}>
            <InputField
              name="subjectName"
              label="Subject Name"
              type="text"
              handleChange={handleChange}
              value={subjectData.subjectName}
              autoFocus={true}
              error={error.isError}
              required={true}
            />
            <TextField
              className={classes.input}
              id="subjectGrade"
              name="subjectGrade"
              label="Grade"
              onChange={handleChange}
              value={subjectData.subjectGrade}
              helperText="Please select the grade"
              variant="outlined"
              select
              required
              fullWidth
            >
              {gradeLevels.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className={classes.input}
              id="subjectDetails"
              name="details"
              label="Details"
              onChange={handleChange}
              value={subjectData.details}
              variant="outlined"
              rows={6}
              multiline
              fullWidth
            />
            <div className={classes.btnContainer}>
              <Button
                className={classes.button}
                type="submit"
                variant="contained"
                color="secondary"
              >
                {isEditing ? "Edit Subject" : "Add Subject"}
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={reset}
              >
                Clear
              </Button>
            </div>
          </div>
        </form>
      </Grid>
    </Grid>
  );
};

export default AddSubject;
