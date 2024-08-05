import React from 'react'
import Sidebar from './Cside';
import Navbar from './Cnav';
import Change from './changeP'
export default function setting() {
  return (
    <>
    <Navbar/>
    <div style={{ display: 'flex' }}>
                <Sidebar />
    <div style={{ flex: 1, marginTop: '2%', margin: '1%' , marginLeft:"12%"}}>
        <Change/>
    </div>
    </div>
    </>
  )
}