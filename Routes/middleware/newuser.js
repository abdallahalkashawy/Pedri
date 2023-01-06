
const newusers = require('../../Model/NewUser.js');

const bcrypt = require('bcrypt');
const createNewUser = async (UserName,Password,Type) => {
    hashedPassword = await bcrypt.hash(Password, 10);
    const newUser = new newusers({
        UserName : UserName,
        Password : hashedPassword,
        Type : Type
    });
    await newUser.save();
    return newUser;
}

//require('crypto').randomBytes(64).toString('hex')
// await bcrypt.compare(Password, user.hashedPassword)

module.exports = createNewUser;