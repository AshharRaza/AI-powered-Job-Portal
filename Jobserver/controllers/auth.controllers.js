import { argonHashPassword, CheckPassword, generateToken, GetEmail, StoreSignup } from "../services/auth.services.js"

export const PostSignUp = async(req,res) => {

    const {name,password,email} = req.body

    console.log(name,password,email)
    const hashPassword = await argonHashPassword(password)

    if(!hashPassword){
        return res.status(404).json({message:"Please Provide a password"})
    }
    const storeBack = await StoreSignup(name,hashPassword,email)

    if(!storeBack){
        return res.status(404).json({message:"Not Register"})
    }
    return res.status(200).json({message:"Register Successful"})

}

export const PostLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await GetEmail(email);
    if (!user) {
        return res.status(400).json({ message: "Email Not Exist" });
    }

    const CheckHashPassword = await CheckPassword(user.password, password);
    if (!CheckHashPassword) {
        return res.status(404).json({ message: "Something Wrong on Email and Password" });
    }

    const token = generateToken({
        id: user.id,
        name: user.name,
        email: user.email
    });
    

    // ✅ cookie config
    res.cookie("access_token", token, {
        httpOnly: true,
        secure: false,  // must be false in local dev
        sameSite: "lax"
    });

    return res.status(200).json({ message: "Login Successful" });
};


export const checkCandidateAuth = (req,res) => {
    console.log("checkCandidateAuth",req.user)
    if(!req.user){
        return res.status(404).json({message:"Please Login"})
    }
    return res.status(200).json({message:"Login Successful"})
}

export const resumeAuth = (req,res) => {

     console.log("resumeaUTH",req.user)
    if(!req.user){
        return res.status(404).json({message:"Please Login"})
    }
    return res.status(200).json({message:"Login Successful"})

}

