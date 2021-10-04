import React, {useEffect, useState} from 'react';
import {ModalBody} from 'reactstrap';
import SugubHistory from './SugubHistory';
import {getSugub} from "../../../actions/sugubActions";
import {Modal} from "rsuite";

const SugubHistoryModal = (props) => {
    const {
        buttonLabel,
        className,
    } = props;

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [sugubHistory, setSugubHistory] = useState();

    useEffect(() => {
        if(modal){
            getSugub().then(data => {
                setSugubHistory(data.results)
            })
        }
    }, [modal]);

    return <>

        <>
            <button className="btn btn-info btn-sm" onClick={toggle}>{buttonLabel}</button>
            {/*<Modal isOpen={modal} toggle={toggle} className={className} backdrop={false} size={'lg'}>*/}
            <Modal
                show={modal}
                onHide={toggle}
                size="xs"
            >
                <div className="modal-header text-left">
                    <button
                        aria-hidden={true}
                        className="close"
                        data-dismiss="modal"
                        type="button"
                        onClick={toggle}
                    >
                        <i className="nc-icon nc-simple-remove" />
                    </button>
                    <h5 className="modal-title" id="myModalLabel">
                        채용의뢰서<small>{/* {store.getState().auth.company.custname}*/}</small>
                    </h5>
                </div>
                { sugubHistory && (
                    <ModalBody className="p-1">
                        <SugubHistory company={sugubHistory} toggle={toggle}/>
                    </ModalBody>
                )}

            </Modal>
        </>

    </>
}

export default SugubHistoryModal;
