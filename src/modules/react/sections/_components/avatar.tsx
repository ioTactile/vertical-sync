import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from '@/app/_components/ui/avatar';
import { cn } from '@/lib/utils';

interface AvatarProps {
  src: string | null;
  alt: string | null;
  className?: string;
}

const Avatar = ({ src, alt, className }: AvatarProps) => {
  return (
    <AvatarUI className={cn('w-8 h-8', className)}>
      <AvatarImage src={src ?? ''} alt={alt ?? ''} />
      <AvatarFallback>{alt?.charAt(0) ?? ''}</AvatarFallback>
    </AvatarUI>
  );
};

export default Avatar;
