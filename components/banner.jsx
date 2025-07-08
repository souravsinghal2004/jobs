import Image from 'next/image'

export default function Banner() {
  return (
    <div className="relative w-full h-64 sm:h-80 md:h-[28rem] lg:h-[32rem] xl:h-[36rem] overflow-hidden">
      <Image
        src="/logo2.png"
        alt="Site Banner"
        fill
        priority
        className="object-cover"
      />
    </div>
  )
}
