"use client";

import { useState, useTransition } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { Toaster } from "../../../components/ui/toaster";
import { useToast } from "../../../components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, loginWithGoogle } = useAuth(); 
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      console.log(email, password)
      await login(email, password);
    } catch (error) {
      console.error("Login failed", error);
      toast({ title: `Login Failed. ${error.message}`,  variant: "destructive",})
    } finally {
      setIsLoading(false)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Google login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4 mb-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full"
          />
          <Button type="submit" className="w-full">
            {isLoading ? 'Logging In..' : 'Login'}
          </Button>
        </form>
        <p className="w-full text-center font-semibold">Or</p>
        <div className="flex items-center gap-x-2 w-full mt-3">
          <Button
            className="w-full"
            variant={"outline"}
            size={"lg"}
            onClick={() => {}}
          >
            <FcGoogle className="w-5 h-5 mr-2" />    Google
          </Button>
        </div>
      </div>
      <Toaster  className="z-40" />
    </div>
  );
}
