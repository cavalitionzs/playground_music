import Image from "next/image";
import SoundCloudEmbed from "@/components/SoundCloudEmbed";

export default function Home() {
  return (
    <div className="relative font-sans min-h-screen md:px-10 p-3 py-10 sm:p-4 sm:py-10 md:p-5 md:py-15">
      <div className="fixed inset-0 -z-10 h-full w-full">
        <Image
          src="/PhonkStyleBackgroundAll.png"
          alt="Phonk background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
      <main className="flex flex-col gap-[20px] items-center sm:items-center sm:gap-[10px] md:gap-[10px]">
        <SoundCloudEmbed />
      </main>
    </div>
  );
}
