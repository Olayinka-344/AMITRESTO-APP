import { useEffect, useState } from "react";
import { PrivacyPolicyQuery } from "../sanity/queries";
import { client } from "../sanity/client";
import { PortableText } from "@portabletext/react";

function PrivacyPolicy() {
    const [ data, setData ] =useState<any>(null);
    const [ loading, setLoading ] = useState(true);

    useEffect(() => {
        client
        .fetch(PrivacyPolicyQuery)
        .then((data) => {
          console.log("privacy DATA:", data);
            setData(data);
            setLoading(false);
        } )

        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    }, []);

    if(loading) return (
      <div className="loaders">
        <div className="spinner-border spinner-border-sm loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <div className="spinner-grow spinner-grow-sm loader" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

    if (!data) return <p className="no-News">No Data</p>

    return (
        <>
        <div className="Newsletter">
          <div className="newsletter-body">
            <PortableText value={data.content}/>
          </div>
        </div>
        </>
    )
}

export default PrivacyPolicy;