import React from 'react';

export default function LoginButton() {
  const handleGoogleLogin = () => {
    window.location.href = "https://carwisegw.yusuftalhaklc.com/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-white text-gray-700 border border-gray-300 px-6 py-2 rounded-md hover:bg-gray-100"
    >
      Google ile Giriş Yap
    </button>
  );
}
