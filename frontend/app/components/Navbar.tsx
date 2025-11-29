'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { User, Session } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check active sessions and set the user
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getSession();

    // Listen for changes in auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, session: Session | null) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="p-4 bg-amber-300 mb-4">
        <div className="flex justify-center">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-center text-5xl font-bold font-sans p-3">Job Search</h1>
      <div className="p-4 bg-amber-300 mb-4">
        <nav className="flex flex-nowrap justify-center gap-4">
          <Link href='/'><button className='bg-white p-4 rounded-2xl text-black hover:bg-teal-300'>Home</button></Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="bg-white px-4 py-2 rounded-2xl text-black font-medium">
                {user.email}
              </span>
              <Link href="/pages/editProfile">
                <button className="p-2 bg-white rounded-2xl text-black hover:bg-teal-300">
                  Edit Profile
                </button>
              </Link>
              <button 
                onClick={handleLogout}
                className="p-2 bg-red-500 rounded-2xl text-white hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href='/pages/login'>
              <button className="bg-white p-4 rounded-2xl text-black hover:bg-teal-300">
                Login/Signup
              </button>
            </Link>
          )}
          
          <button className="bg-green-400 rounded-2xl p-4 text-black hover:bg-teal-300">
            Smart Recommendation
          </button>
        </nav>
      </div>
    </>
  );
}