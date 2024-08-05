import React from 'react'
import Adminnav from './adminnav'
import AdminSidebar from './adminSidebar'
import HomeReport from './homeReport'
import './admin.css'



export default function adminDash() {
    return (
        <>
            <Adminnav />
            <div style={{ display: 'flex' }}>
                <AdminSidebar />
                <div className='sidebaradminDash'>
                    <div >
                        <HomeReport />
                    </div>
                </div>
            </div>
        </>
    )
}
