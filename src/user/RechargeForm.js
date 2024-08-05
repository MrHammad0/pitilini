import React, { useState } from 'react';
import axios from 'axios';

const RechargeForm = () => {
    const [formData, setFormData] = useState({
        id_product: '',
        destination: '',
        key: '',
        note: '',
        name: '',
        first_lastname: '',
        second_lastname: '',
        email: '',
        cellphone_number: '',
        street: '',
        exterior_number: '',
        interior_number: '',
        zipcode: '',
        colony: '',
        municipality: '',
        state: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BKD_URI}/api/v3/send`, formData);
            alert('Recharge successful!');
        } catch (error) {
            console.error('Error sending recharge', error);
            alert('Error sending recharge');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="id_product" placeholder="Product ID" value={formData.id_product} onChange={handleChange} required />
            <input type="text" name="destination" placeholder="Destination" value={formData.destination} onChange={handleChange} required />
            <input type="text" name="key" placeholder="Key" value={formData.key} onChange={handleChange} />
            <input type="text" name="note" placeholder="Note" value={formData.note} onChange={handleChange} />
            <input type="text" name="name" placeholder="Customer Name" value={formData.name} onChange={handleChange} />
            <input type="text" name="first_lastname" placeholder="First Last Name" value={formData.first_lastname} onChange={handleChange} />
            <input type="text" name="second_lastname" placeholder="Second Last Name" value={formData.second_lastname} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="cellphone_number" placeholder="Cell Phone Number" value={formData.cellphone_number} onChange={handleChange} />
            <input type="text" name="street" placeholder="Street" value={formData.street} onChange={handleChange} />
            <input type="text" name="exterior_number" placeholder="Exterior Number" value={formData.exterior_number} onChange={handleChange} />
            <input type="text" name="interior_number" placeholder="Interior Number" value={formData.interior_number} onChange={handleChange} />
            <input type="text" name="zipcode" placeholder="Zip Code" value={formData.zipcode} onChange={handleChange} />
            <input type="text" name="colony" placeholder="Colony" value={formData.colony} onChange={handleChange} />
            <input type="text" name="municipality" placeholder="Municipality" value={formData.municipality} onChange={handleChange} />
            <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
            <button type="submit">Send Recharge</button>
        </form>
    );
};

export default RechargeForm;
