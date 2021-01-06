import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        username: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
      },
      {
        sequelize,
      }
    );
    this.addHook('beforeSave', async (item) => {
      if (item.password) {
        item.password_hash = await bcrypt.hash(item.password, 8);
      }
    });
    return this;
  }
}

export default User;
