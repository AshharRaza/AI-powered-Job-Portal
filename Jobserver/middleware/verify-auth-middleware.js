import { verifyToken } from "../services/auth.services.js";

export const VerifyAuthorization = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log("token from cookie:", token);

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decodedToken = verifyToken(token);
        console.log("decoded token:", decodedToken);
        req.user = decodedToken;
    } catch (error) {
        console.log("JWT verify error:", error.message);
        req.user = null;
    }
    console.log(req.user)
    return next();
};
