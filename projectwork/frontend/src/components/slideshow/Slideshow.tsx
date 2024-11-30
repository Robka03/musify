import Image from '../../assets/1.png';
import Image2 from '../../assets/2.png';
import Image3 from '../../assets/3.png';
import { CSSProperties, forwardRef } from 'react';

export default function Slideshow() {
    return(
        <div className="slideshow">
            <SlideshowManager images={[Image, Image2, Image3]}/>
        </div>
    )
}

interface SlideshowManagerProps {
    images: string[];
}

function SlideshowManager({images}:SlideshowManagerProps) {
    const imagesNumber = images.length;
    return(
        <div className="d-flex">
            {images.map((image,i) => <SlideshowImage key={image} image={image} style={{width:`calc(100%/${imagesNumber})`}}/>)}
        </div>
    )
}

interface SlideshowImageProps {
    image: string;
    style: CSSProperties;
}

function SlideshowImage({image, style}:SlideshowImageProps){
    return(
        <div className="slideshow-image" style={style}>
            <img src={image} alt="slideshow-image" style={{width:"100%", aspectRatio:"1/1"}}/>
        </div>
    )
}
