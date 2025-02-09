import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-white">
              Welcome to our Ai Mock Interview Site
            </h1>
            <p className="py-6 text-white">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <span>
              <Link className="flex justify-center" href={"/dashboard"}>
                <Button>Let's Do This </Button>
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
