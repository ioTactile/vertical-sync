import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { Trash2 } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/_components/ui/carousel";
import * as React from "react";

interface ImageUrlPreviewProps {
  imageUrls: string[];
  onRemove: (url: string) => void;
}

const ImageUrlPreview = ({ imageUrls, onRemove }: ImageUrlPreviewProps) => {
  if (imageUrls.length === 0) return null;

  if (imageUrls.length === 1) {
    return <ImageWithDelete url={imageUrls[0]} onRemove={onRemove} />;
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-0">
        {imageUrls.map((url) => (
          <CarouselItem key={url} className="pl-0">
            <ImageWithDelete url={url} onRemove={onRemove} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 hover:scale-105" />
      <CarouselNext className="absolute right-2 hover:scale-105" />
    </Carousel>
  );
};

const ImageWithDelete = React.memo(
  ({ url, onRemove }: { url: string; onRemove: (url: string) => void }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl">
      <Image
        src={url}
        alt="Image"
        width={500}
        height={500}
        className="object-cover w-full h-full"
      />
      <Button
        size="icon"
        variant="destructive"
        onClick={() => onRemove(url)}
        className="absolute top-2 right-2 rounded-full"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
);

ImageWithDelete.displayName = "ImageWithDelete";

export default ImageUrlPreview;
