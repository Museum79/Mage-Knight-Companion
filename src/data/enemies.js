import cavalierLoup    from '../assets/img/ennemies/cavalier-loup.webp'
import cuirasse        from '../assets/img/ennemies/cuirasse.webp'
import fouilleur       from '../assets/img/ennemies/fouilleur.webp'
import invocateurOrque from '../assets/img/ennemies/invocateur-orque.webp'
import rodeur          from '../assets/img/ennemies/rodeur.webp'
import sorcierMaudit   from '../assets/img/ennemies/sorcier-maudit.webp'
import dragonVert      from '../assets/img/ennemies/dragon-vert.webp'
import dragonFeu       from '../assets/img/ennemies/dragon-feu.webp'
import arbaletrier     from '../assets/img/ennemies/arbaletrier.webp'
import golem           from '../assets/img/ennemies/golem.webp'
import gardien         from '../assets/img/ennemies/chevalier.webp'
import epeistes        from '../assets/img/ennemies/epeistes.webp'
import dragonGlace     from '../assets/img/ennemies/dragon-glace.webp'
import iceMage         from '../assets/img/ennemies/ices-Mage.webp'
import minautor        from '../assets/img/ennemies/Minautor.webp'
import gargouille      from '../assets/img/ennemies/gargouille.webp'
import grandDragon     from '../assets/img/ennemies/grandDragon.webp'
import golemDeFeu      from '../assets/img/ennemies/golemDeFeu.webp'
import iceGolem        from '../assets/img/ennemies/IceGolem.webp'
import fireMage        from '../assets/img/ennemies/fireMage.webp'
import minotaurVideo   from '../assets/mp4/minotaur.mp4'


export const DAMAGE_TYPES = {
  PHYSICAL: 'Physical',
  FIRE: 'Fire',
  ICE: 'Ice',
  COLD_FIRE: 'ColdFire',
  POISON: 'Poison',
}

export const ENEMIES = [
  // Maraudeurs (orc)
  { id: 'orc_cavalier_loup',  image: cavalierLoup,    name: 'Cavalier Loup',    category: 'orc', armor: 4, attack: 3, attackType: 'Physical', abilities: ['Swift'],     resistances: [], immunities: [] },
  { id: 'orc_cuirasse',       image: cuirasse,        name: 'Cuirassé',         category: 'orc', armor: 3, attack: 4, attackType: 'Physical', abilities: ['Brutal'],   resistances: [], immunities: [] },
  { id: 'orc_fouilleur',      image: fouilleur,       name: 'Fouilleur',        category: 'orc', armor: 3, attack: 2, attackType: 'Physical', abilities: ['Fortified'],resistances: [], immunities: [] },
  { id: 'orc_invocateur',     image: invocateurOrque, name: 'Invocateur Orque', category: 'orc', armor: 4, attack: 4, attackType: 'Ice',      abilities: [],           resistances: [], immunities: [] },
  { id: 'orc_rodeur',         image: rodeur,          name: 'Rôdeur',           category: 'orc', armor: 3, attack: 2, attackType: 'Physical', abilities: ['Swift'],    resistances: [], immunities: [] },
  { id: 'orc_sorcier_maudit', image: sorcierMaudit,   name: 'Sorcier Maudit',   category: 'orc', armor: 5, attack: 3, attackType: 'Poison',   abilities: [],           resistances: [], immunities: [] },

  // Donjon (dungeon)
  { id: 'dungeon_gargoyle', image: gargouille, name: 'Gargouille',      category: 'dungeon', armor: 4, attack: 4, attackType: 'Physical', abilities: [],            resistances: [], immunities: ['Physical'] },
  { id: 'dungeon_werewolf', image: null, name: 'Loup-garou',      category: 'dungeon', armor: 5, attack: 5, attackType: 'Physical', abilities: ['Swift'],     resistances: [], immunities: [] },
  { id: 'dungeon_meduse',   image: null, name: 'Méduse',          category: 'dungeon', armor: 4, attack: 5, attackType: 'Physical', abilities: ['Paralyze'],  resistances: [], immunities: [] },
  { id: 'dungeon_minotaur', image: minautor, video: minotaurVideo, name: 'Minotaure',       category: 'dungeon', armor: 5, attack: 4, attackType: 'Physical', abilities: ['Brutal'],    resistances: [], immunities: [] },
  { id: 'dungeon_crypworm', image: null, name: 'Ver des Cryptes', category: 'dungeon', armor: 6, attack: 5, attackType: 'Physical', abilities: ['Fortified'], resistances: [], immunities: [] },

  // Tour du mage (mage_tower)
  { id: 'tower_golem_feu',   image: golemDeFeu, name: 'Golem de Feu',   category: 'mage_tower', armor: 4, attack: 5, attackType: 'Fire',     abilities: ['Brutal'],    resistances: [], immunities: ['Fire'] },
  { id: 'tower_golem_glace', image: iceGolem, name: 'Golem de Glace', category: 'mage_tower', armor: 4, attack: 5, attackType: 'Ice',      abilities: ['Fortified'], resistances: [], immunities: ['Ice'] },
  { id: 'tower_illusio',     image: null, name: 'Illusionniste',  category: 'mage_tower', armor: 3, attack: 4, attackType: 'Physical', abilities: ['Elusive'],   resistances: [], immunities: [] },
  { id: 'tower_mage_glace',  image: iceMage, name: 'Mage de Glace',  category: 'mage_tower', armor: 6, attack: 5, attackType: 'Ice',      abilities: ['Ranged'],    resistances: [], immunities: [] },
  { id: 'tower_mage_feu',    image: fireMage, name: 'Mage du Feu',    category: 'mage_tower', armor: 5, attack: 5, attackType: 'Fire',     abilities: ['Ranged'],    resistances: [], immunities: [] },
  { id: 'tower_moine',       image: null, name: 'Moine',          category: 'mage_tower', armor: 5, attack: 4, attackType: 'Poison',   abilities: [],            resistances: [], immunities: [] },

  // Forteresse (keep)
  { id: 'keep_arbaletrier', image: arbaletrier, name: 'Arbalétrier', category: 'keep', armor: 4, attack: 3, attackType: 'Physical', abilities: ['Ranged'],    resistances: [],           immunities: [] },
  { id: 'keep_epeiste',     image: epeistes, name: 'Épéiste',     category: 'keep', armor: 5, attack: 4, attackType: 'Physical', abilities: [],            resistances: [],           immunities: [] },
  { id: 'keep_gardien',     image: gardien, name: 'Gardien',     category: 'keep', armor: 7, attack: 3, attackType: 'Physical', abilities: ['Fortified'], resistances: [],           immunities: [] },
  { id: 'keep_golem',       image: golem, name: 'Golem',       category: 'keep', armor: 5, attack: 4, attackType: 'Physical', abilities: [],            resistances: ['Physical'], immunities: [] },

  // Cité (city)
  { id: 'city_artilleur',   image: null, name: 'Artilleur',     category: 'city', armor: 6, attack: 7, attackType: 'Fire',     abilities: ['Ranged', 'Brutal'], resistances: [],                       immunities: [] },
  { id: 'city_garde_altem', image: null, name: "Garde d'Altem", category: 'city', armor: 7, attack: 8, attackType: 'Physical', abilities: ['Fortified'],        resistances: ['Fire','Ice','Physical'], immunities: [] },
  { id: 'city_geleur',      image: null, name: 'Geleur',        category: 'city', armor: 7, attack: 7, attackType: 'Ice',      abilities: ['Ranged'],           resistances: [],                       immunities: [] },
  { id: 'city_mage_altem',  image: null, name: "Mage d'Altem",  category: 'city', armor: 8, attack: 8, attackType: 'ColdFire', abilities: [],                   resistances: [],                       immunities: ['Fire','Ice'] },

  // Draconum
  { id: 'draco_feu',      image: dragonFeu, name: 'Dragon de Feu',    category: 'draconum', armor: 9, attack: 8, attackType: 'Fire',     abilities: ['Brutal'], resistances: ['Physical'], immunities: ['Fire'] },
  { id: 'draco_glace',    image: dragonGlace, name: 'Dragon de Glace',  category: 'draconum', armor: 8, attack: 7, attackType: 'Ice',      abilities: [],         resistances: ['Physical'], immunities: ['Ice'] },
  { id: 'draco_marecage', image: dragonVert, name: 'Dragon des Marais', category: 'draconum', armor: 9, attack: 7, attackType: 'Poison',  abilities: ['Swift'],  resistances: [],           immunities: [] },
  { id: 'draco_grand',    image: grandDragon, name: 'Grand Dragon',      category: 'draconum', armor: 9, attack: 9, attackType: 'ColdFire', abilities: ['Brutal'], resistances: ['Physical'], immunities: ['Fire','Ice'] },
].sort((a, b) => a.name.localeCompare(b.name, 'fr'))