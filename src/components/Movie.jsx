import { db } from "../firebase"
import { updateDoc, doc, arrayUnion, onSnapshot } from "firebase/firestore"
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons"
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useRef, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { getAuth } from "firebase/auth"
import { useNavigate } from "react-router-dom"

const Movie = ({movie}) => {

    const navigate = useNavigate()
    const env = import.meta.env
    const baseImgUrl = env.VITE_BASE_IMG_URL

    const heartIconRef = useRef()
    const [saved, setSaved] = useState(false)

    const auth = getAuth()
    const user = auth.currentUser
    const userRef = doc(db, 'users', `${user?.email}`)
    const handleSavedMovie = async(movie) => {
        if(!saved){
            console.log('liked movie')
            console.log('userRef: ', userRef)
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
        }else{
            console.log('remove from liked')
        }
    }

    // const handleOnDetailed = () => {
    //     localStorage.setItem('movie', JSON.stringify(movie))
    //     navigate(`/detailed/${movie.id}`)
    // }

    const closeOpenMenus = (e)=>{
        if(!heartIconRef.current?.contains(e.target)){
            localStorage.setItem('movie', JSON.stringify(movie))
            navigate(`/detailed/${movie.id}`)
        }
    }
    // document.addEventListener('mousedown',closeOpenMenus)

    useEffect(() => {
        console.log()
        const unsubscribe = onSnapshot(doc(db, 'users', user.email), (doc) => {
            const fetchedMovies = doc.data()?.savedMovies || []
            const isMovieSaved = fetchedMovies.some((savedMovie) => savedMovie?.id === movie.id)
            if(isMovieSaved){
                setSaved(true)
            }
        })
        return () => unsubscribe()
    },[movie.id, user.email])

    return(
        <div onClick={(e) => closeOpenMenus(e)} className="relative w-32 inline-block cursor-pointer mx-2">
            <img className="w-32 block rounded-md" src={`${baseImgUrl}${movie?.poster_path}`} alt={movie?.title} />
            <div className="absolute w-full h-full top-0 rounded-md flex justify-center items-center bg-black text-white text-center opacity-0 hover:opacity-100 hover:bg-opacity-80">
                <p className="absolute whitespace-normal w-20 font-bold text-sm ">{movie?.title}</p>
                <p onClick={(e) => {handleSavedMovie(movie)}} className="z-10">
                    { saved ? <FontAwesomeIcon ref={heartIconRef} className="absolute top-0 left-0 p-2 cursor-pointer" icon={solidHeart} />
                    : <FontAwesomeIcon ref={heartIconRef} className="absolute top-0 left-0 p-2 cursor-pointer" icon={regularHeart} /> }
                </p>
            </div>
        </div>
    )
}

export default Movie