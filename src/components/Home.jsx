export function MainHome() {
  const coursel_images = [
    "https://media.kitsu.io/anime/cover_images/13569/large.jpg",
    "https://media.kitsu.io/anime/cover_images/42765/large.jpg",
    "https://media.kitsu.io/anime/cover_images/1376/large.jpg",
  ];
  return (
    <div>
      <div className="relative">
        <div style={{ height: "400px" }} className="whitespace-nowrap absolute">
          {coursel_images.map((imgsrc, idx) => (
            <div key={idx} className="inline-block ">
              <img className="h-full w-full" src={imgsrc} />
            </div>
          ))}
        </div>
        <div className="absolute right-0 bottom-0">
          {coursel_images.map((_, idx) => (
            <div
              key={idx}
              className="h-2 w-8 rounded-lg bg-indigo-500 inline-block mx-2 "
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
