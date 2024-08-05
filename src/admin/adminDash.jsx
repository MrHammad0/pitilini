import React from 'react'
import Adminnav from './adminnav'
import AdminSidebar from './adminSidebar'
import HomeReport from './homeReport'
import KeyInd from './keyInd'
import LatestCustomer from './latestCustomer'
import './admin.css'



export default function adminDash() {
    return (
        <>
            <Adminnav />
            <div style={{ display: 'flex' }}>
                <AdminSidebar />
                <div className='sidebaradminDash'>
                    <div >
                        <div style={{marginLeft:'1%'}}>
                        <HomeReport />
                        </div>
                        <div style={{marginLeft:'1.5%'}}>
                        <KeyInd />
                        </div>
                        <LatestCustomer />
                    </div>
                </div>
            </div>
        </>
    )
}
