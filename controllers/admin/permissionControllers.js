import { validationResult } from "express-validator";
import Permission from "../../models/permission.js";
const addPermission = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(200).json({
        success: false,
        msg: "Errors",
        errors: errors.array(),
      });
    }
    const { permission_name } = req.body;
    const permissionExist = await Permission.findOne({ permission_name });

    if (permissionExist) {
      return res.status(400).json({
        scuuess: false,
        msg: "This permission name is already exist",
      });
    }

    let obj = { permission_name };
    if (req.body.default) {
      obj.is_default = parseInt(req.body.default);
    }
    const permission = await new Permission(obj);
    const newPermission = await permission.save();
    return res.status(200).json({
      successs: true,
      msg: "Permission added successfully",
      data: newPermission,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// get permission //

const getPermission = async (req, res) => {
  try {
    const permissons = await Permission.find({});
    return res.status(200).json({
      success: true,
      msg: "Permission fatch successfully",
      data: permissons,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

// delete-permissions // 

const deletePermission = async (req, res) => {
  try {
    const permissions = await Permission.findById(req.params._id);
    if (!permissions) {
      return res.status(401).json({
        success: false,
        msg: "No permission found by this ID",
      });
    }

    await Permission.findByIdAndDelete(req.params._id);
    
    return res.status(200).json({
      success: true,
      msg: "Permission deleted successfully",
      data: permissions,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: error.message,
    });
  }
};

export { addPermission, getPermission, deletePermission };
