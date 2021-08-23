import { Button } from '@material-ui/core';
import Link from 'next/link';
import { blue, white } from '../../constants/CustomColors';




const Pages = ({pageId, bid, numOfPages} : {pageId: string, bid?: boolean, numOfPages: number}) => {
    
    let first = false;
    const intPageId = parseInt(pageId);

    if (intPageId == 1) {
        first = true;
    }

    const list = [
        {
            id: intPageId-1,
            title: (intPageId-1).toString()
        },
        {
            id: intPageId,
            title: pageId
        },
        {
             id: intPageId+1,
            title: (intPageId+1).toString()
        },
         {
            id: intPageId+1,
            title: 'Next'
        },
    ]

    if (numOfPages !== 1) 
        list.unshift( {
            id: intPageId-1,
            title: 'Prev'
        });

     const firstList = [
        {
            id: intPageId,
            title: pageId
        },
        {
             id: intPageId+1,
            title: (intPageId+1).toString()
        },
        {
             id: intPageId+2,
            title: (intPageId+2).toString()
        },
        {
            id: intPageId+1,
            title: 'Next'
        },
    ]

     if (numOfPages !== 1) 
        firstList.unshift( {
            id: intPageId-1,
            title: 'Prev'
        });
    
    const PageButton = ({id, title} : {id: number, title: string}) => {
        if (id > numOfPages) return;
        return (
            <Link key={Math.random() % 100} href={bid === true ? `/bids/${id}` : `/phones/${id}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: id == intPageId ? '#0a85ae' : blue, color: white, margin: '5px'}}>
                        {title}
                    </Button>
            </Link>
        )
    }

    return (
        <div className="page-buttons">
            {first ? firstList.map(x => PageButton(x)) : list.map(x => PageButton(x))}
        </div>
    );
}

export default Pages;