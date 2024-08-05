"use client";

import dynamic from "next/dynamic";
import { subtitle, title } from "@/components/primitives";
import { Link } from "@nextui-org/link";
import { Chip } from "@nextui-org/chip";
import { useDisclosure } from "@nextui-org/modal";
import CodeModal from "@/components/code-modal";
import { useState } from "react";
import { solanaRustCodeKeys, solanaRustKeyToTitle } from "@/config/solana_rust_code";

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

      {/* 账号 */}
      <div className="mt-4 rounded p-2 border-1">
        <Link className={`${subtitle()} account__link font-semibold pl-2`} href="#account__link">
          Account
        </Link>
        <div className="#account__link pb-2 flex flex-wrap gap-2">
          {solanaRustCodeKeys.map(key=> (
            <Chip color="default" className='p-2 cursor-pointer' onClick={()=> {
              setCodeKey(`${key}`)
              onOpen()
            }}>{solanaRustKeyToTitle[key]||''}</Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
