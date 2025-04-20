import { Mailbox } from "lucide-react";
import cn from "../utils/cn";

interface LogoProps {
  className?: string;
  color?: string;
  size?: number;
}

const Logo: React.FC<LogoProps> = ({ className, color, size, ...props }) => {
  return (
    <Mailbox
      className={cn("h-8 w-8 text-[#FF6200]", className)}
      color={color}
      size={size}
      {...props}
    />
  );
};

export { Logo };
