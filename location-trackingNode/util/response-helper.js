class ResponseHelper {
  static success(message = null, data, code = 200) {
    return {
      result: { success: true, message, data },
      code,
    };
  }
  static error(message = 'Something went wrong. please try again', data = null, code = 500) {
    return {
      result: { success: false, message, data },
      code,
    };
  }
}

module.exports = ResponseHelper;
