interface SpotCounterProps {
  count: number;
}

const SpotCounter = ({ count }: SpotCounterProps) => {
  if (count === 0) return null;

  return (
    <div className="absolute top-4 right-4 bg-white py-2.5 px-4 rounded-full shadow-sm z-1000">
      <p className="text-sm font-medium">
        {count} spot{count > 1 ? "s" : ""} trouvé{count > 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default SpotCounter;
