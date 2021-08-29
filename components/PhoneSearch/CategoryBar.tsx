import React from 'react'
import {List, ListItem, ListItemText, Collapse } from '@material-ui/core';

import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { blue, dark_gray, darker_green, gray, white } from '../../constants/CustomColors';
import { useSelector } from 'react-redux';
import { State } from '../../redux/reduxTypes';

const CategoryBar = ({options, changeCategory} : {options: any, changeCategory: (value: any) => any}) => {

  const [open, setOpen] = React.useState(-1);

  const darkMode = useSelector((state: State) => state.userInfo.darkMode);


  const handleClick = (id:number) => {
    if (open == id) setOpen(-1);
    else setOpen(id);
  };

  const ListMap = ({id,title, children} : {id: number, title: string, children: (id: number) => JSX.Element}) => {
    const isOpen = id == open;

    return (
      <div key={id}>
      <ListItem button onClick={() => handleClick(id)} disableRipple>
        <ListItemText primary={title}  style={{color: darkMode ? white : 'black'}}/>
        {isOpen? <ExpandLess  style={{color: darkMode ? white : 'black'}}/> : <ExpandMore   style={{color: darkMode ? white : 'black'}}/>}
      </ListItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {children(id)}
        </List>
      </Collapse>
      </div>
    )
  }

  const selectedStyle = {color: darkMode ? darker_green : blue, marginLeft: '10px'};
  const normalStyle = {color: darkMode ? gray : dark_gray, marginLeft: '10px'};

  const list = [
    {
      id: 1,
      title: 'Category',
      children: (id : number) => (
        <div key={id}>
          <ListItem button disableRipple
          onClick={() => changeCategory({...options, category: "All Phones"})} 
          style={options.category === "All Phones" ? selectedStyle : normalStyle}
          >All Phones</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, category: "android"})} 
          style={options.category === "android" ? selectedStyle : normalStyle}
          >Android Phone</ListItem>
          <ListItem button disableRipple
          onClick={() => changeCategory({...options, category: "ios"})} 
          style={options.category === "ios" ? selectedStyle : normalStyle}
          >IOS Phone</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, category: "other"})} 
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
         {['All', 'Google', 'Apple', 'Samsung', 'Vivo', 'Redmi', 'Alcatel'].map(x => (
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options,brand: x})}
          style={{color: options.brand.toLowerCase() == x.toLowerCase() ? 
            darkMode ? darker_green : blue :
            darkMode ? gray : dark_gray, marginLeft: '10px'}}>{x}</ListItem>
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
          onClick={() => changeCategory({...options, price: "All"})} 
          style={options.price === "All" ? selectedStyle : normalStyle}
          >All</ListItem>
          <ListItem button disableRipple
          onClick={() => changeCategory({...options, price: "100"})} 
          style={options.price === "100" ? selectedStyle : normalStyle}
          >100$-200$</ListItem>
          <ListItem button disableRipple
          onClick={() => changeCategory({...options, price: "200"})} 
          style={options.price === "200" ? selectedStyle : normalStyle}
          >200$-500$</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, price: "500"})} 
          style={options.price === "500" ? selectedStyle : normalStyle}
          >500$-1000$</ListItem>
          <ListItem button disableRipple
          onClick={() => changeCategory({...options, price: "1000"})} 
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
          onClick={() => changeCategory({...options, sorting: "none"})} 
          style={options.sorting === "none" ? selectedStyle : normalStyle}
          >None</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, sorting: "newer"})} 
          style={options.sorting === "newer" ? selectedStyle : normalStyle}
          >Date Created Newer</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, sorting: "older"})} 
          style={options.sorting === "older" ? selectedStyle : normalStyle}
          >Date Created Older</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, sorting: "asc"})} 
          style={options.sorting === "asc" ? selectedStyle : normalStyle}>Price Ascending</ListItem>
          <ListItem button disableRipple 
          onClick={() => changeCategory({...options, sorting: "desc"})} 
          style={options.sorting === "desc" ? selectedStyle : normalStyle}>Price Descending</ListItem>
        </div>
      )
    },
  ]

  return (
    <div className={darkMode ? "category-bar-dark" : "category-bar"}>
      <List
      component="nav"
    >
    {list.map(x => ListMap(x))}
      
    </List>

    </div>
  )
}

export default CategoryBar
