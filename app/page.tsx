import SipCalculator from "../components/SipCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white w-full flex items-center justify-center">
      <main className="flex flex-col items-center justify-center w-full p-3 md:p-5 font-generalsans">
        <SipCalculator />
      </main>
    </div>
  );
}
