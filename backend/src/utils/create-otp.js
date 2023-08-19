async function createOtp(existUser, phone) {
  //query
  const findBy = { user_id: existUser.id, phone }

  //generate otp
  const otp = generateOtp()
  const hashedOtp = await bcrypt.hash(otp, 10)
  const otpData = {
    user_id: existUser.id,
    otp: hashedOtp,
    phone,
    expire_at: Date.now() + (1000 * 60) * env.OTP_EXPIRE_IN_MINUTES // 10 minutes
  }

  //opt already exists then update otherwise create
  if (await OtpRepository.getOneByQuery(findBy)) {
    //update otp and expiration
    const data = { otp: otpData.otp, expire_at: otpData.expire_at }
    await OtpRepository.update(findBy, data)
  } else {
    //create a new
    await OtpRepository.create(otpData)
  }

  return otp
}

async function verifyOtp(user_id, phone, otp) {
  const findBy = { user_id, phone }
  const nullData = { otp: null, expire_at: null }

  const user = (await AuthRepository.getOneByQuery(findBy))?.dataValues;
  if (!user) throw new Error(Message.USER_NO_LONGER_EXIST);


  //verify OTP
  const userOtp = (await OtpRepository.getOneByQuery(findBy))?.dataValues;
  if (!userOtp || !userOtp.otp) throw new Error(Message.OTP_NO_LONGER_EXIST);

  // expired then, update to null
  if (userOtp.expire_at && userOtp.expire_at.getTime() < Date.now()) {
    await OtpRepository.update(findBy, nullData)
    throw new Error(Message.OTP_IS_EXPIRE);
  }
  if (!(await bcrypt.compare(otp, userOtp.otp))) throw new Error(Message.OTP_IS_WRONG);

  //verification done 
  //otp update to null
  await OtpRepository.update(findBy, nullData)
}


function createToken(existUser, email) {
  return jwt.sign(
    { email, user_id: existUser.id },
    env.JWT_VERIFY_EMAIL_SECRET,
    {
      expiresIn: Date.now() + (1000 * 60) * env.EMAIL_VERIFICATION_LINK_EXPIRE_IN_MINUTES //10 minutes
    }
  );
}


async function verifyToken(token) {
  const decode = await promisify(jwt.verify)(token, env.JWT_VERIFY_EMAIL_SECRET);
  if (decode.exp && decode.exp < Date.now()) {
    throw new Error(Message.TOKEN_IS_EXPIRE);
  }

  const user = (await AuthRepository.getByEmailWithProvider(decode.email))?.dataValues;
  if (!user) throw new Error(Message.USER_NO_LONGER_EXIST);

  return user;
}


function getHttpOnlyCookie() {
  const day = (env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000); //1 day in milliseconds
  console.log('🚀 ~ day:', day)

  const cookieOptions = {
    expire: new Date(Date.now() + day),
    httpOnly: true
  }
  console.log('🚀 ~ cookieOptions:', cookieOptions)

  if (env.NODE_ENV === 'production') {
    cookieOptions.secure = true // it is work only for https;
  }

  return cookieOptions;
}

function getLoginToken(user) {
  const { id, phone, email, provider } = user;

  return jwt.sign(
    {
      id,
      phone,
      email,
      provider
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN // 1 day
    }
  )
}