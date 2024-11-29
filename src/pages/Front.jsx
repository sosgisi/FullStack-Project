import axios from "axios"
import { useEffect, useState } from "react"
import requests from "../requests"
import { useNavigate } from "react-router-dom"

const Front = () => {

    const env = import.meta.env
    const baseImgUrl = env.VITE_BASE_IMG_URL

    const navigate = useNavigate()
    const [movies, setMovies] = useState([])
    const [displays, setDisplays] = useState([])
    const [loading, setLoading] = useState(false)

    const randomMovies = () => {
        let randoms = []
        const random = Math.floor(Math.random() * movies.length)
        randoms.push(random)
        const temp = movies[random]
        setDisplays((prevArray) => [...prevArray, temp])
        for(let i=0; i<10;){
            const newRandom = Math.floor(Math.random() * movies.length)
            for(let j=0; j<randoms.length; j++){
                if(newRandom===randoms[j]){
                    break
                }else if(j===randoms.length-1){
                    randoms.push(newRandom)
                    const temp = movies[newRandom]
                    setDisplays((prevArray) => [...prevArray, temp])
                    i++
                }
            }
        }
    }

    useEffect(() => {
        setLoading(true)
        axios.get(requests.requestPopular)
            .then((result) => {
                setMovies(result.data.results) 
            })
    },[])

    useEffect(() => {
        setDisplays([])
        if(movies.length > 0) {
            randomMovies()
            setLoading(false)
        }
        handleScrolling(false)
    }, [movies])

    const handleScrolling = (state) => {
        if(state){
            document.querySelector('html').classList.remove('noscroll')
        }else{
            document.querySelector('html').classList.add('noscroll')
        }
    }

    return (
        <>
            { loading ? 
                    <div className="custom-loader absolute right-0 mx-auto w-fit top-20 left-0 z-10"></div>
            : null }
            <div className="flex flex-col">
                <div className="flex justify-between p-5 z-10">
                    <h1 className="text-red-600 text-3xl font-bold cursor-pointer">NETFLIX</h1>
                    <button onClick={(e) => {navigate('/sign-in'), handleScrolling(true)}} className="text-black rounded-3xl bg-white px-5 py-1 hover:bg-gray-400 hover:border-none transition duration-500">Sign In</button>
                </div>
                <div className="absolute  grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 place-items-center h-screen">
                    <div className="absolute w-full h-screen bg-gradient-to-t from-black"></div>
                    <div className="absolute w-full h-screen bg-gradient-to-b from-black"></div>
                    {displays.map((display, i) => {
                        return(
                            <div key={i}>
                                <img className="w-full object-cover" src={`${baseImgUrl}${display?.poster_path}`} alt={display?.title} />
                            </div>
                        )
                    })}
                </div>
                <div className="absolute bottom-14 w-full flex flex-col justify-center items-center text-center">
                    <p className="text-white font-bold text-2xl w-64">Unlimited entertainment, one low price.</p>
                    <p className="text-white text-xl w-72 mb-5">All of Netflix, starting at just ₹149.</p>
                    <p className="text-gray-300 text-md mb-2">Ready to watch? Get started to create an account.</p>
                    <button onClick={(e) => {navigate('/sign-up'), handleScrolling(true)}} className="text-white font-bold text-xl bg-red-600 rounded-xl px-28 py-3">GET STARTED</button>
                </div>
            </div>
        </>
    )
}

export default Front