class Modal{
     constructor(){
          this._modal = document.getElementById('modal');
          this._modalBtn = document.getElementById('modal-btn');
          this.addEventListener();
     }


     addEventListener(){
          this._modalBtn.addEventListener('click', this.open.bind(this));
          window.addEventListener('click', this.clickedOutsite.bind(this));
          //listen event from IdeaForm
          document.addEventListener('closemodal', () =>  this.close());
     }


     open(){
          this._modal.style.display = 'block';
     }
     
     close(){
          this._modal.style.display = 'none';
     }
     
     clickedOutsite(e){
          if(e.target === this._modal){
               // console.log(e.target);
               this.close();
          }
     }
}

export default Modal;