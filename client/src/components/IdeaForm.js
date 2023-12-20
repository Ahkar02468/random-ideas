import IdeasApi from "../services/ideasApi";
import IdeaList from "./IdeaList";
const ideaApi = new IdeasApi();
class IdeaForm{
     constructor(){
          this._formModal = document.querySelector('#form-modal');
          this._newIdea = new IdeaList();
     }

     addEventListner(){
          this._form.addEventListener('submit',this.handleSubmit.bind(this));
     }

     async handleSubmit(e){
          e.preventDefault();
          console.log('submit');
          if(!this._form.elements.text.value || !this._form.elements.tag.value || !this._form.elements.username.value){
               alert("Please fill all the fields.");
               return;
          }

          //set username to local storage to get fill data back
          localStorage.setItem('username', this._form.username.value);

          const ideas = {
               text: this._form.elements.text.value,
               tag: this._form.elements.tag.value,
               username: this._form.username.value,
          }

          //add idea to server
          const newIdea = await ideaApi.createIdeas(ideas);
          //add new idea to list
          this._newIdea.addIdeaToList(newIdea.data.data);
          this._form.elements.text.value = '';
          this._form.elements.tag.value = '';
          this._form.elements.username.value = '';
          //not to relad again
          this.render();

          //add event to join close method from Modal with this page as soon as after press submit buttton
          document.dispatchEvent(new Event('closemodal'));
     }

     render(){
          this._formModal.innerHTML = `
               <form id="idea-form">
                    <div class="form-control">
                         <label for="idea-text">Enter a Username</label>
                         <input type="text" name="username" id="username" value="${localStorage.getItem('username') ? localStorage.getItem('username') : '' }"/>
                    </div>
                    <div class="form-control">
                         <label for="idea-text">What's Your Idea?</label>
                         <textarea name="text" id="idea-text"></textarea>
                    </div>
                    <div class="form-control">
                         <label for="tag">Tag</label>
                         <input type="text" name="tag" id="tag" />
                    </div>
                    <button class="btn" type="submit" id="submit">Submit</button>
               </form>
          `
          this._form = document.querySelector('#idea-form');
          this.addEventListner();
     }
}

export default IdeaForm;