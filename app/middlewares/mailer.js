const nodemailer = require ('nodemailer');


const  triggerMail  = (product) => {
    console.log('am inside mail' + product)
    let transporter = nodemailer.createTransport({  
        host: 'smtp.gmail.com',
        port: 465,
        secure:true,
        auth: {
            type: 'OAuth2',
            user: 'arunpugahz@gmail.com',
            clientId:'925881535031-5gbtvbd5qn0n5c307orc4ubenqvifh0c.apps.googleusercontent.com',
            clientSecret:'Ta-EzG3IGo-FKSpIX-k6lHyh',
            refreshToken:'1/PY_cUo_yZ-lHzMTOJbusYGqFWgYrshj1jhUaojtsR44',
            accessToken:'ya29.GluJBn_VQAzLDuJQetgfVBkfDp3EK0CrFjAJVa_DKvPwNbPm4_EvoFrrjCLMsZKfFiXWAVCb6G8E_iwsm4FHsyGIlcO7V9OHAosreJPluuo4QVVh3199sTrZe2lq'
        }
    });
    
    
    let HelperOptions = {
        from: '"ARUN PUGAHZ" <arunpugahz@gmail.com>',
        to: 'mragunandhan@gmail.com',
        subject: `${product.name}`,
        html: `<h2> Successfully created ${product.code}  </h2>`
    };
    
    transporter.sendMail(HelperOptions,(error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log('Mail has sent');
            console.log(info)
        }
    })
}

module.exports = {
    triggerMail
}