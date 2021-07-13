import { Grid } from "@material-ui/core";
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';
import Pages from '../../components/PhoneSearch/Pages';
import { useRouter } from "next/router";

const bids = () => {

  const router = useRouter()
  const { id } = router.query

    return ( 
        <Grid container>
            <Grid item xs={12} md={3}>
                <CategoryBar/>
            </Grid> 
            <Grid item xs={12} md={9}>
                <PhoneList bids={true} />
                <Pages pageId={id}/>
            </Grid> 
        </Grid>
    )
}

export default bids;