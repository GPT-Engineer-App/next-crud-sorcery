import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface User {
  id: number;
  name: string;
  email: string;
}

const ReadUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: users, isLoading, isError, error, refetch } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
  });

  const filteredUsers = users?.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <div className="flex justify-center items-center h-40"><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</div>;
  
  if (isError) return (
    <Alert variant="destructive">
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error instanceof Error ? error.message : 'An error occurred while fetching users.'}
        <Button onClick={() => refetch()} variant="outline" size="sm" className="mt-2">
          Try Again
        </Button>
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">User List</h2>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mr-2"
        />
        <Search className="text-gray-400" />
      </div>
      {filteredUsers && filteredUsers.length > 0 ? (
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ) : (
      <p>No users found.</p>
    )}
  </div>
);
};

export default ReadUsers;
