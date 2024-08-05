import React from 'react'
import Adminnav from './adminnav'
import AdminSidebar from './adminSidebar'
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
                        <KeyInd />
                        <LatestCustomer />
                    </div>
                </div>
            </div>
        </>
    )
}
