import { Button } from '@/app/_components/ui/button';
import { TalkCommentWithRelations } from '@/modules/core/model/Talk';
import Avatar from '@/modules/react/sections/_components/avatar';
import { MessageCircle, MinusCircle, PlusCircle } from 'lucide-react';
import TalkCommentForm from '@/modules/react/sections/talks/_components/talk-comment-form';
import * as React from 'react';
import Link from 'next/link';

interface TalkCommentCardProps {
  talkComment: TalkCommentWithRelations;
  depth: number;
}

const TalkCommentCard = ({ talkComment, depth }: TalkCommentCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);
  const [showReplies, setShowReplies] = React.useState<boolean>(false);

  const MAX_DEPTH = 1;
  const indentationWidth = depth < MAX_DEPTH ? 'ml-4' : 'ml-0';

  return (
    <div className={`relative ${indentationWidth}`}>
      {depth > 0 && (
        <div className="absolute left-[-16px] top-0 bottom-0 w-[2px] bg-gray-200 hover:bg-gray-300" />
      )}
      <div className="flex flex-col gap-2">
        <summary className="flex items-center gap-2">
          <Avatar src={talkComment.author.imageUrl ?? ''} alt={talkComment.author.name ?? ''} />
          <div className="text-sm truncate font-medium">{talkComment.author.name}</div>
        </summary>

        <p className="text-sm ml-10">
          {talkComment.replyToUserId && (
            <>
              <Link
                href={`/user/${talkComment.replyToUser?.id}`}
                className=" hover:underline font-semibold"
              >
                {talkComment.replyToUser?.name}
              </Link>{' '}
            </>
          )}
          {talkComment.content}
        </p>

        <div className="flex items-center gap-2">
          {talkComment.replies && talkComment.replies.length > 0 && (
            <Button variant="ghost" size="sm" onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? (
                <MinusCircle className="w-4 h-4" />
              ) : (
                <PlusCircle className="w-4 h-4" />
              )}
            </Button>
          )}

          <Button
            variant="ghost"
            size="sm"
            className="rounded-full"
            onClick={() => setIsExpanded(true)}
          >
            <MessageCircle className="w-4 h-4" />
            Répondre
          </Button>
        </div>

        {isExpanded && (
          <TalkCommentForm
            talkId={talkComment.talkId}
            replyToId={talkComment.replyToId ?? talkComment.id}
            onCancel={() => setIsExpanded(false)}
            isExpandedFromParent={isExpanded}
            replyToUserId={talkComment.authorId}
          />
        )}
      </div>

      {showReplies && talkComment.replies && talkComment.replies.length > 0 && (
        <div className="flex flex-col gap-2 mt-2 ml-4">
          {talkComment.replies.map((comment) => (
            <TalkCommentCard
              key={comment.id}
              talkComment={{
                ...comment,
                talkId: talkComment.talkId,
              }}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TalkCommentCard;
