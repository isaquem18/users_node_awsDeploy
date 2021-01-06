import { Sequelize } from 'sequelize';
import dbCongif from '../config/database';
import Users from '../app/models/Users';

const models = [Users];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbCongif);
    models.map((item) => item.init(this.connection));
  }
}

export default new Database();
