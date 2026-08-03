import React from 'react'
import { Text } from '../Text/Text';
import { RxInfoCircled } from "react-icons/rx";
import { CgMenuBoxed } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import style from './Navbar.module.css'


export const Navbar = () => {
  return (
    <nav>
        <div className={style.infoIcon}>
        <RxInfoCircled/>
        </div>
        <div className={style.location} ><Text variant='h1'>locat..</Text></div>
        <div className={style.icons} >
        <div className={style.SearchIcon}>
        <BsSearch/></div>
        <div className={style.icon}><CgMenuBoxed/> 
        </div>
       </div>
        
    </nav>
  )
}
