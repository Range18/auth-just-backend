

class profileController{
    getUserProfile(req,res){
        try {
            res.redirect("http://google.com");
        } catch (error) {
            console.log(error);
        }
    }
}


export default new profileController();