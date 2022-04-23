
const app = Vue.createApp({ 
    data(){
        return { 
            films: null,    /* axios stores all the Ghibli films here after fetching them */ 
            film: null,     /* this variable updates to hold whatever film is clicked on. */ 
            loading: true,
            commentbox: {
                monster:null,
                logcomments: []

            }
        }
    },
  
    methods:{       
        showFilm(id){ 
            let endpoint = this.films[id].url

            /*Fetching data to show monsters */
            axios.get('https://www.dnd5eapi.co'+ endpoint)
            .then(response => {
                
                this.film = response.data
                this.film.comments = [];
                console.log(this.film);
              
            })
            /*Scroll to the top whenever a film is chosen*/ 
           /* window.scrollTo({ top: 0, behavior: "smooth" }) */
        },
      addComment(formSubmitEvent){ 
        let textAreaContent = formSubmitEvent.target[0].value;
        this.film.comments.push(textAreaContent);

        // this.film.commentbox.push(commentbox);

        
        // this.save()
      },
    //   isOwned(comment){
    //     if ( this.film.comments.filter(x => x.id == comments.id).length > 0 ) return true;
    //     return false;
    // },
      add(comment){
        // if ( this.isOwned(comment)) return
        //this.film.comments.push(comment);
      },
      
    // ,
    //   save(){
    //     axios.post(  '/commentbox',  this.commentbox )
    //         .then(() => this.showNotice("Data Saved.") )
    //         .catch(() =>  this.showNotice("Unable to Save Data.") );
    // }
    },  
    mounted () {
        /* Using axios to fetch data. 
        You could also use Fetch API if you prefer*/ 

        // axios.get('https://ghibliapi.herokuapp.com/films/')
        axios.get('https://www.dnd5eapi.co/api/monsters/')
            .then(response => {
                console.log(response);
                this.films = response.data.results ,
                this.loading = false
                
            })
            .catch(error => console.log(error));
    } 



}).mount('#app')

// harrolds code
// const monsters = [{type:"not zombie"},{type:"zombie"},{}];
// const zombies = monsters.filter(checkZombie);

// function checkZombie(monster) {
//   return monster.type == "zombie"
// }

// function addClass
// const monsters = films;
// const words = split.a;

// function checkZombie(monster) {
//   return monster.type == "zombie"
// }
// function a{
// const filteredArray = films.fliter(result=> result.name.match(/^A/g))
// addList(filteredArray, list)
// }
function filterNamesA(){
const startsWithA = films.filter((film) => film.startsWith("a"));

}
function createMode() {
/* Reset the text area to be blank initially. */
createText.value = '';
}


// btn2.addEventListener('click', () => {
//     fetch('story', {
//         "method" : "POST",
//         "headers": {
//           'Content-Type': 'application/json' 
//         },
//         "body": JSON.stringify({ 
//           "content" : createText.value
//         })

// })
// })