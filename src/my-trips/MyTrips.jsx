import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs , limit , orderBy } from "firebase/firestore";
import { db } from '@/components/services/firebase';
import TripCard from './TripCard';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function MyTrips() {
    const naviGate = useNavigate();
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        getUserTrips();
    }, []);

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            naviGate('/');
            return;
        }
        // console.log(user)
        const q = query(collection(db, "AI_Trips"),
        where("user", "==", user?.email),
        orderBy("docId", "desc"),
        limit(10)
    )
    const querySnapshot = await getDocs(q);
    setTrips([]);

        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            setTrips(prevVal => [...prevVal, doc.data()])
        });

    }
   
    
    

    return (
        <>
        <div className='sm:px-10 md:px-32 lg:px-60 xl:px-75 px-5 mt-5'>
           <h2 className='font-medium text-2xl font-sans '>🏖️ Here is your few planned trips, Click on any trip to view...</h2> 

           <div className=" grid grid-cols-2 md:grid-cols-3 gap-5 my-3">

            {trips?.length>0 ? trips?.map((trip,index)=>(
            <div key={index}>
                <TripCard trip={trip} />
            </div>
            )):
            [1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[300px] w-full animate-pulse bg-gray-300 rounded'>

                </div>
            ))
            }
           </div>
           

            <Link to='/create-trip'>
            <div className='w-full flex justify-end'>
            <Button className='hover:bg-orange-500 hover:text-black transition-all delay-75 duration-100 ease-in-out mb-5'>Genarate New Trip!</Button>
            </div>
            </Link>
        </div>
        </>
    )
}

export default MyTrips