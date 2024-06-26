const otpGenerator = require('otp-generator');
const nodemailer = require('nodemailer');
const User = require('../../models/userModel');
const Otp = require('../../models/otpModel');

const userVerifyOtp = async (req, res, next) => {
    try {
        const realOtp = req.session.userOtp
        const userTypedOtp = req.body.otp

        // console.log(userTypedOtp) //! to remove
        // console.log(realOtp) //! to remove

        if (userTypedOtp === realOtp) {
            const otpVerifyUser = req.session.userData

            const saveNewUser = new User({
                username: otpVerifyUser.username,
                email: otpVerifyUser.email,
                phone: otpVerifyUser.phone,
                password: otpVerifyUser.password,
                isVerified: true
            })

            const saving = await saveNewUser.save()
            if(saving){
                
                req.session.userId = saving.id

                console.log("user saved successfully")
                res.send({next: 1})
            }

            // res.send({ next: 1 })
        } else {
            res.send({ next: 0 })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    userVerifyOtp
};
