import { ExpressValidator, check } from "express-validator";

export const permissionAddValidator = [
  check("permission_name", "permission_name is required").not().notEmpty(),
];
export const permissionDeleteValidator = [
  check("id", "id is required").not().notEmpty(),
];
