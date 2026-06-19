const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    
    if (!authHeader) {
        return res.status(401).json({ message: "Brak tokenu" })
    }

    const token = authHeader.split(' ')[1]  // wyciąga część po "Bearer "

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch {
        return res.status(401).json({message: "Nieważny token"})
    }

    // tu zweryfikuj token przez jwt.verify()
    // jeśli błąd — zwróć 401
    // jeśli ok — wywołaj next()
}

module.exports = authMiddleware