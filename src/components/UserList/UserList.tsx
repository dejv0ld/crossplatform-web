import {
  useGetUsersQuery,
  useDeleteUserMutation
} from '../../store/api/usersApi';

export const UserList = () => {
  const [deleteUser] = useDeleteUserMutation();

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

  //Renders the list of users
  const { data: users, isLoading, isError, refetch } = useGetUsersQuery({});
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching users!</p>;
  return (
    <div>
      <ul>
        {users
          .filter((user) => user.firstName || user.lastname)
          .map((user) => (
            <li key={user.id}>
              {user.firstName} {user.lastName}
              <button onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
      </ul>
      <button onClick={handleRefetch}>Refresh</button>
    </div>
  );
};
export default UserList;
