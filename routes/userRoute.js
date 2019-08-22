let router = express();
let bodyparser = require('body-parser');
let userController = require('../controller/userController');

router.use(bodyparser.urlencoded({ extended: true }));
router.use(bodyparser.json());

router.get('/', userController.createTable );
router.post('/mailSend',userController.mailUser );
router.get('/test',userController.testingAPI );
router.post('/insertData',userController.insertTable );
router.get('/getData', userController.getData);
router.post('/getId/:id', userController.getID);
router.post('/delData/:id',userController.deleteUser);
router.post('/upDate/:id', userController.updateUser);


module.exports = router;