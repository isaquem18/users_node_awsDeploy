// import { Sequelize } from 'sequelize';
import * as Yup from 'yup';
import Users from '../models/Users';

class UsersController {
  async show(req, res) {
    const { id } = req.params;
    const getOneUser = await Users.findByPk(id);
    if (getOneUser) {
      const { username } = getOneUser;
      return res.json({ id, username });
    }
    return res.status(404).json({ error: 'user not found!' });
  }

  async index(req, res) {
    const getAllUsers = await Users.findAll({ raw: true });
    const sendAllUsers = await getAllUsers.map((item) => {
      const { id, username } = item;
      return { id, username };
    });
    return res.json(sendAllUsers);
  }

  async store(req, res) {
    const { username, password } = req.body;

    const schema = Yup.object().shape({
      username: Yup.string().required().email().min(8),
      password: Yup.string().required().min(5),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'invalid input!' });
    }

    const verifyUserExistency = await Users.findOne({ where: { username } });
    if (verifyUserExistency) {
      return res.status(401).json({ error: 'user already exist!' });
    }

    const createNewUser = await Users.create({
      username,
      password,
    });

    return res.json(createNewUser);
  }

  async update(req, res) {
    const { id } = req.params;
    const { username, password } = req.body;
    const updateUser = await Users.update(
      { username, password },
      { where: { id } }
    );
    return res.json(updateUser);
  }

  async delete(req, res) {
    const { id } = req.params;
    const getOneUser = await Users.findByPk(id);
    if (!getOneUser) {
      return res.status(404).json({ error: 'user not found!' });
    }

    const deletetedUser = await Users.destroy({ where: { id } });
    return res.json(deletetedUser);
  }
}

export default new UsersController();
