import SocialsContent from "@/public/assets/content/Socials/content.json";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import { SocialItem } from "../models/footer/datatypes.props";
export default function Socials() {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <h2 className='mb-6 font-semibold text-gray-900 dark:text-white'>
        {SocialsContent?.title}
      </h2>
      <div className='flex flex-row items-center justify-center space-x-4'>
        {SocialsContent?.social?.map((el: SocialItem, i: number) => {
          return (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={el.hyperlink}
              key={i}
            >
              <div className='relative inline-block text-left group '>
                {el.imgSrc === "facebook" ? (
                  <Facebook className='w-8 h-8' />
                ) : null}
                {el.imgSrc === "twitter" ? (
                  <Twitter className='w-8 h-8' />
                ) : null}
                {el.imgSrc === "instagram" ? (
                  <Instagram className='w-8 h-8' />
                ) : null}
                {el.imgSrc === "linkedin" ? (
                  <Linkedin className='w-8 h-8' />
                ) : null}
                {el.imgSrc === "github" ? <Github className='w-8 h-8' /> : null}
                {el.imgSrc === "gmail" ? <Mail className='w-8 h-8' /> : null}
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
