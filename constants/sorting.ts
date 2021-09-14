import Phone from "../components/models/Phone";
import { CategoryOptions } from "../redux/reduxTypes";

const useSorting = (list: any, options: CategoryOptions) => {
  const categoryList = list?.filter((x: Phone) => {
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

    return categoryList;
}

export default useSorting;