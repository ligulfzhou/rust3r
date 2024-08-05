"use client";

import dynamic from "next/dynamic";
import { subtitle, title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { useDisclosure } from "@nextui-org/modal";
import CodeModal from "@/components/code-modal";
import { useState } from "react";
import {typeToCodes, codeKeyToTitle} from "@/config/solana/rust"

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);


export default function SolanaPage() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const [codeKey, setCodeKey] = useState<string>('')

  return (
    <div>
      <CodeModal codeKey={codeKey} language={'rust'} size={'5xl'} isOpen={isOpen} onClose={onClose} />
      <div className="flex flex-row justify-between border-b-2 pb-1">
        <h1 className={title()}>Solana</h1>
        <div className="hover:border-slate-900 rounded">
          <WalletMultiButtonDynamic className="btn-ghost btn-sm relative flex md:hidden text-lg " />
        </div>
      </div>

      {typeToCodes.map(({type, codeKeys})=> (
        <div className="mt-4 rounded p-2 border-1">
          <Link className={`${subtitle()} account__link font-semibold pl-2`} href="#account__link">
            {type}
          </Link>
          <div className="#account__link pb-2 flex flex-wrap gap-2">
            {codeKeys.map(key => (
              <Chip color="default" className="p-2 cursor-pointer" onClick={() => {
                setCodeKey(`${key}`);
                onOpen();
              }}>{codeKeyToTitle[key] || ""}</Chip>
            ))}
          </div>
        </div>
      ))}

      <div className='text-center font-black mt-12 text-xl'>
        Coming soon for anchor...etc
      </div>
    </div>
  );
}
