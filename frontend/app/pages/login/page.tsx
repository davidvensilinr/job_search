"use client"
export default function Login(){
    const sub =()=>{
        alert("Success");
    }
    return(
        <div>
            <h1 className="text-center">Login</h1>
            <form onSubmit={sub}>
                <h1 className="w-full">Email</h1>
                <input className="w-full"
                required  
                placeholder="Enter your email address"
                type="email"
                />
                <label>Password :</label>
                <input
                className="w-full"
                required
                placeholder="Enter your password"
                type="password"
                />
                <button type="submit" className="w-full">Login</button>
                <button className="w-full">Continue with Google</button>
            </form>
        </div>
    );
}