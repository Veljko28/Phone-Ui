import { Grid } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import PhoneDisplaySkeleton from "../components/Skeletons/PhoneDisplaySkeleton";
import { State } from "../redux/reduxTypes";

const test = () => {
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
    <PhoneDisplaySkeleton darkMode={darkMode}/>
  );
};

export default test;
