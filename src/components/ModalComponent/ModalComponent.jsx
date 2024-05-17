// ModalComponent.jsx
"use client";

import { Button, Modal } from "flowbite-react";
/* styles.css */

export function ModalComponent({ children, isOpen, setIsOpen }) {
  return (
    <>
      <Modal show={isOpen} className="mt-0" popup>
        <Modal.Body>
          <Button
            style={{
              marginLeft: "28.5rem",
              backgroundColor: "red",
              color: "white",
              marginTop: "1rem",
              marginBottom: "1rem",
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
