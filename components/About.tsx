import "@/styles/about.css";
import AboutData from "@/public/assets/content/About/content.json";
import ContentData from "@/public/assets/content/About/postcontent.json";
import Community from '@/public/assets/content/About/community.json'
import logo from '@/public/assets/gdev.svg';
import dyno from '@/public/assets/dyno.svg';
import { cn } from "@/lib/utils";
import gdsc from '@/public/assets/images/gdsc.png';

function About() {
  const TextColorMap: { [key: string]: string } = {
    blue: "text-google-blue",
    red: "text-google-red",
    yellow: "text-google-yellow",
    green: "text-google-green",
  };
  return (
    <>
      <div className='bg-background text-foreground px-4'>
        <div className='w-full max-w-6xl mx-auto py-14'>
          <div className='flex lg:flex-row flex-col gap-2  mb-4'>
            <h1 className='font-bold md:text-5xl text-5xl'>
              {AboutData.headerFixed}
            </h1>
            <div className='inner-headings'>
              <span className='font-bold'>
                {AboutData.headerWords.map((word) => (
                  <>
                    <text
                      className={cn(
                        TextColorMap[word.color] || "",
                        "md:text-5xl",
                        word.text.length > 16
                          ? word.text.length > 20
                            ? "text-2xl"
                            : "text-3xl"
                          : "text-4xl"
                      )}
                    >
                      {word.text} <br />
                    </text>
                  </>
                ))}
              </span>
            </div>
          </div>
          <p className='md:text-2xl text-lg'>{AboutData.description}</p>
        </div>
      </div>
      <div className="bg-primary text-black px-4">
        <div className="max-w-screen-lg mx-auto py-10 ">
          <h1 className="text-google-blue text-4xl font-bold flex justify-center max-sm:text-3xl py-2">{ContentData.callheading}</h1>
          {ContentData.callparagraph.map((word) => (
            <h3 className="  md:text-2xl text-lg px-32 py-2 font-medium text-center max-sm:contents"><p> {word.para}</p></h3>
          ))}
          <button className="bg-google-blue py-1 px-8 text-xl text-foreground block mx-auto my-2 rounded-2xl">
            <span className="flex items-center text-2xl gap-2 font-light">
              {ContentData.buttondesc}
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" strokeLinecap="round" stroke-linejoin="round" className="lucide lucide-move-up-right"><path d="M13 5H19V11" /><path d="M19 5L5 19" /></svg>
            </span>

          </button>
        </div>
      </div>
      <div className="bg-primary text-black px-4">
        <div className="max-w-screen-lg mx-auto py-10 max-sm:contents ">
          <h1 className="text-4xl font-bold flex justify-center ">{ContentData.sponsorheading}</h1>
          <h3 className="  md:text-2xl text-lg px-20 py-2 font-medium text-center max-sm:contents justify-center"><p>{ContentData.sponsorparagraph}</p><a className="text-google-blue underline max-sm:block" href="mailto:partners@gdgcloud.org">{ContentData.sponsoremail}</a></h3>
        </div>
        <div className=" py-4 title-sponsor ">
          <div>
            <h1 className="text-4xl font-bold flex justify-center ">{ContentData.sponsortitle}</h1>
            <img className="py-4 block mx-auto" src={logo.src} alt="" />
          </div>
        </div>
        <div className=" py-4 gold-sponsor ">
          <div>
            <h1 className="text-4xl font-bold flex justify-center ">{ContentData.goldsponsor}</h1>
            <img className="py-4 block mx-auto" src={dyno.src} alt="" />
          </div>
        </div>
        <div className=" py-4 silver-sponsor ">
          <div>
            <h1 className="text-4xl font-bold flex justify-center ">{ContentData.silversponsor}</h1>
            <img className="py-4 block mx-auto" src={dyno.src} alt="" />
          </div>
        </div>
        <div className=" py-4 dg-media-sponsor ">
          <div>
            <h1 className="text-4xl font-bold flex justify-center ">{ContentData.digitalsponsor}</h1>
            <img className="py-4 block mx-auto" src={dyno.src} alt="" />
          </div>
        </div>
      </div>
      <div className="bg-background py-20">
        <h1 className="text-4xl text-google-yellow font-bold flex justify-center ">{ContentData.communityheading}</h1>
        <h3 className="  md:text-2xl text-lg px-20 py-6 font-medium text-center max-sm:contents justify-center">{ContentData.community}</h3>
        <div className=" grid grid-cols-1 gap-8 md:grid-cols-6 lg:grid-cols-4 place-items-center m-8">
          {
            Community.community.map((item) => (
              <div>


                {(item.type !== 'GDSC') ? (
                  <>
                    {/* If Part */}
                    <div className='CARD w-64 col-span-1 h-full md:col-span-2 lg:col-span-1 align-middle  rounded-lg bg-google-white text-black  py-1'>

                      <div className="border rounded-full  w-32 h-fit p-2 mx-auto my-3">
                        {/* <Image src={item.logo} width='100' height='100' alt="" /> */}
                        <a href="">
                          <img src={item.logo} alt="" />
                        </a>
                      </div>
                      <div className="text-center my-8 ">

                        <h1 className="font-bold text-xl py-1">{item.name}</h1>
                        <p className="font-normal text-lg py-1">{item.desc}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Else Part */}
                    <div className='CARD w-64 col-span-1 h-full md:col-span-2 lg:col-span-1 align-middle  rounded-lg bg-google-white text-black py-4'>
                      <div className="border rounded-full  w-52 h-fit p-2 m-auto my-3">
                        {/* <Image src={item.logo} width='100' height='100' alt="" /> */}
                        <a href="">
                          <img src={item.logo} alt="" />
                        </a>
                      </div>
                    </div>
                  </>
                )
                }
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default About;
