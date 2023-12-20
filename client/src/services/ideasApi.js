import axios from 'axios';
class IdeasApi{
     constructor(){
          this._apiUrl = 'http://localhost:5000/api/ideas'
     }

     connectIdeas(){
          return axios.get(this._apiUrl);
     }
}

export default IdeasApi;