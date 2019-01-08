module.exports = qrCode => { 
    // this is the payment request returned by the Strike API, which has then been sent to your customer's browser by your own backend.
    const payment_request = 'lntb3700u1pvujx...dcqpkp4zfc'
    // builds and displays the QR code
    new QRious({
      element: document.getElementById('qr'),
      value: payment_request
    });
}