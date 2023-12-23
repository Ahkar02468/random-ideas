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

     addEventListener(){
          this._ideaListEl.addEventListener('click', (e) => {
               if(e.target.classList.contains('fa-times')){
                    // console.log(e.target.classList.contains('fa-times'));
                    e.stopImmediatePropagation();
                    const ideaId = e.target.parentElement.parentElement.dataset.id;
                    this.deleteIdea(ideaId);
               }
          })
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

     async deleteIdea(ideaId){
          try {
               await ideasApi.deleteIdea(ideaId);
               this._ideas.filter(idea => {
                    idea._id !== ideaId
               });
               this.getIdeas();
          } catch (error) {
               alert('You are not allowed to delete this idea.')
          }
     }

     addIdeaToList(ideas){
          this._ideas.push(ideas);
          this.render();
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
               const deleteBtn = idea.username === localStorage.getItem('username') ? `<button class="delete"><i class="fa fa-times"></i></button>` : '';
               const tagClass = this.getTagClass(idea.tag);
               return `
               <div class="card" data-id=${idea._id}>
                    ${deleteBtn}
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
          this.addEventListener();
     }
}

export default IdeaList;