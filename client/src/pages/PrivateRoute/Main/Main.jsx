import React from "react";

import SubjectCard from "../../../components/SubjectCard/SubjectCard";
import { useUserContext } from "../../../context/userContext";

const Main = () => {
  const [userContext, setUserContext] = useUserContext();

  return (
    <div>
      <SubjectCard />
    </div>
  );
};

export default Main;
