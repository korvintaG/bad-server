import { Router } from 'express'
import {
    createOrder,
    deleteOrder,
    getOrderByNumber,
    getOrderCurrentUserByNumber,
    getOrders,
    getOrdersCurrentUser,
    updateOrder,
} from '../controllers/order'
import { roleGuardMiddleware } from '../middlewares/auth'
import { validateOrderBody } from '../middlewares/validations'
import { doubleCsrfProtection } from '../middlewares/csrf-protect'
import { Role } from '../models/user'

const orderRouter = Router()

orderRouter.post('/', validateOrderBody, createOrder)
orderRouter.get('/all', roleGuardMiddleware(Role.Admin), getOrders)
orderRouter.get('/all/me', getOrdersCurrentUser)
orderRouter.get(
    '/:orderNumber',
    roleGuardMiddleware(Role.Admin),
    getOrderByNumber
)
orderRouter.get('/me/:orderNumber', getOrderCurrentUserByNumber)
orderRouter.patch(
    '/:orderNumber',
    doubleCsrfProtection,
    roleGuardMiddleware(Role.Admin),
    updateOrder
)

orderRouter.delete(
    '/:id',
    doubleCsrfProtection,
    roleGuardMiddleware(Role.Admin),
    deleteOrder
)

export default orderRouter
