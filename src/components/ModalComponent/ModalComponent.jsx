// ModalComponent.jsx
"use client";

import { Button, Modal } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export function ModalComponent({ children, isOpen, setIsOpen }) {
  return (
    <>
      <Modal show={isOpen} className="mt-0 " popup>
        <Modal.Body >
          <Button
            style={{
              marginLeft: "85%",

              color: "gray",
              marginTop: "1rem",
              marginBottom: "1rem",
            }}
            className=""
            color="danger"
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} size="2x" />
          </Button>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
