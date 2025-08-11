import { db } from "@/components/services/firebase";
import { doc, getDoc, serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/InfoSection";
import Hotels from "../components/Hotels";
import PlacesToVisit from "../components/PlacesToVisit";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


function ViewTrip() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        tripId && getTripData();
    }, [tripId]);

    // Fetching trip infromation from Firebase

    const getTripData = async () => {
        const docRef = doc(db, 'AI_Trips', tripId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // console.log(docSnap.data());
            if (trip?.TripData === null || trip?.TripData== "") {
                toast("Trip data is incomplete. Redirecting...");
                navigate("/create-trip");
                return;
            }
            setTrip(docSnap.data());
        } else {
            // console.log("Error")
            navigate("/create-trip");
            toast("Error occured while fetching data from Firebase");
        }
    }
    return (

        <div className="p-10 md:px-20 lg:px-40 xl:px-60">
            {/* Information Section */}
            <InfoSection trip={trip} />

            {/* Recommended Hotels */}
            <Hotels trip={trip} />


            {/* Dailyy plan */}
            <PlacesToVisit trip={trip} />

            <Footer />
            
            <Link>

            </Link>
        </div>
    )
}

export default ViewTrip;