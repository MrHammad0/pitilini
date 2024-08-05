import React from 'react'
import { IoMailOutline, IoChevronForward, IoApps, IoNotifications, IoPieChart, IoNewspaper, IoCard, IoColorFill } from 'react-icons/io5'
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';
import { transition } from 'd3';
import { stagger } from 'framer-motion';
import { motion } from 'framer-motion';
import { FaDollarSign, FaPhone, FaWallet } from 'react-icons/fa';
import { AiFillProduct } from 'react-icons/ai';
import { FaArrowTrendUp, FaUpDown } from 'react-icons/fa6';
import { MdInsertComment } from 'react-icons/md';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

let easing = [0.6, -0.05, 0.01, 0.99];

const container = {
    show: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            ease: 'easeInOut',
            duration: .2
        }
    }
}

const title = {
    hidden: {
        y: 60,
        opacity: 0,
    },
    show: {
        y: 0,
        opacity: 1,
        transition: {
            delay: .2,
            duration: 0.6,
            ease: easing
        }
    }
};

const hovereffect = {
    whileHover: {
        scale: 1.5, rotate: 630, borderRadius: "100%"
    },
    whileTap: {
        scale: .8, rotate: 630, borderRadius: "100%"
    },
}

function Card() {
    return (
        <motion.div className='service_container'>
            <div className="title_wrapper">
                <motion.span id='about'
                    className="service_title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ durattion: .5, delay: 1.8 }}
                >
                    Our Services</motion.span>

                <motion.h2
                    initial={{ y: 200, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ durattion: .5, delay: 1 }}
                >Pitikili Provide You Services<br /> For Your Bussiness .</motion.h2>
            </div>
            <motion.div className="service_card" variants={container} initial="hidden" exit="exit" whileInView="show" viewport={{ once: false }}>

                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#ddfbf9" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#14da8f", size: "22px" }}>
                                        <FaDollarSign />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Secure & Faster <br />Payments </h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#e7daf8" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#5700cf", size: "22px" }}>
                                        <FaWallet />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3> Multi Currency Wallets to  <br /> Store Your Money</h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#ffede6" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#ff8559", size: "22px" }}>
                                        <FaPhone />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Recharge Your Accounts <br /> and cellphone</h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#ffe1e9" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#fa3970", size: "22px" }}>
                                        <AiFillProduct />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Stratagy & Product <br />Management</h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#dcedff" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#56a8f4", size: "22px" }}>
                                        <IoNewspaper />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Investments Plans<br />and Others.</h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#dbf9ed" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#06d786", size: "22px" }}>
                                        <IoPieChart />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Digital Marketing <br />& Management</h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#fffada" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#f1df11", size: "22px" }}>
                                        <FaArrowTrendUp />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Invest To earn <br />Profit Now</h3>
                            </motion.div>
                        </Grid>

                        <Grid item xs={12} md={3}>
                            <motion.div className="card" variants={item} style={{ width: "100%" }}>
                                <motion.span className="service_icon" style={{ background: "#fffada" }} variants={hovereffect} whileHover="whileHover" whileTap="whileTap">
                                    <IconContext.Provider value={{ color: "#f1df11", size: "22px" }}>
                                        <MdInsertComment />
                                    </IconContext.Provider>
                                </motion.span>
                                <h3>Comment Your Thoughts <br />Below In the Comments Section</h3>
                            </motion.div>
                        </Grid>

                    </Grid>
                </Box>










            </motion.div>
        </motion.div>
    )
}

export default Card
