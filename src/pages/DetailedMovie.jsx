import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const DetailedMovie = () => {

    const navigate = useNavigate()
    const env = import.meta.env
    const baseImgUrl = env.VITE_BASE_IMG_URL
    const movie = JSON.parse(localStorage.getItem('movie'))
    
    window.addEventListener('popstate', function(event) {
        const pathname = event.currentTarget.location.pathname
        navigate(pathname)
    }, false);

    useEffect(() => {
        console.log(movie)
        console.log(document.location)
    },[])

    return(
        <div className="flex flex-col justify-center items-center gap-5 text-white h-screen w-full">
            <FontAwesomeIcon onClick={(e) => history.back()} className="cursor-pointer absolute top-5 left-5 text-3xl" icon={faArrowLeft}/>
            <img className="rounded-md" src={`${baseImgUrl}${movie.backdrop_path}`} alt="" />
            <h1 className="text-white text-3xl font-bold">{movie.title}</h1>
            <p className="text-center text-gray-400 w-[50%]">{movie.overview}</p>
            <p className="text-yellow-400 font-bold">{`${movie.vote_average} Vote`}</p>
            <p className="text-gray-500">{`Date: ${movie.release_date}`}</p>
        </div>
    )
}

export default DetailedMovie