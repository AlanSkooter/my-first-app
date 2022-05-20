import createRoute from 'find-my-way';
import  * as petsController from '../controller/pets.mjs';
import  * as usersController from '../controller/users.mjs';
import { checkAuth } from '../services/auth.mjs';
import { routerMiddleware } from '../utils/middleware.mjs';

const router = createRoute();

router.on('POST', '/image/upload', routerMiddleware([
  checkAuth,
  async (req, res) => {
    const result = await petsController.uploadPet(req, res);
    res.end(JSON.stringify(result));
  },
]));

router.on('GET', '/pets/images/', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const result = await petsController.getPets();
  res.end(JSON.stringify(result));
});

router.on('POST', '/reg', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const result = await usersController.addNewUser(req, res);
  res.end(JSON.stringify(result));
});

router.on('POST', '/login', async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  const result = await usersController.loginUser(req, res);
  res.end(JSON.stringify(result));
});

export default router;
