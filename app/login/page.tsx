import AuthContent from "@/public/assets/content/Auth/content.json";
import LoginForm from "./loginForm";

const Page = () => {
  return (
    <section className='w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 py-10'>
      <div className=' hidden md:flex banner flex-col bg-white text-black p-4 pb-0 rounded-lg space-y-4'>
        <h1
          className='text-4xl font-bold text-center'
          dangerouslySetInnerHTML={{ __html: AuthContent.bannerTitle }}
        />
        <p className='text-center'>{AuthContent.bannerDescription}</p>
        <img
          src={AuthContent.bannerImg}
          className='object-contain aspect-auto mx-auto w-1/2 h-auto'
          alt='Auth page banner'
        />
      </div>
      <LoginForm />
    </section>
  );
};

export default Page;
