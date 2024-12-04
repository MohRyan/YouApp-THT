import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full justify-center items-center">
      <img src="https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1.aliyuncs.com/company-logo/a0fd564717dec3d243ead58de1bbafb9.jpeg" alt="" className="logo-back scale-75 animate-fadeIn" />
      <div className="w-full rounded-xl flex-col flex justify-center items-center animate-fadeRegis space-y-4">
        <Link href={'/login'} className="px-20 py-3 rounded-md bg-gradient-to-l from-gradient-start to-gradient-end text-white hover:bg-gradient-to-b">
          Sign In
        </Link>
        <div className="flex text-white px-20 w-full justify-center items-center gap-4">
          <span className="w-[40%] bg-white h-0.5"></span>
          <span>or</span>
          <span className="w-[40%] bg-white h-0.5"></span>
        </div>
        <button className="bg-white px-6 py-3 rounded-md flex items-center gap-2"><span className="logo-google"></span> Sign In with Google</button>
      </div>
    </div>
  )
}
