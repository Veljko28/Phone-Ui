import React from 'react';
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";

import Pages from '../../components/PhoneSearch/Pages';
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';

import Phone from '../../components/models/Phone';
import TitleChange from "../../constants/TitleChange";
import { fetchGet } from '../../constants/CustomFetching';

import { State } from '../../redux/reduxTypes';
import { useDispatch, useSelector } from 'react-redux';
import { changePhoneCategory } from '../../redux/actions/phonesActions';

const phones = () => {

  const router = useRouter()
  const id = router.query['id'];
  const [list,changeList] = React.useState([]);
  const [numOfPages, changeNumOfPages] = React.useState(1);

  const options = useSelector((state: State) => state.phones.phoneOptions);

    React.useEffect(() => {
      const func = async () => {
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/page/${id}`);
        const json = await res.json();
        changeList(json.phones);
        changeNumOfPages(json.numOfPages);
      }
      
      if (id) func();
    },[id])
    
    const categoryList = list.filter((x: Phone) => {
      if (options.category !== "All Phones") return x.category?.toLowerCase() === options.category.toLowerCase();
      return true;
    }).filter((x: Phone) => {
      if (options.brand !== "All") return x.brand?.toLowerCase() === options.brand.toLowerCase();
      return true;
    }).filter((x: Phone) => {
      if (options.price !== 'All') {
        if (options.price === '100') return x.price >= 100 && x.price < 200;
        else if (options.price === '200') return x.price >= 200 && x.price < 500;
        else if (options.price === '500') return x.price >= 500 && x.price < 1000;
        else if (options.price === '1000') return x.price >= 1000 && x.price <= 1500;
      }
      return true;
    })

    if (options.sorting === "asc"){
      categoryList.sort((a: any, b: any) => b.price - a.price);
    }
    else if (options.sorting === "desc"){
      categoryList.sort((a: any, b: any) => a.price - b.price);
    }
    else if (options.sorting === "newer"){
      categoryList.sort((a: any, b: any) => {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return (dateA as any) - (dateB as any);
      })
    }
    else if (options.sorting === "older"){
       categoryList.sort((a: any, b: any) => {
        const dateA = new Date(a.dateCreated);
        const dateB = new Date(b.dateCreated);
        return (dateB as any) - (dateA as any);
      })
    }

   const dispatch = useDispatch();

    return ( 
        <Grid container>
          <TitleChange title={`MobiStore - Phones Page ${id}`} />
            <Grid item xs={12} md={3}>
                <CategoryBar options={options} changeCategory={(value: any) => dispatch(changePhoneCategory(value))}/>
            </Grid> 
            <Grid item xs={12} md={9}>
                <PhoneList 
                list={categoryList}
                />
                <Pages pageId={id as string} numOfPages={numOfPages}/>
            </Grid> 
        </Grid>
    )
}

export default phones;