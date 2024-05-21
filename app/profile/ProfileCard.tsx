/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import ProfileForm from "@/app/profile/profileForm";
import { UserData } from "../../components/models/login/datatype";
import {
  cn,
  extractGithubUsername,
  getPronoun,
  getPronounLabel,
} from "@/lib/utils";
import { DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME } from "@/lib/constants/generic";
import { useSession } from "next-auth/react";
import { ArrowRight, Edit } from "lucide-react";
import LoadLink from "@/components/blocks/LoadLink";

import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const NoShowModal = () => {
  return (
    <Dialog>
      <DialogTrigger className='text-google-blue text-base'>
        (What this means?)
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> What does a no-show mean?</DialogTitle>
        </DialogHeader>
        <p>
          A no-show refers to a situation where, an attendee{" "}
          <strong>
            does not show up to the event even when they are approved, without
            informing 24 hours prior to the event!
          </strong>
        </p>
        <p>
          An attendee gets 3 chances to attend extended events{" "}
          <strong>Each no-show costs 1 attempt. </strong> E.g. if you have 3
          attempts left, and an approved ticket, not showing up would decrease
          your attempts to 1. (1 subtracted for approved status, another for no
          show)
        </p>
        <DialogFooter>
          <DialogTrigger>Close</DialogTrigger>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ProfileCard = ({ user }: { user?: UserData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData | undefined>(user);
  const approved_events_count = useMemo(
    () => 3 - Number(user?.profile?.attempts ?? 0),
    [user]
  );
  const { update } = useSession();
  useEffect(() => {
    setUserData(() => user);
  }, [user]);
  useEffect(() => {
    const updateProfile = async () => {
      let res = await update();
    };
    updateProfile();
  }, []);

  return (
    <>
      <div
        className={cn(
          "bg-white p-8 px-4 lg:px-8 mx-6 my-14 rounded-lg max-w-3xl sm:mx-auto flex flex-col"
        )}
      >
        <div
          className={cn(
            " w-full grid grid-cols-1 lg:grid-cols-2 gap-4",
            isEditing && "lg:grid-cols-1 place-content-center "
          )}
        >
          <div className='relative flex flex-col items-center gap-4'>
            <img
              className={cn(
                "rounded-full  h-40 w-40 lg:h-64 lg:w-64 mx-auto lg:mx-0  border-[6px] google-border p-1",
                isEditing && "lg:mx-auto",
                userData?.profile?.no_show &&
                  userData?.profile?.no_show > 0 &&
                  " border-[8px] border-google-red"
              )}
              width={500}
              height={500}
              src={
                userData?.profile?.socials.github &&
                extractGithubUsername(userData?.profile?.socials.github)
                  ? `https://github.com/${extractGithubUsername(
                      userData?.profile?.socials?.github
                    )}.png`
                  : "/assets/images/mascot.webp"
              }
              alt='gccd kol mascot'
            />
            {userData?.profile?.socials.github == undefined ||
            userData?.profile?.socials.github == "" ? (
              <span className='text-base text-google-darkGrey'>
                Add your github for customized profile pic!
              </span>
            ) : (
              <Link
                href={`${userData?.profile?.socials?.github}`}
                target='_blank'
                rel='noreferrer noopener'
              >
                <Button variant={"link"} className='text-base'>
                  <Edit className='h-4 w-4 mr-2' /> Edit picture on github
                </Button>
              </Link>
            )}
          </div>
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
                    {getPronounLabel(
                      `${userData?.profile?.pronoun}`,
                      "Me/mine"
                    ) || "Me/mine"}
                  </span>
                  . My supercool username is{" "}
                  <span className='highlight '>{userData?.username}</span> . I
                  am associated with{" "}
                  <span className='highlight '>
                    {(userData?.profile?.student
                      ? userData?.profile?.college
                      : userData?.profile?.company) || "no organization yet"}
                  </span>{" "}
                  {(userData?.profile?.college?.trim() !== "" ||
                    userData?.profile?.company?.trim() !== "") && (
                    <>
                      as a{" "}
                      <span className='highlight '>
                        {userData?.profile?.student
                          ? "Student"
                          : "Professional"}
                      </span>
                    </>
                  )}
                  . You can reach out at{" "}
                  <span className='highlight '>{userData?.email}</span>
                  {userData?.profile?.phone && (
                    <>
                      {" "}
                      and{" "}
                      <span className='highlight '>
                        {userData?.profile?.phone}
                      </span>
                    </>
                  )}
                  .
                </p>
                <p>
                  P.S. I have
                  <span className='highlight'>
                    {" "}
                    {userData?.profile?.attempts} more
                  </span>{" "}
                  attempts to attend extended events .{" "}
                  {approved_events_count > 0 && (
                    <>
                      I{" "}
                      {userData?.profile?.no_show == 0 ? (
                        "showed up for every approved ticket."
                      ) : (
                        <>
                          {" "}
                          <strong> did not </strong>show up to{" "}
                          <span className='highlight'>
                            {userData?.profile?.no_show} events
                          </span>{" "}
                          <NoShowModal />
                        </>
                      )}
                    </>
                  )}
                </p>
                <div className='grid grid-cols-1  gap-4'>
                  <LoadLink href={"/extended-events"}>
                    <Button
                      type='button'
                      className='w-full text-center text-foreground text-base group'
                    >
                      Register for events
                      <ArrowRight className='inline-flex h-4 w-4 ml-2 group-hover:-rotate-45 duration-100' />{" "}
                    </Button>
                  </LoadLink>
                  <Button
                    type='button'
                    variant={"ghost"}
                    className='w-full text-center text-base'
                    onClick={() => setIsEditing((edit) => !edit)}
                  >
                    <Edit className='inline-flex h-4 w-4 mr-2' /> Edit my
                    profile
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        {!isEditing &&
          userData?.profile?.socials &&
          Object.keys(userData?.profile?.socials)?.length > 0 && (
            <div className='my-4 flex items-center justify-center gap-2 mx-auto row-span-2 col-span-2 '>
              {userData?.profile?.socials?.github && (
                <Link
                  href={`${userData?.profile?.socials?.github}`}
                  target='_blank'
                  rel='noopener noreferer'
                >
                  <img
                    src={"/assets/icons/github.svg"}
                    alt='github logo'
                    className='h-8 w-8'
                    title={`${userData?.profile?.socials?.github}`}
                  />
                </Link>
              )}
              {userData?.profile?.socials?.linkedin && (
                <Link
                  href={`${userData?.profile?.socials?.linkedin}`}
                  target='_blank'
                  rel='noopener noreferer'
                >
                  <img
                    src={"/assets/icons/linkedin.svg"}
                    alt='linkedin logo'
                    className='h-8 w-8'
                    title={`${userData?.profile?.socials?.linkedin}`}
                  />
                </Link>
              )}
              {userData?.profile?.socials?.twitter && (
                <Link
                  href={`${userData?.profile?.socials?.twitter}`}
                  target='_blank'
                  rel='noopener noreferer'
                >
                  <img
                    src={"/assets/icons/twitter.svg"}
                    alt='twitter logo'
                    className='h-8 w-8'
                    title={`${userData?.profile?.socials?.twitter}`}
                  />
                </Link>
              )}
              {userData?.profile?.socials?.website && (
                <Link
                  href={`${userData?.profile?.socials?.website}`}
                  target='_blank'
                  rel='noopener noreferer'
                >
                  <img
                    src={"/assets/icons/website.svg"}
                    alt='twitter logo'
                    className='h-8 w-8'
                    title={`${userData?.profile?.socials?.website}`}
                  />
                </Link>
              )}
            </div>
          )}
      </div>
    </>
  );
};

export default ProfileCard;
