import { Grid } from "@material-ui/core";
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';
import Pages from '../../components/PhoneSearch/Pages';
import { useRouter } from "next/router";
import TitleChange from "../../constants/TitleChange";

const phones = () => {

  const router = useRouter()
  const { id } = router.query

    return ( 
        <Grid container>
          <TitleChange title={`MobiStore - Phones Page ${id}`} />
            <Grid item xs={12} md={3}>
                <CategoryBar/>
            </Grid> 
            <Grid item xs={12} md={9}>
                <PhoneList/>
                <Pages pageId={id}/>
            </Grid> 
        </Grid>
    )
}

export default phones;