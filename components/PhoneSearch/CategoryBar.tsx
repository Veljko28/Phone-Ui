import React from 'react'
import {Typography} from '@material-ui/core';
import CategorySwitch from './CategorySwitch';

const CategoryBar = () => {
  return (
    <div className="category-bar">
      <Typography variant="subtitle1">Cateogry</Typography>
        <CategorySwitch labelValue="All"/>
        <CategorySwitch labelValue="Apple"/>
        <CategorySwitch labelValue="Google"/>
        <CategorySwitch labelValue="Xiaomi"/>         
        <CategorySwitch labelValue="Huawei"/>         
    </div>
  )
}

export default CategoryBar
