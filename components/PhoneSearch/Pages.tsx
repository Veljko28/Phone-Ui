import { Button } from '@material-ui/core';

const Pages = () => {
    return (
        <div className="page-buttons">
            <Button variant="contained" 
            style={{backgroundColor: '#0cafe5', color: '#fff', margin: '5px'}}>
                Prev
            </Button>
            <Button variant="contained" 
             style={{backgroundColor: '#0cafe5', color: '#fff', margin: '5px'}}>
                1
            </Button>
            <Button variant="contained"  
            style={{backgroundColor: '#0cafe5', color: '#fff', margin: '5px'}}>
                2
            </Button>
            <Button variant="contained" 
             style={{backgroundColor: '#0cafe5', color: '#fff', margin: '5px'}}>
                3
            </Button>
            <Button variant="contained" 
             style={{backgroundColor: '#0cafe5', color: '#fff', margin: '5px'}}>
                Next
            </Button>
        </div>
    );
}

export default Pages;