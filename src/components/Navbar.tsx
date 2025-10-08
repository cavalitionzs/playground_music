import Image from "next/image";
import { img_profile } from "../constants";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between p-4 bg-black/35 backdrop-blur-md text-white">
      <div className="flex items-center gap-4">
        {img_profile.map((profile) => (
          <div
            key={profile.img}
            className="relative w-[50px] h-[50px] flex-shrink-0"
          >
            <Image
              src={profile.img}
              alt="Cavalitionzs"
              fill
              className="rounded-full object-cover"
            />
          </div>
        ))}

        <div className="w-[32px] h-[32px]">
          <iframe
            title="SoundCloud Icon"
            scrolling="no"
            frameBorder="no"
            className="w-[32px] h-[32px]"
            src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fcavalitionz&color=orange_transparent&size=32"
          />
        </div>
        <div className="text-white">Cavalitionzs</div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="px-6 py-2  text-white rounded-lg hover:bg-black/10 transition"
        >
          Home
        </Link>
      </div>
    </nav>
  );
}
