// ModalComponent.jsx
"use client";

import { Button, Modal } from "flowbite-react";
import { useState } from "react";
/* styles.css */

export function ModalComponent({ children, isOpen, setIsOpen }) {
  return (
    <>
      <Modal show={isOpen} className="mt-0" popup>
        <Modal.Header onClose={() => setIsOpen(false)} />
        <Modal.Body>
          <Button
            style={{
              marginLeft: "27rem",
              backgroundColor: "red",
              color: "white",
              marginTop: "1rem"
            }}
            color="danger"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
          {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
