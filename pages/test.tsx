import { Grid } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import React from "react";
import { useSelector } from "react-redux";
import PhoneDisplaySkeleton from "../components/Skeletons/PhoneDisplaySkeleton";
import { State } from "../redux/reduxTypes";

const test = () => {
  const darkMode = useSelector((state: State) => state.userInfo.darkMode);

  return (
      <Grid container style={{padding: 23, display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex'}}>
              <Skeleton width="100px" height="20px" variant="rect" style={{margin: 5, marginRight: 20}}/>
              <Skeleton width="200px" height="20px" variant="rect" style={{margin: 5}}/>
            </div>

            <div>
              <Skeleton width="100%" height="18px" variant="rect" style={{margin: 5}}/>
              <Skeleton width="100%" height="18px" variant="rect" style={{margin: 5}}/>
              <Skeleton width="100%" height="18px" variant="rect" style={{margin: 5}}/>
            </div>
        </Grid>
  );
};

export default test;
