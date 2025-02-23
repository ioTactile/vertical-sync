interface SpotCounterProps {
  count: number;
}

const SpotCounter = ({ count }: SpotCounterProps) => {
  if (count === 0) return null;

  return (
    <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-1000">
      <p className="text-sm font-medium">
        {count} spot{count > 1 ? "s" : ""} trouvé{count > 1 ? "s" : ""}
      </p>
    </div>
  );
};

export default SpotCounter;
