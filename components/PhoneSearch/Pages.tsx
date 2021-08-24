import { Button } from '@material-ui/core';
import Link from 'next/link';
import { blue, white } from '../../constants/CustomColors';




const Pages = ({pageId, bid, numOfPages} : {pageId: string, bid?: boolean, numOfPages: number}) => {
    
    const intPageId = parseInt(pageId);

    const PageButton = ({id} : {id: number}) => {
        return (
            <Link key={Math.random() % 100} href={bid === true ? `/bids/${id}` : `/phones/${id}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: id == intPageId ? '#0a85ae' : blue, color: white, margin: '5px'}}>
                        {id}
                    </Button>
            </Link>
        )
    }

    const PrevButton = () => {
        return (<Link key={Math.random() % 100} href={bid === true ? `/bids/${intPageId-1}` : `/phones/${intPageId-1}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: blue, color: white, margin: '5px'}}>
                        Prev
                    </Button>
            </Link>)
    }

     const NextButton = () => {
        return (<Link key={Math.random() % 100} href={bid === true ? `/bids/${intPageId+1}` : `/phones/${intPageId+1}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: blue, color: white, margin: '5px'}}>
                        Next
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