import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Sidebar from '../user/sidebar'
import Navbar from '../user/navbar'
import { SiNetflix } from "react-icons/si";
import { FaAmazon } from "react-icons/fa";
import { SiAdobephotoshop } from "react-icons/si";
import { MdInstallMobile } from "react-icons/md";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LuSettings2 } from "react-icons/lu";
import { SlCalender } from "react-icons/sl";
import { HiMiniArrowsUpDown } from "react-icons/hi2";
import { Button, FormLabel, Input, TextField } from '@mui/material';
import { FaSignal } from "react-icons/fa";
import { MdCall } from "react-icons/md";
import { AiFillMessage } from "react-icons/ai";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
    const [type, settype] = React.useState('');

    const handleChange = (event) => {
        settype(event.target.value);
    };


    const [validity, setValidity] = React.useState('');

    const handleChange2 = (event) => {
        setValidity(event.target.value);
    };

    const [price, setPrice] = React.useState('');

    const handleChange3 = (event) => {
        setPrice(event.target.value);
    };
    return (
        <>
            <Navbar />
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div style={{ flex: 1, marginTop: '2%', margin: '1%', marginLeft: "13%" }}>

                    <div >
                        <h3>Recharge Now</h3>
                    </div>
                    <Grid item xs={12} md={12} lg={12}>
                        <Item style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FormLabel >Your Number</FormLabel>
                                <TextField type='text' />
                            </div>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FormLabel>Ammount</FormLabel>
                                <TextField type='text' />
                            </div>
                        </Item>
                    </Grid>

                    <br />

                    <div style={{ alignItems: "center" }}>
                        <h3>Others Subscriptions</h3>
                    </div>

                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} md={4} lg={4}>
                                <Item>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <h4 style={{ color: "red" }}><SiNetflix /></h4>
                                        <b>Netflix</b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Item>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <h4 ><FaAmazon /></h4>
                                        <b style={{ marginLeft: "1%" }}>Amazon</b>
                                    </div>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Item>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <h4 style={{ color: "darkblue" }}><SiAdobephotoshop /></h4>
                                        <b style={{ marginLeft: "1%" }}>Photoshop</b>
                                    </div>
                                </Item>
                            </Grid>
                        </Grid>
                    </Box>

                    <br />

                    <div >
                        <h3>Packages</h3>
                    </div>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4} lg={4}>
                                <Item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"><LuSettings2 /> Type</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={type}
                                            label="type"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={10} default>All Use</MenuItem>
                                            <MenuItem value={20}>Easy Card</MenuItem>
                                            <MenuItem value={30}>Balance Based</MenuItem>
                                            <MenuItem value={40}>City Offers</MenuItem>
                                            <MenuItem value={50}>Gaming</MenuItem>
                                            <MenuItem value={70}>Data</MenuItem>
                                            <MenuItem value={80}>Call</MenuItem>
                                            <MenuItem value={90}>Messages</MenuItem>
                                            <MenuItem value={100}>Social</MenuItem>
                                            <MenuItem value={110}>International</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"><SlCalender /> Validity</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={validity}
                                            label="validity"
                                            onChange={handleChange2}
                                        >
                                            <MenuItem value={10} default>All</MenuItem>
                                            <MenuItem value={20}>Monthly</MenuItem>
                                            <MenuItem value={30}>Daily</MenuItem>
                                            <MenuItem value={40}>Fortnightly</MenuItem>
                                            <MenuItem value={50}>Weekly</MenuItem>
                                            <MenuItem value={70}>3 Days</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>
                            <Grid item xs={12} md={4} lg={4}>
                                <Item>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label"><HiMiniArrowsUpDown /> Price</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={price}
                                            label="price"
                                            onChange={handleChange3}
                                        >
                                            <MenuItem value={10}>Low to High</MenuItem>
                                            <MenuItem value={20}>High to Low</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                            <Grid item xs={12} md={6} lg={6}>
                                <Item>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <b>Weekly Ultimate</b>
                                        <b> $ 12</b>
                                    </div>
                                    <div style={{ textAlign: "start" }}>
                                        <span>7 Days (- 1000/1000)</span>
                                    </div>
                                    <hr />

                                    <div style={{ display: "flex", alignItems: "start", justifyContent: "space-evenly" }}>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><FaSignal /></span>
                                            <span>GBs</span>
                                            <span>80</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "blue" }}><MdCall /></span>
                                            <span>Onnet Mins</span>
                                            <span>5000</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span style={{ color: "green" }}><MdCall /></span>
                                            <span>Offnet Mins</span>
                                            <span>500</span>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column" }}>
                                            <span><AiFillMessage /></span>
                                            <span>SMS</span>
                                            <span>10000</span>
                                        </div>

                                    </div>

                                    <br />

                                    <div style={{display:"flex" , justifyContent:"space-between", alignItems:"center"}}>
                                        <div style={{width:"50%" , textAlign:"start"}}>
                                        <span>Unlimited onnet Mins , 500 offnet, 80Gbs data (all day)</span>
                                        </div>
                                        <div>
                                        <Button style={{background:"black" , color:"white"}}>Buy Now</Button>
                                        </div>
                                    </div>

                                </Item>
                            </Grid>

                        </Grid>
                    </Box>
                </div>
            </div>
        </>
    );
}
