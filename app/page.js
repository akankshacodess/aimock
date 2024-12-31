import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h2> Hellloooo </h2>
      <Link href={"/dashboard"}>
        <Button>Hii</Button>
      </Link>
    </div>
  );
}
