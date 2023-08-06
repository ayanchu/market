import Avatar from '@mui/material/Avatar';
import { useState, useEffect } from 'react';
import Header from '../components/Header';



export default function Profile() {

    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [skills, setSkills] = useState('')
    const [image, setImage] = useState(null)
    const [profileForm, setProfileForm] = useState([])

    const onFormSubmit = () => {
        localStorage.setItem('profile', JSON.stringify({
            name,
            username,
            skills,
            image
        }))
    }

    const deleteImg = () => {
        setImage(null)
        localStorage.setItem('profile', JSON.stringify({
            name,
            username,
            skills,
            image: ''
        }))
    }

    useEffect(() => {
        const savedData = localStorage.getItem('profile')
        if (savedData) {
            const storedFormData = JSON.parse(savedData);
            setProfileForm(storedFormData);
        }
    
      }, []);

      useEffect(() => {
        if (profileForm) {
          setName(profileForm.name);
          setUsername(profileForm.username);
          setSkills(profileForm.skills);
          setImage(profileForm.image)
        }
      }, [profileForm]);




    return(
        <section className="profile">
            <Header/>

            Hi {profileForm.name} its your Profile
            <Avatar
            alt="Remy Sharp"
            src={image}
            sx={{ width: 200, height: 200 }}
        />
        <button onClick={() => deleteImg()}>delete Image</button>


            <p>Name: {profileForm.name}</p>
            <p>Username: {profileForm.username}</p>
            <p>Skills: {profileForm.skills}</p>




            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                profile changing
            </button>

            <div id="authentication-modal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                <div className="relative w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Write about you</h3>
                            <form className="space-y-6" onSubmit={onFormSubmit}>
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="NAME" required/>
                                </div>
                                <div>
                                    <label htmlFor="surename" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your surename</label>
                                    <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" name="surename" id="surename" placeholder="SURENAME" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                                </div>
                                <div>
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your image</label>
                                    <input onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} type="file" name="image" id="image" placeholder="IMAGE" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"/>
                                </div>
                                <div>
                                    <label htmlFor="skills" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your skills</label>
                                    <textarea value={skills} onChange={(e) => setSkills(e.target.value)} type="text" name="skills" id="skills" placeholder="SKILL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required/>
                                </div>
                    
                                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">accept</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div> 
        </section>
    )
}