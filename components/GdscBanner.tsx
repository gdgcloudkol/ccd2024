import BracketLogo from "@/public/assets/images/bracket-logo.svg";
const GdscBanner = ({ label }: { label: string }) => {
  return (
    <div className='w-64 h-64 min-w-64 flex justify-center items-center px-1 flex-col'>
      <img
        src={"https://gdgcloudkol.org/ccd2023/images/logos/gdsc-logo.svg"}
        className={`w-28 object-contain`}
        alt={`${label} logo`}
        aria-label={`${label} logo`}
      />
      <p className='flex flex-col items-center justify-center space-y-1 text-center dark:text-black'>
        {label.startsWith("Google Developer Group") ? (
          <span className='pt-4 flex font-medium text-xl'>{label}</span>
        ) : (
          <>
            <span className='pt-4 flex font-medium text-l'>
              Google Developer Student Club
            </span>
            <span className='pt-5 text-[1.2rem]'>{label}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default GdscBanner;
