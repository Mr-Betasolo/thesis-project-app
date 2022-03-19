import React from "react";
import { useParams } from "react-router-dom";

import { useUserContext } from "../../../context/userContext";

const SingleSubject = () => {
  const [userContext, setUserContext] = useUserContext();
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
  });

  students = students.filter((student) => student !== undefined);
  console.log(subjectName);
  console.log(students);

  return <div>SingleSubject</div>;
};

export default SingleSubject;
