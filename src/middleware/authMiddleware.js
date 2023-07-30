export const auth = (req, res, next) => {
    try{

        //1. get the accessJWT
        //2. decode the jwt
        /// 3. extract the email and get user by email
        //check if user is active

        return next();

        res.status(401).json({
            status: 'error',
            message: 'Unaithorized',
        });
    }catch(error){
        next(error);
    }
};