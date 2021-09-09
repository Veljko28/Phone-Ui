import { Button } from '@material-ui/core';
import Link from 'next/link';
import { blue, darker_green, dark_green, white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';
import { useTranslation } from 'react-i18next';




const Pages = ({pageId, bid, numOfPages} : {pageId: string, bid?: boolean, numOfPages: number}) => {

   const darkMode = useSelector((state: State) => state.userInfo.darkMode);
   const { t } = useTranslation();
    
    const intPageId = parseInt(pageId);

    const PageButton = ({id} : {id: number}) => {
        return (
            <Link key={Math.random() % 100} href={bid === true ? `/bids/${id}` : `/phones/${id}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: id == intPageId ? 
                    darkMode ? "#326307" : '#0a85ae' :
                    darkMode ? darker_green : blue, color: white, margin: '5px'}}>
                        {id}
                    </Button>
            </Link>
        )
    }

    const PrevButton = () => {
        return (<Link key={Math.random() % 100} href={bid === true ? `/bids/${intPageId-1}` : `/phones/${intPageId-1}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: '5px'}}>
                      {t("pages.prev")}
                    </Button>
            </Link>)
    }

     const NextButton = () => {
        return (<Link key={Math.random() % 100} href={bid === true ? `/bids/${intPageId+1}` : `/phones/${intPageId+1}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: darkMode ? darker_green : blue, color: white, margin: '5px'}}>
                        {t("pages.next")}
                    </Button>
            </Link>)
    }

    return (
        <div className="page-buttons">
            {intPageId > 1 ? <PrevButton/> : null}
            {intPageId > 1 ? <PageButton id={intPageId-1}/> : null}
            <PageButton id={intPageId}/>
            {intPageId < numOfPages ? <PageButton id={intPageId+1}/> : null}
            {intPageId !== numOfPages ? <NextButton/> : null}
        </div>
    );
}

export default Pages;