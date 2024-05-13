"use client";
import Image from 'next/image'
import React, { useState } from 'react'
import gcp_logo from "../public/assets/images/gcp_logo.png";
import { Button } from './ui/button';
import ProfileForm from '@/app/profile/profileForm';


const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false)
  return (
    <div className='bg-white py-8 px-6 mx-6 my-14 rounded-t-lg max-w-lg sm:mx-auto ' >
        <div>
            <Image className='rounded-full mx-auto mb-6' width={120} height={120} src={gcp_logo} alt="gcp"/>
        </div>
        {isEditing ? null : <h3 className='text-xl text-center text-black'>Name</h3>}
        <div className='text-xl text-black my-9 leading-[30px] flex flex-col'>
        {isEditing ? <ProfileForm /> : (
            <>
                <h3>John Doe</h3>
                <h3>male</h3>
                <h3>student</h3>
                <h3>company</h3>
                <h3>designation</h3>
                <h3>yearsOfExperience</h3>
                <h3> phoneNumber:""</h3>
            </>
            )}
        </div>
        {!isEditing ? <Button
            type='submit'
            className='w-full text-center'
            onClick={()=>setIsEditing((edit) => !edit)}
          >
            Edit
        </Button> : null }
        
    </div>
  )
}

export default ProfileCard