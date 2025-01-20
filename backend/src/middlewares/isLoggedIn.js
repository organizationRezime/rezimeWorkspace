import jwt from 'jsonwebtoken';

const isLoggedIn = (req, res, next) => {
    try {
        let token;

        // Check if the token exists in cookies
        if (req.cookies.token) {
            token = req.cookies.token;
        } else if (req.headers.authorization) {
            const authHeader = req.headers.authorization;

            // Split 'Bearer token' into ['Bearer', 'token']
            const parts = authHeader.split(' ');

            if (parts.length !== 2 || parts[0] !== 'Bearer') {
                return res.status(401).json({ message: 'Invalid authorization format' });
            }

            token = parts[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.employee = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error: error.message });
    }
};

export { isLoggedIn };