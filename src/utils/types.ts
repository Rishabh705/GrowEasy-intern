export interface Banner {
    id: number;
    title: string;
    description: string;
    cta: string;
    image: string;
    width: number;
    height: number;
    background: string;
    attribution: string;
    color: string;
    titlePosition: { x: number; y: number };
    descriptionPosition: { x: number; y: number };
    imagePosition: { x: number; y: number };
    ctaPosition: { x: number; y: number };
    ctaHasBackground: boolean;
    ctaBackgroundColor: string;
    ctaColor: string;
    isCircular: boolean;
}
