import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";

interface Props {
  modal: boolean;
  setModal: (type: boolean) => void;
  type: string;
}

const ModalWindow: React.FC<Props> = ({ modal, setModal, type }) => (
  <>
    <Modal isOpen={modal} onClose={() => setModal(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Oops!</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {type === "ingredients"
            ? "Sorry, we couldn't find anything. Try something else!"
            : type === "limit"
            ? "Sorry, you may have extended our search limit for today. Come back tomorrow!"
            : "Sorry, something went wrong. Please try again later."}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" mr={3} onClick={() => setModal(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </>
);

export default ModalWindow;
