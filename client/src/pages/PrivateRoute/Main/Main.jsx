import React, { useState } from "react";
import { Grid } from "@material-ui/core";

import SubjectCard from "../../../components/SubjectCard/SubjectCard";
import { useUserContext } from "../../../context/userContext";
import useStyles from "./style";
import EmptyData from "../../../components/EmptyData/EmptyData";
import Search from "../../../components/DashboardComponents/Search";

const Main = () => {
  const [userContext, setUserContext] = useUserContext();
  const [searchSubject, setSearchSubject] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const classes = useStyles();

  const hasSubject = userContext.details.subjects.length !== 0;

  if (!hasSubject) {
    return <EmptyData name="Subjects" />;
  }

  const handleSearch = () => {
    if (!searchInput) {
      setSearchSubject(null);
      return;
    }

    const searchSub = userContext.details.subjects.filter(
      (subject) =>
        subject.subjectName.toUpperCase() === searchInput.toUpperCase()
    );
    console.log(searchSub);

    if (searchSub.length !== 0) {
      setSearchSubject(searchSub);
    } else {
      setSearchSubject([]);
    }
  };

  return (
    <div className={classes.root}>
      <Search
        searchInput={searchInput}
        setSearchInput={setSearchInput}
        handleSearch={handleSearch}
        label="subject name"
      />
      {searchSubject !== null ? (
        searchSubject.map((subject) => {
          return (
            <Grid
              item
              lg={4}
              md={6}
              xs={12}
              className={classes.gridItem}
              key={subject._id}
            >
              <SubjectCard subject={subject} />
            </Grid>
          );
        })
      ) : (
        <Grid container className={classes.container} spacing={0}>
          {userContext.details.subjects.map((subject) => {
            return (
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                className={classes.gridItem}
                key={subject._id}
              >
                <SubjectCard subject={subject} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
};

export default Main;
