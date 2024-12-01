
import { useEffect, useState } from "react";
//import mockApi from "./mockApi.json";
import ImgCreator from "./ImgCreator";
import ProductDashes from "../productcontainer/ProductDashes";
import ImageContainer from "../productcontainer/ImageContainer";

function getId(input: string) {
    return input.match(/track\/([A-Za-z0-9]{22})\?si=/)?.[1];
}

export default function ImgCreatorHandler() {
    const [imageDetails, setImageDetails] = useState<{ img: HTMLImageElement, title: string, artist: string, length: number } | undefined>();
    const [apiResponse, setApiResponse] = useState<any>(undefined);

    const handleChange = (e: any) => {
        const spotifyTrackUrlRegex = /^https:\/\/open\.spotify\.com\/track\/[A-Za-z0-9]{22}\?si=[A-Za-z0-9]{16}$/;
        if (spotifyTrackUrlRegex.test(e.target.value)) {
            const api = "http://localhost:8080/api/spotify/track/" + getId(e.target.value);
            console.log(api);
            fetch(api).then(res => res.json()).then(data => setApiResponse(data));
        }

    };

    useEffect(() => {
        if(!apiResponse) return;
        if(!apiResponse.album) return;
        const imgSrc = apiResponse.album.images[0].url;
        const artist = apiResponse.artists[0].name;
        const title = apiResponse.name;

        if (!imgSrc || !artist || !title) return;

        const img = new Image();
        img.src = imgSrc;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            setImageDetails({ img: img, title: title, artist: artist, length: 165 });
        };
    }, [apiResponse]);

    return (
        <div className="position-relative">
            <div className="position-relative z-1 d-flex" style={{
                border: "#e4e6e9 solid 1px", height: "100%", position: "relative"
            }}>
                <div className="col-7">
                    <input type="text" onChange={handleChange} />
                </div>
                <ImageContainer>
                    <ImgCreator imageDetails={imageDetails} />
                </ImageContainer>
            </div>
            <ProductDashes />
        </div>
    )
}