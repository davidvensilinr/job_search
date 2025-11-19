'use client'
import Navbar from "@/app/components/Navbar";
export default function editProfile(){
    const update = ()=>{
        alert("Profile updated")

    }
    return(
        <div>
            <Navbar/>
            <h1 className="text-3xl text-center">
                Edit and Update your profile 
            </h1>
            <form onSubmit={update}>
                <label className="w-full text-2xl">Name :</label>
                <input 
                required 
                className="w-full p-4 bg-white text-black"
                type="text"
                placeholder="Your name"
                />
                <label className="w-full text-2xl">Skills :</label>
                <select className="w-full p-4 bg-white text-black">
                    <option disabled>Choose your skill</option>
                    <option>Python</option>
                    <option>Java</option>
                    <option>C++</option>
                </select>
                <button className="bg-amber-300 hover:bg-blue-400 p-4 mt-4 w-full text-black">Update Profile</button>
            </form>
        </div>
    );
}