import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../store/api/usersApi';
import { UpdateUser } from '../UpdateUser';
import React, { useState } from 'react';

export const UserList = () => {
  const [deleteUser] = useDeleteUserMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
        {users
          .filter((user) => user.firstName || user.lastname)
          .map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
      </ul>
      <button onClick={handleRefetch}>Refresh</button>
    </div>
  );
};
export default UserList;
