import React, { useState } from 'react';
import TextInput from './TextInput';

const CreateUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

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
    } else {
      setSubmitted(false);
      setFeedback('Du måste fylla i båda fälten');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', flexDirection: 'column',
        boxShadow: '0px 0px 20px 0px rgba(255, 255, 255, 0.5)'
      }}
    >
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
      <button onClick={submitHandler}>Skicka</button>
      {feedback && (
        <p
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

export default CreateUser;
