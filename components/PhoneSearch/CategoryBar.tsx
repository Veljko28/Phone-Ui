import React from 'react'
import {List, ListItem, ListItemText, Collapse } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const CategoryBar = () => {

  const [open, setOpen] = React.useState(-1);
  const [sort, changeSort] = React.useState(0);

  const handleClick = (id:number) => {
    if (open == id) setOpen(-1);
    else setOpen(id);
  };

  // add icons and children to the map

  const ListMap = ({id,title, children} : {id: number, title: string, children: () => JSX.Element}) => {
    const isOpen = id == open;

    return (
      <div key={id}>
      <ListItem button onClick={() => handleClick(id)} disableRipple>
        <ListItemText primary={title} />
        {isOpen? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
            {children()}
        </List>
      </Collapse>
      </div>
    )
  }

  const list = [
    {
      id: 1,
      title: 'Category',
      children: () => (
        <div>
          <ListItem button disableRipple style={{color: '#0cafe5', marginLeft: '10px'}}>All Phones</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Android Phone</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>IOS Phone</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Others</ListItem>
        </div>
      )
    },
    {
      id: 2,
      title: 'Brand',
      children: () => (
       <div>
          <ListItem button disableRipple style={{color: '#0cafe5', marginLeft: '10px'}}>All</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Google</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Apple</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Samsung</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Huwaei</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Redmi</ListItem>
        </div>
      )
    },
    {
      id: 3,
      title: 'Price',
      children: () => (
        <div>
          <ListItem button disableRipple style={{color: '#0cafe5', marginLeft: '10px'}}>All</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>100$-200$</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>200$-500$</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>500$-1000$</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>1000$-1500$</ListItem>
        </div>
      )
    },
    {
      id: 4,
      title: 'Sorting',
      children: () => (
        <div>
          <ListItem button disableRipple style={{color: '#0cafe5', marginLeft: '10px'}}>None</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Best Match</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Price Ascending</ListItem>
          <ListItem button disableRipple style={{color: '#999', marginLeft: '10px'}}>Price Descending</ListItem>
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
