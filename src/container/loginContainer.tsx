// 'use client'
// import React from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';

// const LoginForm = () => {
//   const handleSubmit = async (values, { setSubmitting }) => {
//     const mutation = `
//       mutation Signin($email: String!, $password: String!) {
//         signin(email: $email, password: $password) {
//           msg
//           token
//           user {
//             // Add fields you need from the user object
//           }
//         }
//       }
//     `;

//     const variables = {
//       email: values.email,
//       password: values.password,
//     };

//     try {
//       const response = await fetch('http://localhost:3000/api/graphql', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           query: mutation,
//           variables,
//         }),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         console.log('Response:', result);
//         // Handle successful response, e.g., store token, redirect user, etc.
//       } else {
//         // Handle errors from the server
//         console.error('Error:', result.errors || result);
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//       // Handle network errors or other unexpected errors
//     }

//     setSubmitting(false);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
//         </div>
//         <Formik
//           initialValues={{ email: '', password: '' }}
//           validate={(values) => {
//             const errors = {};
//             // Add validation logic here if needed
//             return errors;
//           }}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting }) => (
//             <Form className="mt-8 space-y-6">
//               <div className="rounded-md shadow-sm -space-y-px">
//                 <div>
//                   <label htmlFor="email" className="sr-only">
//                     Email address
//                   </label>
//                   <Field
//                     id="email"
//                     name="email"
//                     type="email"
//                     autoComplete="email"
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Email address"
//                   />
//                   <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
//                 </div>
//                 <div>
//                   <label htmlFor="password" className="sr-only">
//                     Password
//                   </label>
//                   <Field
//                     id="password"
//                     name="password"
//                     type="password"
//                     autoComplete="current-password"
//                     required
//                     className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//                     placeholder="Password"
//                   />
//                   <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
//                 </div>
//               </div>

//               <div>
//                 <button
//                   type="submit"
//                   className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   disabled={isSubmitting}
//                 >
//                   Sign in
//                 </button>
//               </div>
//               <div className="text-sm text-center">
//                 <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
//                   Don't have an account yet? Sign up
//                 </a>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;


'use client';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();
  
  const handleSubmit = async (values:any, { setSubmitting }) => {
    console.log("Form values:", values);

    const mutation = `
      mutation Signin($email: String, $password: String) {
        signin(email: $email, password: $password) {
          msg
          token
          user {
            email
            firstName
          }
        }
      }
    `;

    const variables = {
      email: values.email,
      password: values.password,
    };

    try {
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
        router.push("/");
      } else {
        console.error('GraphQL error:', result.errors || result);
      }
    } catch (error) {
      console.error('Network error:', error);
    }

    setSubmitting(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Email is required';
            }
            if (!values.password) {
              errors.password = 'Password is required';
            }
            return errors;
          }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-3">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-700">
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-bold text-gray-700 ">
                  Password
                </label>
                <Field
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="mt-1 px-3 py-2 block w-full border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>

              <div className="text-center text-sm">
                <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Don't have an account? <span className='underline'>Sign up</span>
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
