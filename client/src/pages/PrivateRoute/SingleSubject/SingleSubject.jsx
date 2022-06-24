import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { useUserContext } from "../../../context/userContext";
import StudentCard from "../../../components/StudentCard/StudentCard";
import Search from "../../../components/DashboardComponents/Search";
import useStyles from "./style";

const SingleSubject = () => {
  const [userContext, setUserContext] = useUserContext();
  const [searchStudent, setSearchStudent] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const classes = useStyles();
  const { subjectId } = useParams();

  const [subjectName] = userContext.details.subjects.filter(
    (subject) => subject._id === subjectId
  );

  let students = userContext.details.students.map((student) => {
    const hasSubject = student.subjects.some(
      (subject) => subject.name === subjectName.subjectName
    );
    if (hasSubject) {
      return student;
    }
    return undefined;
  });

  students = students.filter((student) => student !== undefined);

  const handleSearch = () => {
    if (!searchInput) {
      setSearchStudent(null);
      return;
    }
    const searchStud = students.filter(
      (student) => student.lastName.toUpperCase() === searchInput.toUpperCase()
    );
    console.log(searchStud);

    if (searchStud.length !== 0) {
      setSearchStudent(searchStud);
    } else {
      setSearchStudent([]);
    }
  };

  return (
    <div className={classes.root}>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        label="last name"
      />
      <Grid container spacing={2} className={classes.container}>
        {searchStudent !== null
          ? searchStudent.map((student) => {
              return (
                <Grid
                  item
                  key={student._id}
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.gridItem}
                >
                  <StudentCard student={student} subject />
                </Grid>
              );
            })
          : students.map((student) => {
              return (
                <Grid
                  item
                  key={student._id}
                  xs={12}
                  md={6}
                  lg={4}
                  className={classes.gridItem}
                >
                  <StudentCard student={student} subject />
                </Grid>
              );
            })}
      </Grid>
    </div>
  );
};

export default SingleSubject;
