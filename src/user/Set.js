import React, { useEffect, useState } from 'react';
import styles from './setting.module.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';

const defaultImageUrl = '/path/to/default/image.jpg'; // Replace with your default image URL

export default function AccountSetting() {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    postalCode: '',
    zipCode: '',
    City: '',
    image: defaultImageUrl, // Initialize with default image
    State: '',
    Country: ''
  });
  const [profileImg, setProfileImg] = useState(null);

  // Function to handle file change
  const handleFileChange = (e) => {
    const uploadImage = e.target.files && e.target.files[0];
    if (uploadImage) {
      setProfileImg(uploadImage);
      const imageUrl = URL.createObjectURL(uploadImage);
      setUser((prevUser) => ({
        ...prevUser,
        image: imageUrl
      }));

      // Save image URL to localStorage
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  // Function to handle form field changes
  const changeValue = (e) => {
    const { value, name } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', profileImg || "");
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('email', user.email);
    formData.append('phoneNumber', user.phoneNumber);
    formData.append('postalCode', user.postalCode);
    formData.append('zipCode', user.zipCode);
    formData.append('City', user.City);
    formData.append('State', user.State);
    formData.append('Country', user.Country);

    try {
      const id = localStorage.getItem("userId");
      const response = await axios.patch(`${process.env.REACT_APP_BKD_URI}/api/v3/userPersonalInfo/${id}`, formData);
      console.log('response is :', response);
      toast.success("Information Changed Successfully");
    } catch (error) {
      console.log('Error is :', error);
      toast.error("Information not Changed");
    }
  };

  // Effect hook to fetch user data on component mount
  useEffect(() => {
    const fetchingData = async () => {
      const id = localStorage.getItem("userId");
      try {
        const fetchData = await axios.get(`${process.env.REACT_APP_BKD_URI}/api/v3/get/userPersonalInfo/${id}`);
        console.log("id is:", id);
        const { firstName, lastName, email, phoneNumber, postalCode, zipCode, City, State, Country, image } = fetchData.data.user;

        // Retrieve image URL from localStorage if available
        const localStorageImage = localStorage.getItem("profileImage");

        setUser({
          firstName,
          lastName,
          email,
          phoneNumber,
          postalCode,
          zipCode,
          City,
          image: localStorageImage || image || defaultImageUrl,  // Prioritize localStorage image
          State,
          Country
        });
        console.log(fetchData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchingData();
  }, []);

  // Function to handle avatar click (opens file input)
  const handleAvatarClick = () => {
    document.getElementById('profileImgInput').click();
  };

  return (
    <>
      <ToastContainer />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container>
          <Grid item xs={12} md={6} lg={6}>
            <div className={styles.flexinfo}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width={19} viewBox="0 0 448 512">
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                </svg>
              </div>
              <div className={styles.space}>
                <h4>
                  <Link to="/user/setting" style={{ color: "black", textDecoration: "none" }}>
                    Personal Info
                  </Link>
                </h4>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <div className={styles.flexinfo}>
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width={19} viewBox="0 0 448 512">
                  <path d="M144 144v48H304V144c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192V144C80 64.5 144.5 0 224 0s144 64.5 144 144v48h16c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.3 28.7-64 64-64H80z" />
                </svg>
              </div>
              <div className={styles.space}>
                <Link to="/user/change/Password" style={{ color: "black", textDecoration: "none" }}>
                  <h4>Personal and Security</h4>
                </Link>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>

      <hr />

      <div className={styles.fileImg}>
        <input
          id='profileImgInput'
          type='file'
          name='profileImg'
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <div onClick={handleAvatarClick} style={{ cursor: 'pointer', marginLeft: "8%" }}>
          <Avatar
            alt='user image'
            src={user.image}
            sx={{ width: "80px", height: "80px" }}
          />
        </div>
      </div>

      <div className={styles.main}>
        <div className={styles.TextField}>
          <TextField id="outlined-basic" className={styles.innerTextField} label="First Name" variant="outlined" name='firstName' value={user.firstName} onChange={changeValue} />
          <TextField id="outlined-basic" className={styles.innerTextField} label="Last Name" variant="outlined" name='lastName' value={user.lastName} onChange={changeValue} />
        </div>

        <div className={styles.emailInput}>
          <TextField id="outlined-basic" className={styles.innerEmailInput} type='email' label="Email" variant="outlined" name='email' value={user.email} onChange={changeValue} disabled />
        </div>

        <div className={styles.emailInput}>
          <TextField id="outlined-basic" className={styles.innerEmailInput} type='tel' label="Phone Number" variant="outlined" name='phoneNumber' value={user.phoneNumber} onChange={changeValue} />
        </div>

        <div className={styles.emailInput}>
          <TextField id="outlined-basic" className={styles.innerEmailInput} type='number' label="Postal Code" variant="outlined" name='postalCode' value={user.postalCode} onChange={changeValue} />
        </div>

        <div className={styles.TextFieldZip}>
          <TextField id="outlined-basic" className={styles.innerTextField} label="Zip Code" variant="outlined" name='zipCode' value={user.zipCode} onChange={changeValue} />
          <TextField id="outlined-basic" className={styles.innerTextField} label="City" variant="outlined" name='City' value={user.City} onChange={changeValue} />
        </div>

        <div className={styles.TextFieldState}>
          <TextField id="outlined-basic" className={styles.innerTextField} label="State" variant="outlined" name='State' value={user.State} onChange={changeValue} />
          <TextField id="outlined-basic" className={styles.innerTextField} label="Country" variant="outlined" name='Country' value={user.Country} onChange={changeValue} />
        </div>

        <Button onClick={submitHandler} className={styles.btnChanges}>Save Changes</Button>
      </div>
    </>
  );
}
