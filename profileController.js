import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


class profileController{
    getUserProfile(req,res){
        try {
            // const usernameUrl = req
            res.render("profile.hbs", {
                username: req.params["username"]
            });
        } catch (error) {
            console.log(error);
        }
    }
}


export default new profileController();