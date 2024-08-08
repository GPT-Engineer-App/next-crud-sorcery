import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateUser from '../components/CreateUser';
import ReadUsers from '../components/ReadUsers';
import UpdateUser from '../components/UpdateUser';
import DeleteUser from '../components/DeleteUser';

const Index = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management System</h1>
      <Tabs defaultValue="read" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="read">View Users</TabsTrigger>
          <TabsTrigger value="create">Create User</TabsTrigger>
          <TabsTrigger value="update">Update User</TabsTrigger>
          <TabsTrigger value="delete">Delete User</TabsTrigger>
        </TabsList>
        <TabsContent value="read">
          <ReadUsers />
        </TabsContent>
        <TabsContent value="create">
          <CreateUser />
        </TabsContent>
        <TabsContent value="update">
          <UpdateUser />
        </TabsContent>
        <TabsContent value="delete">
          <DeleteUser />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Index;
