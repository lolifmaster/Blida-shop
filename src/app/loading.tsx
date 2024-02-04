import { Croissant } from "lucide-react";

const loading = () => {
  return (
    <div className="grid h-60 w-screen place-items-center">
      <Croissant className="h-16 w-16 animate-pulse text-primary" />
    </div>
  );
};

export default loading;
