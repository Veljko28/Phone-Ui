import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../redux/reduxTypes";
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { darker_green, blue } from "../constants/CustomColors";
import NoCategory from "../components/NoCategory";

const test = () => {
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const { t } = useTranslation();

  return (<>
    <NoCategory/>
  </>);
};

export default test;
