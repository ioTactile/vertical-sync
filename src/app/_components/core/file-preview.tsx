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

interface FilePreviewProps {
  files: File[];
  onRemove: (file: File) => void;
}

const FilePreview = ({ files, onRemove }: FilePreviewProps) => {
  const fileUrls = React.useMemo(
    () => files.map((file) => URL.createObjectURL(file)),
    [files]
  );

  React.useEffect(() => {
    return () => {
      fileUrls.forEach(URL.revokeObjectURL);
    };
  }, [fileUrls]);

  if (files.length === 0) return null;

  if (files.length === 1) {
    return (
      <ImageWithDelete file={files[0]} url={fileUrls[0]} onRemove={onRemove} />
    );
  }

  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-0">
        {files.map((file, index) => (
          <CarouselItem key={file.name} className="pl-0">
            <ImageWithDelete
              file={file}
              url={fileUrls[index]}
              onRemove={onRemove}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-2 hover:scale-105" />
      <CarouselNext className="absolute right-2 hover:scale-105" />
    </Carousel>
  );
};

const ImageWithDelete = React.memo(
  ({
    file,
    url,
    onRemove,
  }: {
    file: File;
    url: string;
    onRemove: (file: File) => void;
  }) => (
    <div className="relative aspect-video overflow-hidden rounded-xl">
      <Image
        src={url}
        alt={file.name}
        width={500}
        height={500}
        className="object-cover w-full h-full"
      />
      <Button
        size="icon"
        variant="destructive"
        onClick={() => onRemove(file)}
        className="absolute top-2 right-2 rounded-full"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  )
);

ImageWithDelete.displayName = "ImageWithDelete";

export default FilePreview;
