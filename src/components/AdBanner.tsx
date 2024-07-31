import Image from "next/image";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Banner } from "@/utils/types";
import EditBanner from "./EditBanner";
import { Button } from "./ui/button";

export default function AdBanner({ id, title, description, cta, image, background, attribution }: Banner) {
    return (
        <Card className="relative" style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-50 mix-blend-overlay"></div>
            <CardHeader className="relative z-10">
                <EditBanner id={id} title={title} description={description} attribution={attribution} className="absolute right-0 mr-4" />
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="relative z-10">
                <Image src={image} alt={title} width={500} height={300} />
                <CardDescription>{description}</CardDescription>
            </CardContent>
            <CardFooter className="relative z-10">
                <Button>Learn More</Button>
            </CardFooter>
        </Card>
    );
}
