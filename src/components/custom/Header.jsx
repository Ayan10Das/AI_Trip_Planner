import React, { useState } from 'react';
import { Button } from '../ui/button';
import { FaUserCircle, FaGoogle, FaBars, FaTimes } from 'react-icons/fa';
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { Link } from 'react-router-dom';
import { useUser } from '@/userContext';

function Header() {
  const { user, setUser } = useUser();

  const [openDialog, setOpenDialog] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response);
    },
    onError: (error) => console.log(error),
  });

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'Application/json',
      },
    })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(res.data);
        setOpenDialog(false);
      })
      .catch(() => alert('Login failed! Please try again'));
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="bg-gray-300 shadow-sm sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-10">
      <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
        <Link to="/">
          <img className="h-10 w-auto" src="/logo.svg" alt="Logo" />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {user ? (
            <>
              <Link to="/">
                <Button className="rounded-2xl hover:bg-orange-500 hover:text-black transition duration-150">
                  Home
                </Button>
              </Link>
              <Link to="/my-trips">
                <Button className="rounded-2xl hover:bg-orange-500 hover:text-black transition duration-150">
                  My Trips
                </Button>
              </Link>
              <Button
                className="rounded-2xl hover:bg-orange-500 hover:text-black transition duration-150"
                onClick={handleLogout}
              >
                Logout
              </Button>
              {user.picture && !imgError ? (
                <img
                  src={user.picture}
                  alt="User"
                  onError={() => setImgError(true)}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="h-10 w-10 text-gray-500" />
              )}
            </>
          ) : (
            <Button
              className="rounded-2xl hover:bg-gray-700 transition duration-150"
              onClick={() => setOpenDialog(true)}
            >
              Sign In
            </Button>
          )}
        </nav>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-gray-200 border-t border-gray-300 px-4 py-3 space-y-3">
          {user ? (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button fullWidth className="w-full mt-1 rounded-2xl hover:bg-orange-500 hover:text-black transition duration-150">
                  Home
                </Button>
              </Link>
              <Link to="/my-trips" onClick={() => setMobileMenuOpen(false)}>
                <Button fullWidth className="w-full mt-1 rounded-2xl hover:bg-orange-500 hover:text-black transition duration-150">
                  My Trips
                </Button>
              </Link>
              <Button
                fullWidth
                className="w-full rounded-2xl mt-1 hover:bg-orange-500 hover:text-black transition duration-150"
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                Logout
              </Button>
              <div className="flex justify-center mt-2">
                {user.picture && !imgError ? (
                  <img
                    src={user.picture}
                    alt="User"
                    onError={() => setImgError(true)}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle className="h-10 w-10 text-gray-500" />
                )}
              </div>
            </>
          ) : (
            <Button
              fullWidth
              className="w-full rounded-2xl hover:bg-gray-700 transition duration-150"
              onClick={() => {
                setOpenDialog(true);
                setMobileMenuOpen(false);
              }}
            >
              Sign In
            </Button>
          )}
        </nav>
      )}

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" className="h-22 w-55 ml-22" alt="Logo" />
              <h2 className="font-bold text-lg mt-2">Sign In with Google</h2>
              <p>Sign In with Google authentication securely!</p>
              <Button className="w-full mt-5 gap-3 items-center" onClick={login}>
                <FaGoogle className="h-7 w-7" /> Sign In
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
