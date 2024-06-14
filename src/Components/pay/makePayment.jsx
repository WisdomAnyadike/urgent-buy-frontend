import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { emptyCart } from '../../Components/Redux/Dropdownslice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Preloader from '../loader/loader';

function MydModalWithGrid(props) {

    const dispatch = useDispatch()
    const [loading, setIsLoading] = useState(false);

    const cartArr = useSelector(state => state.DropSlicer.cartArr)

    const [tag, setTag] = useState('')
    const [order, setOrder] = useState('')
    const userObj = useSelector(state => state.Userslice.userObj)

    const navigate = useNavigate()
    let cashAppRegex = /^\$/


    const postIt = async () => {
        setIsLoading(true)
        try {
            const res = await axios.post('https://ecommerce-backend-pq9c.onrender.com/Api/Transaction/createTransaction', {
                transactionAmount: props.total,
                transactionUser: userObj.FullName,
                transactionTag: tag,
                transactionOrder: order,
                transactionEmail: userObj.Email
            })

            if (res.data.status === 'okay') {
                setIsLoading(false)
                toast.success('success , click on payment status')

                setTimeout(()=> {
                    dispatch(emptyCart());  
                    navigate('/settings')
                },2000)
               
            } else {
                setIsLoading(false)
                toast.error('failed, try again')
            }
        } catch (error) {
            setIsLoading(false)
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

        if (!cashAppRegex.test(tag)) {
            alert('invalid tag format')
            return 
        }

        if (!tag || !order || !props.total || !userObj.FullName) {
            alert('cant process payment, missing information')
            return
        }



        let confirm = window.confirm('do you confirm order?')

        if (confirm) {
 
            postIt()
            
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
                <h4>Scan & Pay <b> ${props.total} </b> </h4>
                <img width={'300px'} height={'400px'} src="cashapp.jpg" alt="" />
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
                <Button variant='dark' style={{ backgroundColor: "#000", color: 'white', width: "130px", height: "37px" }} className='d-flex align-items-center justify-content-center'  disabled={loading} onClick={() => post()} >
                   {loading ? <Preloader/> : 'Confirm Order' } 
                </Button>
                <Button variant='dark' style={{ backgroundColor: "#000", color: 'white', width: "90px", height: "37px" }} onClick={props.onHide}>Close</Button>
                <ToastContainer
                    position='top-right'
                    progressStyle={{
                        backgroundColor: '#black'
                    }
                    }
                    toastStyle={{
                        backgroundColor: 'rgb(46, 46, 46)',
                        color: "white"
                    }} />
            </Modal.Footer>
        </Modal>

    );
}

export default MydModalWithGrid

