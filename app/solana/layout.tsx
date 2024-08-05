import SolanaWalletProvider from "@/app/solana/providers";

export default function AboutLayout({
                                      children
                                    }: {
  children: React.ReactNode;
}) {
  return (
    // <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
    <section className="">
      <SolanaWalletProvider>
        {children}
      </SolanaWalletProvider>
    </section>
  );
}
