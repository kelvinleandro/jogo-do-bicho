import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  text: string;
  imageUrl: string;
  active?: boolean;
  onClick: () => void;
};

const AnimalCard = ({ text, imageUrl, active, onClick }: Props) => {
  return (
    <Card onClick={onClick} className={`cursor-pointer rounded-lg overflow-hidden border-4 ${active ? "border-blue-500" : "border-gray-500"}`}>
      <CardHeader>
        <CardTitle className="capitalize text-center">{text}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image src={imageUrl} alt={text} width={100} height={200} />
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
