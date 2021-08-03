import React from 'react';
import { Grid } from "@material-ui/core";
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';
import Pages from '../../components/PhoneSearch/Pages';
import { useRouter } from "next/router";
import TitleChange from "../../constants/TitleChange";
import { fetchGet } from '../../constants/CustomFetching';

const phones = () => {

  const router = useRouter()
  const id = router.query['id'];
  const [list,changeList] = React.useState([]);

    React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/page/${id}`);
        const json = await res.json();
        changeList(json);
      }

      func();
    },[id])

    return ( 
        <Grid container>
          <TitleChange title={`MobiStore - Phones Page ${id}`} />
            <Grid item xs={12} md={3}>
                <CategoryBar/>
            </Grid> 
            <Grid item xs={12} md={9}>
                <PhoneList list={list}/>
                <Pages pageId={id}/>
            </Grid> 
        </Grid>
    )
}

export default phones;