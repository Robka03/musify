interface IProduct {
    image: string;
    imgDescription: string;
    title: string;
    description: string;
    bg?: string;
    direction?: "left" | "right";
}

export default class Product implements IProduct {
    constructor(image: string, imgDescription: string, title: string, description: string, direction?: "left" | "right", bg?: string) {
        this.image = image;
        this.imgDescription = imgDescription;
        this.title = title;
        this.description = description;
        this.bg = bg;
        this.direction = direction;
    }
    image: string;
    imgDescription: string;
    title: string;
    description: string;
    bg?: string | undefined;
    direction?: "left" | "right" | undefined;
}