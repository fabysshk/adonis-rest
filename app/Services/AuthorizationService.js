const InvalidAccessException = use("App/Exceptions/InvalidAccessException");
const ResourseNotExistException = use(
  "App/Exceptions/ResourseNotExistException"
);
class AuthorizationService {
  constructor() {}
  verifyPermision(resourse, user) {
    if (!resourse) {
      throw new ResourseNotExistException();
    }

    if (resourse.user_id !== user.id) {
      throw new InvalidAccessException();
    }
  }
}

module.exports = new AuthorizationService();
