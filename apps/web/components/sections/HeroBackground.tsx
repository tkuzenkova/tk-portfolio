export function HeroBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <img
        src="/bg-pattern.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover  mix-blend-screen"
      />
      <div className="orb-1 absolute top-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgb(0_229_204/0.35)_0%,transparent_70%)] blur-[100px] opacity-70" />
      <div className="orb-2 absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgb(123_97_255/0.35)_0%,transparent_70%)] blur-[120px] opacity-70" />
      <div className="orb-3 absolute top-[40%] left-[35%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgb(0_229_204/0.18)_0%,transparent_70%)] blur-[80px] opacity-60" />
      <div className="orb-4 absolute top-[5%] right-[10%] w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgb(123_97_255/0.25)_0%,transparent_70%)] blur-[90px] opacity-60" />
    </div>
  )
}
