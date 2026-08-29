import { cn } from "@/lib/utils";
import Link from "next/link";
import { ComponentProps } from "react";
import Image from "next/image";
import { SITE_NAME } from "@/app/_constants/seo";

interface Props extends Omit<ComponentProps<typeof Link>, "href"> {
  className?: string;
}

const AppLogo = ({ className, ...props }: Props) => {
  return (
    <Link
      href="/"
      className={cn(
        "bg-linear-to-r from-primary via-accent to-secondary",
        "dark:from-primary dark:via-accent dark:to-secondary",
        "bg-clip-text text-transparent",
        "hover:opacity-80 transition-opacity",
        className,
      )}
      {...props}
    >
      <Image
        src={"/assets/vertical-sync.png"}
        alt={`${SITE_NAME} logo`}
        height={64}
        width={86}
        priority
        className="w-auto h-16"
      />
    </Link>
  );
};

export default AppLogo;
