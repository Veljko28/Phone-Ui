import { Button } from '@material-ui/core';
import Link from 'next/link';
import { blue, white } from '../../constants/CustomColors';




const Pages = ({pageId, bid} : {pageId: any, bid?: boolean}) => {
    
    let first = false;

    if (pageId == 1) {
        first = true;
    }

    const list = [
        {
            id: parseInt(pageId)-1,
            title: 'Prev'
        },
        {
            id: parseInt(pageId)-1,
            title: (parseInt(pageId)-1).toString()
        },
        {
            id: pageId,
            title: pageId
        },
        {
             id: parseInt(pageId)+1,
            title: (parseInt(pageId)+1).toString()
        },
         {
            id: parseInt(pageId)+1,
            title: 'Next'
        },
    ]

     const firstList = [
        {
            id: '1#',
            title: 'Prev'
        },
        {
            id: pageId,
            title: pageId
        },
        {
             id: parseInt(pageId)+1,
            title: (parseInt(pageId)+1).toString()
        },
        {
             id: parseInt(pageId)+2,
            title: (parseInt(pageId)+2).toString()
        },
        {
            id: parseInt(pageId)+1,
            title: 'Next'
        },
    ]
    
    const PageButton = ({id, title} : {id: number, title: string}) => {
        return (
            <Link key={Math.random() % 100} href={bid === true ? `/bids/${id}` : `/phones/${id}`}>
                    <Button variant="contained" 
                    style={{backgroundColor: id == pageId ? '#0a85ae' : blue, color: white, margin: '5px'}}>
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