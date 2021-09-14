import React from 'react';
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';

import Phone from '../../components/models/Phone';
import Pages from '../../components/PhoneSearch/Pages';
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';

import TitleChange from "../../constants/TitleChange";
import { fetchGet } from '../../constants/CustomFetching';

import { CategoryOptions, State } from '../../redux/reduxTypes';
import { changeBidCategory } from '../../redux/actions/phonesActions';
import NotFound from '../../components/NotFound';
import { useTranslation } from 'react-i18next';
import usePagination from '../../constants/pagination';
import useSorting from '../../constants/sorting';
import NoCategory from '../../components/NoCategory';

const bids = () => {

  const router = useRouter()
  const id = router.query['id'];
  const [list,changeList] = React.useState([]);
  const [allBids, changeAllBids] = React.useState([]);
  const [numOfPages, changeNumOfPages] = React.useState(1);
  const [notValid, changeNotValid] = React.useState(false);
  const [noInCategory, changeNoInCategory] = React.useState(false);


  const options = useSelector((state: State) => state.phones.bidOptions);

  React.useEffect(() => {
      let defOpt: CategoryOptions = {category: "", brand: "", price: "",sorting: ""};
      const intId = parseInt(id as string);

      const func = async () => {
        defOpt = options;
       
        const res = await fetchGet(`http://localhost:10025/api/v1/bids/all`);
        const json = await res.json();

        changeAllBids(json);
        const listOfPages: any[] = usePagination(json);

        changeNumOfPages(listOfPages.length);

        if (intId <= 0 || intId-1 > numOfPages){
          changeNotValid(true);
          return;
        }
        else changeList(listOfPages[intId-1]);
      }
      
      if (id){
        const regExp = /[a-zA-Z]/g;
        if (regExp.test(id as string)){
          changeNotValid(true);
          return;
        }
      }
      if (intId === 1 && allBids.length === 0) func();

      if (allBids.length !== 0) changeList(usePagination(useSorting(allBids, options))[intId-1])

      if (allBids.length === 0 && intId > 1) router.push("/bids/1");

      if (options.category !== defOpt.category || options.brand !== defOpt.brand 
        || options.price !== defOpt.price || options.sorting !== defOpt.sorting ) {
        const pages = usePagination(useSorting(allBids, options));

        if (pages.length === 0 && allBids.length !== 0) changeNoInCategory(true);
        else if (noInCategory === true) changeNoInCategory(false);

        changeNumOfPages(pages.length);
        if (pages.length < intId) router.push('/bids/1');
      }

    },[id, options])


   const categoryList = useSorting(list, options);


   const dispatch = useDispatch();
   const { t } = useTranslation();

    return notValid ? <NotFound t={t} /> : ( 
        <Grid container>
            <TitleChange title={`MobiStore - Bids Page ${id}`} />
           
            <Grid item xs={12} md={3}>
                <CategoryBar options={options} changeCategory={(value: any) => {
                  dispatch(changeBidCategory(value))
                }}
                   />
            </Grid> 
            <Grid item xs={12} md={9}>
                {noInCategory ? <NoCategory/> : <PhoneList list={categoryList} bids={true}/>}
                {!noInCategory && <Pages pageId={id as string} numOfPages={numOfPages} bid={true}/>}
            </Grid> 
        </Grid>
    )
}

export default bids;