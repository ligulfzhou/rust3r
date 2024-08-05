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
import { key_to_code, key_to_title } from "@/config/code";


type size_opts = "sm" | "md" | "lg" | "xl" | "2xl" | "full" | "xs" | "3xl" | "4xl" | "5xl" | undefined;

function CodeModal({ codeKey, language = "rust", size, isOpen, onClose }: {
  codeKey: string,
  language: string,
  size: size_opts,
  isOpen: boolean,
  onClose: () => void
}) {
  let code = key_to_code[codeKey] || "";

  return (
    <Modal
      size={size}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalContent>
        {(onClose: any) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{key_to_title[codeKey] || ""}</ModalHeader>
            <ModalBody>
              <MyCodeBlock code={code} language={language}></MyCodeBlock>
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
