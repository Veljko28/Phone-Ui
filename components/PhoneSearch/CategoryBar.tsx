import React from 'react'
import {List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const CategoryBar = ({options, changeOptions} : {options: any, changeOptions: (value: any) => void}) => {

  const [open, setOpen] = React.useState(-1);

  const handleClick = (id:number) => {
    if (open == id) setOpen(-1);
    else setOpen(id);
  };

  const ListMap = ({id,title, children} : {id: number, title: string, children: (id: number) => JSX.Element}) => {
    const isOpen = id == open;

    return (
      <div key={id}>
      <ListItem button onClick={() => handleClick(id)} disableRipple>
        <ListItemText primary={title} />
        {isOpen? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {children(id)}
        </List>
      </Collapse>
      </div>
    )
  }

  const selectedStyle = {color: '#0cafe5', marginLeft: '10px'};
  const normalStyle = {color: '#999', marginLeft: '10px'};

  const list = [
    {
      id: 1,
      title: 'Category',
      children: (id : number) => (
        <div key={id}>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, category: "All Phones"})} 
          style={options.category === "All Phones" ? selectedStyle : normalStyle}
          >All Phones</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, category: "android"})} 
          style={options.category === "android" ? selectedStyle : normalStyle}
          >Android Phone</ListItem>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, category: "ios"})} 
          style={options.category === "ios" ? selectedStyle : normalStyle}
          >IOS Phone</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, category: "other"})} 
          style={options.category === "other" ? selectedStyle : normalStyle}
          >Others</ListItem>
        </div>
      )
    },
    {
      id: 2,
      title: 'Brand',
      children: (id : number) => (
        <div key={id}>
         {['All', 'Google', 'Apple', 'Samsung', 'Vivo', 'Htc', 'Alcatel'].map(x => (
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options,brand: x})}
          style={{color: options.brand.toLowerCase() == x.toLowerCase() ? '#0cafe5' : '#999', marginLeft: '10px'}}>{x}</ListItem>
         ))}
        </div>
      )
    },
    {
      id: 3,
      title: 'Price',
      children: (id : number) => (
        <div key={id}>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, price: "All"})} 
          style={options.price === "All" ? selectedStyle : normalStyle}
          >All</ListItem>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, price: "100"})} 
          style={options.price === "100" ? selectedStyle : normalStyle}
          >100$-200$</ListItem>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, price: "200"})} 
          style={options.price === "200" ? selectedStyle : normalStyle}
          >200$-500$</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, price: "500"})} 
          style={options.price === "500" ? selectedStyle : normalStyle}
          >500$-1000$</ListItem>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, price: "1000"})} 
          style={options.price === "1000" ? selectedStyle : normalStyle}
          >1000$-1500$</ListItem>
        </div>
      )
    },
    {
      id: 4,
      title: 'Sorting',
      children: (id : number) => (
        <div key={id}>
          <ListItem button disableRipple
          onClick={() => changeOptions({...options, sorting: "none"})} 
          style={options.sorting === "none" ? selectedStyle : normalStyle}
          >None</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, sorting: "newer"})} 
          style={options.sorting === "newer" ? selectedStyle : normalStyle}
          >Date Created Newer</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, sorting: "older"})} 
          style={options.sorting === "older" ? selectedStyle : normalStyle}
          >Date Created Older</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, sorting: "asc"})} 
          style={options.sorting === "asc" ? selectedStyle : normalStyle}>Price Ascending</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeOptions({...options, sorting: "desc"})} 
          style={options.sorting === "desc" ? selectedStyle : normalStyle}>Price Descending</ListItem>
        </div>
      )
    },
  ]

  return (
    <div className="category-bar">
      <List
      component="nav"
    >
    {list.map(x => ListMap(x))}
      
    </List>

    </div>
  )
}

export default CategoryBar
