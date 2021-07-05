import { Switch, FormControlLabel } from '@material-ui/core';



const CategorySwitch = ({labelValue} : {labelValue: string}) => {
    return (
        <FormControlLabel
        value="end"
        control={<Switch color="primary" style={{color: '#0cafe5'}}/>}
        label={labelValue}
        labelPlacement="end"
      />
    );
}


export default CategorySwitch;