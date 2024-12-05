
import { useEffect, useState } from "react";
//import mockApi from "./mockApi.json";
import ImgCreator from "./ImgCreator";
import ProductDashes from "../productcontainer/ProductDashes";
import ImageContainer from "../productcontainer/ImageContainer";
import Input from "../../common/input/Input"
import Button from "../../common/button/Button";

function getId(input: string) {
    return input.match(/track\/([A-Za-z0-9]{22})\?si=/)?.[1];
}

export default function ImgCreatorHandler() {
    const [imageDetails, setImageDetails] = useState<{ img: HTMLImageElement, code: HTMLImageElement, title: string, artist: string, length: number } | undefined>();
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
        if (!apiResponse) return;
        if (!apiResponse.album) return;
        const imgSrc = apiResponse.album.images[0].url;
        const artist = apiResponse.artists[0].name;
        const title = apiResponse.name;

        if (!imgSrc || !artist || !title) return;
        const imgCode = new Image();
        imgCode.src = "https://scannables.scdn.co/uri/plain/jpeg/000000/white/640/spotify:track:" + apiResponse.id;
        const img = new Image();
        img.src = imgSrc;
        img.crossOrigin = "anonymous";
        img.onload = () => {
            setImageDetails({ img: img, code: imgCode, title: title, artist: artist, length: 165 });
        };
    }, [apiResponse]);

    return (
        <div className="position-relative">
            <div className="position-relative z-1 d-flex flex-wrap" style={{
                border: "#e4e6e9 solid 1px", position: "relative"
            }}>
                <div className="col-md-5 col-12 p-5">
                    <h3 style={{ marginRight: "auto", textAlign: "left" }}>Your Artist, Your Music</h3>
                    <p style={{ marginRight: "auto", textAlign: "left" }}>Sometimes, you just need to let your inner creativity strike. YOU, are the person who wants everything tailor made to their liking, and we love that! All you need is the spotify link of your favourite music, a little artistic flavour and voilà, the perfect decoration is born!</p>
                    <Input handleChange={handleChange} title="Link" />
                    <div className="d-flex justify-content-end">
                        <Button text="Order" onClick={() => { }} buttonStyle="btn-success" />
                    </div>
                </div>
                <div className="col-2">

                </div>
                <ImageContainer>
                    <ImgCreator imageDetails={imageDetails} />
                </ImageContainer>
            </div>
            <ProductDashes />
        </div>
    )
}