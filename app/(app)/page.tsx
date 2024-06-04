import { Input } from "@/components/ui/input";

export default async function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-4 items-center justify-center">
      <h1 className="font-logo font-black text-5xl">Principles</h1>
      <p className="text-xl">Better decision making.</p>
      <Input
        placeholder="What do you need to decide?"
        className="w-1/2 max-w-xl"
      />
    </div>
  );
}
