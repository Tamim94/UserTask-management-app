class UsersService {
    constructor({ User }){
        this.User = User;
    }

    async login(userData) {
        const _user = await this.User.findOne({ email: userData.email });

        if (_user) {
            let isPasswordValid = _user.comparePassword(userData.password);
            if (isPasswordValid) {
                return {
                    message: 'User is correct',
                    token: _user.getJWT(),
                    user: _user // Include user data in the response
                };
            } else {
                return {
                    message: 'Invalid email or password',
                    error: true
                };
            }
        } else {
            return {
                message: 'Invalid email or password',
                error: true
            };
        }
    }
    async createUser(userData) {
        const newUser = new this.User(userData);
        await newUser.save();
        return {
            message: 'User created successfully!',
            user: newUser,
        };
    }
    async updateUser(userId, userData){
        const _user = await this.User.findByIdAndUpdate(userId, userData, { new: true});

        if (_user) {
            return {
                message: 'User updated successfully!',
                user: _user,
            };
        }

        return {
            message: 'User not found!',
        };
    }

    async deleteUser(userId) {
        const _user = await this.User.findByIdAndDelete(userId);

        if (_user) {
            return {
                message: 'User deleted succesfully!',
            };
        }

        return {
            message: 'User not found!',
        };
    }

    async listAllUsers({page =1,limit = 10,search =''}) {
        let query ={};
        if(search){
            query =  {
                $or: [
                    { fullName :{$regex: search,$options:'i'}},
                    { job :{$regex:search,$option:'i'}},
                    { role :{$regex:search,$option:'i'}},
                ],
            };
        }
        const _users = await this.User.find()
            .limit(limit)
            .skip((page - 1) * limit);
        const total = await this.User.countDocuments(query);

        return {
            message: 'List of all users!',
            users: _users,
            total: total, // Corrected variable name
            totalPages: Math.ceil(total/limit), // Corrected variable name
            currentPage: page,
            limit: limit,
        };
    }
}

module.exports = UsersService;
