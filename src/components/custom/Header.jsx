import React, { useEffect, useState } from 'react'
// import { ButtonSecondary } from '../ui/Btn-secondary';
import { Button } from '../ui/button';
import { FaUserCircle } from 'react-icons/fa';
import { googleLogout } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { FaGoogle } from 'react-icons/fa';
import { ButtonSecondary } from '../ui/Btn-secondary';
import { Link } from 'react-router-dom';


function Header() {
  const [openDialog, setOpenDialog] = useState(false);
  const [imgError , setImgError]=useState(false);

  const user =JSON.parse(localStorage.getItem('user')) || "";
  useEffect(() => {
    console.log(user);
  }, []);

    const login = useGoogleLogin({
    onSuccess: (response) => {
      getUserProfile(response)
      // setOpenDialog(false)
    },
    onError: (error) => console.log(error)
  });

    const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo.access_token}`,
        Accept: 'Application/json'
      }
    })
      .then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => alert('Login failed! please try again'))
  }

  return (
    <div className='p-2 shadow-sm bg-gray-250 flex justify-between items-center px-5 sticky top-0 z-50 bg-gray-300 w-screen'>

      <img className='h-auto w-60 bg-sec' src="/logo.svg" alt="" />

      <div>
        {user ?
          <div className='flex gap-3 items-center'>


            <div className='flex  gap-2 justify-center items-center'>

            <Link to="/">
            <Button className='rounded-2xl  transition-all delay-100 duration-150 place-self-end-safe hover:bg-orange-500 hover:text-black cursor-pointer hover:scale-x-105'> Home </Button>
            </Link>

            <Link to="my-trips">
            <Button className='rounded-2xl transition-all delay-100 duration-150 place-self-end-safe hover:bg-orange-500 hover:text-black cursor-pointer hover:scale-x-105'> My trips</Button>
            </Link>
            
            
             
            <Button className='rounded-2xl transition-all delay-100 duration-150 place-self-end-safe hover:bg-orange-500 hover:text-black cursor-pointer hover:scale-x-105'
            onClick={()=>{
              googleLogout()
              localStorage.removeItem('user');
              window.location.href="/";
            }}
            > Logout </Button>
           

                       {user?.picture && !imgError ? (
              <img
                src={user?.picture}
                className="h-10 w-11 rounded-full object-cover  hidden md:block"
                alt="user"
                onError={()=> setImgError(true) }
              />
              
            ) :
            <div >
            <FaUserCircle className='h-10 w-12 text-gray-500  hidden md:block'/>
            {/* <div className='p-1 font-light text-sm'>{user.name}</div> */}
            </div> 

            }

            </div>
          </div>
          :
          // <ButtonSecondary/>
            <Button className="rounded-2xl transition-all delay-100 duration-150 place-self-end-safe hover:bg-gray-700 cursor-pointer hover:scale-x-105"
            onClick={()=>setOpenDialog(true)}
            >Sign In</Button>
          }
           </div>

          <Dialog open={openDialog}>
          
                  <DialogContent>
                    <DialogHeader>
                      <DialogDescription>
          
                        <img src="/logo.svg" className='h-22 w-55 ml-22' />
                        <h2 className='font-bold text-lg mt-2'>Sign In with Google</h2>
                        <p>Sign In with Google authentication securely!</p>
                        <Button
                          className='w-full mt-5 gap-3 items-center'
                          onClick={login}
                        >
                          <FaGoogle className='h-7 w-7' />Sign In</Button>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
          
          </Dialog>

     
    </div>
  )
}

export default Header;