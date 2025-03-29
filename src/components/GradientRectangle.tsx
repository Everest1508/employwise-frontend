const GradientRectangle = ({ className }: { className?: string }) => {
  return (
    <div
      className={`absolute w-[70vh] h-[70vh] rounded-3xl bg-gradient-to-r from-blue-900 to-blue-500 ${className}`}
    ></div>
  );
};

export default GradientRectangle;
