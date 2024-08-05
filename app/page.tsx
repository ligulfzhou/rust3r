import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import { title, subtitle } from "@/components/primitives";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-around h-full gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Rust3r: &nbsp;</h1>
        <h1 className={title({ color: "violet" })}>Empower &nbsp;</h1>
        <br />
        <h1 className={title()}>
          Rustaceans to venture into the Web3 realm.
        </h1>

      </div>

      <div className="">
        <h2 className={subtitle({ class: "mt-4" })}>
          Lets get started..
        </h2>
        <div className='flex gap-3'>
          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="/solana"
          >
            Solana
          </Link>

          <Link
            className={buttonStyles({ variant: "bordered", radius: "full" })}
            href="/bitcoin"
          >
            Bitcoin
          </Link>
        </div>
      </div>

    </section>
  );
}
