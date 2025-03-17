import TalksHeader from "@/modules/react/sections/talks/_components/talks-header";
import TalkCards from "@/modules/react/sections/talks/_components/talk-cards";

const Talks = () => {
  return (
    <div className="container mx-auto flex flex-col gap-6 pt-2 pb-4 px-4 sm:px-0">
      <TalksHeader />
      <TalkCards />
    </div>
  );
};

export default Talks;
