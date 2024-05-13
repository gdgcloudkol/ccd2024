"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import gcp_logo from "../public/assets/images/gcp_logo.png";
import { Button } from "./ui/button";
import ProfileForm from "@/app/profile/profileForm";
import { UserData } from "./models/login/datatype";

const ProfileCard = ({ user }: { user?: UserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(user);
  useEffect(() => {
    setUserData(() => user);
  }, [user]);
  return (
    <div className='bg-white py-8 px-6 mx-6 my-14 rounded-t-lg max-w-lg sm:mx-auto '>
      <div>
        <Image
          className='rounded-full mx-auto mb-6'
          width={120}
          height={120}
          src={gcp_logo}
          alt='gcp'
        />
      </div>
      {isEditing ? null : (
        <h3 className='text-xl text-center text-black'>Name</h3>
      )}
      <div className='text-xl text-black my-9 leading-[30px] flex flex-col'>
        {isEditing ? (
          <ProfileForm userData={userData} />
        ) : (
          <>
            <h3>
              {userData?.profile?.first_name} {userData?.profile?.last_name}
            </h3>
            <h3>{userData?.profile?.pronoun}</h3>
            <h3>
              {userData?.profile?.college ??
                userData?.profile?.company ??
                "Organization unavailable"}
            </h3>
            <h3>{userData?.profile?.phone}</h3>
          </>
        )}
      </div>
      {!isEditing ? (
        <Button
          type='button'
          className='w-full text-center'
          onClick={() => setIsEditing((edit) => !edit)}
        >
          Edit
        </Button>
      ) : null}
    </div>
  );
};

export default ProfileCard;
