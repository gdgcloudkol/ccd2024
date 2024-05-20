"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../../components/ui/button";
import ProfileForm from "@/app/profile/profileForm";
import { UserData } from "../../components/models/login/datatype";
import { cn } from "@/lib/utils";
import { DEFAULT_FIRST_NAME, DEFAULT_LAST_NAME } from "@/lib/constants/generic";
import { useSession } from "next-auth/react";
import { ArrowRight, Edit, Pencil } from "lucide-react";
import { redirect } from "next/navigation";
import LoadLink from "@/components/blocks/LoadLink";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

const NoShowModal = () => {
  return (
    <Dialog>
      <DialogTrigger className='text-google-blue text-sm'>
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
    () => 3 - Number(user?.profile?.attempts),
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
    <div
      className={cn(
        "bg-white p-8 px-4 lg:px-8 mx-6 my-14 rounded-lg max-w-3xl sm:mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4",
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
              . My supercool username is{" "}
              <span className='highlight '>{userData?.username}</span> . I am
              associated with{" "}
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
            <p>
              P.S. I have
              <span className='highlight'>
                {" "}
                {userData?.profile?.attempts} more
              </span>{" "}
              attempts to attend extended events .{" "}
              {approved_events_count == 0 && (
                <>
                  I{" "}
                  {userData?.profile?.no_show !== 0 ? (
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
                <Edit className='inline-flex h-4 w-4 mr-2' /> Edit my profile
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCard;
