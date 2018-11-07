import axios from "axios";
// import request from 'request'

export default {
    getSavedArticles: function(){
        return axios.get("/api/articles");
    },
    saveArticle: function(data){
        console.log(data)
        return axios.post("/api/articles", data);
    },
    deleteArticle: function(id){
        console.log(id)
        return axios.delete("/api/articles/" + id);
    }
}