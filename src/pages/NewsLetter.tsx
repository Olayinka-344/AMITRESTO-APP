import { useState, useEffect, } from "react";
import { urlFor } from "../sanity/imageUrl";
import { NewsLetterQuery } from "../sanity/queries";
import { client } from "../sanity/client";
import { PortableText } from "@portabletext/react";

function NewsLetter() {
    const [ data, setData ] = useState<any>(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        client
        .fetch(NewsLetterQuery)
        .then((data) => {
            console.log("NEWSLETTER DATA:", data);
            setData(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }, []);

    if (loading) return (
      <div className="loaders">
        <div className="spinner-border spinner-border-sm loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
    
    if (!data) return <p className="no-News">No Information Yet</p>

    return(
        <div className="Newsletter">
        {data.image && (
            <img src={urlFor(data.image).url()} alt="{data.title}" />
            )}

            <div className="newsletter-body">
            <PortableText value={data.content} />
            </div>
        </div>
    );
}

export default NewsLetter;