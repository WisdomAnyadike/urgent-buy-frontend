import React, { useEffect, useState } from 'react';
import axios from 'axios'

const appId = 'sandbox-sq0idb-3sCoiLKRaXihPEZ4AxHoNQ'; // Replace with your actual Application ID
const locationId = 'LBD42TBMMJWFS'; // Replace with your actual Location ID

const CashAppPayComponent = ({ amount }) => {
    const [cashAppPay, setCashAppPay] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('');

    useEffect(() => {
        if (cashAppPay) {
            const handleTokenization = async ({ detail }) => {
                const tokenResult = detail.tokenResult;
                if (tokenResult.status === 'OK') {
                    try {
                        const paymentResults = await createPayment(tokenResult.token);
                        setPaymentStatus('SUCCESS');
                        console.debug('Payment Success', paymentResults);
                    } catch (error) {
                        console.error('Payment failed', error);
                        setPaymentStatus('FAILURE');
                    }
                } else {
                    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
                    if (tokenResult.errors) {
                        errorMessage += ` and errors: ${JSON.stringify(tokenResult.errors)}`;
                    }
                    console.error(errorMessage);
                    setPaymentStatus('FAILURE');
                }
            };

            cashAppPay.addEventListener('ontokenization', handleTokenization);

            return () => {
                cashAppPay.removeEventListener('ontokenization', handleTokenization);
            };
        }
    }, [cashAppPay]);

    const initializeCashAppPay = async () => {
        if (!window.Square) {
            console.error('Square.js failed to load properly');
            return;
        }

        let payments;
        try {
            payments = window.Square.payments(appId, locationId);
        } catch (error) {
            console.error('Failed to initialize Square payments', error);
            const statusContainer = document.getElementById('payment-status-container');
            statusContainer.className = 'missing-credentials';
            statusContainer.style.visibility = 'visible';
            return;
        }

        const paymentRequest = payments.paymentRequest({
            countryCode: 'US',
            currencyCode: 'USD',
            total: {
                amount: '100', // Amount in cents as a string
                label: 'Total',
            },
        });

        try {
            if (cashAppPay) {
                await cashAppPay.destroy();
            }

            const newCashAppPay = await payments.cashAppPay(paymentRequest, {
                redirectURL: window.location.href,
                referenceId: 'my-website-00000001',
            });

            const buttonOptions = {
                shape: 'semiround',
                width: 'full',
            };

            await newCashAppPay.attach('#cash-app-pay', buttonOptions);
            setCashAppPay(newCashAppPay);
        } catch (error) {
            console.error('Initializing Cash App Pay failed', error);
        }
    };

    const handlePayment = async () => {
        await initializeCashAppPay();
        if (cashAppPay) {
            cashAppPay.tokenize().catch((error) => {
                console.error('Tokenization failed', error);
                setPaymentStatus('FAILURE');
            });
        }
    };

    const createPayment = async (token) => {
        const response = await axios.post('http://localhost:4000/Api/Transaction/createTransaction2', {
            locationId,
            sourceId: token,
            idempotencyKey: window.crypto.randomUUID(),
            amountMoney: {
                amount: '100',
                currency: 'USD',
            },
        }
        );

     console.log(response);

        return response
    };

    return (
        <div>
            <div id="cash-app-pay"></div>
            <button onClick={handlePayment}>Pay {amount} USD</button>
            <div id="payment-status-container" className={paymentStatus.toLowerCase()}>
                {paymentStatus === 'SUCCESS' ? 'Payment Successful' : ''}
                {paymentStatus === 'FAILURE' ? 'Payment Failed' : ''}
            </div>
        </div>
    );
};

export default CashAppPayComponent;

