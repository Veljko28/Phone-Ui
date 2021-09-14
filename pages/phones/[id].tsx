import React from 'react';
import { useRouter } from "next/router";
import { Grid } from "@material-ui/core";

import Pages from '../../components/PhoneSearch/Pages';
import PhoneList from '../../components/PhoneSearch/PhoneList';
import CategoryBar from '../../components/PhoneSearch/CategoryBar';

import Phone from '../../components/models/Phone';
import TitleChange from "../../constants/TitleChange";
import { fetchGet } from '../../constants/CustomFetching';

import { CategoryOptions, State } from '../../redux/reduxTypes';
import { useDispatch, useSelector } from 'react-redux';
import { changePhoneCategory } from '../../redux/actions/phonesActions';
import NotFound from '../../components/NotFound';
import { useTranslation } from 'react-i18next';
import usePagination from '../../constants/pagination';
import useSorting from '../../constants/sorting';
import NoCategory from '../../components/NoCategory';

const phones = () => {

  const router = useRouter()
  const id = router.query['id'];
  const [allPhones, changeAllPhones] = React.useState([]);
  const [list,changeList] = React.useState<any[]>([]);
  const [numOfPages, changeNumOfPages] = React.useState(1);
  const [notValid, changeNotValid] = React.useState(false);
  const [noInCategory, changeNoInCategory] = React.useState(false);

  const options = useSelector((state: State) => state.phones.phoneOptions);

    React.useEffect(() => {
      let defOpt: CategoryOptions = {category: "", brand: "", price: "",sorting: ""};
      const intId = parseInt(id as string);

      const func = async () => {
        defOpt = options;
       
        const res = await fetchGet(`http://localhost:10025/api/v1/phones/all`);
        const json = await res.json();

        changeAllPhones(json);
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
      if (intId === 1 && allPhones.length === 0) func();

      if (allPhones.length !== 0) changeList(usePagination(useSorting(allPhones, options))[intId-1])

      if (allPhones.length === 0 && intId > 1) router.push("/phones/1");

      if (options.category !== defOpt.category || options.brand !== defOpt.brand 
        || options.price !== defOpt.price || options.sorting !== defOpt.sorting ) {
        const pages = usePagination(useSorting(allPhones, options));

        if (pages.length === 0 && allPhones.length !== 0) changeNoInCategory(true);
        else if (noInCategory === true) changeNoInCategory(false);

        changeNumOfPages(pages.length);
        if (pages.length < intId) router.push('/phones/1');
      }

    },[id, options])


   const categoryList = useSorting(list, options);

   const dispatch = useDispatch();
   const { t } = useTranslation();


    return  notValid ? <NotFound t={t} /> : ( 
        <Grid container>
          <TitleChange title={`MobiStore - Phones Page ${id}`} />
            <Grid item xs={12} md={3}>
                <CategoryBar options={options} changeCategory={(value: any) => dispatch(changePhoneCategory(value))}/>
            </Grid> 
            <Grid item xs={12} md={9}>
                {noInCategory ? <NoCategory/> : <PhoneList list={categoryList}/>}
                {!noInCategory && <Pages pageId={id as string} numOfPages={numOfPages}/>}
            </Grid> 
        </Grid>
    )
}

export default phones;