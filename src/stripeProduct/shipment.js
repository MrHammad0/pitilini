import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sidebar from '../user/sidebar';
import Navbar from '../user/navbar';
import { Button} from '@mui/material';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Shipment() {
    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex' }}>
                <Sidebar />
                
                <Box sx={{ flexGrow: 1, p: 2 ,marginLeft:'14%'}}>
                    <h4>Products</h4>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Item style={{width:"100%"  , height:"350px"}} >
                                <Carousel autoPlay infiniteLoop showThumbs={false}>
                                    <div>
                                        <img src="../mlc.jpg" alt="Product 1" style={{width:"100%" , height:"340px"}}/>
                                    </div>
                                    <div style={{textAlign:"center" , marginTop:"9%"}}>
                                        <h1 style={{color:"black" , fontSize:"130px" , fontStyle:"italic"}}>CUP</h1>
                                    </div>
                                    <div>
                                        <img src="../d.jpg" alt="Product 3" style={{width:"100%", height:"340px"}}/>
                                    </div>
                                </Carousel>
                            </Item>
                        </Grid>
                        
                        <Grid item xs={12} md={4}>
                            <Item style={{height:"200px" , background:"rgb(230, 170, 20"}}>
                            <div>
                                <b>
                            MLC a cuentas o tarjetas <br /> bancarias
                            </b>
                            </div>
                            <div>
                                <b>
                                Price:€0.99 EUR
                                </b>
                            </div>
                            <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                                <div><Button style={{backgroundColor:'black',color:'white', margin:"2%" ,borderRadius:"8px",width:'50%'}}><Link to={'/mlc/Europe/ship'} style={{textDecoration:'none',color:'white'}}>Ship in Europe</Link></Button></div>
                                <div><Button style={{backgroundColor:'black',color:'white', margin:"2%" ,borderRadius:"8px",width:'50%',marginTop:'2%'}}><Link to={'/mlc/Usa/ship'} style={{textDecoration:'none',color:'white'}}>Ship in USA</Link></Button></div>
                            </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item style={{height:"200px" , background:"rgb(230, 170, 20"}}>
                            <div>
                            <b>Transferencia de CUP a tarjeta o cuentas bancarias</b> 
                            </div>
                            <div>
                              <b>Price:€50.00 EUR</b>  
                            </div>
                            <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                                <div><Button style={{backgroundColor:'black',color:'white', margin:"2%" ,borderRadius:"8px",width:'50%'}}><Link to={'/CUP/Europe/ship'} style={{textDecoration:'none',color:'white'}}>Ship in Europe</Link></Button></div>
                                <div><Button style={{backgroundColor:'black',color:'white', margin:"2%" ,borderRadius:"8px",width:'50%',marginTop:'2%'}}><Link to={'/cup/usa/ship'} style={{textDecoration:'none',color:'white'}}>Ship in USA</Link></Button></div>
                            </div>
                            </Item>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Item style={{height:"200px" , background:"rgb(230, 170, 20"}}>
                            <div>
                            <b>Dólares en La <br /> Habana</b> 
                            </div>
                            <div>
                               <b>Price:€100.00</b> 
                            </div>
                            <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                                <div><Button style={{backgroundColor:'black',color:'white', margin:"2%" ,borderRadius:"8px",width:'50%'}}><Link to={'/USD/Europe/ship'} style={{textDecoration:'none',color:'white'}}>Ship in Europe</Link></Button></div>
                                <div><Button style={{backgroundColor:'black',color:'white', margin:"2%" ,borderRadius:"8px",width:'50%',marginTop:'2%'}}><Link to={'/USD/usa/ship'} style={{textDecoration:'none',color:'white'}}>Ship in USA</Link></Button></div>
                            </div>
                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}
