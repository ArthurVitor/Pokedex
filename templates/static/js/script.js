const type_url = {
  grass: 'https://images2.imgbox.com/9c/47/EuX7DdQ8_o.png',
  dark: 'https://images2.imgbox.com/57/2d/glDP879U_o.png',
  dragon: 'https://images2.imgbox.com/81/bc/s6D3Vx9Y_o.png',
  electric: 'https://images2.imgbox.com/49/8e/rMrTcoLs_o.png',
  fairy: 'https://images2.imgbox.com/cb/46/w0VG2poE_o.png',
  fighting: 'https://images2.imgbox.com/a6/37/t8PdtmnJ_o.png',
  fire: 'https://images2.imgbox.com/b4/f8/m3BDLgEW_o.png',
  flying: 'https://images2.imgbox.com/36/30/WB9ZI8g1_o.png',
  ghost: 'https://images2.imgbox.com/b3/df/Icy8tcgb_o.png',
  ground: 'https://images2.imgbox.com/98/4a/Saz9A3H1_o.png',
  ice: 'https://images2.imgbox.com/ec/b5/MzPke4fy_o.png',
  normal: 'https://images2.imgbox.com/e5/f7/SuyNkdSE_o.png',
  poison: 'https://images2.imgbox.com/2d/20/yA2R4hzg_o.png',
  psychic: 'https://images2.imgbox.com/51/39/rssXR6R8_o.png',
  rock: 'https://images2.imgbox.com/eb/f4/lD7hbowV_o.png',
  steel: 'https://images2.imgbox.com/c7/5f/5ebg8ytr_o.png',
  water: 'https://images2.imgbox.com/d0/2c/JTRvjJR0_o.png'
};

// Get the name/id from the input field.
function get_data(){
  let element = document.getElementById('poke_name').value
  makeRequest(element)
}

// Makes a request to the pokeapi using id or name.
function makeRequest(id) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .then(data => replace_data([data['sprites'], data['types']]))
    .catch(error => console.error());
}

// Insert the data into the card.
function replace_data(data){
  let type_space = document.getElementById('type_space')
  type_space.innerHTML = ''

  let sprites = data[0]
  let types = data[1]

  document.getElementById('normal_sprite_space').setAttribute('src', sprites['front_default'])
  document.getElementById('shiny_sprite_space').setAttribute('src', sprites['front_shiny'])

  types.forEach(tp => {
    const img = document.createElement('img')
    img.setAttribute('src', type_url[tp['type']['name']])
    img.setAttribute('class', 'type_image')
    type_space.appendChild(img)
  });
}

let last_id = 4
let array = [[],[],[]]

function load_more() {
  for (let index = last_id + 1; index <= last_id + 4; index++) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${index}`)
      .then(response => response.json())
      .then(data => {
        array[0].push(data['name']);
        array[1].push(data['sprites']);
        array[2].push(data['types']);
        if (array[0].length === 4) {
          insert_pokemons(array);
          last_id += 4;
        }
      })
      .catch(error => console.error(error));
  }
}

let lst_id = 0
function insert_pokemons(data){
  let nm = data[0]
  let spr = data[1]
  let tp = data[2]
  console.log();

  lst_id ++
  let pok_spc = document.getElementById('pokemons_space')


  const div = document.createElement('div');
  div.className = 'card-container'
  div.id = 'cdc-'+lst_id
  pok_spc.append(div)

  let cdc_space = document.getElementById('cdc-'+lst_id)

  for(let i = 0; i < 4; i++){
    const card = document.createElement('div')
    card.className = `card ${tp[i][0]['type']['name']}`
    const img = document.createElement('img')
    img.src = `${spr[i]['front_default']}`
    card.appendChild(img)
    const p = document.createElement('p')
    p.innerHTML = `${nm[i].charAt(0).toUpperCase() + nm[i].slice(1)}`
    card.appendChild(p)
    cdc_space.appendChild(card)
  }

  array = [
  [],
  [],
  []
]
}



