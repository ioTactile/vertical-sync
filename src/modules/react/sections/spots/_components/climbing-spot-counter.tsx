interface SpotCounterProps {
  count: number;
}

const SpotCounter = ({ count }: SpotCounterProps) => {
  if (count === 0) return null;

  return (
    <div className="absolute bottom-2 left-2 sm:top-4 sm:right-4 sm:bottom-auto sm:left-auto bg-background/95 py-2.5 px-4 rounded-full shadow-xs z-1000">
      <p className="text-sm font-medium">
        {count} spot{count > 1 ? 's' : ''} trouvé{count > 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default SpotCounter;
