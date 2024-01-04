import { verifyToken } from '../auth-service/authenticationService.js';

const authMiddleware = async (req, res, next) => {
    console.log("Enter");
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = verifyToken(token);
          
            req.user = decoded;
            next();
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized', error: error.message });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized', error: 'No token provided' });
    }
};

export default authMiddleware;