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


async function getPokemonData(pokemonName) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    if (response.status === 404) {
      throw new Error(`Pokemon not found: ${pokemonName}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function replace_data() {
  let sprite = [];
  let type = [];

  // Requesting data from the pokeApi
  let element = document.getElementById('poke_name').value;
  let data = await getPokemonData(element);

  // Assigning values/data
  sprite = data['sprites']
  types = data['types']

  // Assigning normal sprite
  let nr_sp = document.getElementById('normal_sprite_space')
  nr_sp.setAttribute('src', sprite['front_default'])

  // Assigning shiny sprite
  let sh_sp = document.getElementById('shiny_sprite_space')
  sh_sp.setAttribute('src', sprite['front_shiny'])

  // Assigning the type(s)
  let tp_sp = document.getElementById('type_space')
  tp_sp.innerHTML = ''
  try {
    types.forEach(elm => { // Iterating through all the pokemon's type(s)
      type = elm['type']

      let img = document.createElement('img')  // Creating image element
      img.src = type_url[type['name']] // Assigning the type url to the src
      img.className = 'type_image'

      tp_sp.appendChild(img) // Appending the img to the "type_space"

    });
  } catch (error) {
    console.log(`A error ocourred: ${error}`)
  }

}

let ls_pk_id = 4;
let lst_id = 0
async function load_more() {
  lst_id += 1
  let pk_sp = document.getElementById('pokemons_space')

  const div = document.createElement('div');
  div.className = 'card-container'
  div.id = 'cdc-'+lst_id
  pk_sp.append(div)

  let cdc_space = document.getElementById('cdc-'+lst_id)

  for (let c = ls_pk_id+1; c < ls_pk_id + 5; c++) {
    let data = await getPokemonData(c)
    let nm = data['name']
    let spr = data['sprites']
    let tp = data['types']

    const card = document.createElement('div')
    card.className = `card ${tp[0]['type']['name']}`
    const a = document.createElement('a')
    a.href = `/detailed_info:${nm}`
    const img = document.createElement('img')
    img.src = `${spr['front_default']}`
    a.appendChild(img)
    card.appendChild(a)
    const p = document.createElement('p')
    p.innerHTML = `${nm.charAt(0).toUpperCase() + nm.slice(1)}`
    card.appendChild(p)
    cdc_space.appendChild(card)

  }

  ls_pk_id += 4
}
