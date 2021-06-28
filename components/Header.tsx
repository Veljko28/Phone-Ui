import React from 'react'
import HelpBar from './HeaderComps/HelpBar'
import MainHeader from './HeaderComps/MainHeader'
import NavBar from './HeaderComps/NavBar'

export const Header = () => {
  return (
    <div>
      <HelpBar/>
      <MainHeader/>
      <NavBar/>
    </div>
  )
}