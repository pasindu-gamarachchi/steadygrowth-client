import "./ConfirmModal.scss"
import closeIcon from "../../assets/icons/close-24px.svg";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";


const ConfirmModal = ({modalInfo, url, deleteConfirmed, updateConfirmed, modalAction, setshowModal}) => {


    const navigate = useNavigate();

    function closeModal(event) {
        setshowModal(false);
        console.log('Close modal clicked.')
    }

    return (
        <section
            className="delete">
            <div className="delete__section">
                <div className="delete__text-section">
                    <div className="delete__close"
                    >
                        <img
                            onClick={() => { closeModal() }}
                            className="delete__close-icon"
                            alt="x-symbol"
                            src={closeIcon} />
                    </div>

                    <h1 className="delete__heading">{modalInfo.heading}</h1>
                    <span className="delete__text">{modalInfo.text}</span>
                </div>
                <div className="delete__ctas">
                    {modalAction==="Update"?
                    <div>
                        <div className="delete__button-box">

                            <Link to={url}
                                onClick={() => { closeModal() }}
                            >
                                <span className="delete__button delete__button--outline">Cancel</span>
                            </Link>
                        </div>
                        <div className="delete__button-box">
                            <Link to={url} onClick={()=>{deleteConfirmed()}}
                            >
                                <span className="delete__button">Delete</span>
                            </Link>
                        </div>
                    </div>:
                    <div>
                        <div className="delete__button-box">

                            <Link to={url}
                                onClick={() => { closeModal() }}
                            >
                                <span className="delete__button delete__button--outline">Cancel</span>
                            </Link>
                        </div>
                        <div className="delete__button-box">
                            <Link to={url} onClick={()=>{deleteConfirmed()}}
                            >
                                <span className="delete__button">Delete</span>
                            </Link>
                        </div>
                    </div>
                    }   
                </div>
            </div>
        </section >
    );
};




export default ConfirmModal;