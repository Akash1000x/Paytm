import JWT from "jsonwebtoken";

function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) return res.status(403).json({ message: "Token not found" });

    try {
        const decode = JWT.verify(token, `${process.env.SECRET}`);
        req.user_id = decode.user_id;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default authMiddleware;