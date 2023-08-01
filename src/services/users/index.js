import User from '../../db/model/User';

class UserService {
  static async findByEmail(email) {
    return User.query().findOne({ email: email.toLowerCase() });
  }

  static async getAccountInfoById(id) {
    return User.query().findById(id);
  }

  static async getUsersList() {
    return User.query();
  }
}

export default UserService;
