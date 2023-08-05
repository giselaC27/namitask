import Modal from 'react-modal';

const customStyles = {
  content: {
    width: '300px',
    height: '200px',
    margin: 'auto',
  },
};

const CustomModal = ({ isOpen, closeModal, message }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <button onClick={closeModal} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Resultado</h2>
        <p>{message}</p> {/* Mostrar el mensaje recibido */}
      </div>
    </Modal>
  );
};

export default CustomModal;
