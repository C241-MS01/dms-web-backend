const express = require('express'); //wajib
const router = express.Router(); //
const UserController = require('../controller/users.js');

router.get('/', UserController.getAllUsers); //panggil get
// router.post('/', UserController);  //panggil post
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);


router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.put('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);


//sebelum pakai controller
// router.post('/', (req, res) => {
//     res.json({
//         message: 'POST users success',
//     })
// });

module.exports = router;