"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { UserProvider, useUserContext } from "@/contexts/UserContext";
import { useToast } from "@/components/ui/use-toast";

// const users = [
//   { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastLogin: '2023-04-15 09:30' },
//   { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Agent', status: 'Active', lastLogin: '2023-04-15 10:15' },
//   { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Agent', status: 'Inactive', lastLogin: '2023-04-14 14:45' },
//   // Add more sample data as needed
// ]

export default function UserManagementPage() {
    return (
        <UserProvider>
            <UserManagementContent />
        </UserProvider>
    );
}

function UserManagementContent() {
    const { users, addUser, updateUser, deleteUser } = useUserContext();
    const { toast } = useToast();
    const [searchTerm, setSearchTerm] = useState("");
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsAddUserOpen(true);
    };

    const handleDeleteUser = (id: number) => {
        deleteUser(id);
        toast({
            title: "User Deleted",
            description: "The user has been successfully deleted.",
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const userData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            role: formData.get("role") as string,
            status: formData.get("active") === "on" ? "Active" : "Inactive",
            lastLogin: editingUser ? editingUser.lastLogin : "Never",
        };

        if (editingUser) {
            updateUser(editingUser.id, userData);
            toast({
                title: "User Updated",
                description: "The user has been successfully updated.",
            });
        } else {
            addUser(userData);
            toast({
                title: "User Added",
                description: "A new user has been successfully added.",
            });
        }

        setIsAddUserOpen(false);
        setEditingUser(null);
    };

    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">User Management</h1>
            <div className="flex justify-between">
                <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                />
                <Button
                    onClick={() => {
                        setEditingUser(null);
                        setIsAddUserOpen(true);
                    }}
                >
                    Add User
                </Button>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Badge
                                    variant={
                                        user.status === "Active"
                                            ? "success"
                                            : "secondary"
                                    }
                                >
                                    {user.status}
                                </Badge>
                            </TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleEditUser(user)}
                                >
                                    Edit
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleDeleteUser(user.id)}
                                    className="ml-2"
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingUser ? "Edit User" : "Add New User"}
                        </DialogTitle>
                        <DialogDescription>
                            {editingUser
                                ? "Edit the user details below."
                                : "Enter the details of the new user below."}
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                name="name"
                                defaultValue={editingUser?.name}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                defaultValue={editingUser?.email}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Select
                                name="role"
                                defaultValue={editingUser?.role || "Agent"}
                            >
                                <SelectTrigger id="role">
                                    <SelectValue placeholder="Select a role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Agent">Agent</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Switch
                                id="active"
                                name="active"
                                defaultChecked={
                                    editingUser?.status === "Active"
                                }
                            />
                            <Label htmlFor="active">Active</Label>
                        </div>
                        <DialogFooter>
                            <Button type="submit">
                                {editingUser ? "Save Changes" : "Add User"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
