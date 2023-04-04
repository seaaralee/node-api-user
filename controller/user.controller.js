require('dotenv').config();
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
const { sendEmail } = require('../helpers')

exports.SignUp = async (req, res) => {
    const { email, password, confpassword } = req.body
    let emailUser = await User.findOne({email: email})
    if(emailUser) {
        return res.status(404).json({
            status: false,
            message: 'email already registered'
        })
    }
    const hashPassword = await bcryptjs.hash(password, 10)
    const hashConfPassword = await bcryptjs.hash(confpassword, 10)
    const user = new User({
        email: email,
        password: hashPassword,
        confpassword: hashConfPassword,
    })

    user.save()

    return res.status(201).json({
        message: 'user added'
    })
}

exports.SignIn = async (req,res) => {
    const { email, password } = req.body

    const datauser = await User.findOne({email: email})
    if(datauser){
        const userpassword = await  bcryptjs.compare(password, datauser.password)
        if(userpassword){
            const data = {
                id: datauser._id
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            return res.status(200).json({
                message: 'berhasil',
                token: token
            })
        } else{
            return res.status(404).json({
                status: false,
                message: 'password doesnt match'
            })
        }
    } else {
        return res.status(404).json({
            message: 'email not found'
        })
    }
    
}


exports.User = async (req,res) => {
    const user = await User.findOne({_id: req.id})
    return res.status(200).json({
        message: 'success',
        data: user
    })
}

exports.forgotPassword = async (req,res) => {
    const { email } = req.body
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(200).json({
            status: false,
            message: 'email tidak tersedia'
        })
    }
    const token = jsonwebtoken.sign({
       iduser: user._id 
    }, process.env.JWT_SECRET)

    await user.updateOne({resetPasswordLink: token})

    const templateEmail = {
        from: 'JoyMakers',
        to: email,
        subject: 'Link Reset Password',
        html: `<p>Click link this below, to reset your password !</p> <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`
    }
    sendEmail(templateEmail)
    return res.status(200).json({
        status: true,
        message: 'Link Reset Password Already Send to Your Email'
    })
}

exports.resetPassword = async (req,res) => {
    const { token, password } = req.body
    console.log('token', token)
    console.log('password', password)

    const user = await User.findOne({resetPasswordLink: token})
    if(user){
        const hashPassword = await bcryptjs.hash(password, 10)
        user.password = hashPassword
        await user.save()
        return res.status(201).json({
            status: true,
            message: "password already changed"
        })
    }
}