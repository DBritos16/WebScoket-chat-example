import { Router } from 'express';
import { userModel, userService } from '../models/user.model';

const userRouter = Router();


userRouter.post('/login', async (req, res) => {
    const user = await userService.login(req.body);

    return res.json(user);
});

userRouter.post('/register', async (req, res) => {
    const user = await userService.register(req.body);

    return res.json(user);
});