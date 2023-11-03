import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../store/api/usersApi';
import { UpdateUser } from '../UpdateUser';
import React, { useState } from 'react';
import styles from './UserList.module.css';

export const UserList = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  //Refetch function
  const handleRefetch = () => {
    console.log('Refetching started...');
    refetch();
    console.log('Refetch function called.');
  };

  //Delete function
  const handleDelete = async (userId) => {
    try {
      await deleteUser({ userId });
      refetch();
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  //Edit function
  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsEditing(true);
  };



  //Renders the list of users
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery({});
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users!</p>;

  // A simple sort function that compares first names
const sortedUsers = sortAlphabetically
? [...users].sort((a, b) => a.firstName.localeCompare(b.firstName))
: users;

  if (isEditing && currentUser) {
    return (
      <UpdateUser
        userId={currentUser.id}
        user={currentUser}
        onDone={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div>
      <ul>
        <label>
          Sortera Alfabetiskt
          <input
            type="checkbox"
            checked={sortAlphabetically}
            onChange={(e) => setSortAlphabetically(e.target.checked)}
          />
        </label>
        {sortedUsers
          .filter((user) => user.firstName || user.lastname)
          .map((user, index) => (
            <li key={user.id}>
              {index + 1}. {user.firstName} {user.lastName}
              <button className={styles.btn} onClick={() => handleEdit(user)}>
                Ändra
              </button>
              <button
                className={styles.btn}
                onClick={() => handleDelete(user.id)}
              >
                Ta bort
              </button>
            </li>
          ))}
      </ul>
      <button onClick={handleRefetch}>Refresh</button>
    </div>
  );
};
export default UserList;
