import RedactorCreateButton from '@/modules/react/sections/articles/_components/redactor-create-button';

const ArticlesHeader = () => {
  return (
    <>
      <div
        className="w-full h-16 rounded-xl bg-linear-to-r from-primary via-accent to-secondary
        dark:from-primary/80 dark:via-accent/80 dark:to-secondary/80
        relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-linear-to-t from-background/50 to-transparent" />
      </div>

      <div className="flex justify-between items-center px-2">
        <h1 className="text-2xl lg:text-3xl font-bold">Blog</h1>
        <RedactorCreateButton />
      </div>
    </>
  );
};

export default ArticlesHeader;
