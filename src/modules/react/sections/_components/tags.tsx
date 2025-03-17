import Tag from "@/modules/react/sections/_components/tag";
import { GetArticleWithRelationsResponse } from "@/modules/core/model/Article";

interface TagsProps {
  tags: GetArticleWithRelationsResponse["articleTags"];
}

const Tags = ({ tags }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <Tag key={tag.tagId} name={tag.tag.name} />
      ))}
    </div>
  );
};

export default Tags;
