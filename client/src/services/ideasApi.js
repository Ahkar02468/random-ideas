import axios from 'axios';
class IdeasApi{
     constructor(){
          this._apiUrl = 'api/ideas'
     }

     connectIdeas(){
          return axios.get(this._apiUrl);
     }

     createIdeas(data){
          return axios.post(this._apiUrl, data);
     }

     updateIdea(id, data){
          return axios.put(`${this._apiUrl}/${id}`, data)
     }

     deleteIdea(id, data){
          const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
          return axios.delete(`${this._apiUrl}/${id}`, {
               data: {
                    username
               }
          })
     }
}

export default IdeasApi;
