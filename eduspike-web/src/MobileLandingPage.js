function MobileLandingPage() {
  return (
    <div>
        <div className="flex flex-col justify-center w-screen h-screen">
            {/* <img src='logo-white-bg.png' className="place-items-center  w-[35vw] h-[35vw]" alt="logo"/> */}
            <h1 className="text-5xl self-center text-center" >Welcome to <h1 className="font-bold">Eduspike</h1></h1>
            <img src='logo-white-bg.png' className="mt-6 animate-pulse self-center w-[35vw] h-[35vw]" alt="logo"/>
            <p className="mt-6 text-center w-9/12 self-center">Understanding computational neurons has never been more intuitive.</p>
            <p className="mt-6 text-center w-full self-center">Try it out now<p className="font-bold">on desktop!</p></p>
            {/* <img src='logo-white-bg.png' className="place-items-center  w-[35vw] h-[35vw]" alt="logo"/> */}
        </div>
    </div>
  );
}

export default MobileLandingPage;