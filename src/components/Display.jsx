import { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faCircleInfo, faPlay, faPlus } from "@fortawesome/free-solid-svg-icons"
import requests from "../requests"
import axios from "axios"
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { db } from "../firebase"
import { useNavigate } from "react-router-dom"

const Display = () =>{ 

    const navigate = useNavigate()
    const env = import.meta.env
    const baseImgUrl = env.VITE_BASE_IMG_URL
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [poster, setPoster] = useState('')
    const [random, setRandom] = useState([])
    const [saved, setSaved] = useState(false)

    const viewport = () => {
        const viewportWidth = window.innerWidth;
        if(viewportWidth >= 639){
            setPoster(random?.backdrop_path)
        }else{
            setPoster(random?.poster_path)
        }
    }

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    };

    const auth = getAuth()
    const user = auth.currentUser
    const userRef = doc(db, 'users', `${user?.email}`)
    const handleSavedMovie = async(movie) => {
        await updateDoc(userRef, {
            savedMovies: arrayUnion({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                backdrop_path: movie.backdrop_path,
                release_date: movie.release_date,
                overview: movie.overview,
                vote_average: movie.vote_average
            })
        })
        setSaved(true)
    }

    const handleOnDetailed = () => {
        localStorage.setItem('movie', JSON.stringify(random))
        navigate(`/detailed/${random.id}`)
    }

    useEffect(() => {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)]
        setRandom(randomMovie)
    }, [movies])

    useEffect(() => {
        window.onresize = function() {
            viewport()
        }
        viewport()
    }, [random])

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
            const fetchedMovies = doc.data()?.savedMovies || []
            const isMovieSaved = fetchedMovies.some((savedMovie) => savedMovie?.id === random?.id)
            if(isMovieSaved){
                setSaved(true)
            }
        })
        return () => unsubscribe()
    },[random?.id, user.email])

    useEffect(() => {
        setLoading(true)
        axios.get(requests.requestNowPlaying).then((result) => {
            console.log(result.data.results)
            setMovies(result.data.results)
        })
    }, [])
    
    return(
        <div className='w-full h-full mb-10 md:mb-10'>
            { loading ? 
                    <div className="custom-loader absolute top-20 left-[50%] z-10"></div>
            : null }
            <div className='w-full h-auto'>
                <img onLoad={(e) => setLoading(false)} className='md:absolute top-0 lg:z-0 px-10 md:px-0 w-full h-full object-cover' src={`${baseImgUrl}${poster}`} alt={random?.title} />
                <div className='flex flex-col items-center md:items-start w-full'>
                    <h1 className='text-white md:[30%] text-2xl md:text-5xl font-bold mb-5 mt-16 md:px-10 md:mb-28 relative'>{random?.title}</h1> 
                    <p className="hidden md:block relative p-10 pt-0 w-[70%] text-gray-300">{truncateString(random?.overview, 200)}</p>
                    <div className="flex justify-center items-center gap-10 relative md:px-10">
                        { saved ?
                            <FontAwesomeIcon className="px-6 py-1 text-white text-2xl" icon={faCheck} />
                        :   <button onClick={(e) => handleSavedMovie(random)} className="flex flex-col items-center justify-center text-white hover:bg-gray-600 hover:text-white rounded-sm px-5 py-1"><FontAwesomeIcon icon={faPlus} />My List</button> }
                        {/* <button className='px-5 py-2 text-black bg-white font-bold hover:bg-red-500 rounded-sm'><FontAwesomeIcon className="mr-4" icon={faPlay} />Play</button> */}
                        <button onClick={(e) => handleOnDetailed()} className='md:hidden flex flex-col items-center justify-center text-white hover:bg-gray-600 hover:text-black rounded-sm px-5 py-1'><FontAwesomeIcon icon={faCircleInfo} />Info</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Display