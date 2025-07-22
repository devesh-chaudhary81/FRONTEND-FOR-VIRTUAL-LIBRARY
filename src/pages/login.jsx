// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import bgImg from '../assets/signup-bg.png';
// import { Link, useNavigate } from 'react-router-dom';
// import {toast} from 'react-toastify';


// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   useEffect(() => {
//   const isLoggedIn = localStorage.getItem("userToken");
//   if (isLoggedIn) {
//     navigate("/home");
//   }
// }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         'https://api-routes.onrender.com/api/users/login',
//         {
//           email,
//           password,
//         },
//         {
//           withCredentials: true, // Important to receive cookies from backend
//         }
//       );

//       // Store user info (token is in cookie, so no need to store token)
//       localStorage.setItem('isLoggedIn', 'true');
//       localStorage.setItem('user', JSON.stringify(response.data.user));

//       toast.success(response.data.message || 'Login successful');
//       navigate('/home');
//       // toast.success("Login Successful");
//       // window.location.reload();

//     } catch (error) {
//       console.error('Login error:', error.response?.data || error.message);
//       toast.error(error.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <div className="relative w-full flex h-screen items-center justify-center overflow-hidden">
//       <img
//         src={bgImg}
//         alt="Background"
//         className="absolute w-[110%] h-[110%] object-cover filter blur-[2px] brightness-[0.85] contrast-[1.1] saturate-[1.2] z-0"
//       />

//       <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

//       <div className="relative z-20 w-[90%] max-w-md bg-black/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-white">
//         <h2 className="text-3xl font-bold text-center mb-2 text-white drop-shadow-md">
//           <span className="text-white">Dive Into</span>{' '}
//           <span className="text-purple-300 animate-pulse">Antarix</span>
//         </h2>
//         <p className="text-center text-cyan-400 font-semibold mb-6 text-lg">Sign In</p>

//         <form className="space-y-4" onSubmit={handleLogin}>
//           {/* Email Input */}
//           <input
//             type="email"
//             placeholder="📧 Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full pl-4 pr-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />

//           {/* Password Input */}
//           <input
//             type="password"
//             placeholder="🔒 Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full pl-4 pr-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
//           />

//           <div className="flex items-center text-sm">
//             <input type="checkbox" id="remember" className="mr-2" />
//             <label htmlFor="remember">Remember Me</label>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 rounded-md font-semibold text-white"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-6 text-sm text-center space-y-1">
//           <p>
//             Don’t have an account?{' '}
//             <Link to="/signup" className="text-blue-400 hover:underline">Signup</Link>
//           </p>
//           <p>
//             <Link to="/forgot password" className="text-gray-300 hover:underline">Forgot Password?</Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import bgImg from '../assets/signup-bg.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // ✅ loading state

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('userToken');
    if (isLoggedIn) {
      navigate('/home');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    try {
      const response = await axios.post(
        'https://api-routes.onrender.com/api/users/login',
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(response.data.user));

      toast.success(response.data.message || 'Login successful');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false); // stop loading
    }
  };

  return (
    <div className="relative w-full flex h-screen items-center justify-center overflow-hidden">
      <img
        src={bgImg}
        alt="Background"
        className="absolute w-[110%] h-[110%] object-cover filter blur-[2px] brightness-[0.85] contrast-[1.1] saturate-[1.2] z-0"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-10"></div>

      <div className="relative z-20 w-[90%] max-w-md bg-black/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-bold text-center mb-2 text-white drop-shadow-md">
          <span className="text-white">Dive Into</span>{' '}
          <span className="text-purple-300 animate-pulse">Antarix</span>
        </h2>
        <p className="text-center text-cyan-400 font-semibold mb-6 text-lg">Sign In</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="📧 Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-4 pr-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <input
            type="password"
            placeholder="🔒 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-4 pr-4 py-2 bg-black/40 border border-cyan-400 rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <div className="flex items-center text-sm">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Remember Me</label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full transition-all duration-200 py-2 rounded-md font-semibold text-white flex items-center justify-center ${
              loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full inline-block" />
            ) : (
              'Login'
            )}
          </button>
        </form>

        <div className="mt-6 text-sm text-center space-y-1">
          <p>
            Don’t have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:underline">Signup</Link>
          </p>
          <p>
            <Link to="/forgot password" className="text-gray-300 hover:underline">Forgot Password?</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
