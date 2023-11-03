import React, { useState } from 'react';
import styles from './UpdateUser.module.css';
import { useUpdateUserMutation } from '../../store/api/usersApi';

export const UpdateUser = ({ userId, user, onDone }) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, user: formData });
      onDone();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
      <input
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onDone}>
        Cancel
      </button>
    </form>
  );
};
