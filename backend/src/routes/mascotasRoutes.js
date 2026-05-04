import { Router } from 'express';
import {
  getMascotas,
  getMascotaById,
  postMascota,
  putMascota,
  deleteMascota
} from '../controllers/mascotasController.js';

const router = Router();

router.get('/', getMascotas);
router.get('/:id', getMascotaById);
router.post('/', postMascota);
router.put('/:id', putMascota);
router.delete('/:id', deleteMascota);

export default router;