import React from 'react'
import {List, ListSubheader, ListItem, ListItemIcon, ListItemText, Collapse} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const CategoryBar = () => {

  const [open, setOpen] = React.useState(-1);

  const handleClick = (id:number) => {
    setOpen(id);
  };

  // add icons and children to the map

  const ListMap = ({id,title} : {id: number, title: string}) => {
    const isOpen = id == open;

    return (
      <div key={id}>
      <ListItem button onClick={() => handleClick(id)}>
        <ListItemText primary={title} />
        {isOpen? <ExpandLess /> : <ExpandMore />}
      </ListItem>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText primary="Starred" />
          </ListItem>
        </List>
      </Collapse>
      </div>
    )
  }

  const list = [
    {
      id: 1,
      title: 'Category'
    },
    {
      id: 2,
      title: 'Brand'
    },
    {
      id: 3,
      title: 'Price'
    },
    {
      id: 4,
      title: 'Screen Size'
    },

  ]

  return (
    <div className="category-bar">
      <List
      component="nav"
      subheader={
        <ListSubheader component="div">
          Nested List Items
        </ListSubheader>
      }
    >
    {list.map(x => ListMap(x))}

    </List>

    </div>
  )
}

export default CategoryBar
