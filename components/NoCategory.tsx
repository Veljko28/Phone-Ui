import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { State } from "../redux/reduxTypes";
import Image from 'next/image';
import { useTranslation } from "react-i18next";
import { darker_green, blue } from "../constants/CustomColors";

const NoCategory = () => {
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);
  const { t } = useTranslation();

  return (<Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
      <Image src={darkMode ? "/no_category_dark.svg" : "/no_category.svg"} width="550px" height="550px"/>
      <Typography style={{color: darkMode ? darker_green : blue}} variant="h4">{t("noCategory")}</Typography>
    </Grid>
  );
};

export default NoCategory;
