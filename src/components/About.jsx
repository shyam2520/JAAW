export default function About() {
  return (
    <div className="p-10 flex flex-col">
      <div className=" pl-5">
        <div className=" text-xl font-semibold   text-white font-Carousel-text">
          {" "}
          What is JAAW?{" "}
        </div>
        <div className="pt-5 text-white font-Carousel-text w-3/4 text-base text-justify">
          JAAW - Just Another Aime Site is anime video streaming platoform to
          view your favourite animes across various languages. In other words it
          is a clone of various anime sites . We basically took the best UI
          designs and features of various big anime sites and put it together.
        </div>
      </div>

      <div className=" pl-5 pt-14">
        <div className=" text-xl font-semibold   text-white font-Carousel-text">
          {" "}
          Why use JAAW?{" "}
        </div>
        <div className="pt-5 text-white font-Carousel-text w-3/4 text-base">
          While there is any much difference between JAAW and other site , the
          big sites tend to get blocked and need to relaunch with different
          domain, JAAW scrapes the data form big sites and stores it in its
          database so even in the case the big sites go down we will still
          continue operate with the previous data.
        </div>
      </div>

      <div className=" pl-5 pt-14">
        <div className=" text-xl font-semibold   text-white font-Carousel-text">
          {" "}
          Who are the creators of JAAW?{" "}
        </div>
        <div className="pt-5 text-white font-Carousel-text w-3/4 text-base relative">
          As of now there is only one creator who is working on the site
          (LowSpecGamer) , However the project is open source and anyone can
          provide suggestions , we will get on it as soon as possible.
        </div>
      </div>

      <div className="pl-5 pt-14">
        <a href="https://github.com/shyam2520/JAAW"  rel="noreferrer"  target={"_blank"}>
          <div className="flex flex-row">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className=" text-white mr-4"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentcolor"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <div className="text-white font-Carousel-text"> CONTRIBUTE / RAISE ISSUE</div>
          </div>
        </a>
      </div>
    </div>
  );
}
