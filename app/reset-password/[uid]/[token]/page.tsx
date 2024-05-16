"use client";

import AuthContent from "@/public/assets/content/Auth/content.json";
import ResetForm from "../../resetForm"

const Page = () => {
  return (
    <section className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 py-10 px-4">
      <div className=" hidden md:flex banner flex-col col-span-2 bg-white text-black p-4 pb-0 rounded-lg space-y-4">
        <h1
          className="text-4xl font-bold text-center"
          dangerouslySetInnerHTML={{ __html: AuthContent.bannerTitle }}
        />
        <p className="text-center">{AuthContent.bannerDescription}</p>
        <img
          src={AuthContent.bannerImg}
          className="object-contain aspect-auto mx-auto w-full h-auto"
          alt="Auth page banner"
        />
      </div>
      <div className="col-span-3">
        <ResetForm />
      </div>
    </section>
  );
};

export default Page;
