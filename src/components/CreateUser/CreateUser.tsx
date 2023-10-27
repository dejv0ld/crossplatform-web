import React, { useState } from 'react';
import { TextInput } from '../TextInput';
import styles from './CreateUser.module.css';
//import styles from './TextInput.module.css';
import { useCreateUserMutation } from '../../store/api/usersApi';

export const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [createUser] = useCreateUserMutation();

  const submitHandler = () => {
    console.log(firstName, lastName);
    if (firstName !== '' && lastName !== '') {
      setFeedback(`Hej ${firstName} ${lastName}! Välkommen tillbaka`);
      setSubmitted(true);
      setFirstName('');
      setLastName('');
      setTimeout(() => {
        setFeedback('');
      }, 5000);

      createUser({ user: { firstName: firstName, lastName: lastName } });
    } else {
      setSubmitted(false);
      setFeedback('Du måste fylla i båda fälten');
    }
  };

  return (
    <div className={styles.container}>
      <TextInput
        value={firstName}
        placeholder="First Name"
        onInput={(event) => {
          setFirstName(event.target.value);
        }}
      />
      <TextInput
        value={lastName}
        placeholder="Last Name"
        onInput={(event) => {
          setLastName(event.target.value);
        }}
      />
      <button className={styles.submitButton} onClick={submitHandler}>
        Lägg till Användare
      </button>
      {feedback && (
        <p
          className={styles.feedbackText}
          style={{
            color: submitted ? 'green' : 'red'
          }}
        >
          {feedback}
        </p>
      )}
    </div>
  );
};
