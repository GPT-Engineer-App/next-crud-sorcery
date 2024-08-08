import React, { useState } from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

interface User {
  id: number;
  name: string;
  email: string;
}

const DeleteUser = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
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

  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete user');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setSelectedUserId(null);
      toast.success("User deleted successfully");
    },
    onError: (error) => {
      toast.error(`Error deleting user: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(parseInt(userId));
  };

  const handleDelete = () => {
    if (selectedUserId) {
      deleteUserMutation.mutate(selectedUserId);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Delete User</h2>
      <Select onValueChange={handleUserSelect}>
        <SelectTrigger className="w-full mb-2">
          <SelectValue placeholder="Select a user to delete" />
        </SelectTrigger>
        <SelectContent>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button 
        onClick={handleDelete} 
        disabled={!selectedUserId || deleteUserMutation.isPending} 
        variant="destructive"
      >
        {deleteUserMutation.isPending ? 'Deleting...' : 'Delete User'}
      </Button>
    </div>
  );
};

export default DeleteUser;
