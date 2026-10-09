this one is for App.tsx

import { useEffect, useState } from "react";
import { client } from "./sanity/client";
import { carouselQuery } from "./sanity/queries";
import { urlFor } from "./sanity/imageUrl";

function App() {
  const [carousel, setCarousel] = useState<any[]>([]);

  useEffect(() => {
    client
      .fetch(carouselQuery)
      .then((data) => {
        console.log('CAROUSEL DATA:', data)
        setCarousel(data)
      })
      .catch((error) => {
        console.error(error);
      })
  }, [])

  return (
    <>
    <h1>hello</h1>

    {carousel.map((item) => {
      return(
        <div key={item._id}>
          {item.image.map((img)=>(
            <img
            key={img._key}
            src={urlFor(img).url()}
            alt="Carousel" />
          ))}
        </div>
      )
    })}
    
    </>
  )
}

export default App;
