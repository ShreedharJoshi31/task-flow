"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            // Here you would typically make an API call to authenticate
            // For demo purposes, we'll just check if the fields are not empty
            if (username && password) {
                // Successful login
                router.push("/dashboard");
            } else {
                setError("Please enter both username and password.");
            }
        } catch (err) {
            setError("An error occurred during login. Please try again.");
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="w-full max-w-md space-y-8 rounded-xl bg-card p-10 shadow-md">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold text-foreground">
                        Welcome back
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please sign in to your account
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="focus-visible:ring-ring"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="focus-visible:ring-ring"
                            />
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    );
}
