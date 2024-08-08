import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const UpdateUser = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  const { data: users } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: async (updatedUser: { id: number; name: string; email: string }) => {
      const response = await fetch(`/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSelectedUserId(null);
      setName('');
      setEmail('');
    },
  });

  const handleUserSelect = (userId: string) => {
    const user = users?.find(u => u.id === parseInt(userId));
    if (user) {
      setSelectedUserId(user.id);
      setName(user.name);
      setEmail(user.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUserId) {
      updateUserMutation.mutate({ id: selectedUserId, name, email });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Update User</h2>
      <Select onValueChange={handleUserSelect}>
        <SelectTrigger className="w-full mb-2">
          <SelectValue placeholder="Select a user" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mb-2"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2"
        />
        <Button type="submit" disabled={!selectedUserId}>Update User</Button>
      </form>
    </div>
  );
};

export default UpdateUser;
