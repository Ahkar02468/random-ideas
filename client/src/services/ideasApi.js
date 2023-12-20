import axios from 'axios';
class IdeasApi{
     constructor(){
          this._apiUrl = 'http://localhost:5000/api/ideas'
     }

     connectIdeas(){
          return axios.get(this._apiUrl);
     }

     createIdeas(data){
          return axios.post(this._apiUrl, data);
     }
}

export default IdeasApi;