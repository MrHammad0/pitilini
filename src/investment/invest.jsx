import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './inves.css'
import { Button } from '@mui/material';
import { IoMdAddCircle } from "react-icons/io";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import Chart from 'chart.js/auto';
import { useRef, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Sidebar from '../user/sidebar'
import Navbar from '../user/navbar'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "rgb(230, 170, 20)",
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(Venture, Stocks, Bonds, Deposit) {
    return { Venture, Stocks, Bonds, Deposit };
}

const rows = [
    createData('Venture Capital', "37%", "$ 4345,00", "$ 4345,00",),
    createData('Stocks', "37%", "$ 4345,00", "$ 4345,00"),
    createData('Bonds', "37%", "$ 4345,00", "$ 4345,00"),
    createData('Deposit', "37%", "$ 4345,00", "$ 4345,00"),
];

const DonutChart = ({ data }) => {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                data: data.values,
                backgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#4BC0C0', '#FFCE56'],
            },
        ],
    };

    return <Doughnut data={chartData} />;
};

const data = {
    values: [37, 37, 37, 37],
    currentValues: ['$4,345.00', '$4,345.00', '$4,345.00', '$4,345.00'],
    result: '$100.00 (+0.06%)',
    investmentCost: '$534.00',
    currentValue: '$634.00',
    riskProfile: 'Moderately aggressive',
    labels: ['Venture Capital', 'Stocks', 'Bonds', 'Deposit'],
};

const ProfitChart = () => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create new chart instance
        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                datasets: [
                    {
                        label: 'Profit',
                        data: [0, 59, 80, 81, 56, 55, 28, 65, 59, 80, 10, 27],
                        borderColor: 'rgb(230, 170, 20)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                    },
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        return () => {
            // Cleanup chart instance on component unmount
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return <canvas ref={chartRef} />;
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function FullWidthGrid() {
    return (
        <>
        <div className='nav'>
            <Navbar />
            </div>
            <div style={{ display: 'flex' }}>
                <Sidebar />
                <div className='invest'>
                <div style={{ display: "flex" }}>
                <Box sx={{ flexGrow: 1, width: "30%", margin: "1%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            Choose a stratagy <br /> which fits your profile
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item className='bgimg' style={{ borderRadius: "15px" }}>
                                <div style={{ textAlign: "start", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "7px", color: "white" }}>Moderately Aggressive</span>
                                    <b style={{ color: "white" }}>Oil & Gas Sector</b>
                                </div>

                                <br />

                                <div style={{ textAlign: "start", display: "flex", alignItems: "center" }}>
                                    <Button style={{ background: "white", color: "black", width: "9%" }}>+9.9%</Button>
                                    <span style={{ fontSize: "6px", color: "white", width: "15%", marginLeft: "1%" }}>Annually in US Dollars</span>
                                </div>

                                <br />

                                <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                                    <div>
                                        <IoMdAddCircle />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1%" }}>
                                        <span style={{ fontSize: "7px" }}>+39% NVTK (NOVATECH PLC)</span>
                                        <span style={{ fontSize: "4px" }}>25 October, 15:24</span>
                                    </div>
                                </div>

                                <br />

                                <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                                    <div>
                                        <IoMdAddCircle />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1%" }}>
                                        <span style={{ fontSize: "7px" }}>+3.9% NYMEX</span>
                                        <span style={{ fontSize: "4px" }}>25 October, 15:24</span>
                                    </div>
                                </div>

                                <br />

                                <div style={{ display: "flex", color: "white", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src="/ls.jpg" style={{ width: "30px", height: "30px", borderRadius: "10px" }} />

                                        <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
                                            <span style={{ fontSize: "8px", marginLeft: "2%" }}>Innovative Lead Sap</span>
                                            <span style={{ fontSize: "5px", marginLeft: "2%" }}>USERNAME</span>
                                        </div>
                                    </div>
                                    <b>
                                        <FaArrowAltCircleRight />
                                    </b>
                                </div>

                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item className='bgimg' style={{ borderRadius: "15px" }}>
                                <div style={{ textAlign: "start", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "7px", color: "white" }}>Moderately Aggressive</span>
                                    <b style={{ color: "white" }}>Oil & Gas Sector</b>
                                </div>

                                <br />

                                <div style={{ textAlign: "start", display: "flex", alignItems: "center" }}>
                                    <Button style={{ background: "white", color: "black", width: "9%" }}>+9.9%</Button>
                                    <span style={{ fontSize: "6px", color: "white", width: "15%", marginLeft: "1%" }}>Annually in US Dollars</span>
                                </div>

                                <br />

                                <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                                    <div>
                                        <IoMdAddCircle />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1%" }}>
                                        <span style={{ fontSize: "7px" }}>+39% NVTK (NOVATECH PLC)</span>
                                        <span style={{ fontSize: "4px" }}>25 October, 15:24</span>
                                    </div>
                                </div>

                                <br />

                                <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                                    <div>
                                        <IoMdAddCircle />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1%" }}>
                                        <span style={{ fontSize: "7px" }}>+3.9% NYMEX</span>
                                        <span style={{ fontSize: "4px" }}>25 October, 15:24</span>
                                    </div>
                                </div>

                                <br />

                                <div style={{ display: "flex", color: "white", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src="/ls.jpg" style={{ width: "30px", height: "30px", borderRadius: "10px" }} />

                                        <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
                                            <span style={{ fontSize: "8px", marginLeft: "2%" }}>Innovative Lead Sap</span>
                                            <span style={{ fontSize: "5px", marginLeft: "2%" }}>USERNAME</span>
                                        </div>
                                    </div>
                                    <b>
                                        <FaArrowAltCircleRight />
                                    </b>
                                </div>

                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item className='bgimg' style={{ borderRadius: "15px" }}>
                                <div style={{ textAlign: "start", display: "flex", flexDirection: "column" }}>
                                    <span style={{ fontSize: "7px", color: "white" }}>Moderately Aggressive</span>
                                    <b style={{ color: "white" }}>Oil & Gas Sector</b>
                                </div>

                                <br />

                                <div style={{ textAlign: "start", display: "flex", alignItems: "center" }}>
                                    <Button style={{ background: "white", color: "black", width: "9%" }}>+9.9%</Button>
                                    <span style={{ fontSize: "6px", color: "white", width: "15%", marginLeft: "1%" }}>Annually in US Dollars</span>
                                </div>

                                <br />

                                <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                                    <div>
                                        <IoMdAddCircle />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1%" }}>
                                        <span style={{ fontSize: "7px" }}>+39% NVTK (NOVATECH PLC)</span>
                                        <span style={{ fontSize: "4px" }}>25 October, 15:24</span>
                                    </div>
                                </div>

                                <br />

                                <div style={{ color: "white", display: "flex", alignItems: "center" }}>
                                    <div>
                                        <IoMdAddCircle />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "start", marginLeft: "1%" }}>
                                        <span style={{ fontSize: "7px" }}>+3.9% NYMEX</span>
                                        <span style={{ fontSize: "4px" }}>25 October, 15:24</span>
                                    </div>
                                </div>

                                <br />

                                <div style={{ display: "flex", color: "white", alignItems: "center", justifyContent: "space-between" }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <img src="/ls.jpg" style={{ width: "30px", height: "30px", borderRadius: "10px" }} />

                                        <div style={{ display: "flex", flexDirection: "column", textAlign: "start" }}>
                                            <span style={{ fontSize: "8px", marginLeft: "2%" }}>Innovative Lead Sap</span>
                                            <span style={{ fontSize: "5px", marginLeft: "2%" }}>USERNAME</span>
                                        </div>
                                    </div>
                                    <b>
                                        <FaArrowAltCircleRight />
                                    </b>
                                </div>

                            </Item>
                        </Grid>
                    </Grid>
                </Box>


                <Box sx={{ flexGrow: 1, width: "100%", margin: "2%" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <div style={{ display: "flex" }}>
                                <div style={{ margin: "1%" }}>
                                    <img src="/atm.jpg" style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
                                </div>
                                <div style={{ margin: "1%" }}>
                                    <b>USERNAME</b>
                                    <p style={{ fontSize: "9px" }}>hello world how are you</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item style={{background:"rgb(230, 170, 20)" , borderRadius:"12px"}}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "black" }}>Account 1 (NP453563)</span>
                                    <h3 style={{ color: "black", cursor: "pointer" }}><IoMdArrowDropdownCircle /></h3>
                                </div>

                                <br />

                                <div style={{ display: "flex", justifyContent: "space-between", width: "60%" }}>
                                    <b style={{ color: "black" }}>Active Stratagy</b>
                                    <b style={{ color: "black" }}>Total Ammount</b>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "60.5%" }}>
                                    <h4 style={{ color: "black" }}>Us Investment Portfolio</h4>
                                    <h4 style={{ color: "black" }}>$ 1000,00</h4>
                                </div>

                                <br />

                                <div style={{ display: "flex", justifyContent: "space-between", width: "60.5%" }}>
                                    <div style={{ textAlign: "start", display: "flex", alignItems: "center" }}>
                                        <Button style={{ background: "black", color: "white", width: "9%" }}>+9.9%</Button>
                                        <span style={{ fontSize: "10px", color: "black", marginLeft: "1%" }}>Annually in US Dollars</span>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: 'column', alignItems: "start" }}>
                                        <b style={{ color: "black" }}>Available Funds</b>
                                        <h4 style={{ color: "black" }}>$1000,00</h4>
                                    </div>
                                </div>

                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item style={{background:"rgb(230, 170, 20)" , borderRadius:"12px"}}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "black" }}>Account 1 (NP453563)</span>
                                    <h3 style={{ color: "black", cursor: "pointer" }}><IoMdArrowDropdownCircle /></h3>
                                </div>

                                <br />

                                <div style={{ display: "flex", justifyContent: "space-between", width: "60%" }}>
                                    <b style={{ color: "black" }}>Active Stratagy</b>
                                    <b style={{ color: "black" }}>Total Ammount</b>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "60.5%" }}>
                                    <h4 style={{ color: "black" }}>Us Investment Portfolio</h4>
                                    <h4 style={{ color: "black" }}>$ 1000,00</h4>
                                </div>

                                <br />

                                <div style={{ display: "flex", justifyContent: "space-between", width: "60.5%" }}>
                                    <div style={{ textAlign: "start", display: "flex", alignItems: "center" }}>
                                        <Button style={{ background: "black", color: "white", width: "9%" }}>+9.9%</Button>
                                        <span style={{ fontSize: "10px", color: "black", marginLeft: "1%" }}>Annually in US Dollars</span>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: 'column', alignItems: "start" }}>
                                        <b style={{ color: "black" }}>Available Funds</b>
                                        <h4 style={{ color: "black" }}>$1000,00</h4>
                                    </div>
                                </div>

                            </Item>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Item style={{background:"rgb(230, 170, 20)" , borderRadius:"12px"}}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <span style={{ color: "black" }}>Account 1 (NP453563)</span>
                                    <h3 style={{ color: "black", cursor: "pointer" }}><IoMdArrowDropdownCircle /></h3>
                                </div>

                                <br />

                                <div style={{ display: "flex", justifyContent: "space-between", width: "60%" }}>
                                    <b style={{ color: "black" }}>Active Stratagy</b>
                                    <b style={{ color: "black" }}>Total Ammount</b>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", width: "60.5%" }}>
                                    <h4 style={{ color: "black" }}>Us Investment Portfolio</h4>
                                    <h4 style={{ color: "black" }}>$ 1000,00</h4>
                                </div>

                                <br />

                                <div style={{ display: "flex", justifyContent: "space-between", width: "60.5%" }}>
                                    <div style={{ textAlign: "start", display: "flex", alignItems: "center" }}>
                                        <Button style={{ background: "black", color: "white", width: "9%" }}>+9.9%</Button>
                                        <span style={{ fontSize: "10px", color: "black", marginLeft: "1%" }}>Annually in US Dollars</span>
                                    </div>

                                    <div style={{ display: "flex", flexDirection: 'column', alignItems: "start" }}>
                                        <b style={{ color: "black" }}>Available Funds</b>
                                        <h4 style={{ color: "black" }}>$1000,00</h4>
                                    </div>
                                </div>

                            </Item>
                        </Grid>
                    </Grid>
                </Box>
            </div>

            <div style={{ textAlign: "center" }}>
                <h3>PROFITABLE CHART</h3>
            </div>

            <Box sx={{ flexGrow: 1, margin: "2%" }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <Item>
                            <ProfitChart />

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <div style={{ width: "30%" }}>
                                    <DonutChart data={data} />
                                </div>

                                <div style={{ width: "100%" }}>
                                    <TableContainer component={Paper}>
                                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Instruments</StyledTableCell>
                                                    <StyledTableCell>Share</StyledTableCell>
                                                    <StyledTableCell>Current Values</StyledTableCell>
                                                    <StyledTableCell>Result (today)</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <StyledTableRow key={row.Venture}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {row.Venture}
                                                        </StyledTableCell>
                                                        <StyledTableCell >{row.Stocks}</StyledTableCell>
                                                        <StyledTableCell >{row.Bonds}</StyledTableCell>
                                                        <StyledTableCell >{row.Deposit}</StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                            <hr />
                            <div style={{ textAlign: "start" }}>
                                <Button style={{ background: "white", border: "1px solid black", color: "black" }}>Reset Stratagy</Button>
                            </div>
                        </Item>
                    </Grid>
                </Grid>
            </Box>

            <div style={{textAlign:"center"}}>
                <h3>STRATAGIES</h3>
            </div>
            
            <Grid item xs={12} md={12} style={{margin:"2%"}}>
                <Item>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "start" }}>
                            <span>Account 3 (NP457643)</span>
                            <br />
                            <br />
                            <span>Total ammount</span>
                            <b>$ 1000</b>
                            <br />
                            <br />
                            <span>Available Funds</span>
                            <b>$ 700</b>
                        </div>
                        <div style={{ background: "rgb(230, 170, 20)", display: "flex", flexDirection: "column", borderRadius: "20px", alignItems: "center", justifyContent: "center", width: "50%" }}>
                            <b style={{ margin: "2%" }}>Available Stratagies For This Account : 27</b>
                            <span style={{ margin: "2%" }}>Risk-profile: moderately aggressive</span>
                            <Button style={{ margin: "2%", background: "black", color: "white", width: "50%" }}>Choose Plan</Button>
                        </div>
                    </div>
                </Item>
            </Grid>
                </div>
            </div>
        </>
    );
}
