const userModelConst = {
  emailRegExp:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  subscriptionTypes: ['starter', 'pro', 'business'],
  passwordMinLength: 6,
};

export default userModelConst;