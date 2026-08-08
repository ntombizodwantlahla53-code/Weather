import React from 'react'
import { Text } from '../Text/Text';
import { RxInfoCircled } from "react-icons/rx";
import { CgMenuBoxed } from "react-icons/cg";
import { BsSearch } from "react-icons/bs";
import style from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar';


interface NavbarProps {
  onSearch: (query: string) => void;
  location: string
  onSettings: () => void
}

export const Navbar = ({ onSearch, location, onSettings }: NavbarProps) => {
  return (
    <nav>
        <div className={style.infoIcon}>
        <RxInfoCircled/>
        </div>
        
        <div className={style.location} ><h2>{location}</h2></div>
        <div className={style.icons} >
        <div className={style.SearchIcon}><SearchBar onSearch={onSearch}/>
        </div><BsSearch/>
        <div
  className={style.icon}
  onClick={onSettings}
>
  <CgMenuBoxed />
</div>
       </div>
        
    </nav>
  )
}
