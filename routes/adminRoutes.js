import express from "express";
import { permissionAddValidator ,permissionDeleteValidator} from "../helpers/adminValidators.js";
import { addPermission,getPermission,deletePermission} from "../controllers/admin/permissionControllers.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/add-permissions",verifyToken, permissionAddValidator, addPermission);
router.get("/get-permissions",verifyToken, permissionAddValidator, getPermission);
router.delete("/delete-permissions/:_id",verifyToken, permissionDeleteValidator, deletePermission);
export default router;
