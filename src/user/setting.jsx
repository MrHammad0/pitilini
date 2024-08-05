import React from 'react'
import Sidebar from './sidebar';
import Navbar from './navbar';
import Set from './Set'
export default function setting() {
  return (
    <>
    <Navbar/>
    <div style={{ display: 'flex' }}>
    <Sidebar />
    <div style={{ flex: 1, marginTop: '2%', margin: '1%' , marginLeft:"12%"}}>
     <Set/>
    </div>
    </div>
    </>
  )
}