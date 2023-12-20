import IdeasApi from "../services/ideasApi";
const ideasApi = new IdeasApi();
class IdeaList{
     constructor(){
          this._ideaListEl = document.querySelector('#idea-list');
          this._ideas = [];
          this.getIdeas();
          this.validtag = new Set();
          this.validtag.add('technology');
          this.validtag.add('software');
          this.validtag.add('business');
          this.validtag.add('education');
          this.validtag.add('health');
          this.validtag.add('inventions');
     }

     async getIdeas(){
          try {
               const response = await ideasApi.connectIdeas();
               this._ideas = response.data.data;
               console.log(this._ideas);
               this.render();
          } catch (error) {
               console.log(error);
          }
     }

     getTagClass(tag){
          tag = tag.toLowerCase();
          let chooseTag = '';
          if(this.validtag.has(tag)){
               chooseTag = `tag-${tag}`;
          }else{
               chooseTag = '';
          }
          return chooseTag;
     }
     render(){
          this._ideaListEl.innerHTML = this._ideas.map((idea) => {
               const tagClass = this.getTagClass(idea.tag);
               return `
               <div class="card">
                    <h3>
                    ${idea.text}
                    </h3>
                    <p class="tag ${tagClass}" >${idea.tag.toUpperCase()}</p>
                    <p>
                    Posted on <span class="date">${idea.date}</span> by
                    <span class="author">${idea.username}</span>
                    </p>
               </div>
               `;
          }).join('');
     }
}

export default IdeaList;