import { useEffect, useState } from "react"
import { getAuth } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
import { db } from "../firebase"
import Navbar from "./Navbar"
import { useNavigate } from "react-router-dom"

const MyList = () => {

    const navigate = useNavigate()
    const env = import.meta.env
    const baseImgUrl = env.VITE_BASE_IMG_URL
    const [savedMovies, setSavedMovies] = useState([])
    const auth = getAuth()
    const user = auth.currentUser

    const handleOnDetailed = (i) => {
        localStorage.setItem('movie', JSON.stringify(savedMovies[i]))
        navigate(`/detailed/${savedMovies[i].id}`)
    }

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
            const fetchedMovies = doc.data()?.savedMovies || []
            setSavedMovies(fetchedMovies)
        })
        console.log(savedMovies)
        return () => unsubscribe()
    },[user.email])

    return(
        <>
            <Navbar/>
            <div className="p-5">
                <h1 className="text-white text-3xl pl-10 pb-10">My List:</h1>
                <hr className="mb-10"/>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-items-center w-full">
                {savedMovies.map((savedMovie, i) => (
                    <div key={i} onClick={(e) => handleOnDetailed(i)} className="cursor-pointer py-3 w-28 hover:scale-110 transition">
                        <img className="rounded-md" src={`${baseImgUrl}${savedMovie.poster_path}`} alt={savedMovie.title} />
                        <div className="w-full">
                            <h1 className="text-white font-bold text-xl">{savedMovie.title}</h1>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </>
    )
}

export default MyList