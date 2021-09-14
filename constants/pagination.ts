import Phone from "../components/models/Phone";

const usePagination = (list: any[]) => {
   let pageList: Phone[] = [];
   const listOfPages: any[] = [];

    list.forEach((x: Phone, idx: number) => {
          pageList.push(x);

          if (pageList.length === 10 || idx === list.length-1 ) {
            listOfPages.push(pageList);
            pageList = [];
          }
        }) 
    return listOfPages;
}

export default usePagination;