import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CreateUser: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const queryClient = useQueryClient();

  const createUserMutation = useMutation({
    mutationFn: async (newUser: { name: string; email: string }) => {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setName('');
      setEmail('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createUserMutation.mutate({ name, email });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create User</h2>
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
        <Button type="submit">Create User</Button>
      </form>
    </div>
  );
};

export default CreateUser;
