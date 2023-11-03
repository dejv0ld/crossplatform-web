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
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Edit User</h2>
      <label className={styles.label} htmlFor="firstName">
        First Name:
      </label>
      <input
        className={styles.input}
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
      />
      <label className={styles.label} htmlFor="firstName">
        Last Name:
      </label>
      <input
        className={styles.input}
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
      />
      <div>
        <button className={styles.btn} type="submit">
          Submit
        </button>
        <button className={styles.btn} type="button" onClick={onDone}>
          Cancel
        </button>
      </div>
    </form>
  );
};
