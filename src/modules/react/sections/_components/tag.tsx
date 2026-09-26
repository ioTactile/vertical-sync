import { Badge } from '@/app/_components/ui/badge';

interface TagProps {
  name: string;
}

const Tag = ({ name }: TagProps) => {
  return <Badge variant="secondary">{name}</Badge>;
};

export default Tag;
