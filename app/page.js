"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const initialData = [
  "https://images.unsplash.com/photo-1623584973952-182bcb43b8ad?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVubnklMjBhbmltYWx8ZW58MHx8MHx8fDA%3D",
  "https://plus.unsplash.com/premium_photo-1676479611854-5b65f4b4fcfc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGZ1bm55JTIwYW5pbWFsfGVufDB8fDB8fHww",
  "https://images.unsplash.com/photo-1652385509955-9c81b2d93bc3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fGN1dGUlMjBhbmltYWxzfGVufDB8fDB8fHww",
];

export default function Home() {
  return (
    <div className="mx-auto px-5 max-w-2xl min-h-full items-center mt-10">
      <div className="text-4xl font-bold flex mb-8">
        Code Challenge: Custom Carousel 🎠
      </div>

      <Carousel data={initialData} />
      <div className="mt-10" />
      <h1 className="text-2xl font-extrabold">
        Create a Functional Carousel using a Custom Hook!🪝
      </h1>
      <p className="font-semibold mt-4">
        Build a functional React carousel that cycles through images, then
        refactor the logic into a custom useCarousel hook.
      </p>
      <div className="mt-10" />
      <>
        <h1 className="text-lg font-semibold">
          Part 1: Develop a functional carousel that can
        </h1>
        <div className="pl-4">
          <label>
            <input type="checkbox" /> Display images
          </label>
          <br />
          <label>
            <input type="checkbox" /> Allow users to manually switch images with
            `Prev` and `Next` buttons
          </label>
          <br />
          <label>
            <input type="checkbox" /> Show visual indicators (dots) for each
            image in the carousel
          </label>
        </div>

        <h1 className="text-lg font-semibold mt-6">
          Part 2: Abstract carousel functionality to custom 'useCarousel' hook
        </h1>
        <div className="pl-4">
          <label>
            <input type="checkbox" /> Create `useCarousel` hook to manage
            carousel state
          </label>
          <br />
          <label>
            <input type="checkbox" /> Refactor the Carousel component to use the
            hook
          </label>
          <br />
          <label>
            <input type="checkbox" /> Test the reusability of the hook to ensure
            it functions independently from the Carousel component and can be
            easily reused in other instances
          </label>
        </div>

        <h1 className="text-lg font-semibold mt-6">Part 3: Polish</h1>
        <div className="pl-4">
          <label>
            <input type="checkbox" /> Automatically move to the next image after
            a set interval
          </label>
          <br />
          <label>
            <input type="checkbox" /> Show progress bar for image timing
          </label>
        </div>
      </>

      <div className="mb-10" />
    </div>
  );
}

export const Carousel = ({ data }) => {
  const { carouselData, carouselIdx, handleNext, handlePrev } =
    useCarousel(data);
  const time = 9;
  const [timer, setTimer] = useState(time);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 0) {
          handleNext();
          return time;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <div className="max-h-[500px] max-w-[700px]">
        <Image
          src={carouselData[carouselIdx]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          alt={carouselData[carouselIdx]}
          height={500}
          width={700}
        />
        <div
          style={{
            height: "4px",
            width: `${(timer / time) * 100}%`,
            backgroundColor: "gray",
            transition: "width 1s linear",
            transformOrigin: "right",
          }}
        />
      </div>
      <ul
        style={{
          display: "flex",
          columnGap: "10px",
          justifyContent: "center",
          marginTop: 16,
        }}
      >
        {carouselData.map((_, idx) => (
          <li key={idx + 1}>
            <div
              style={{
                backgroundColor: "white",
                height: "7px",
                width: "7px",
                borderRadius: "50%",
                opacity: carouselIdx === idx ? 1 : 0.5,
              }}
            />
          </li>
        ))}
      </ul>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
          gap: "5px",
        }}
      >
        <button onClick={handlePrev}>{"<"} Prev</button>
        <button onClick={handleNext}>Next {">"}</button>
      </div>
    </div>
  );
};

const useCarousel = (data) => {
  const [carouselData] = useState(data);
  const [carouselIdx, setCarouselIdx] = useState(0);

  const handleBoundary = (idxNum) =>
    (idxNum + carouselData.length) % carouselData.length;

  const handleNext = () => {
    setCarouselIdx((prev) => handleBoundary(prev + 1));
  };

  const handlePrev = () => {
    setCarouselIdx((prev) => handleBoundary(prev - 1));
  };

  return { carouselData, carouselIdx, handleNext, handlePrev };
};
