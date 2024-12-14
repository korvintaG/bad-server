import { rateLimit }  from 'express-rate-limit';
import {MAX_REQUEST_PER_MINUTE} from '../config'

export const limiter = rateLimit({
    windowMs: 60 * 1000,  // 1 минута
    max: MAX_REQUEST_PER_MINUTE,  // Ограничить каждый IP на 30 запросов за окно
    message: 'Слишком много запросов, пожалуйста, попробуйте снова позже.'
  });
  

