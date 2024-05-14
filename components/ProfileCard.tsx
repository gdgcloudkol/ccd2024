"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ProfileForm from "@/app/profile/profileForm";
import { UserData } from "./models/login/datatype";
import { cn } from "@/lib/utils";
import { DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME } from "@/lib/constants/generic";

const ProfileCard = ({ user }: { user?: UserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(user);

  useEffect(() => {
    setUserData(() => user);
  }, [user]);

  return (
    <div
      className={cn(
        "bg-white p-8 px-4 lg:px-8 mx-6 my-14 rounded-lg max-w-2xl sm:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4",
        isEditing && "lg:grid-cols-1 place-content-center "
      )}
    >
      <Image
        className={cn(
          "rounded-full h-40 w-40 lg:h-64 lg:w-64 mx-auto lg:mx-0  border-4 google-border p-4",
          isEditing && "lg:mx-auto"
        )}
        width={500}
        height={500}
        src={"/assets/images/mascot.webp"}
        alt='gccd kol mascot'
      />

      <div className='text-xl text-black leading-10 flex flex-col space-y-4'>
        {isEditing ? (
          <ProfileForm
            userData={userData}
            updateHandler={() => setIsEditing(false)}
          />
        ) : (
          <>
            <p>
              Hi, I am{" "}
              <span className='highlight '>
                {userData?.profile?.first_name || DEFAULT_FIRST_NAME}{" "}
                {userData?.profile?.last_name || DEFAULT_LAST_NAME}
              </span>
              . My pronouns are{" "}
              <span className='highlight '>
                {userData?.profile?.pronoun || "Me/mine"}
              </span>
              . I am associated with{" "}
              <span className='highlight '>
                {userData?.profile?.college ||
                  userData?.profile?.company ||
                  "no organizations yet"}
              </span>{" "}
              {(userData?.profile?.college?.trim() !== "" ||
                userData?.profile?.company?.trim() !== "") && (
                <>
                  as a{" "}
                  <span className='highlight '>
                    {userData?.profile?.student ? "Student" : "Professional"}
                  </span>
                </>
              )}
              . You can reach out at{" "}
              <span className='highlight '>{userData?.email}</span>
              {userData?.profile?.phone && (
                <>
                  {" "}
                  and{" "}
                  <span className='highlight '>{userData?.profile?.phone}</span>
                </>
              )}
              .
            </p>
            <Button
              type='button'
              className='w-full text-center text-foreground text-base'
              onClick={() => setIsEditing((edit) => !edit)}
            >
              Edit
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
