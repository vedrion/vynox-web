import { Shell } from "@/components/ui/shell";
import { notFoundContent } from "@/content/site";

export default function NotFound() {
  return (
    <Shell className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="font-vastago text-h1 font-bold text-white">{notFoundContent.title}</h1>
      <p className="font-inter text-md text-muted">{notFoundContent.message}</p>
    </Shell>
  );
}
