import { Input } from "@/components/ui/input";
import Balancer from "react-wrap-balancer";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center">
      <h1 className="text-5xl font-black mb-4 font-logo">How to Use</h1>
      <p className="text-lg">
        <span className="font-logo font-semibold text-2xl">Principles</span> is
        a tool that helps you
        <span className="font-semibold"> make better decisions.</span>{" "}
      </p>
      <div className="text-left space-y-8  max-w-3xl mt-16">
        <div className="text-left">
          <h2 className="font-bold mb-2 font-logo text-2xl">
            1. Create Your Principles
          </h2>
          <p className="">
            Create your own principles, or use the ones that have proven useful
            to others.
          </p>
        </div>
        <div className="text-left">
          <h2 className="font-bold mb-2 font-logo text-2xl">
            2. Apply Your Principles
          </h2>
          <p className="">
            Once added, you can tell
            <span className="font-semibold font-logo text-xl">
              {" "}
              Principles{" "}
            </span>
            about difficult decisions you have to make, and it will help you
            make them by using your own principles.
          </p>
        </div>
        <div className="text-left">
          <h2 className="font-bold mb-2 font-logo text-2xl">
            3. Refine Your Principles
          </h2>
          <p className="">
            By using this tool and constantly refining your principles, you will
            develop a set of principles that will help you make decisions that
            lead to a successful life, whatever that may mean to you.
          </p>
        </div>
      </div>
    </div>
  );
}
