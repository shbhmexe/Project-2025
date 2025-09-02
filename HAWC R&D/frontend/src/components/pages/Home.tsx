import { useAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';

const Home = () => {
  const { isAuthenticated, user } = useAuth();
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    // Trigger animation after component mounts
    setAnimate(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        
        <div className="text-center relative">
          <div className={`mb-8 flex justify-center transition-all duration-1000 transform ${animate ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
            <div className="h-28 w-28 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-xl ring-4 ring-indigo-100 transition-all duration-500 hover:shadow-indigo-200/50 hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className={`text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 sm:text-5xl sm:tracking-tight lg:text-6xl transition-all duration-1000 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            Welcome to CodeIgniter App
          </h1>
          <p className={`mt-5 max-w-xl mx-auto text-xl text-gray-600 transition-all duration-1000 delay-300 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            A demonstration of token-based authentication with React and Express
          </p>
        </div>

        <div className={`mt-12 transition-all duration-1000 delay-500 transform ${animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {isAuthenticated ? (
            <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-3xl mx-auto transform transition-all hover:scale-[1.02] duration-500 border border-indigo-50">
              <div className="px-6 py-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-size-200 animate-gradient-x">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-white/20 p-2 rounded-lg mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl leading-6 font-bold text-white">User Information</h3>
                    <p className="mt-1 max-w-2xl text-sm text-indigo-100">Personal details from your account</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-indigo-100">
                <dl>
                  <div className="bg-indigo-50 px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transition-all duration-300 hover:bg-indigo-100/50">
                    <dt className="text-sm font-medium text-indigo-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Full name
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800 font-semibold sm:mt-0 sm:col-span-2">
                      {user?.first_name} {user?.last_name}
                    </dd>
                  </div>
                  <div className="bg-white px-6 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 transition-all duration-300 hover:bg-indigo-50/50">
                    <dt className="text-sm font-medium text-indigo-700 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-800 font-semibold sm:mt-0 sm:col-span-2">{user?.email}</dd>
                  </div>
                </dl>
              </div>
              <div className="px-6 py-6 sm:px-6 text-center bg-gradient-to-r from-indigo-50 to-purple-50">
                <p className="text-sm text-indigo-700 font-medium">
                  Use the navigation menu to explore teachers data
                </p>
                <div className="mt-4">
                  <a 
                    href="/teachers" 
                    className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <span>View Teachers</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center mt-10">
              <div className="bg-white shadow-2xl rounded-2xl overflow-hidden max-w-3xl mx-auto p-10 transform transition-all hover:scale-[1.02] duration-500 border border-indigo-50">
                <div className="flex flex-col items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 opacity-30 blur-md"></div>
                    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full p-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mt-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2">
                    Get Started
                  </h3>
                  <p className="text-xl text-gray-600 font-medium mb-8 max-w-md">
                    Please login or register to access the application features
                  </p>
                  <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                    <a 
                      href="/login" 
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Login
                    </a>
                    <a 
                      href="/register" 
                      className="inline-flex items-center justify-center px-6 py-3 border border-indigo-300 text-base font-medium rounded-xl shadow-md text-indigo-700 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Register
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;