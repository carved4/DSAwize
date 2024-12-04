import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)] p-4">
      <FileQuestion className="h-12 w-12 text-muted-foreground mb-4" />
      <h2 className="text-2xl font-bold mb-2">Page not found</h2>
      <p className="text-muted-foreground mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}