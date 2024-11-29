import { faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import { useEffect, useState } from "react"
import Movie from "./Movie"

const Row = ({rowID, genre, fetch}) => { 

    const [movies, setMovies] = useState([])

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    };
    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    };
    
    useEffect(() => {
        console.log('load row: ', rowID)
        axios.get(fetch).then((result) => {
            setMovies(result.data.results)
        })
    }, [fetch])

    return(
        <>
            <h1 className="px-5 text-white font-bold text-2xl relative">{genre}</h1>
            <div className="relative flex items-center group">
                <FontAwesomeIcon onClick={slideLeft} className="absolute text-white text-5xl z-10 opacity-80 hover:opacity-100 px-3 hidden md:group-hover:block" icon={faCircleChevronLeft} />
                <div id={'slider'+ rowID} className="px-3 pb-5 pt-2 w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth no-scrollbar relative">
                    {
                        movies.map((movie, i) => (
                            <Movie key={i} movie={movie} />
                        ))
                    }
                </div>
                <FontAwesomeIcon onClick={slideRight} className="absolute text-white right-0 text-5xl z-10 opacity-80 hover:opacity-100 px-3 hidden md:group-hover:block" icon={faCircleChevronRight} />
            </div>
        </>
    )
}

export default Row