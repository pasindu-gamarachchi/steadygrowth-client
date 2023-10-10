import "./ConfirmModal.scss";
import closeIcon from "../../assets/icons/close-24px.svg";

const ConfirmModal = ({
  modalInfo,
  deleteConfirmed,
  updateConfirmed,
  modalAction,
  setshowModal,
}) => {
  function closeModal(event) {
    setshowModal(false);
  }

  return (
    <section className="delete">
      <div className="delete__section">
        <div className="delete__text-section">
          <div className="delete__close">
            <img
              onClick={() => {
                closeModal();
              }}
              className="delete__close-icon"
              alt="x-symbol"
              src={closeIcon}
            />
          </div>

          <h1 className="delete__heading">{modalInfo.heading}</h1>
          <span className="delete__text">{modalInfo.text}</span>
        </div>
        <div>
          {modalAction === "Update" ? (
            <div className="delete__ctas">
              <div
                className="delete__button-box"
                onClick={() => {
                  closeModal();
                }}
              >
                <span className="delete__button delete__button--outline">
                  Cancel
                </span>
              </div>
              <div
                className="delete__button-box"
                onClick={() => {
                  updateConfirmed();
                }}
              >
                <span className="delete__button">Confirm</span>
              </div>
            </div>
          ) : (
            <div className="delete__ctas">
              <div
                className="delete__button-box"
                onClick={() => {
                  closeModal();
                }}
              >
                <span className="delete__button delete__button--outline">
                  Cancel
                </span>
              </div>
              <div
                className="delete__button-box"
                onClick={() => {
                  deleteConfirmed();
                }}
              >
                <span className="delete__button">Delete</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConfirmModal;
