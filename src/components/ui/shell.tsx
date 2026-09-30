import { cn } from "@/lib/cn";

interface ShellProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "section" | "header" | "footer";
}

export function Shell({ as: Tag = "div", className, children, ...props }: ShellProps) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-300 px-6 min-[1248px]:px-0", className)}
      {...props}
    >
      {children}
    </Tag>
  );
}
