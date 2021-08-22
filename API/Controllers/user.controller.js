import { User } from '../Models';

let user_routes = {};

user_routes.get_standard_message = async (req, res) => {
    try {
        return res.status(200).json({ message: "REST Fullstack Challenge 20201209 Running" });
    } catch (error) {
        return res.status(400).json({});
    }
};

user_routes.get_users = async (req, res) => {
    try {
        let users;
        if(req.query.from){
            users = await User.find({},{}, { limit: 50, skip: parseInt(req.query.from)})
        }else {
            users = await User.find({},{}, { limit: 50})
        }

        return res.status(200).json({ users: users });
    } catch (error) {
        return res.status(400).json({});
    }
};

user_routes.get_user = async (req, res) => {
    try {
        let user = await User.findOne({_id: req.params.userId})
        return res.status(200).json({ user: user });
    } catch (error) {
        return res.status(400).json({});
    }
};

user_routes.put_user = async (req, res) => {
    try {
        let userId = req.params.userId
        let user = await User.findOne({_id: userId})
        let { name_first, name_last, email, phone, nat, gender, dob} = req.body
        if(user){
            if (name_first){
                user.name.first = name_first
            }
            if (name_last){
                user.name.last = name_last
            }
            if(phone){
                user.phone = phone;
            }
            if(email){
                user.email = email;
            }
            if(nat){
                user.nat = nat;
            }
            if(gender){
                user.gender = gender;
            }
            if(dob){
                user.dob.date = dob;
            }
            let new_user = await User.findByIdAndUpdate(user._id, user, { new: true})
            return res.status(200).json({ user: new_user });
        }else{
            return res.status(400).json({message: 'user not found'});
        }



    } catch (error) {
        return res.status(400).json({error});
    }
};

user_routes.delete_user = async (req, res) => {
    try {
        await User.findByIdAndRemove({_id: req.params.userId})
        return res.status(200).json({ message: 'User deleted successfully!' });
    } catch (error) {
        return res.status(400).json({});
    }
};

user_routes.post_user = async (req, res) => {
    try {
        let new_user = await User.create(req.body.user)
        return res.status(201).json({ message: 'User created successfully!', user: new_user });
    } catch (error) {
        return res.status(400).json({message: error});
    }
};

user_routes.search_user = async (req, res) => {
    try {
        let {query, type} = req.body
        let user;
        if(type === 'name.first')
        {
            user = await User.find({ 'name.first' : query })
        }else{
            user = await User.find({nat: query})
        }
        if(user.length >= 1){
            return res.status(200).json({ users: user });
        }else {
            return res.status(400).json({ message: 'nothing found'})
        }

    } catch (error) {
        return res.status(400).json({});
    }
};


export { user_routes };
