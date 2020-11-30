const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = {
	async store(req, res) {
		try {
			const { email, firstName, lastName, password,lat,long,address,statecode,zipcode } = req.body
			const existentUser = await User.findOne({ email })
			const existentAddress = await User.findOne({address})

			if (!existentUser && !existentAddress) {
				const hashPassword = await bcrypt.hash(password, 10)
				const user = await User.create({
					email,
					firstName,
					lastName,
                    password: hashPassword,
                    address,
                    statecode,
                    zipcode,
                    lat,
                    long
				})
				return res.json(user)
			}
			else if(existentUser){
				 res.json({message:'email already exist!  do you want to login instead? '})
			}else if(existentAddress){
				 res.json({message:'Address already exist!  do you want to login instead? '})
			}

		} catch (err) {
			throw Error(`Error while Registering new user :  ${err}`)
		}
    },
    
    async getAllUsers(req,res){
        try {
            const users = await User.find()
        
        if (users) {
            return res.json({users})
        } 
        } catch (error) {
            return res.status(400).json({message: "We do not have any events yet"})
        }
	},
}