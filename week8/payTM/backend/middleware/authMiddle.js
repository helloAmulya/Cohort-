import express from 'express';
import JWT_SECRET from '../config';
import jwt from 'jsonwebtoken'



const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startWith('Bearer ')) {
        return res.status(403).json({
            msg: "wrong token"
        })
    }

    const token = authHeader.split(' ')[1]
    try {
        const verfiedToken = jwt.verify(token, JWT_SECRET)
        req.userId = verfiedToken.userId;
        next()
    } catch (error) {
        return res.status(403).json({
            msg: "invalid user`"
        })
    }
}
