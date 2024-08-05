'use Client'
import React, { useState } from 'react'
import styles from "./forget.module.css";
import PropTypes from 'prop-types';
import { Box, styled } from '@mui/system';
import { Button } from '@mui/base/Button';
import { Input as BaseInput, inputClasses } from '@mui/base/Input';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Input } from '@mui/material';
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.textsecondary,
}));

const ButtonRoot = React.forwardRef(function ButtonRoot(props, ref) {
  const { children, ...other } = props;

  return (
    <svg width="150" height="50" {...other} ref={ref} className={styles.submitbtn}>
      <polygon points="0,50 0,0 150,0 150,50" className="bg" />
      <polygon points="0,50 0,0 150,0 150,50" className="borderEffect" />
      <foreignObject x="0" y="0" width="150" height="50">
        <div className={styles.content}>Submit</div>
      </foreignObject>
    </svg>
  );
});


ButtonRoot.propTypes = {
  children: PropTypes.node,
};

const SvgButton = React.forwardRef(function SvgButton(props, ref) {
  return <Button {...props} slots={{ root: CustomButtonRoot }} ref={ref} />;
});

export default function Signup() {

  const [state, setState] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
    status: 'initial',
  });

  const [user, setUser] = useState({
    email: ''
  })
  const changeValue = (e) => {
    const { name, value } = e.target
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }))
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/forgetpass/:token`, user);
      toast.success("Check Your Email to Forget Password")
      localStorage.setItem("forgetToken", response.data.token)
      console.log(response)
    } catch (error) {
      toast.error("Enter a Valid Email that already exsist")
    }



  }
  return (

    <>
      <ToastContainer />
      <div>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={0}>
            <Grid item lg={6} xs={12} md={6}>
              <img src="../pitikilini.jpg" alt="PITIKLINI LOGO" className={styles.payswiftlogoimg} />
            </Grid>


            <Grid item xs={12} md={6} lg={6} >
              <Item sx={{ height: "550px", width: "100%", backgroundColor: 'rgb(230, 170, 20)' }}>
                <h1 style={{ textAlign: "center", marginTop: '30px' }}>Forget Password</h1>
                <hr />
                <p style={{ textAlign: "center", marginTop: '30px' }}>Please enter your email address to</p>
                <p style={{ textAlign: "center" }}> forget your password.</p>

                <div style={{ textAlign: "center", marginTop: '30px' }}>
                  <Input placeholder='Email' name='email' value={user.email} onChange={changeValue} style={{ width: "50%", marginTop: '30px' }} />
                </div>

                <SvgButton style={{ marginTop: '-25px' }} type="submit" onClick={submitHandler}>Submit</SvgButton>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  )
}



const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputRoot = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[500]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
  }

  &:hover {
    border-color: ${blue[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const InputElement = styled('input')(
  ({ theme }) => `
  line-height: 1.5;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  width:100%;
`,
);




// button //


const btn = {
  50: '#F0F7FF',
  100: '#C2E0FF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E6',
  700: '#0059B3',
  800: '#004C99',
  900: '#003A75',
};

const CustomButtonRoot = styled(ButtonRoot)(
  ({ theme }) => `
  --main-color: ${theme.palette.mode === 'light' ? btn[100] : btn[100]};
  --hover-color: ${theme.palette.mode === 'light' ? btn[100] : btn[100]};
  --active-color: ${theme.palette.mode === 'light' ? btn[100] : btn[100]};
  }`,
);


//////

const nameblue = {
  100: '#DAECFF',
  200: '#b6daff',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const namegrey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputElementname = styled('input')(
  ({ theme }) => `
  width: 20px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 12px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? namegrey[300] : namegrey[900]};
  background: ${theme.palette.mode === 'dark' ? namegrey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? namegrey[700] : namegrey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };

  &:hover {
    border-color: ${nameblue[400]};
  }

  &:focus {
    border-color: ${nameblue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? nameblue[600] : nameblue[200]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);



const bluenewpass = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0059B2',
};

const greynewpass = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const InputRootnew = styled('div')(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? greynewpass[300] : greynewpass[500]};
  background: ${theme.palette.mode === 'dark' ? greynewpass[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? greynewpass[700] : greynewpass[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
    };
  display: flex;
  align-items: center;
  justify-content: center;


  &.${inputClasses.focused} {
    border-color: ${bluenewpass[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === 'dark' ? bluenewpass[600] : bluenewpass[200]};
  }

  &:hover {
    border-color: ${bluenewpass[400]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`,
);

const InputElementnew = styled('input')(
  ({ theme }) => `
  font-size: 0.875rem;
  font-family: inherit;
  font-weight: 400;
  line-height: 1.5;
  flex-grow: 1;
  color: ${theme.palette.mode === 'dark' ? greynewpass[300] : greynewpass[900]};
  background: inherit;
  border: none;
  border-radius: inherit;
  padding: 8px 12px;
  outline: 0;
  width:100%;
`,
);

const IconButtonnew = styled(Button)(
  ({ theme }) => `
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: inherit;
  cursor: pointer;
  color: ${theme.palette.mode === 'dark' ? greynewpass[300] : greynewpass[700]};
  `,
);

const InputAdornmentnew = styled('div')`
  margin: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;
