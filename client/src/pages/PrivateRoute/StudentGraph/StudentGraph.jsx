import React from "react";
import { useParams } from "react-router-dom";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

import useStyle from "./style";
import { useUserContext } from "../../../context/userContext";
import AddScoreCard from "../../../components/DashboardComponents/AddScoreCard";

const StudentGraph = () => {
  const { subjectId, studentId } = useParams();
  const classes = useStyle();
  const [userContext, setUserContext] = useUserContext();

  const [student] = userContext.details.students.filter(
    (student) => studentId === student._id
  );
  const subjects = student.subjects.filter((subject) => {
    const userSub = userContext.details.subjects;
    for (let i = 0; i < userSub.length; i++) {
      if (userSub[i].subjectName === subject.name) {
        return subject;
      }
    }
    return;
  });

  console.log(subjects);
  console.log(student);

  return (
    <div className={classes.root}>
      <div className={classes.bottom}>
        <section className={classes.info}>
          <div className={classes.nameCard}>
            <Typography variant="h4" component="p">
              {`${student.lastName}, ${student.firstName}`}
            </Typography>
            <Typography variant="subtitle1">{`Grade ${student.grade}`}</Typography>
          </div>
          <div className={classes.infoText}>
            <Typography variant="h5" component="p" gutterBottom>
              Age: {student.age}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Contact: {student.contact}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Strand: {student.strand}
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Specialization: {student.specialization}
            </Typography>
            <Typography variant="h5" component="p">
              All Subjects:
            </Typography>
            <List>
              {subjects.map((subject) => {
                return (
                  <ListItem key={subject.name}>
                    <ListItemText inset primary={subject.name} />
                  </ListItem>
                );
              })}
            </List>
          </div>
        </section>
        <section className={classes.addScoreCard}>
          <AddScoreCard />
        </section>
      </div>
    </div>
  );
};

export default StudentGraph;
