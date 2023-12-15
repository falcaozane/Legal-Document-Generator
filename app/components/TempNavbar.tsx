import React from 'react'

const TempNavbar = () => {
  return (
    <>
        <div className='container'>

            <div className='hidden md:flex flex-row justify-between px-5 py-3'>
                <div className='flex flex-row space-x-8'>
                    <div className='flex flex-row items-center space-x-2'>
                        <div className='brand-image w-8'>
                            <img src="https://i.ibb.co/mNbqJvt/Untitled-design-1.png" alt="" />
                        </div>
                        <div className='brand text-xl font-semibold'>Document Generator</div>
                    </div>
                    <div className='flex flex-row text-sm items-center pt-1 font-semibold text-[#3a526d] mx-4 space-x-8'>
                        <div className='cursor-pointer hover:text-black'>Home</div>
                        <div className='cursor-pointer hover:text-black'>Chatbot</div>
                        <div className='cursor-pointer hover:text-black'>Doc Simplifier</div>
                    </div>
                </div>
                <div className='buttons flex flex-row space-x-4'>
                    <div>
                        <button className='login-button px-6 py-2 text-white text-sm font-semibold bg-[#53BDE1] rounded-lg'>Login</button>
                    </div>
                    <div>
                        <button className='login-button px-6 py-2 text-[#53BDE1] border border-[#53BDE1] hover:text-white text-sm font-semibold hover:bg-[#53BDE1] rounded-lg'>Sign Up</button>
                    </div>
                </div>
                    
            </div>
        </div>
    </>
  )
}

export default TempNavbar