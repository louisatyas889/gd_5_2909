'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthFromWrapper from '@/components/AuthFromWrapper'; // Sesuaikan path-nya
import SocialAuth from '@/components/SocialAuth'; // Sesuaikan path-nya

const DEFAULT_CAPTCHA = 'W6X8Z'; // Contoh captcha statis

const LoginPage = () => {
  // 1. State untuk data form
  const [formData, setFormData] = useState({
    captchaInput: '',
    rememberMe: false,
  });

  // 2. State untuk error
  const [errors, setErrors] = useState({
    captcha: '',
  });

  // 3. Handler untuk perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    // Reset error pas user ngetik lagi
    if (name === 'captchaInput') setErrors({ captcha: '' });
  };

  // 4. Handler saat tombol Sign In diklik
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.captchaInput !== DEFAULT_CAPTCHA) {
      setErrors({ captcha: 'Captcha tidak sesuai!' });
      return;
    }

    alert('Login Berhasil!');
    // Lanjutkan logika login di sini
  };

  return (
    <AuthFromWrapper title="Sign In">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Masukkan kodingan input email/password di sini */}
        
        {/* --- LANJUTAN KODINGAN YANG KAMU KIRIM TADI --- */}
        <div className="flex items-center justify-between mt-2">
          <label className="flex items-center text-sm text-gray-700">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe || false}
              onChange={(e) =>
                setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))
              }
              className="mr-2 h-4 w-4 rounded border-gray-300"
            />
            Ingat Saya
          </label>
          <Link href="/auth/forgot-password" size-sm font-semibold className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
            Forgot Password?
          </Link>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700">Captcha:</span>
            <span className="font-mono text-lg font-bold text-gray-800 bg-gray-100 px-3 py-1.5 rounded">
              {DEFAULT_CAPTCHA}
            </span>
          </div>
          <input
            type="text"
            name="captchaInput"
            value={formData.captchaInput}
            onChange={handleChange}
            className={`w-full px-4 py-2.5 rounded-lg border ${errors.captcha ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Masukan captcha"
          />
          {errors.captcha && <p className="text-red-600 text-sm italic mt-1">{errors.captcha}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg"
        >
          Sign In
        </button>

        <SocialAuth />

        <p className="mt-6 text-center text-sm text-gray-600">
          Tidak punya akun?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-800 font-semibold">
            Daftar
          </Link>
        </p>
      </form>
    </AuthFromWrapper>
  );
};

export default LoginPage;