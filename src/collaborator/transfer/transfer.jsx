import React from 'react'
import Sidebar from '../Cside';
import Navbar from '../Cnav';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Button, Input } from '@mui/material';
import { CiBank } from "react-icons/ci";
import { SiPaytm } from "react-icons/si";
import CollaboratorTransactFund from "./collaboratorTransferFunds"
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function transfer() {
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, marginTop: '2%', margin: '1%', marginLeft: "12%" }}>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={7} lg={7}>
                                <Item style={{ height: "100%" }}>
                                    <div style={{ marginTop: "10%" }}>
                                        <div style={{ textAlign: "start" }}>
                                            <h2>The fast and trusted way to send money online</h2>
                                            <b>Wheather you need to send money to friends down the street or family across the globe , Pitiklini gets your funds there quickly and reliably</b>
                                        </div>
                                        <div style={{ display: "flex" }}>
                                            <Item style={{ margin: "2%" }}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <b>Fast</b>
                                                    <span>Send money online to loved ones across the world.</span>
                                                </div>
                                            </Item>
                                            <Item style={{ margin: "2%" }}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <b>Safe</b>
                                                    <span>Feel secure knowing we have sent over a billion.</span>
                                                </div>
                                            </Item>
                                            <Item style={{ margin: "2%" }}>
                                                <div style={{ display: "flex", flexDirection: "column" }}>
                                                    <b>Great Value</b>
                                                    <span>Great rates , specially offers, and no hidden fees.</span>
                                                </div>
                                            </Item>
                                        </div>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={5} lg={5}>
                                <Item style={{ background: "rgb(230, 170, 20)", display: "flex", flexDirection: "column" }}>
                                    <h3 style={{ margin: "2%" }}>Send Money Online</h3>
                                    <br />
                                    <CollaboratorTransactFund/>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>

                </div>
            </div>
        </>
    )
}
