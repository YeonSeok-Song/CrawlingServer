import { userModel } from "../schemas/user";

class user {

    static create({ newUser }) {
        return userModel.create(newUser);
    }

    static readByEmail({ email }) {
        return userModel.findOne({ email });
    }

    static readById({ id }) {
        return userModel.findOne({ id });
    }

    static update({ id, data }) {
        const filter = { id };
        const option = { 
            returnOriginal: false 
        };
        return userModel.findOneAndUpdate(filter, data, option);
    }

    static delete({ userId }) {
        return userModel.findOneAndDelete({ userId });
    }
}

export { user };
