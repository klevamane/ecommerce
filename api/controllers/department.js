import { Department } from '../models';
import validateDepartment from '../validators/department/validate-department';


/**
 * Class representing departments
 */
export default class DepartmentController {
  /**
    * @desc Get a list of all departments
    * @param {*} req - Request object
    * @param {*} res - Response object
    * @returns {object} An object containing the list of departments
    */
  static getDepartments(req, res) {
    Department.findAll()
      .then(allDepartments => res.json(allDepartments))
      .catch(err => res.status(400).json(err));
  }

  /**
    * @desc Get a department by Id of all departments
    * @param {*} req - Request object
    * @param {*} res - Response object
    * @returns {object} An object containing the details of a particular department
    */
  static getDepartmentById(req, res) {
    const { errors, isValid } = validateDepartment(req.params);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    Department.findByPk(req.params.department_id)
      .then((department) => {
        if (department) {
          return res.json(department);
        }
        return res.status(400).json({
          error: {
            status: 400,
            code: 'DEP_02',
            message: 'The Department with this ID does not exist.',
            field: 'email'
          }
        });
      })
      .catch(err => console.log(err));
  }
}
