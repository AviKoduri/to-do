"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const SignUp = () => {
  const router = useRouter()
    const [signUpData, setSignUpData] = useState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      userName: '',
      role: 'USER',
      isVerified: false,
    });

    // Handle input changes
    const handleChange = (e) => {
      setSignUpData({
        ...signUpData,
        [e.target.name]: e.target.value,
      });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log('SignUp Data Submitted: ', signUpData);

      // Define the GraphQL mutation
      const mutation = `
        mutation SignUp($signUpData: signUpData) {
          signUp(signUpData: $signUpData) {
            id
            msg
          }
        }
      `;

      const variables = {
        signUpData: {
          email: signUpData.email,
          firstName: signUpData.firstName,
          isVerified: signUpData.isVerified,
          lastName: signUpData.lastName,
          password: signUpData.password,
          role: signUpData.role,
          userName: signUpData.userName,
        }
      };

      try {
        // Make the API call to your backend
        const response = await fetch('http://localhost:3000/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: mutation,
            variables,
          }),
        });

        const result = await response.json();

        if (response.ok && result.data) {
          console.log('Success:', result.data);
          router.push("/login")
          // Handle success: save token, redirect, etc.
        } else {
          console.error('GraphQL error:', result.errors || result);
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    };

    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          
          <form onSubmit={handleSubmit}>

            {/* Email Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={signUpData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* First Name Input */}
            <div className="mb-4">
              <label htmlFor="firstName" className="block text-gray-700">First Name</label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={signUpData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your first name"
                required
              />
            </div>

            {/* Last Name Input */}
            <div className="mb-4">
              <label htmlFor="lastName" className="block text-gray-700">Last Name</label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={signUpData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your last name"
                required
              />
            </div>

            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="userName" className="block text-gray-700">Username</label>
              <input
                type="text"
                name="userName"
                id="userName"
                value={signUpData.userName}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your username"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={signUpData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Role (Hidden Input) */}
            <input type="hidden" name="role" value={signUpData.role} />

            {/* Sign Up Button */}
            <div className="mb-4">
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Sign Up
              </button>
            </div>
            
          </form>

          {/* Already have an account? Login link */}
          <p className="text-center text-gray-600">
            Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
          </p>
        </div>
      </div>
    );
};

export default SignUp;
