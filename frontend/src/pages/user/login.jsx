import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast"

import { authService } from '../../services/auth.service'


const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast()

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your admin login logic here
    // On successful login:

    const raw = JSON.stringify({
      "email": email,
      "password": password
    });
    try {
      let result = await authService.login(raw);
      if (result) {
        toast({
          description: result?.message,
        })
        let token = result.token;
        let user = result.user;
        await localStorage.setItem('user', JSON.stringify(user));
        await localStorage.setItem('token', token);
        navigate('/dashboard')
      }
    }
    catch (er) {
      toast({
        description: er?.message,
      })
      console.log(er)
    }


  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 w-full">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-center text-gray-500">
              Create new account{' '}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserLogin;