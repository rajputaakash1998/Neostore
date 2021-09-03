import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    backgroundColor: "black",
    color:"#fff",
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    fontSize:"20px",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius:"5px"
  },
  overlay: {
    width: "100vw",
    height: "100vh",
     margin:"auto",
    position: "fixed",
  
    
  },
};

function ModalComponent(props) {
  return (
    <div>
      <Modal
        isOpen={props.modalIsOpen}
        onRequestClose={props.closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <p className="text-center m-4">Are you sure that you want to delete this ?</p>
        <button
          className="btn btn-outline-warning mt-5  float-left"
          onClick={props.closeModal}
        >
          Close
        </button>
        <button
          className="btn btn-outline-danger mt-5 float-right "
          onClick={props.confirmDelete}
        >
          Yes
        </button>
      </Modal>
    </div>
  );
}

export default ModalComponent;
