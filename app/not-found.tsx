import AlternateHeader from "@/components/blocks/AlternateHeader";
import { IconButton } from "@/components/ui/icon-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <section className='flex flex-col w-full max-w-6xl mx-auto'>
      <section className='flex flex-col local-container gap-6 p-4 space-y-2'>
        <h1 className='text-4xl lg:text-7xl text-google-red font-bold flex justify-center'>
          Oops!
        </h1>
        <p className='text-center text-xl'>
          Could not find the resource you requested!
        </p>
        <Link
          href={"/"}
          className='bg-google-blue w-fit py-1 px-8 text-lg text-foreground block mx-auto my-2 rounded-lg group'
        >
          <span className='flex items-center gap-2 font-light'>
            Return home
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              strokeLinecap='round'
              stroke-linejoin='round'
              className='lucide lucide-move-up-right mt-1 rotate-45 group-hover:rotate-0 group-hover:translate-x-0.5 -translate-y-0.5 duration-150'
            >
              <path d='M13 5H19V11' />
              <path d='M19 5L5 19' />
            </svg>
          </span>
        </Link>
      </section>
    </section>
  );
}
