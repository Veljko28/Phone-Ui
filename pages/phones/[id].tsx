import React from 'react';
import { Grid } from "@material-ui/core";
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';
import Pages from '../../components/PhoneSearch/Pages';
import { useRouter } from "next/router";
import TitleChange from "../../constants/TitleChange";
import { fetchGet } from '../../constants/CustomFetching';
import Phone from '../../components/models/Phone';

const phones = () => {

  const router = useRouter()
  const id = router.query['id'];
  const [list,changeList] = React.useState([]);
  const [options, changeOptions] = React.useState({
    category: "All Phones",
    brand: "All",
    price: "All",
    sorting: "none"
  });

    React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/page/${id}`);
        const json = await res.json();
        changeList(json);
      }

      func();
    },[id])


    const categoryList = list.filter((x: Phone) => {
      if (options.category !== "All Phones") return x.category?.toLowerCase() === options.category.toLowerCase();
      return true;
    });

    const brandList = categoryList.filter((x: Phone) => {
      if (options.brand !== "All") return x.brand?.toLowerCase() === options.brand.toLowerCase();
      return true;
    })

    return ( 
        <Grid container>
          <TitleChange title={`MobiStore - Phones Page ${id}`} />
            <Grid item xs={12} md={3}>
                <CategoryBar options={options} changeOptions={(value: any) => changeOptions(value)}/>
            </Grid> 
            <Grid item xs={12} md={9}>
                <PhoneList 
                list={brandList}
                />
                <Pages pageId={id}/>
            </Grid> 
        </Grid>
    )
}

export default phones;