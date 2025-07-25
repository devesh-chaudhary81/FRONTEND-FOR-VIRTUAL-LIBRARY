import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';


const ForgotPasswordModal = ({ onClose }) => {
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
      onClose(); // close modal after success
    } catch (err) {
      toast.error(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4 relative shadow-lg">
        <button className="absolute top-2 right-3 text-xl font-bold" onClick={onClose}>×</button>
        <h2 className="text-lg font-semibold">Forgot Password</h2>

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
    </div>
  );
};

export default ForgotPasswordModal;
