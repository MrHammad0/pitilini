import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input } from '@mui/material';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Cside from './Cside';
import Cnav from './Cnav';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const GeneratePaymentLink = () => {
    const [collaboratorId, setCollaboratorId] = useState('');
    const [amount, setAmount] = useState('');
    const [paymentLink, setPaymentLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/generate-payment-link`, {
                collaboratorId,
                amount,
            });
            setPaymentLink(response.data.paymentLink);
        } catch (error) {
            console.error('Error generating payment link:', error);
        }
    };

    return (
        <>
            <div style={{ marginLeft: "17%" }}>
                <Cnav />
            </div>
            <div style={{ display: 'flex' }}>
                <Cside />
                <div className="sidebarland">

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6} md={6}>
                                <Item style={{ background: "rgb(230, 170, 20)", height: "450px", display: "flex", alignItems: 'center' }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h3>Share payment links wherever you want to</h3>
                                        <p>Customize your checkout page, then copy and paste the link into emails,text messages,or on social media. With one click you can accept online payments easily.</p>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <Item style={{ height: "450px", display: "flex", alignItems: 'center', justifyContent: "center" }}>
                                    <div>
                                        <h2 style={{ margin: "1%", width: "100%" }}>Generate Payment Link</h2>
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <Input
                                                    type="text"
                                                    placeholder='Collaborator ID:'
                                                    value={collaboratorId}
                                                    onChange={(e) => setCollaboratorId(e.target.value)}
                                                    style={{ margin: "1%", width: "100%" }}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    type="number"
                                                    value={amount}
                                                    placeholder='Amount:'
                                                    onChange={(e) => setAmount(e.target.value)}
                                                    style={{ margin: "1%", width: "100%" }}
                                                />
                                            </div>
                                            <Button type="submit" style={{ margin: "1%", background: "black", color: "white", width: "100%" }}>Generate</Button>
                                        </form>
                                        {paymentLink && (
                                            <div>
                                                <p>Payment Link: <a href={paymentLink}>{paymentLink}</a></p>
                                            </div>
                                        )}
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>

                </div>
            </div>
        </>
    );
};

export default GeneratePaymentLink;
