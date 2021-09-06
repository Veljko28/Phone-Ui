import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import PhoneDisplaySkeleton from "../components/Skeletons/PhoneDisplaySkeleton";
import { State } from "../redux/reduxTypes";

const test = () => {
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
    <div>Hello</div>
  );
};

export default test;
