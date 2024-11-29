import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCircleUser, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { logOut } from '../firebase'

const Navbar = ({setSearchQuery}) => {
 
    const [isSearch, setIsSearch] = useState(false)
    const navigate = useNavigate()
    const [burger, setBurger] = useState(false)
    const burgerMenuRef = useRef()
    const [logOutMenu, setLogOutMenu] = useState(false)
    
    const closeOpenMenus = (e)=>{
        if(burger && !burgerMenuRef.current?.contains(e.target)){
            setBurger(false)
        }
    }
    document.addEventListener('mousedown',closeOpenMenus)

    function handleScrolling(){
        console.log(logOutMenu)
        if(!logOutMenu){
            document.querySelector('html').classList.add('noscroll')
        }else{
            document.querySelector('html').classList.remove('noscroll')
        }
    }

    const handleSearchOnClick = () => {
        setIsSearch((prevState) => (!prevState))
        console.log(isSearch)
        if(!isSearch){
            document.getElementById('category').classList.add('mt-14')
        }else{
            document.getElementById('category').classList.remove('mt-14')
        }
    }

    const handleLogOut = async() => {
        try{
            await logOut();
        }catch(error){
            console.log('error logout: ', error)
        }
    }
    
    const handleOnSearch = (query) => {
        console.log(query)
        setSearchQuery(query)
    }

    const handleLogoClick = () => {
        navigate('/home')
        document.getElementById('searchInput').value = ''
        setSearchQuery('')
        setIsSearch(false)
    }

    window.addEventListener('popstate', function(event) {
        const pathname = event.currentTarget.location.pathname
        navigate(pathname)
    }, false);
    
    useEffect(() => {
        console.log('in use effect')
        const pathname = window.location.pathname
        console.log('pathname: ', pathname)
        if(pathname==='/home'){
            document.getElementById('home').classList.add('underline', 'underline-offset-8', 'text-white')
            document.getElementById('myList').classList.remove('underline', 'underline-offset-8', 'text-white')
        }else if(pathname==='/my-list'){
            document.getElementById('myList').classList.add('underline', 'underline-offset-8', 'text-white')
            document.getElementById('home').classList.remove('underline', 'underline-offset-8', 'text-white')
        }
    },[window.location.pathname])

    return (
        <div className='relative w-full flex justify-between p-5 md:p-10 z-10 lg:bg-gradient-to-b from-black'>
            { logOutMenu ?
            <>
                <div className='absolute top-0 left-0 right-0 bottom-0 w-full h-screen bg-black bg-opacity-70 overflow-hidden'></div>
                <div className='absolute left-0 right-0 mx-auto w-fit top-[150%] h-40 bg-white bg-opacity-70 rounded-md z-10'>
                    <p className='pt-8 pb-4 px-2 text-center'>Are you sure wan't to Logout?</p>
                    <div className='flex justify-center items-center gap-10 font-bold text-[19px]'>
                        <button onClick={(e) => {setLogOutMenu(false), handleScrolling()}}>Cancel</button>
                        <button onClick={(e) => {handleLogOut(), handleScrolling()}} className='text-red-700'>LogOut</button>
                    </div>
                </div>
            </> 
            : null }
            { isSearch ? 
                <input id='searchInput' onChange={(e) => handleOnSearch(e.target.value)} className='absolute p-3 top-16 md:top-9 right-0 md:right-52 w-full md:w-52 md:rounded-md h-10' type='text' placeholder='search film'/>    
            : null }
            <div className='flex flex-col md:flex-row gap-4 md:gap-10'>
                <h1 onClick={(e) => handleLogoClick()} className='cursor-pointer font-bold text-red-600 text-xl md:text-3xl'>NETFLIX</h1>
                <ul id='category' className='flex items-center gap-2 md:gap-5 text-gray-500 md:text-gray-300 md:mt-0'>
                    <li id='home' onClick={(e) => navigate('/home')} className='cursor-pointer hover:text-white'>Home</li>
                    <li id='myList' onClick={(e) => navigate('/my-list')} className='cursor-pointer hover:text-white'>My List</li>
                </ul>
            </div>
            { burger ?    
                <div ref={burgerMenuRef} className='absolute top-20 md:top-28 right-4 md:right-11 bg-white w-20 rounded-md bg-opacity-70'>
                    <button onClick={(e) => {setLogOutMenu(true), setBurger(false), handleScrolling()}} className='absolute right-0 left-0 bottom-0 text-center p-1 bg-white/60 hover:text-white font-bold hover:bg-red-500 rounded-md cursor-pointer'>Log out</button>
                </div> 
            : null }
            <div className='flex gap-5 md:gap-10 mr-2 text-white'>
                <FontAwesomeIcon onClick={(e) => handleSearchOnClick()} className='text-lg md:text-2xl cursor-pointer hover:text-gray-300 mt-1' icon={faMagnifyingGlass} />
                <div onClick={(e) => setBurger((prevState) => (!prevState))} className='h-6 flex justify-center gap-2 cursor-pointer'>
                    <FontAwesomeIcon className='text-2xl md:text-3xl hover:text-gray-300' icon={faCircleUser} />
                    <FontAwesomeIcon className='md:text-2xl hover:text-gray-300' icon={faCaretDown} />
                </div>
            </div>
        </div>
    )
}

export default Navbar