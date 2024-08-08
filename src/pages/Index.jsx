import React from 'react';
import CreateUser from '../components/CreateUser';
import ReadUsers from '../components/ReadUsers';
import UpdateUser from '../components/UpdateUser';
import DeleteUser from '../components/DeleteUser';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CreateUser />
        <ReadUsers />
        <UpdateUser />
        <DeleteUser />
      </div>
    </div>
  );
};

export default Index;
