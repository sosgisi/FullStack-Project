import { useEffect, useState } from "react"
import Display from "../components/Display"
import Navbar from "../components/Navbar"
import Row from "../components/Row"
import requests from "../requests"
import axios from "axios"

const Home = () =>{

    const env = import.meta.env
    const baseImgUrl = env.VITE_BASE_IMG_URL
    const [searchResult, setSearchResult] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        console.log(searchQuery)
        axios.get(`${requests.requestSearchMovie}&query=${searchQuery}`)
            .then((result) => {
                console.log(`${requests.requestSearchMovie}&query=${searchQuery}`)
                console.log(result.data.results)
                setSearchResult(result.data.results)
            })
            .catch(error => console.log('error query: ', error))
    }, [searchQuery])

    return(
        <>
            <Navbar setSearchQuery={setSearchQuery}/>
            { searchQuery.length>0 ?
                <>
                    <h1 className="text-white text-2xl p-5">{`Results for searching ' ${searchQuery} '`}</h1>
                    <div className="grid grid-cols-1 md:grid-cols-3 w-full">
                    { searchResult.map((result, i) => (
                        <>
                            <div key={i} className="flex p-5 gap-10">
                                <img className="h-40 object-cover rounded-md" src={`${baseImgUrl}${result.poster_path}`} alt={result.title} />
                                <div className="text-white">
                                    <h1 className="text-2xl font-bold">{result.title}</h1>
                                    <p className="text-gray-500 text-md">{result.release_date}</p>
                                </div>
                            </div>
                        </>
                    )) }
                    </div>
                </>
            : 
                <>
                    <Display/>
                    <Row rowID='1' genre='Popular' fetch={requests.requestPopular}/>
                    <Row rowID='2' genre='Top Rated' fetch={requests.requestTopRated}/>
                    <Row rowID='3' genre='Up Coming' fetch={requests.requestUpcoming}/>
                </>
            }
        </>
    )
}

export default Home