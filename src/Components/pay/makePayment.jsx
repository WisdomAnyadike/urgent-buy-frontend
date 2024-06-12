import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { emptyCart } from '../../Components/Redux/Dropdownslice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function MydModalWithGrid(props) {

    const dispatch = useDispatch()

    const cartArr = useSelector(state => state.DropSlicer.cartArr)

    const [tag, setTag] = useState('')
    const [order, setOrder] = useState('')
    const userObj = useSelector(state => state.Userslice.userObj)

 const navigate = useNavigate()


    const postIt = async () => {
        try {
            const res = await axios.post('http://localhost:4000/Api/Transaction/createTransaction', {
                transactionAmount: props.total,
                transactionUser: userObj.FullName,
                transactionTag: tag,
                transactionOrder: order ,
                transactionEmail: userObj.Email
            })

            if (res.data.status == 'okay') {
                alert('success , click on payment status')
            } else {
                alert('failed')
            }
        } catch (error) {
            console.log(error);
        }


    }

    useEffect(() => {
        const orderArr = props.arr.map(product => {
            return `${product.productName} x ${product.quantity}`;
        });

        setOrder(orderArr.join(', '));
    }, [props.arr]);





    function post() {

        if (!tag) {
            alert('missing tag')
            return
        }

        if (!tag || !order || !props.total || !userObj.FullName) {
            alert('cant process payment, missing information')
            return
        }



        let confirm = window.confirm('do you confirm order?')

        if (confirm) {
            dispatch(emptyCart());
            postIt()
            navigate('/settings')
        }
    }







    return (
        <Modal
            className='modalbody'
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Pay via Cash App
                </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <h4>Scan to Pay</h4>
                <img width={'300px'} height={'400px'} src="/src/assets/WhatsApp Image 2024-06-11 at 18.09.22.jpeg" alt="" />
                <div>
                    <input type="text" onChange={(e) => setTag(e.target.value)} className='mt-0 w-50 rounded mb-2' style={{ fontSize: '14px' }} placeholder='Enter your cashapp tag' />
                    <b className='text-danger d-block mb-2 ' style={{ fontSize: '12px' }}>Ensure you provide your cash-app tag or risk losing your payment </b>
                    {
                        <div>

                            {props.arr.map((product) =>
                                <p key={product._id} className='ms-1'>{product.productName}  x {product.quantity} </p>
                            )}

                        </div>
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => post()} >
                    Confirm Order
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>

    );
}

export default MydModalWithGrid

