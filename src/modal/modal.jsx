import { useState } from "react";
import Modal from "./ModalPortal";

const ModalDemo = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button style={{ margin: "16px" }} onClick={() => setOpen(true)}>
        Open Modal
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Hello Modal</h2>
        <p>This is rendered via ReactDOM.createPortal.</p>
      </Modal>
    </>
  );
};

export default ModalDemo;
