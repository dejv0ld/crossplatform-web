import { createApi } from '@reduxjs/toolkit/query/react';
import { db } from '../../firebase-config';
import { addDoc, collection, getDocs, deleteDoc, doc, setDoc } from 'firebase/firestore';

const firebaseBaseQuery = async ({ baseUrl, url, method, body }) => {
  switch (method) {
    case 'GET':
      const snapshot = await getDocs(collection(db, url));
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      return { data };

    case 'POST':
      const docRef = await addDoc(collection(db, url), body);
      return { data: { id: docRef.id, ...body } };

    default:
      throw new Error(`Unhandled method ${method}`);

    case 'DELETE':
      const deleteRef = doc(db, url);
      await deleteDoc(deleteRef);
      return { data: 'Deleted successfully' };

    case 'PUT':
      const putRef = doc(db, url);
      await setDoc(putRef, body, { merge: true });
      return { data: 'Updated successfully' };
  }

};

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: firebaseBaseQuery,
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ user }) => ({
        baseUrl: '',
        url: 'users',
        method: 'POST',
        body: user
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
    //Get users
    getUsers: builder.query({
      query: () => ({
        baseUrl: '',
        url: 'users',
        method: 'GET',
        body: ''
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Users', id })), { type: 'Users', id: 'LIST' },
          ]
          : [{ type: 'Users', id: 'LIST' }],
    }),
    //Delete user
    deleteUser: builder.mutation({
      query: ({ userId }) => ({
        baseUrl: '',
        url: `users/${userId}`,
        method: 'DELETE',
        body: ''
      }),
    }),
    //Update user
    updateUser: builder.mutation({
      query: ({ userId, user }) => ({
        baseUrl: '',
        url: `users/${userId}`,
        method: 'PUT',
        body: user
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }],
    }),
  }),
});



export const { useCreateUserMutation, useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } = usersApi;
