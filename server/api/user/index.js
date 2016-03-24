'use strict';

import {Router} from 'express';
import * as controller from './user.controller';
import * as auth from '../../auth/auth.service';

var router = new Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
//router.get('/generate', auth.isAuthenticated(), controller.generate);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);
router.post('/addbracket', auth.isAuthenticated(), controller.addBracket);
router.post('/deletebracket', auth.isAuthenticated(), controller.deleteBracket);
router.post('/updatebracket', auth.isAuthenticated(), controller.updateBracket);

export default router;
