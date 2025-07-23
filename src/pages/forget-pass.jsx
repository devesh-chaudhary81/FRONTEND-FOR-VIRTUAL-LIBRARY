import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const sendOTP = async () => {
    try {
      const res = await axios.post('https://api-routes.onrender.com/api/otp/send-otp', { email });
      toast.success(res.data.message);
      setOtpSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send OTP');
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post('https://api-routes.onrender.com/api/otp/verify-otp', { email, otp });
      toast.success(res.data.message);
      setOtpVerified(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'OTP Verification failed');
    }
  };

  const resetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await axios.post('https://api-routes.onrender.com/api/otp/reset-password', {
        email,
        newPassword,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="mt-10 p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4" style={{ boxShadow: "0 0 10px 2px rgba(0, 0, 0, 0.5)" }}>
      <div className="flex justify-between items-center">
  <h2 className="text-xl font-bold">Forgot Password</h2>
  <Link to="/login"><button className="text-white hover:underline bg-blue-500 w-16"style={{ borderRadius: '3px' }}>Login</button></Link>
</div>

      <input
        type="email"
        placeholder="Enter your email"
        className="w-full p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOTP} className="w-full bg-blue-500 text-white p-2 rounded">
        Send OTP
      </button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            className="w-full p-2 border"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP} className="w-full bg-green-500 text-white p-2 rounded">
            Verify OTP
          </button>
        </>
      )}

      {otpVerified && (
        <>
          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full p-2 border"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={resetPassword} className="w-full bg-purple-600 text-white p-2 rounded">
            Reset Password
          </button>
        </>
      )}
    </div>
  );
};

export default ForgotPassword;
