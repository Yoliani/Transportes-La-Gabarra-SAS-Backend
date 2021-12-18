/* 
    Rutas de Usuarios / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { crearUsuario } = require('../controllers/auth');

const router = Router();

router.post(
    '/new',
    [ // middlewares
        check('name', ' El nombre es obligatorio').not().isEmpty(),
        check('lastname', ' El appellido es obligatorio').not().isEmpty(),
        check('email', ' El email es obligatorio').isEmail(),
        check('password', ' El password debe de ser de 6 caracteres').isLength({ min: 6}),
        validarCampos
    ],
    crearUsuario );


module.exports = router;