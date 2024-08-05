"use client";
import React from "react";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalContent,
  ModalHeader, ModalBody,
  ModalFooter
} from "@nextui-org/modal";
import MyCodeBlock from "@/components/my-code-block";
import {codeKeyToCode, codeKeyToTitle} from "@/config/solana/rust"


type size_opts = "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | undefined;

function CodeModal({ codeKey, language = "rust", size, isOpen, onClose }: {
  codeKey: string,
  language: string,
  size: size_opts,
  isOpen: boolean,
  onClose: () => void
}) {

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{codeKeyToTitle[codeKey] || ""}</ModalHeader>
            <ModalBody className='max-h-dvh'>
              <MyCodeBlock code={ codeKeyToCode[codeKey] || ""} language={language}></MyCodeBlock>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              {/*<Button color="primary" onPress={onClose}>*/}
              {/*  Action*/}
              {/*</Button>*/}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CodeModal;
