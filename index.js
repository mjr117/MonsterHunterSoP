// Setting up generic values
let titleText="The monster name (Type): title";
let descText="Description lives here";
let img = new Image();
let imgSource="Monster Images/greatSword.webp";
let themeButton={x:0,y:550,width:100,height:50};
let smashButton={x:0,y:120,width:50,height:200};
let passButton={x:550,y:120,width:50,height:200};
let backButton={x:400,y:550,width:200,height:50};
let roarButton={x:100,y:550,width:100,height:50};
let themeAudio=new Audio("Monster Theme/B/button-3.mp3");
let monsterIndex=0;
let initalSetup=false;
let smashCount=0;
let passCount=0;
let leftCount=0;
let audioVolume=.5;

// Setting up class for each smash or pass section
class Monster {
    constructor(name,type,title,desc,theme){
        this.name=name; // name of monster
        this.type=type; // the catigory/type of monster
        this.title=title; // if the monster has other names
        this.desc=desc; // description of the monster
        this.theme=theme; // location of theme song of the monster
        this.smash=0; // -1=no, 0=no answer, 1=yes
    }
    // show the slide
    show() {
        titleText=this.name+" ("+this.type+"): "+this.title;
        descText=this.desc;
        imgSource='Monster Images/'+this.name[0]+'/'+this.name+'.webp';
        if (this.theme!="NA"){
            themeAudio=new Audio('Monster Theme/'+this.theme[0]+'/'+this.theme+'.mp3');
        } else {
            themeAudio=new Audio("Monster Theme/B/button-3.mp3");
        }
    }
    smashing(smash) {
        if (this.smash!=smash) {
            if (smash==1) {
                smashCount++;
            }else if(smash==-1) {
                passCount++;
            }else{
                // shouldn't happen but just in case
                leftCount++;
            }
            if (this.smash==1) {
                smashCount--;
            }else if(this.smash==-1) {
                passCount--;
            }else{
                leftCount--;
            }
            this.smash=smash;
            
        }
        monsterIndex++;
        //console.log(monsterIndex);
        
        // loop the list
        if (monsterIndex>=monsters.length) {
            monsterIndex=0;
        }else if(monsterIndex<0){
            monsterIndex=monsters.length-1;
        }
        draw();
    }
    backStep() {
        monsterIndex--;
        //console.log(monsterIndex);

        // loop the list
        if (monsterIndex>=monsters.length) {
            monsterIndex=0;
        }else if(monsterIndex<0){
            monsterIndex=monsters.length-1;
        }
        draw();
    }
    static from(json){
        return Object.assign(new Monster(), json);
    }
}

// defines a monsters
const json= [
    {
     "name": "Tetsucabra",
     "type": "Amphibians",
     "title": "Demon Frog",
     "desc": "Amphibians with unique jaws and tusks that they use to sift through rocks for prey. They use their powerful hind legs to traverse steep terrain. It can also use the large boulders it digs up to obstruct a predator's vision and make a hasty retreat.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Berserk Tetsucabra",
     "type": "Amphibians",
     "title": "Wild Demon Frog",
     "desc": "An amphibious monster known for its distinctive markings resembling a painted face. These beasts dig up and hurl boulders in the same way as a standard Tetsucabra does, but the stones thrown by this Berserk variety explode upon impact.",
     "theme": "Volcano"
    },
    {
     "name": "Drilltusk Tetsucabra",
     "type": "Amphibians",
     "title": "Evil Faced Star",
     "desc": "An exceptionally large Tetsucabra with tusks that can drill through earth, or even metal. If the Drilltusk weren't constantly shattering boulders on its enemies or trying to crush them with its weight, one could almost appreciate the masterful way it digs. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Tetranadon",
     "type": "Amphibians",
     "title": "kappa Frog",
     "desc": "An amphibious monster resembling a frog. Its appetite is infinite, and if it sees anything moving, it will gobble it up, dirt and all. It's theorized that the dirt it consumes builds up in its stomach and aids in digestion. If it eats something that it cannot digest, it will throw it back up. The cranial disc protecting its tender head is said to harden and become a more brilliant blue over time.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Zamite",
     "type": "Amphibians",
     "title": "-",
     "desc": "Juvenile Zamtrios that uses their sharp teeth to pierce the hide of their prey and then burrow inside to consume from within; those who are attacked must roll around vigorously to shake the monster off. They can also use a Wirebug or a kunai to help them get free. Zamite grow rapidly even after a single feeding.",
     "theme": "Frozen"
    },
    {
     "name": "Zamtrios",
     "type": "Amphibians",
     "title": "Monster Shark",
     "desc": "Amphibians that strike from frozen waters, using the cold to stun their prey. They secrete a special liquid that both coats their own body with icy armor and freezes any nearby foes. Frogs are their favorite food.",
     "theme": "Frozen"
    },
    {
     "name": "Tigerstripe Zamtrios",
     "type": "Amphibians",
     "title": "Tiger Shark",
     "desc": "Unlike its standard counterpart, this distinctively-striped Zamtrios subspecies dwells primarily in desert climes, and can employ its ability to expand and contract its body even while in motion, making it an even more formidable adversary.",
     "theme": "Desert"
    },
    {
     "name": "Aknosom",
     "type": "Bird Wyvern",
     "title": "Parasol Bird",
     "desc": "Tending to stand on one leg, this monster somewhat resembles an umbrella. The Aknosom is highly territorial; it will spread out its wings and show off its characteristic comb to scare off threats. It also bears flammable venom that burns fiercely and lingers on the ground when lit. Draw the beast to water for an easier fight.",
     "theme": "Aknosom"
    },
    {
     "name": "Boggi",
     "type": "Bird Wyvern",
     "title": "Cunning Dog Wyvern",
     "desc": "Bird Wyverns living in the highlands of the Citadel. These calculating creatures hunt their prey with cunning, often waiting for them to grow weak before striking. They're dangerous creatures that surround their prey in packs with their sizable claws ready to strike, so don't approach them carelessly.",
     "theme": "Great"
    },
    {
     "name": "Baggi",
     "type": "Bird Wyvern",
     "title": "Sleep Dog Wyvern",
     "desc": "Highly intelligent, carnivorous bird wyverns that hunt in packs. Noted for their blue scales and sharp glare. Baggi are feared for their ability to release a tranquilizing fluid; even a grown man can be put to sleep in seconds.",
     "theme": "Old Great"
    },
    {
     "name": "Great Baggi",
     "type": "Bird Wyvern",
     "title": "Cunning Usurper",
     "desc": "A carnivorous bird wyvern. Noted for their projecting cranial crests and bluish-white skin that's adapted to snowy climates. Great Baggi craftily command other Baggi to surround their prey and stun them with a tranquilizing fluid.",
     "theme": "Old Great"
    },
    {
     "name": "Genprey",
     "type": "Bird Wyvern",
     "title": "-",
     "desc": "Bird wyverns with a distinctive green-and-orange striped hide, Genprey live in packs in the Dunes and Primal Forest. Their claws and large fangs contain a paralyzing neurotoxin that they use to stun prey.",
     "theme": "Old Great"
    },
    {
     "name": "Gendrome",
     "type": "Bird Wyvern",
     "title": "Alpha Raptor",
     "desc": "Alpha monsters that lead Genprey packs. Larger than their brothers and with a more prominent crest, Gendrome use the venom in their highly evolved fangs and claws to paralyze their prey.",
     "theme": "Old Great"
    },
    {
     "name": "Giaprey",
     "type": "Bird Wyvern",
     "title": "Carnivore",
     "desc": "A species of small bird-like carnivores known to inhabit the Arctic Ridge. Their white skin is beautiful, but their temperament is not. They are known to spit ice at hunters, and attack in deadly packs.",
     "theme": "Old Great"
    },
    {
     "name": "Giadrome",
     "type": "Bird Wyvern",
     "title": "Carnivore Leader",
     "desc": "Alpha monsters that lead Giaprey packs. They sport splendid crests and are much bigger than Giaprey they lead. They spit ice with deadly accuracy, and woe betide the Hunter who gets caught in it.",
     "theme": "Old Great"
    },
    {
     "name": "Izuchi",
     "type": "Bird Wyvern",
     "title": "-",
     "desc": "An omnivorous bird wyvern that has a characteristic scythe-shaped tail. It uses this tail to attack, but also to climb trees and chop down fruit. Most Izuchi fall into herd led by a Great Izuchi; in each herd, the two best fighters are selected by the leader to help it hunt prey.",
     "theme": "Great"
    },
    {
     "name": "Great Izuchi",
     "type": "Bird Wyvern",
     "title": "Trinity of Terror",
     "desc": "The alpha Izuchi of its pack, identified by its larger build, upended white fur and scythe-like tail. A Great Izuchi forms a herd of many smaller Izuchi and selects two from the group to accompany it on territory patrols. Once it spots prey or senses danger, the Great Izuchi issues commands to their fellow Izuchi, and coordinates their movements. Take care that you don't get overwhelmed.",
     "theme": "Great"
    },
    {
     "name": "Jaggi",
     "type": "Bird Wyvern",
     "title": "Dog Wyvern",
     "desc": "Highly social, carnivorous bird wyverns that live in large packs. Young Jaggi males hunt in groups when attacking larger animals. Research suggests they operate under orders from a single alpha male.",
     "theme": "Old Great"
    },
    {
     "name": "Jaggia",
     "type": "Bird Wyvern",
     "title": "Dog Wyvern",
     "desc": "Female Jaggi that stay in packs, Jaggia generally live near the nest and are responsible for defending it and raising young. Smaller than mature males, but larger and tougher than the pack's countless young males. They also operate under orders from the alpha.",
     "theme": "Old Great"
    },
    {
     "name": "Great Jaggi",
     "type": "Bird Wyvern",
     "title": "Dog Wyvern",
     "desc": "The alpha male that leads Jaggi packs. Most males leave the group upon reaching maturity, returning late to compete with others. The dominant male then becomes a Great Jaggi. Apparently, they can issue fairly complex orders via howling.",
     "theme": "Old Great"
    },
    {
     "name": "Maccao",
     "type": "Bird Wyvern",
     "title": "-",
     "desc": "Colorful red and green bird wyverns that live in large packs, they can be found mostly in the Jurassic Frontier. Though they attack prey aggressively with their strong legs, they are known to flee once their leader is in danger.",
     "theme": "Great"
    },
    {
     "name": "Great Maccao",
     "type": "Bird Wyvern",
     "title": "Jumping Dog Wyvern",
     "desc": "Leader of the pack-hunting Maccao, the Great Maccao is easily spotted by its large size and feather-like yellow crest. It can balance on its tail and spring forward for a deadly strike, but when weakened, its lesser Maccao cousins are quick to turn tail and run.",
     "theme": "Great"
    },
    {
     "name": "Wroggi",
     "type": "Bird Wyvern",
     "title": "Poison Dog Wyvern",
     "desc": "Small, carnivorous bird wyverns with poison-generating organs that run from their mouths to their throats. They run in packs, often led by a large alpha male. Lesser members of the order are fiercely loyal, and will eagerly lay down their lives to protect the alpha.",
     "theme": "Old Great"
    },
    {
     "name": "Great Wroggi",
     "type": "Bird Wyvern",
     "title": "Venomous Commander",
     "desc": "Wroggi are bird wyverns that travel in packs that are led by largest and most toxic member. Be careful when one raises its head and its poison sac expands—that signals that it's about to spit a cloud of poisonous mist.",
     "theme": "Old Great"
    },
    {
     "name": "Ioprey",
     "type": "Bird Wyvern",
     "title": "-",
     "desc": "A vivid red species of small carnivores often found in subtropical zones. Sacs in their throats contain a powerful poison that slowly drains the Health of their prey.",
     "theme": "Old Great"
    },
    {
     "name": "Iodrome",
     "type": "Bird Wyvern",
     "title": "Ioprey Leader",
     "desc": "Alpha monsters that lead Ioprey packs. Larger than their brothers and with a more prominent crest, Iodrome spit a poison that slowly saps the life from their prey. They are found primarily in subtropical zones.",
     "theme": "Old Great"
    },
    {
     "name": "Velociprey",
     "type": "Bird Wyvern",
     "title": "Cunning Raiders",
     "desc": "Small Bird Wyverns inhabiting the Jungle. Velociprey are well-known for their yellow beaks, accenting bodies of black and blue stripes. They form packs, often engaging in communal behavior. These slender creatures can and will attack with sharp movements and sharper claws, so best be on your guard to avoid the pointy ends.",
     "theme": "Old Great"
    },
    {
     "name": "Velocidrome",
     "type": "Bird Wyvern",
     "title": "Alpha Raptor",
     "desc": "Alpha monsters that lead Velociprey packs. Larger than their brothers and with a more prominent crest, Velocidrome use their strong hind legs to leap at prey, pinning them with sharp claws before calling for others.",
     "theme": "Old Great"
    },
    {
     "name": "Hypnocatrice",
     "type": "Bird Wyvern",
     "title": "Sleep Bird",
     "desc": "A rust-colored bird wyvern with beautiful tail feathers found mainly in forests. A highly pacifistic wyvern by nature, it breathes sleeping gas on its enemies and prey alike. Its strong, developed legs pack a serious punch, so be careful!",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Gypceros",
     "type": "Bird Wyvern",
     "title": "Strange Poison Bird",
     "desc": "Wyverns that can generate disorienting flashes of light by striking their prominent crests. Their rubbery hides resist blunt impacts and makes Shock Traps less effective. Beware: The poisonous saliva they spit can flow down slopes.",
     "theme": "Rotten Vale"
    },
    {
     "name": "Purple Gypceros",
     "type": "Bird Wyvern",
     "title": "Strange Poison Bird",
     "desc": "A Gypceros variant distinguished by its unique purple hide. They are extremely resistant to poison, and can spit copious amounts of highly venomous saliva.",
     "theme": "Rotten Vale"
    },
    {
     "name": "Kulu-Ya-Ku",
     "type": "Bird Wyvern",
     "title": "Ovivore Outlaw",
     "desc": "A bird wyvern that has developed limbs capable of carrying objects. It has been spotted stealing eggs from the nests. If attacked while carrying an egg, it will drop the egg in fright and flee. When enraged, a Kulu-Ya-Ku will dig up a small boulder to shield itself against threats or use it in its attacks.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Malfestio",
     "type": "Bird Wyvern",
     "title": "Nocturnal Bird",
     "desc": "A bird wyvern which is most at home in the dark. It catches prey with its wings and talons. Its pivoting neck is characteristic, and it's worth a look to see it turned completely around to look behind itself. Scales in its wings can scatter a pollen that can cause confuse its foes.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Nightcloak Malfestio",
     "type": "Bird Wyvern",
     "title": "Hidden Haze Nightcloak",
     "desc": "This huge bird wyvern with its twilight-colored wings uses special scales to refract light and hide itself from its prey. This is why it's also known as \"Nightcloak\". Whoever or whatever sees it, be they monster or human, stands no chance of survival. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Pukei-Pukei",
     "type": "Bird Wyvern",
     "title": "Gluttonous Gullet",
     "desc": "A bird wyvern known to store toxins within its body. It uses its tongue like a whip and can stretch or shrink it at will, allowing it to grab up food. As a defence against threats, Pukei-Pukei have numerous toxic attacks. Keep an eye on both its mouth and tail!",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Coral Pukei-Pukei",
     "type": "Bird Wyvern",
     "title": "Water Bewitching Bird",
     "desc": "A bird wyvern that stockpiles water inside its body, fortified by the plant life it consumes. When threatened, it can expel a powerful stream from its mouth or tail.",
     "theme": "Coral Highlands"
    },
    {
     "name": "Tzitzi-Ya-Ku",
     "type": "Bird Wyvern",
     "title": "Dazzling Bird",
     "desc": "This odd monster blinds both prey and enemies with a special pulsing organ near its head. It then uses its strong legs to deliver finishing blows.",
     "theme": "Coral Highlands"
    },
    {
     "name": "Yian Kut-Ku",
     "type": "Bird Wyvern",
     "title": "Strange Bird",
     "desc": "A bird wyvern with a huge beak and large ears that splay open when it is angered. Quick on its feet, and known to be territorial. It's known for its love of Konchu, and has been observed digging them up out of the ground to swallow them whole.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Blue Yian Kut-Ku",
     "type": "Bird Wyvern",
     "title": "Blue Strange Bird",
     "desc": "A Yian Kut-Ku variant protected by a blue carapace. They share the same weakness to loud noises that ordinary Yian Kut-Ku have, but when angered, they display significantly greater physical strength.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Yian Garuga",
     "type": "Bird Wyvern",
     "title": "Black Wolf Bird",
     "desc": "A short-tempered bird wyvern marked by its hard, black scales and impressive mane. It strikes with its distinctive beak.",
     "theme": "Yian Garuga"
    },
    {
     "name": "Deadeye Yian Garuga",
     "type": "Bird Wyvern",
     "title": "One-Eyed",
     "desc": "The \"Deadeye\" is a battle-scarred veteran of countless duels to the death. Its one-eyed gaze burns with the fervor of a thousand victorious fights. A famous hunter once said: \"That's the only feller with a better HR than me!\" Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Scarred Yian Garuga",
     "type": "Bird Wyvern",
     "title": "Black Wolf Bird",
     "desc": "A tempered Yian Garuga that has survived a grueling battle with just a scar on its head. Be careful of its successive breath attacks.",
     "theme": "Yian Garuga"
    },
    {
     "name": "Gargwa",
     "type": "Bird Wyvern",
     "title": "Round Bird",
     "desc": "Flightless bird wyverns with vestigial wings, known to inhabit the Shrine Ruins. Quite timid, Gargwa have been known to lay eggs when other creatures surprise them from behind. They are raised as livestock in numerous villages.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Qurupeco",
     "type": "Bird Wyvern",
     "title": "Colorful Bird",
     "desc": "Bird Wyverns with unique plumage. Well known for using their thoracic vocal organs to imitate others monsters calls, first summoning them, then using the distraction to flee. The creature spits a dangerous body fluid that can lower one's Resistance.\\",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Crimson Qurupeco",
     "type": "Bird Wyvern",
     "title": "Crimson Colorful Bird",
     "desc": "A subspecies of Qurupeco with vivid crimson plumage and the same aptitude for mimicry and dance. Flints in their wings allow them to generate electricity, which can be discharged as either shocking jolts or intense flashes of light.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Anjanath",
     "type": "Brute Wyvern",
     "title": "Relentless Ruffian",
     "desc": "This belligerent monster will attack anything without hesitation. The membrane along its tail fans out when it is provoked-a behavior theorized to be either an act of intimidation or thermoregulation, as it has been known to do so when it breathes fire.",
     "theme": "Desert"
    },
    {
     "name": "Fulgur Anjanath",
     "type": "Brute Wyvern",
     "title": "Thunder Jaw Wyvern",
     "desc": "Feared as the “Thunderjaw Wyvern”, this Anjanath subspecies electrifies its jaws and dorsal membrane with every blow.",
     "theme": "Frozen"
    },
    {
     "name": "Banbaro",
     "type": "Brute Wyvern",
     "title": "Ferocious Bull Wyvern",
     "desc": "A monster marked by its furious charge and by the majestic twin horns that uproot trees and gouge at the earth as it runs.",
     "theme": "Frozen"
    },
    {
     "name": "Barroth",
     "type": "Brute Wyvern",
     "title": "Wasteland Warrior",
     "desc": "Barroth usually remain beneath the mud, perhaps to shield themselves from heat; they are even known to attack by flinging mud. They will charge in a frenzy at anything that disturbs their bogs.",
     "theme": "Desert"
    },
    {
     "name": "Jade Barroth",
     "type": "Brute Wyvern",
     "title": "Ice Crushing Wyvern",
     "desc": "A subspecies of Barroth found in colder climates. Lacking mud, they coat themselves with snow and ice, which can be flung at perceived threats. They are known for bashing their overgrown crowns into the ice, and subsist primarily on Bnahabra.",
     "theme": "Frozen"
    },
    {
     "name": "Brachydios",
     "type": "Brute Wyvern",
     "title": "Crushing Wyvern",
     "desc": "This marine-blue brute wyvern uses its saliva to prime the sticky slime coating its massive arms, rendering it highly explosive.",
     "theme": "Brachydios"
    },
    {
     "name": "Raging Brachydios",
     "type": "Brute Wyvern",
     "title": "Crushing Wyvern",
     "desc": "A Brachydios variant that is much larger than the normal species. The slime on its body will activate over time and detonate.",
     "theme": "Raging Brachydios"
    },
    {
     "name": "Deviljho",
     "type": "Brute Wyvern",
     "title": "Terrifying Violent Wyvern",
     "desc": "Due to its enhanced metabolism, Deviljho must constantly seek out prey. It is extremely violent, and known to snatch up large monsters in its powerful maw and flail them around.",
     "theme": "Deviljho"
    },
    {
     "name": "Savage Deviljho",
     "type": "Brute Wyvern",
     "title": "Terrifying Violent Wyvern",
     "desc": "A mutated Deviljho variant, driven mad by its overpowering hunger. It will attempt to feed on all it sees.",
     "theme": "Deviljho"
    },
    {
     "name": "Duramboros",
     "type": "Brute Wyvern",
     "title": "Tail Hammer Wyvern",
     "desc": "Giant brute wyverns with hammer-like growths on their tails. They subsist on fallen or withered trees, often using their tails to knock said trees over. Researchers speculate that the lumps on their backs act as some sort of energy source.",
     "theme": "Duramboros"
    },
    {
     "name": "Rust Duramboros",
     "type": "Brute Wyvern",
     "title": "Axe Tail Wyvern",
     "desc": "A reddish-brown subspecies of Duramboros with an axe-shaped tail. The tail is especially well-suited to desert life, as it scatters sand each time it is swung. Despite the desert heat, these creatures can remain active for long periods of time.",
     "theme": "Duramboros"
    },
    {
     "name": "Glavenus",
     "type": "Brute Wyvern",
     "title": "Cutting Wyvern",
     "desc": "A brute wyvern that wields its heavy blue tail like a blade. It grows hotter and more keen with each strike until it glows red.",
     "theme": "Glavenus"
    },
    {
     "name": "Acidic Glavenus",
     "type": "Brute Wyvern",
     "title": "Sulfuric Cutting Wyvern",
     "desc": "A rare species of Lagiacrus known only from an ancient scroll: From the abyss' darkest cave Comes the master of the wave Consumer of the world entire Devil of the sea most dire Fear it as you fear the grave.",
     "theme": "Glavenus"
    },
    {
     "name": "Hellblade Glavenus",
     "type": "Brute Wyvern",
     "title": "Black Knight of Ferocious Flames",
     "desc": "A Glavenus whose intense heat is akin to an active volcano. It can blast apart stone with a single breath, and incinerate mountains with a single swipe of its red-hot tail. The \"Hellblade\" requires a special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Radobaan",
     "type": "Brute Wyvern",
     "title": "Bone Hammer Wyvern",
     "desc": "A gigantic brute wyvern that eats the bones of carcasses found in the Rotten Vale, using some of it as armor. It also rolls into a ball as a form of attack and transportation.",
     "theme": "Rotten Vale"
    },
    {
     "name": "Uragaan",
     "type": "Brute Wyvern",
     "title": "Burst Hammer Wyvern",
     "desc": "Large brute wyvern that feed on ore, using their mighty jaws to crush solid rock to powder. They've been known to confront Lavasioths over territory disputes.",
     "theme": "Volcano"
    },
    {
     "name": "Steel Uragaan",
     "type": "Brute Wyvern",
     "title": "Steel Hammer Wyvern",
     "desc": "A metallic subspecies of Uragaan with an unusual diet that allows it to create a powerful, noxious gas. The gas permeates the rocks on its body, which then emit foul fumes when scattered. Like regular Uragaan, they can travel quickly by rolling.",
     "theme": "Volcano"
    },
    {
     "name": "Crystalbeard Uragaan",
     "type": "Brute Wyvern",
     "title": "Treasure Clad",
     "desc": "A living treasure trove of precious jewels, famous in the lore of miners and said to bring good fortune should you manage to even lay your eyes upon it. Some have tried to slay the \"Crystalbeard\" for its treasure, only to be crushed by its glittering fury. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Hermitaur",
     "type": "Carapaceons",
     "title": "-",
     "desc": "The juvenile form of Diamyo Hermitaur, these small Carapaceons live around coastal areas and sandy soil. They often hide in sand, popping out of their hidey-holes only to claw at nearby intruders. The sizable shells they carry protect their vitals; as they grow in size, they'll move to larger dwellings to accommodate, such as monster skulls. The Carapaceon Brains they yield are quite the delicacy.",
     "theme": "Crab"
    },
    {
     "name": "Daimyo Hermitaur",
     "type": "Carapaceons",
     "title": "Shelled Sovereign",
     "desc": "Large Carapaceons that live in coastal regions and sandy soil. Daimyo Hermitaurs use their massive claws to guard themselves against enemy attacks. These creatures wear wyvern skulls on their backs, unlike the shells carried in their infancy. These shells serve not only as protection, but also as a method for attacking prey. They are highly valued for their materials—their brains in particular.",
     "theme": "Crab"
    },
    {
     "name": "Plum Daimyo Hermitaur",
     "type": "Carapaceons",
     "title": "Shield Crab",
     "desc": "A large Carapaceon characterized by its distinct coloring and the massive monster skull it carries on its back. Unlike more common varieties, it leaps high into the air and onto foes, making it especially deadly.",
     "theme": "Crab"
    },
    {
     "name": "Stonefist Hermitaur",
     "type": "Carapaceons",
     "title": "Spearbreaker",
     "desc": "The \"Stonefist\" is a Hermitaur with an enlarged left pincer which doubles as a sturdy black shield. Its armor causes blades to shatter, and for shots to bounce off, filling the Hunter with holes instead. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Ceanataur",
     "type": "Carapaceons",
     "title": "-",
     "desc": "The juvenile form of Shogun Ceanataur, these small Carapaceons live around volcanoes and in the Flooded Forest. Like Hermitaurs, Ceanataurs usually hide underground, surfacing to attack intruders with a discharge of toxic fluids. Their quick little legs make these critters a real pain in a hunter's soil. Carapaceon Brains from Ceanataurs are also in high demand.",
     "theme": "Crab"
    },
    {
     "name": "Shogun Ceanataur",
     "type": "Carapaceons",
     "title": "Final Flash",
     "desc": "These large Carapaceons can be found around volcanoes and in the Flooded Forest. Shogun Ceanataur wield long, developed claws that are usually folded away, but unfurl into terrifying blades when enraged. Shogun Ceanataur, like the Daimyo Hermitaur, are also known to use wyvern skulls as shells. Specimens that do, have been observed using a water jet-like attack.",
     "theme": "Crab"
    },
    {
     "name": "Terra Shogun Ceanataur",
     "type": "Carapaceons",
     "title": "Sickle Crab",
     "desc": "A large Carapaceon with a giant monster's skull on its back. Its long, sharp pincers allow it to pierce volcanic bedrock and travel along ceilings. Sometimes, a precious and valuable pearl can be found inside its shell.",
     "theme": "Crab"
    },
    {
     "name": "Rustrazor Ceanataur",
     "type": "Carapaceons",
     "title": "Armor Shredder",
     "desc": "The Rustrazor Ceanataur uses its huge pincers and the shell on its back to attack any assailants. From its Gravios shell it shoots jets of water that drill into the ground, and its Glavenus-shaped pincers can shear through steel. This two-sided nature makes it a force to be reckoned with, and earned it the name \"Rustrazor\". Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Shen Gaoren",
     "type": "Carapaceons",
     "title": "Fortress Crab",
     "desc": "A giant Carapaceon with an equally giant monster's skull on its back. Prone to roaming and fiercely territorial, any intruders will be met with opposition, so nearby forts or towns must be warned of its presence.",
     "theme": "Lao-Shan Lung"
    },
    {
     "name": "Amatsu",
     "type": "Elder Dragon",
     "title": "Storm Dragon",
     "desc": "A legendary elder dragon spotted on Sacred Pinnacle. An avatar of storms in the folklore of Yukumo Village, Amatsu's appearance is accompanied by furious cyclones and horrific storms. Its fearsome power is said to outscale that of natural disasters.",
     "theme": "Amatsu"
    },
    {
     "name": "Jhen Mohran",
     "type": "Elder Dragon",
     "title": "Peak Mountain Dragon",
     "desc": "Rare ore can be mined from these enormous dragons' backs; thus they are considered prosperity symbols. They swallow vast amounts of organic material and are always surrounded by scavenging Delex, which sailors use to locate them.",
     "theme": "Jhen Mohran"
    },
    {
     "name": "Hallowed Jhen Mohran",
     "type": "Elder Dragon",
     "title": "Soul Mountain Dragon",
     "desc": "A subspecies of Jhen Mohran whose appearance has been likened to a crystal shimmering in the darkness. It inspires such awe and wonder that news of a sighting draws a stampede of hunters from across the land.",
     "theme": "Jhen Mohran"
    },
    {
     "name": "Dah'ren Mohran",
     "type": "Elder Dragon",
     "title": "Huge Mountain Dragon",
     "desc": "Colossal elder dragons that swim through the Great Desert, smashing obstacles with their spiral horns. Their unique color comes from the thick layer of oxidized metals and other rare minerals that lodge in their hides over their long lives.",
     "theme": "Jhen Mohran"
    },
    {
     "name": "Vaal Hazak",
     "type": "Elder Dragon",
     "title": "Corpse Coat Dragon",
     "desc": "A grotesque Elder Dragon, that inhabits the deepest part of the Rotten Vale. It uses the fatal vapor of the vale in what appears to be a symbiotic relationship.",
     "theme": "Vaal Hazak"
    },
    {
     "name": "Blackveil Vaal Hazak",
     "type": "Elder Dragon",
     "title": "Corpse Coat Dragon",
     "desc": "A Vaal Hazak variant encrusted with spores that spew a torrent of toxic effluvium at any who draw close.",
     "theme": "Vaal Hazak"
    },
    {
     "name": "Ceadeus",
     "type": "Elder Dragon",
     "title": "Ocean Dragon",
     "desc": "A legendary elder dragon spotted on Sacred Pinnacle. An avatar of storms in the folklore of Yukumo Village, Amatsu's appearance is accompanied by furious cyclones and horrific storms. Its fearsome power is said to outscale that of natural disasters.",
     "theme": "Ceadeus"
    },
    {
     "name": "Goldbeard Ceadeus",
     "type": "Elder Dragon",
     "title": "Emperor Ocean Dragon",
     "desc": "A rarely-seen subspecies of Ceadeus confirmed to exist deep within ocean ruins. The golden light they cast in the dark depths befits a creature of such legendary status. Sadly, little is known about their relationship to the standard Ceadeus.",
     "theme": "Ceadeus"
    },
    {
     "name": "Lao-Shan Lung",
     "type": "Elder Dragon",
     "title": "Old Mountain Dragon",
     "desc": "A giant dragon that has only been rarely sighted. It periodically prowls close to inhabited areas, and the damage it causes is comparable to that wreaked by a natural disaster. Its habits are a mystery, and no one knows why it occasionally wanders. The Guild has built defensive barricades where they appear, but to what effect.",
     "theme": "Lao-Shan Lung"
    },
    {
     "name": "Ashen Lao-Shan Lung",
     "type": "Elder Dragon",
     "title": "Rock Mountain Dragon",
     "desc": "A giant dragon few have seen and lived to tell the tale. When on the rampage it wreaks havoc on all in its path. The guild has built a fortress to repel the beast, but will it hold?",
     "theme": "Lao-Shan Lung"
    },
    {
     "name": "Valstrax",
     "type": "Elder Dragon",
     "title": "Sky Comet Dragon",
     "desc": "An elder dragon that soars at very high altitudes far from human habitation. Its flaming red wings are often the only visible sign of it, giving rise to its nickname, the Argent Comet. Those wings aren't just for flying, though, and are easily used to stab, rend and blow away its enemies. Occasionally, one can find the scorched shells it has left behind.",
     "theme": "Valstrax"
    },
    {
     "name": "Crimson Glow Valstrax",
     "type": "Elder Dragon",
     "title": "Star of Despair",
     "desc": "A mutant Valstrax fearsomely dubbed the \"Crimson Glow\". This elder dragon typically secludes itself in the upper atmosphere, but it has been driven mad by its own rampant energy, causing to lash out at anything in its sight. Once it sights its prey, it swoops down, trampling them beneath its shifting wingblades. Several have been sighted all over, so be prepared to encounter one at any time.",
     "theme": "Crimson Glow Valstrax"
    },
    {
     "name": "Dalamadur",
     "type": "Elder Dragon",
     "title": "Serpent King Dragon",
     "desc": "A huge elder dragon, massive beyond human comprehension. The only mention of its existence is found in fairy tales, which claim it can warp the very surface of the world and level mountains with a single twitch.",
     "theme": "Dalamadur"
    },
    {
     "name": "Shah Dalamadur",
     "type": "Elder Dragon",
     "title": "Serpent Emperor Dragon",
     "desc": "A Dalamadur subspecies easily identified by the red spines lining its back. Though they were once thought to exist only in legend, multiple sightings in the past few years have led many to fear Shah Dalamadur as an omen of grave things to come.",
     "theme": "Dalamadur"
    },
    {
     "name": "Gogmazios",
     "type": "Elder Dragon",
     "title": "Giant Halberd Dragon",
     "desc": "Coated in a thick, sticky fluid, this massive elder dragon appears unhindered by the Dragonator lodged in its back. Eyewitness reports suggest that, despite its massive size, this mysterious behemoth is indeed capable of flight.",
     "theme": "Gogmazios"
    },
    {
     "name": "Kirin",
     "type": "Elder Dragon",
     "title": "Phantom Beast",
     "desc": "Kirin are so rarely sighted that little is known of their ecology. It's been said that they envelop themselves in pure electricity when they are provoked.",
     "theme": "Kirin"
    },
    {
     "name": "Oroshi Kirin",
     "type": "Elder Dragon",
     "title": "-",
     "desc": "Reliable sightings of these elusive creatures are virtually nonexistent. The few reports available claim that temperatures plummet whenever they appear, as all moisture in the air spontaneously freezes.",
     "theme": "Kirin"
    },
    {
     "name": "Kulve Taroth",
     "type": "Elder Dragon",
     "title": "Mother Goddess of Gold",
     "desc": "An elder dragon that protects itself with a glittering coat of metal. Its ecology and coat differ with each appearance, thus the need for a thorough investigation.",
     "theme": "Kulve Taroth"
    },
    {
     "name": "Malzeno",
     "type": "Elder Dragon",
     "title": "Embodiment of Darkness",
     "desc": "A dragon covered with elegant silver scales. It uses the Qurio to drain the life energy of other living creatures, creeping around at night and attacking its prey from behind. It appears almost regal to start with, but after draining enough energy it can turn a violent, fresh-blood crimson. This form is known as the \"Bloodening\" and is widely feared.",
     "theme": "Malzeno"
    },
    {
     "name": "Nakarkos",
     "type": "Elder Dragon",
     "title": "Corpse Dragon",
     "desc": "Frighteningly little is known about this elder dragon whose appetite can devastate surrounding ecosystems. After covering its prey in a repulsive mucus, it has been seen dragging them back to feast in its macabre nest of bones and undulating darkness known as Wyvern's End.",
     "theme": "Nakarkos"
    },
    {
     "name": "Namielle",
     "type": "Elder Dragon",
     "title": "Abyssal Dragon",
     "desc": "An elder dragon coated in water and able to freely control lightning. A unique organ allows it to pump electricity into the pools of water it creates, causing massive bursts of steam.",
     "theme": "Namielle"
    },
    {
     "name": "Nergigante",
     "type": "Elder Dragon",
     "title": "Extinction Dragon",
     "desc": "A terrible elder dragon that appears when other elders are in the vicinity. Its penchant for destruction is well documented.",
     "theme": "Nergigante"
    },
    {
     "name": "Ruiner Nergigante",
     "type": "Elder Dragon",
     "title": "Extinction Dragon",
     "desc": "Countless battles have only hardened this Nergigante variant. In addition to healing, its spikes grow tougher as it loses health.",
     "theme": "Nergigante"
    },
    {
     "name": "Gore Magala",
     "type": "???",
     "title": "Wandering Malformation",
     "desc": "Gore Magala that have fallen into chaos, having been denied their evolution into Shagaru Magala. They maintain their original power, while possessing the potential of Shagaru Magala, making them incredibly unstable. Sometimes this leads them to fall into a state of anguish and violence. When attacking their prey, they repeatedly fold and unfurl their wings, as if to show their internal struggle with their own form.",
     "theme": "Gore Magala"
    },
    {
     "name": "Shagaru Magala",
     "type": "Elder Dragon",
     "title": "Bright Eclipse",
     "desc": "The form taken by Gore Magala once they mature and molt. Gorgeous, glittering scales cover Shagaru Magala, and their divine wings are large enough to wrap around their entire body. According to records, one was once said to have scattered its black scales over an area the size of a mountain, annihilating any and all lifeforms inhabiting that region.",
     "theme": "Shagaru Magala"
    },
    {
     "name": "Chaotic Gore Magala",
     "type": "???",
     "title": "Dark Eclipse Wyvern",
     "desc": "Gore Magala possess wings with black, shroud-like membrane. They lack visual receptors, heightening their senses by scattering scales from their wings to ascertain the locations of lifeforms. At the peak of their senses, feelers extend from their head, their wings unfurl, and they become frenzied. They're feared not only for their sinister appearance but also for the mysterious Frenzy virus they carry.",
     "theme": "Chaotic Gore Magala"
    },
    {
     "name": "Velkhana",
     "type": "Elder Dragon",
     "title": "Iceborne Wyvern",
     "desc": "An elder dragon said to freeze all in its path. According to legend, it can control the cold, and use its freezing breath to conjure massive spires of ice out of nowhere.",
     "theme": "Velkhana"
    },
    {
     "name": "Yama Tsukami",
     "type": "Elder Dragon",
     "title": "Floating Mountain Dragon",
     "desc": "An Elder Dragon that floats through the sky. A bite of earth, a drink of forest, it’s a veritable god of the sky made of the richest soil. Ancient trees grow thick on its back like on a mountain. It’s rumored to live near a forlorn, remote tower.",
     "theme": "Yama Tsukami"
    },
    {
     "name": "Zorah Magdaros",
     "type": "Elder Dragon",
     "title": "Scorching Mountain Dragon",
     "desc": "An elder dragon that rises from the earth like a volcano. Where it's headed, and why, the Research Commission has yet to figure out.",
     "theme": "Zorah Magdaros"
    },
    {
     "name": "Chameleos",
     "type": "Elder Dragon",
     "title": "Phantom of the Deep",
     "desc": "Precious few sightings of this elder dragon have been recorded, leading to claims it can vanish into its environment like a chameleon-hence its name. Witnesses report that, when enraged, it can spew a fog-like breath, which seems to come out of nowhere, and enhance its strength by licking the pollen from Petalaces.",
     "theme": "Chameleos"
    },
    {
     "name": "Risen Chameleos",
     "type": "Elder Dragon",
     "title": "-",
     "desc": "Risen Chameleos are elder dragons that have found a way to overcome their affliction. By suppressing the Qurio virus, they have gained great strength and new abilities. They now boast superior poison and physicality, sending you off into a toxic nightmare if you lose sight of them. When their anger reaches its peak, they'll enter into their Risen state and their body will begin to glow.",
     "theme": "Apex"
    },
    {
     "name": "Kushala Daora",
     "type": "Elder Dragon",
     "title": "Shadow Upon the Tempest",
     "desc": "It's difficult to even get close to one of these metallic elder dragons, but some claim better odds if the creature is weakened with poison, or has its horn broken, limiting the amount of wind pressure it can muster.",
     "theme": "Kushala Daora"
    },
    {
     "name": "Rusted Kushala Daora",
     "type": "Elder Dragon",
     "title": "Steel Dragon",
     "desc": "A metal plated dragon known as the tempest of wind. Eyewitnesses report violent storms alongside the dragon, and its wide range means towns may be attacked.",
     "theme": "Kushala Daora"
    },
    {
     "name": "Risen Kushala Daora",
     "type": "Elder Dragon",
     "title": "-",
     "desc": "Risen Kushala Daora are elder dragons that have found a way to overcome their affliction. By suppressing the Qurio virus, they have gained great strength and new abilities. They command destructive storms easily cornering their prey with a more varied arsenal of attacks than their regular counterparts. When their anger reaches its peak, they'll enter into their Risen state and their body will begin to glow.",
     "theme": "Apex"
    },
    {
     "name": "Teostra",
     "type": "Elder Dragon",
     "title": "Emperor of Flame",
     "desc": "Brutal elder dragons wreathed in flames that spew blazing fire. Teostra are of such a fierce and deadly nature that the Guild closely monitors their movements.",
     "theme": "Teostra"
    },
    {
     "name": "Risen Teostra",
     "type": "Elder Dragon",
     "title": "-",
     "desc": "Risen Teostra are elder dragons that have found a way to overcome their affliction. By suppressing the Qurio virus, they have gained great strength and new abilities. While clad in flame, Risen Teostra unleash more dust creating a non-stop barrage of explosions until everything in the vicinity has been turned to ashes. When their anger reaches its peak, they'll enter into their Risen state and their body will begin to glow.",
     "theme": "Apex"
    },
    {
     "name": "Lunastra",
     "type": "Elder Dragon",
     "title": "Empress of Flame",
     "desc": "A rare female Elder Dragon that litters the air with hot blue dust. Reports of it traveling with her mate, Teostra, are unconfirmed.",
     "theme": "Lunastra"
    },
    {
     "name": "Gaismagorm",
     "type": "Elder Dragon",
     "title": "Archdemon of the Abyss",
     "desc": "A gargantuan monster living in the darkest depths since ancient times. Gaismagorm's rock-like forearms boast tenacious strength which allows it to burrow underground. It has a symbiotic relationship with the Qurio, and feeds on their life force for energy. Once it has chosen a place to nest, it collapses the surrounding rock bed to create an opening to the surface. The opening forms a massive crater in which it releases the Qurio through.",
     "theme": "Gaismagorm"
    },
    {
     "name": "Wind Serpent Ibushi",
     "type": "Elder Dragon",
     "title": "Serpent God of Wind",
     "desc": "A male elder dragon that exhibits inexplicable behaviors such as floating upside down midair. Research indicates that the emission of a special gas from all over its body, and the modulation of this gas, is what allows it to move freely. It shows air from gills on its arms and tail to fly, creating its own turbulence and soaring to great heights.",
     "theme": "Wind Serpent Ibushi"
    },
    {
     "name": "Thunder Serpent Narwa",
     "type": "Elder Dragon",
     "title": "Serpent Goddess of Thunder",
     "desc": "An elder dragon and Wind Serpent Ibushi's \"queen.\" Its thundersacs glow with accumulated electrical charge; it is thought that these organs therefore generate the powerful magnetic field that lifts the creature and anything around it high into the air.",
     "theme": "Thunder Serpent Narwa"
    },
    {
     "name": "Narwa the Allmother",
     "type": "Elder Dragon",
     "title": "Serpent Goddess of Thunder",
     "desc": "Having absorbed the lifeforce of her \"king\", Narwa has transformed and become imbued with new power. She now possesses Ibushi's mastery over wind as well as her own control over thunder, and lusts for utter annihilation.",
     "theme": "Narwa the Allmother"
    },
    {
     "name": "Shara Ishvalda",
     "type": "Elder Dragon",
     "title": "Earth Siging Dragon",
     "desc": "A mysterious elder dragon able to manipulate the earth itself. Vibrations from its wingtips reshape the earth, denying hunters footing.",
     "theme": "Shara Ishvalda"
    },
    {
     "name": "Xeno'Jiiva",
     "type": "Elder Dragon",
     "title": "Dark Light Dragon",
     "desc": "A new species discovered in the depths of the Elder's Recess. Its relationship to the other elder dragons is unclear, as is its ecology.",
     "theme": "Xeno'Jiiva"
    },
    {
     "name": "Safi'jiiva",
     "type": "Elder Dragon",
     "title": "Red Dragon",
     "desc": "The fully-grown form of Xeno'jiiva. It absorbs energy from its environment to heal itself and change the ecosystem.",
     "theme": "Safi'jiiva"
    },
    {
     "name": "Fatalis",
     "type": "Elder Dragon",
     "title": "Dark Demise",
     "desc": "A legendary black dragon known only as Fatalis. Rumored to have destroyed a kingdom in a single night, and has taken its castle for a roost.",
     "theme": "Fatalis"
    },
    {
     "name": "Crimson Fatalis",
     "type": "Elder Dragon",
     "title": "Crimson Dragon",
     "desc": "Crimson Fatalis is a Fatalis whose shells and scales have become a reddish-crimson color after generations of exposure to the Volcano. One of its four horns is extremely overgrown in comparison to the rest.",
     "theme": "Crimson Fatalis"
    },
    {
     "name": "White Fatalis",
     "type": "Elder Dragon",
     "title": "Ancestral Dragon",
     "desc": "White Fatalis covered in luminous white scales, and a line of fur runs down its back and tail. Its horns are antler-like in nature, and the structure of its head is significantly less reptilian than that of its counterparts. Like Kirin, the coat of a White Fatalis produces a bright white aura. When enraged, the throat and chest of the White Fatalis glow a menacing red and becomes surrounded with red lightning sparks.",
     "theme": "White Fatalis"
    },
    {
     "name": "Dire Miralis",
     "type": "Elder Dragon",
     "title": "Smelting Black Dragon",
     "desc": "Some legends consider this great dragon to be the devil fated to destroy the world, while others claim it is the giant who birthed creation. Is there any way for mere humans to quell its unending rage?",
     "theme": "Dire Miralis"
    },
    {
     "name": "Alatreon",
     "type": "Elder Dragon",
     "title": "Blazing Black Dragon",
     "desc": "Known as a symbol of destruction, people fear even uttering its name. It's rumored to control all of the elements, but most, if not all, records of its existence have been burned.",
     "theme": "Alatreon"
    },
    {
     "name": "Bombadgy",
     "type": "Fanged Beast",
     "title": "Tanuki Beast",
     "desc": "An omnivorous small monster with a distinct round shape. Its whole body courses with flammable gas, which it expels in defense when threatened. Once expelled, this gas has explosive properties. This trait has led to Bombadgy being used in combat by many crafty hunters throughout history.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Palamute",
     "type": "Fanged Beast",
     "title": "Man's Best Friend",
     "desc": "Palamute are dog-like Fanged Beasts. Individual appearance of these monsters differs greatly, with a wide range of colors, ear and tail shapes, and different markings being observed.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Kecha Wacha",
     "type": "Fanged Beast",
     "title": "Strange Monkey Fox",
     "desc": "Fanged beasts with limbs adapted for swinging through forests and membranes on their forelegs for gliding. When provoked, they shield their faces with giant ears, blocking out any loud noises or bright light.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Ash Kecha Wacha",
     "type": "Fanged Beast",
     "title": "White Monkey Fox",
     "desc": "As with standard Kecha Wacha, these arboreal fanged beasts shield their face with their tough ears when provoked. What makes them different, however, is their ability to spit fireballs, and, of course, their trademark pale fur.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Arzuros",
     "type": "Fanged Beast",
     "title": "Bloodlust Incarnate",
     "desc": "Beasts known to dwell in humid forest and mountain regions. Though known more for fishing and standing upright to collect honey, their thick claws and heavy forearm plating allow them to deliver powerful blows to any aggressor.",
     "theme": "Bear"
    },
    {
     "name": "Redhelm Arzuros",
     "type": "Fanged Beast",
     "title": "Crimson Helmet",
     "desc": "A ruffian known for its wild, red mane of hair. Unrivaled in its cruelty, sightings of a Redhelm near human settlements is a serious call for alarm, though very few can handle hunting it. As it's far more likely for a would-be hunter to end up as its lunch, it requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Lagombi",
     "type": "Fanged Beast",
     "title": "Silver Slider",
     "desc": "Fanged, long-eared beasts whose warm pelts and thick layers of fat help them survive in cold climates. Though mainly herbivores, Lagombi occasionally make use of their exceptional hearing and ability to glide on ice to sneak up on prey.",
     "theme": "Bear"
    },
    {
     "name": "Snowbaron Lagombi",
     "type": "Fanged Beast",
     "title": "Heavy Snow Lord",
     "desc": "The outlaw of the frozen wasteland, the \"Snowbaron\" can be found jauntily sliding around any territory that it has claimed as its own. Its playful antics, however, can mean one more village buried under an avalanche. A dangerous foe that requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Volvidon",
     "type": "Fanged Beast",
     "title": "Crimson Cannonball",
     "desc": "Fanged beasts with thick red carapaces that are resistant to lava. Their rounded bodies are perfect for rolling across hot surfaces, and their long tongues are ideal for capturing insect prey. Their saliva emits a paralyzing toxin that should be avoided.",
     "theme": "Bear"
    },
    {
     "name": "Conga",
     "type": "Fanged Beast",
     "title": "-",
     "desc": "Ape-like fanged beasts with pink fur. Conga prefer to live in smalls groups as oppposed to large packs and primarily inhabit warm, humid environments.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Congalala",
     "type": "Fanged Beast",
     "title": "Pink Fur Beast",
     "desc": "A large fanged beast with pink fur, often found in warm, damp regions. Fond of mushrooms, Congalalas possess either poisonous or flaming breath, depending on the food available in their local habitat.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Emerald Congalala",
     "type": "Fanged Beast",
     "title": "Green Fur Beast",
     "desc": "A Congalala variant with green fur and a more prominent crest. Even more ravenous than ordinary Congalalas, they can store a greater amount of gas in their body, which means that they can produce a wider-reaching flatulence when threatened or provoked.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Gammoth",
     "type": "Fanged Beast",
     "title": "Giant Beast",
     "desc": "Found in the most frigid regions of the world, Gammoths are behemoths with massive tusks. Though they are herbivores, when provoked they will leverage their enormous weight and trunks to crush a threat. They can also shatter the snow covering their legs to damage nearby foes.",
     "theme": "Gammoth"
    },
    {
     "name": "Elderfrost Gammoth",
     "type": "Fanged Beast",
     "title": "Silver Ridge",
     "desc": "A Gammoth so gargantuan, ancient and strong that it may be mistaken for the foot of a mountain. Its great age and mountain home have given it the nickname \"Elderfrost\". Very few people have ever seen it fight, but it sometimes causes wild blizzards that race down the mountain and ravage the plains. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Bishaten",
     "type": "Fanged Beast",
     "title": "Frenetic Ascetic",
     "desc": "A monster with a distinctive tail. While it is omnivorous, it has a preference for fruit, and keeps various fruits with all kinds of effects in its belly pouch. An incredibly curious beast, it enjoys playing tricks on people, and has been seen to bat fruit at its prey using its tail.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Blood Orange Bishaten",
     "type": "Fanged Beast",
     "title": "Dismal Jester",
     "desc": "A subspecies named for their auburn fur. Inquisitive by nature, Blood Orange Bishaten can even appear near human habitats. Their belly pouch is stuffed with combustible pinecones, and this subspecies has a distinct and focused fire breath. The breath itself isn't as dangerous as the pinecones it ignites. Reports indicate that it's possible to topple these monsters while they balance on their tails.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Blango",
     "type": "Fanged Beast",
     "title": "-",
     "desc": "A Pelagus covered in entirely in white fur. Known to move in packs and led by a Blangonga. The Blangonga exerts tight control over the group, and any call to gather will be met immediately by the rank and file Blangos.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Blangonga",
     "type": "Fanged Beast",
     "title": "Snow Lion",
     "desc": "Leader of a Blango pack, it is twice as large and recognized by its giant fangs and whiskers. It sends its pack to attack any trespassers. Its jumping power allows it great mobility in its home range of the Arctic Ridge.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Copper Blangonga",
     "type": "Fanged Beast",
     "title": "Sand Lion",
     "desc": "Due to the loss of its troop of Blango, it has grown larger and stronger. It has a brown coat of fur instead of the normal white coat. The Copper Blangonga's face is much less compact and houses a larger set of canines.",
     "theme": "Desert"
    },
    {
     "name": "Bullfango",
     "type": "Fanged Beast",
     "title": "-",
     "desc": "Large, wild boars with a foul temper. Fertile and wide-ranging, they have been known to form large herds. They are so aggressive that they will attack other members of their own herd if they don't recognize them. Those without a particular reason to hunt them are better off keeping their distance.",
     "theme": "Old Great"
    },
    {
     "name": "Bulldrome",
     "type": "Fanged Beast",
     "title": "Great Boar",
     "desc": "Bulldrome are the imposing leaders of Bullfango packs, notable for their impressive tusks and large bodies. More aggressive than a Bullfango, it is known to ram into its foes, and is extremely proficient at tracking them.",
     "theme": "Old Great"
    },
    {
     "name": "Garangolm",
     "type": "Fanged Beast",
     "title": "Hulking Beast of Nature",
     "desc": "A monster characterized by its massive and rigid body. Garangolm are generally placid, living in regions with fertile soil. Their sap-like fluids can promote plant growth, forging a symbiotic relationship with flora that grows in their bodies. They can also use that sap to harden plants or the surrounding soil, outfitting their bodies and enhancing their attacks.",
     "theme": "Citadel"
    },
    {
     "name": "Goss Harag",
     "type": "Fanged Beast",
     "title": "Limb Reaper",
     "desc": "A monster native to ice-cold climates. Covered in fur so thick it keeps out the harsh frost, it roams the snowy plains in search of prey. It can inhale the cold air to freeze its own bodily fluids and then spit them out to create icy blades on its arms. When riled up, the Goss Harag turns red and becomes exceedingly dangerous.",
     "theme": "Bear"
    },
    {
     "name": "Rajang",
     "type": "Fanged Beast",
     "title": "Golden Mane",
     "desc": "An ultra-aggressive creature that is rarely sighted and seldom survived. Those that have survived report that it exhibits a strange attack. Rajang are said to be loners, and this isolated life has made it difficult to pin down its territorial leanings. When angered, part of its pelt turns a golden color.",
     "theme": "Rajang"
    },
    {
     "name": "Furious Rajang",
     "type": "Fanged Beast",
     "title": "Super Simian",
     "desc": "Furious Rajang are Rajang variants that are covered in golden fur. Normally Rajang return to their black-furred state after being agitated for a time to conserve energy, but these beasts have lost their ability to curb their anger. Outclassing the standard Rajang's attack power, they assault with seething rage. At the apex of their fury they become enraged and turn into destructive demons with electrified manes.",
     "theme": "Rajang"
    },
    {
     "name": "Wulg",
     "type": "Fanged Wyvern",
     "title": "Ice Jackal Wolf",
     "desc": "Miniature fanged wyverns of the Hinterlands. They doggedly stalk prey in a pack, and will attack even foes much larger than they.",
     "theme": "Frozen"
    },
    {
     "name": "Shamos",
     "type": "Fanged Wyvern",
     "title": "-",
     "desc": "Shamos has a wolf-like body shape with huge orange eyes. Though its body shape is akin to a wolf, Shamos' appearance is very similar to fish. Its face is covered in red scales while the rest of its body is covered in grayish-white splotches. Its limbs are navy blue in color. Shamos also has a small fin on its back like a fish.",
     "theme": "Great"
    },
    {
     "name": "Dodogama",
     "type": "Fanged Wyvern",
     "title": "Rock Thief Wyvern",
     "desc": "A monster that devours rock as its primary diet. The Crystals it devours mix with its saliva to produce explosive minerals that it can spit at its enemies.",
     "theme": "Volcano"
    },
    {
     "name": "Girros",
     "type": "Fanged Wyvern",
     "title": "-",
     "desc": "Monsters that are known to attack in packs, using the deadly vapor of the Rotten Vale to their advantage. They're known for crippling targets with their paralyzing fangs.",
     "theme": "Great"
    },
    {
     "name": "Great Girros",
     "type": "Fanged Wyvern",
     "title": "Paralyzing Thief Wyvern",
     "desc": "A monster that scavenges for meals dropped from the Coral Highlands. It acts as the alpha leader of a Girros pack, and sports giant fangs that paralyze its prey.",
     "theme": "Great"
    },
    {
     "name": "Jagras",
     "type": "Fanged Wyvern",
     "title": "-",
     "desc": "A smaller monster that travels and hunts in packs. Its hide blends in with its forest environment, and it has characteristic spikes on its back. If you chase a few away, the rest will usually follow suit. They tend to keep their distance when large monsters enter their territory, but sometimes the entire group will attack if they feel particularly threatened.",
     "theme": "Great"
    },
    {
     "name": "Great Jagras",
     "type": "Fanged Wyvern",
     "title": "Thief Wyvern",
     "desc": "The pack leader of the Jagras. When hungry, Great Jagras are known to attack monsters even stronger than themselves. It balloons to unbelievable proportions after swallowing prey.",
     "theme": "Great"
    },
    {
     "name": "Odogaron",
     "type": "Fanged Wyvern",
     "title": "Cruel Claw Wyvern",
     "desc": "A terrifying monster that scours the Rotten Vale for carrion. Its highly aggressive nature means that anything, be it monster or man, is a potential meal.",
     "theme": "Rotten Vale"
    },
    {
     "name": "Ebony Odogaron",
     "type": "Fanged Wyvern",
     "title": "Wicked Claw Wyvern",
     "desc": "This Odogaron subspecies is forever on the prowl for its next meal, and is often seen carrying fresh kills in its mouth. Reports indicate it goes into a frenzy upon eating.",
     "theme": "Rotten Vale"
    },
    {
     "name": "Lunagaron",
     "type": "Fanged Wyvern",
     "title": "Moonlight nocturne",
     "desc": "Lunagaron have an organ that chills the air they inhale, circulating it throughout their body in a unique form of thermoregulation. They can travel long distances and endure environmental changes, allowing them to occupy a wide range of habitats. They usually walk on all fours, but can stand on two legs by shutting down their cooling mechanism, spiking their body temp to expand their muscles.",
     "theme": "Citadel"
    },
    {
     "name": "Magnamalo",
     "type": "Fanged Wyvern",
     "title": "Devourer of the Rampage",
     "desc": "A monster with a carapace like tempered steel armor. The vapor around it is actually the expelling of trapped gases from the hordes of monsters Magnamalo has consumed. This has earned it the moniker \"Wyvern of Malice.\" Its shrouded swings can inflict hellfireblight, which causes one to combust either spontaneously or when hit. Use a Deodorant or a Wirebug to rid yourself of hellfire.",
     "theme": "Magnamalo"
    },
    {
     "name": "Scorned Magnamalo",
     "type": "Fanged Wyvern",
     "title": "Ultimate Malice",
     "desc": "A Magnamalo variant that achieves an even more twisted, malevolent form. Filled with hatred, they are known as \"Scorned Magnamalo.\" Shrouded in Hellfire at all times, they also boast larger arm blades and harder armor plating. During battles, they have been spotted focusing their Hellfire and swinging it like a blade.",
     "theme": "Magnamalo"
    },
    {
     "name": "Tobi-Kadachi",
     "type": "Fanged Wyvern",
     "title": "Flying Sparks",
     "desc": "A fanged wyvern that flies among the treetops. Its penchant to brush against the ground and the trees as it moves around builds up static electricity within its fur. This action allows it to reach a charged state-identified by its glowing fur-in which its head and tail attacks are said to be particularly lethal.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Viper Tobi-Kadachi",
     "type": "Fanged Wyvern",
     "title": "Flying Poison Wyvern",
     "desc": "The tail of this subspecies secretes a toxin while its fangs paralyze prey. It can also glide without climbing trees.",
     "theme": "Frozen"
    },
    {
     "name": "Zinogre",
     "type": "Fanged Wyvern",
     "title": "Spark of Blue",
     "desc": "Fanged wyverns whose bodies are streaked with electricity. Sharp claws and strong limbs allow them to thrive in mountainous terrain. During hunts, they gather numerous Thunderbugs to boost their power and enter a supercharged state.",
     "theme": "Zinogre"
    },
    {
     "name": "Stygian Zinogre",
     "type": "Fanged Wyvern",
     "title": "Emperor of Hell",
     "desc": "Has a symbiotic relationship with Dracophage Bugs, which it releases like bullets. Becomes even more dangerous when covered in light.",
     "theme": "Zinogre"
    },
    {
     "name": "Thunderlord Zinogre",
     "type": "Fanged Wyvern",
     "title": "True Awakening",
     "desc": "A Zinogre robed in lightning: the King of the Thunder Wolves is a legend. \"With one howl, the heavens loose a thousand flashes, and ten thousand peals of thunder. Approach it not, anger it not -- for the wrath of the 'Thunderlord' shows no mercy.\" Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Giggi",
     "type": "Flying Wyvern",
     "title": "-",
     "desc": "Remarkably fecund wyvern larvae that can flourish in any dark environment. They survive by leeching onto other animals, sucking their blood, and then converting it to toxins. Giggi victims are advised to shake them off by rolling vigorously on the ground.",
     "theme": "Khezu"
    },
    {
     "name": "Gigginox",
     "type": "Flying Wyvern",
     "title": "Creeping Venom Wyvern",
     "desc": "Wyverns that inhabit the Tundra. Gigginox live in darkness and thus have degraded vision; they detect prey via body heat, then attack with poison. When excited, their color changes and parts of their body harden. Extremely fertile, laying innumerable eggs.",
     "theme": "Khezu"
    },
    {
     "name": "Baleful Gigginox",
     "type": "Flying Wyvern",
     "title": "Electric Creeping Wyvern",
     "desc": "A subspecies of Gigginox that uses electricity to stun prey. It is believed to be a random mutation, and as such, sightings are relatively rare. It may be possible to weaken its electrical powers by destroying the capacitor organs on its body.",
     "theme": "Khezu"
    },
    {
     "name": "Akantor",
     "type": "Flying Wyvern",
     "title": "Infernal Black God",
     "desc": "A wyvern shrouded in mystery and known by many names -- \"the black god\" to some, \"the tyrant of fire\" to others, but usually called \"Akantor\" by the Guild. Its giant spines and tusks make for a fearsome sight in the volcanic areas it frequents.",
     "theme": "Akantor"
    },
    {
     "name": "Ukanlos",
     "type": "Flying Wyvern",
     "title": "White God",
     "desc": "An enigmatic dragon sighted only deep within the most remote extremes. Its jaws are capable of crushing ice and rock alike. The natives of one region claim its appearance mirrors that of the white god of their legends.",
     "theme": "Ukanlos"
    },
    {
     "name": "Frostfang Barioth",
     "type": "Flying Wyvern",
     "title": "-",
     "desc": "A Barioth variant capable of spewing a sub-zero breath attack that it uses to slow down prey. Be careful, as this attack can freeze you as well.",
     "theme": "Barioth"
    },
    {
     "name": "Barioth",
     "type": "Flying Wyvern",
     "title": "Flurry of Frosted Fangs",
     "desc": "Wyverns that rule the eternally frozen Tundra. Barioth use their forelegs, tail and their spiked scales to traverse the slippery ice with ease; this ability makes them very difficult to keep up with.",
     "theme": "Barioth"
    },
    {
     "name": "Sand Barioth",
     "type": "Flying Wyvern",
     "title": "Gust Tusk Wyvern",
     "desc": "A Barioth subspecies that resides in the Sandy Plains. Their breath is strong enough to generate tornadoes, which they then use to travel at high speeds. Their yellow carapaces are tinted red, and their fangs shine deep blue when polished.",
     "theme": "Barioth"
    },
    {
     "name": "Espinas",
     "type": "Flying Wyvern",
     "title": "Frorbidden Venom",
     "desc": "Flying Wyverns known for the red spikes on their tough green frame, forming both a means of attack and defense, thus generally keeping foes at bay. As a result, they are often seen sprawled out and relaxing in their domain. Once they sense danger, however, they expand their blood vessels to turn their hide and wing membranes a bright red, and they will run riot with noteworthy brutality.",
     "theme": "Espinas"
    },
    {
     "name": "Flaming Espinas",
     "type": "Flying Wyvern",
     "title": "Passionate Poisoner",
     "desc": "An Espinas subspecies with a slightly more muted body color. The boldness of the standard Espinas remains: run-of-the-mill attacks won't rouse Flaming Espinas from their slumber. Their breath attack contains a powerful poison, and a dense acid that deteriorates armor. Take this attack head-on, and you won't stand a chance...",
     "theme": "Espinas"
    },
    {
     "name": "Khezu",
     "type": "Flying Wyvern",
     "title": "Blank Stare",
     "desc": "Loathsome wyverns that dwell in caves and other dark places. All but blind, Khezu hunt by smell. Their tail has evolved to cling to walls and ceilings. After using a electric shock to paralyze their prey, they extend their long neck and pounce.",
     "theme": "Khezu"
    },
    {
     "name": "Red Khezu",
     "type": "Flying Wyvern",
     "title": "Charging Wyvern",
     "desc": "A ghastly Khezu variant with a crimson hue and a much more aggressive temperament. Their electrical organs are further developed as well, giving them a wider variety of attacks to disable and ensnare prey.",
     "theme": "Khezu"
    },
    {
     "name": "Tigrex",
     "type": "Flying Wyvern",
     "title": "Absolute Power",
     "desc": "A Flying Wyvern whose primitive origins are obvious. Prone to violence, they display incredible ferocity with their claws, jaws, and developed limbs. They inhabit a wide area searching for prey, and have even been spotted in regions of harsh cold.",
     "theme": "Tigrex"
    },
    {
     "name": "Brute Tigrex",
     "type": "Flying Wyvern",
     "title": "Black Roaring Wyvern",
     "desc": "Blackish brown scales and a stronger roar set this Tigrex subspecies apart. Extremely aggressive, even by Tigrex standards.",
     "theme": "Tigrex"
    },
    {
     "name": "Molten Tigrex",
     "type": "Flying Wyvern",
     "title": "Great Roaring Wyvern",
     "desc": "A rare Tigrex variant theorized to exist after the discovery of claw marks and prints far larger than those of an ordinary Tigrex. With no confirmed first-hand sightings, its existence remains a matter of debate among hunters.",
     "theme": "Tigrex"
    },
    {
     "name": "Grimclaw Tigrex",
     "type": "Flying Wyvern",
     "title": "Ruinous Hook Claw",
     "desc": "Highly developed physical strength lets it trample anything in its way, and its raw power overwhelms the so-called technological strengths that humans have spent centuries cultivating. Even veteran hunters shudder at its name, \"Grimclaw.\" Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Nargacuga",
     "type": "Flying Wyvern",
     "title": "Red Glare in the Drakness",
     "desc": "Flying wyverns that have evolved to live in thickly wooded areas. Covered in jet black fur, these cunning predators stalk their prey from the shadows and attack with ferocious speed. Their massive tails are dexterous as they are deadly, and powerful enough to slay smaller monsters with one strike.",
     "theme": "Nargacuga"
    },
    {
     "name": "Green Nargacuga",
     "type": "Flying Wyvern",
     "title": "Green Swift Wyvern",
     "desc": "A Nargacuga subspecies with mottled fur that allows it to blend into the foliage of verdant areas like the Flooded Forest and the Deserted Island. It is quite skilled in the use of its tail, the spikes of which are said to be extremely deadly.",
     "theme": "Nargacuga"
    },
    {
     "name": "Lucent Nargacuga",
     "type": "Flying Wyvern",
     "title": "Moonlit Shadow",
     "desc": "Nargacuga clad in radiant fur and lives in fog-shrouded lands. Lucent Nargacuga hide in the night's fog and moonlight, springing assaults with neither shape nor shadow. Astounding agility and marvelous mobility makes them difficult to capture with the naked eye. The throng of toxic tailspikes they launch makes these wyverns perilous beasts indeed.",
     "theme": "Nargacuga"
    },
    {
     "name": "Silverwind Nargacuga",
     "type": "Flying Wyvern",
     "title": "Wind Cuttinf White Shadow",
     "desc": "White streaks like polish on a blade. Flashes from a tail that cleave the earth, sunder rock, and split the sky. The \"Silverwind\" summons a gale that slices. The careless fool is unaware, until his head falls cleanly from his shoulders. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Legiana",
     "type": "Flying Wyvern",
     "title": "Wind Drifting Wyvern",
     "desc": "The apex monster of the Coral Highlands, whose diet primarily consists of Raphinos. It emits a chilling wind from its body, which dulls its prey's ability to escape.",
     "theme": "Frozen"
    },
    {
     "name": "Shrieking Legiana",
     "type": "Flying Wyvern",
     "title": "Wind Drifting Wyvern",
     "desc": "A Legiana variant shrouded in white frost. It specializes in freezing prey with the powerful chill it emits, then swooping down to strike at them from overhead.",
     "theme": "Frozen"
    },
    {
     "name": "Paolumu",
     "type": "Flying Wyvern",
     "title": "Floating Sky Wyvern",
     "desc": "Paolumu feast on eggs found in the Coral Highlands. They are able to propel through the air using unique sacs in their bodies, and attack with their extremely hard tails.",
     "theme": "Coral Highlands"
    },
    {
     "name": "Nightshade Paolumu",
     "type": "Flying Wyvern",
     "title": "Floating Sleep Wyvern",
     "desc": "A Paolumu subspecies capable of putting prey to sleep. It produces a powerful sedative gas stored within its throat sac that it can expel and scatter to knock unwary foes out.",
     "theme": "Coral Highlands"
    },
    {
     "name": "Basarios",
     "type": "Flying Wyvern",
     "title": "Bellowing Boulder",
     "desc": "These juvenile Gravios are famous for their rock-hard carapaces. They often burrow underground, mimicking rocks and savaging oblivious miners. Because their carapaces are tougher than that of a full-grown Gravios, they'll attack a threat by charging at it. They are also known to emit a poisonous gas.",
     "theme": "Desert"
    },
    {
     "name": "Ruby Basarios",
     "type": "Flying Wyvern",
     "title": "Peach Rock Wyvern",
     "desc": "A Basarios variant that scatters crystals from its back to fend off attackers, offering those nearby a chance to mine for rare minerals. Jump on one when its back carapace is broken to make it roll over and expose its weak underbelly.",
     "theme": "Volcano"
    },
    {
     "name": "Gravios",
     "type": "Flying Wyvern",
     "title": "Armor Wyvern",
     "desc": "Large wyverns found in volcanic areas. They possess a fiery breath attack and the ability to emit sleeping gas. Their bony carapaces are extremely tough, but expose a surprisingly brittle interior once destroyed.",
     "theme": "Volcano"
    },
    {
     "name": "Black Gravios",
     "type": "Flying Wyvern",
     "title": "Black Armor Wyvern",
     "desc": "A Gravios subspecies distinguished by a hard black carapace that allows them to contain their own extraordinarily high internal temperatures. They sometimes discharge this thermal energy as an extremely powerful heat ray.",
     "theme": "Desert"
    },
    {
     "name": "Bazelgeuse",
     "type": "Flying Wyvern",
     "title": "Invading Tyrant",
     "desc": "A nefarious flying wyvern that travels the world in search of prey. It scatters its own explosive scales over a wide area to prey on whatever gets caught in the blast. In some places, this has earned it the nickname \"Bomber Wyvern.\"",
     "theme": "Bazelgeuse"
    },
    {
     "name": "Seething Bazelgeuse",
     "type": "Flying Wyvern",
     "title": "Death from Above",
     "desc": "A Bazelgeuse variant whose body seems to smolder, like it could go critical at any moment. The heat of their explosive scales have grown, their pale blue glow worthy of the \"Seething\" moniker. Their scales are blisteringly hot in this state, capable of scorching the very earth with their volatile force.",
     "theme": "Bazelgeuse"
    },
    {
     "name": "Astalos",
     "type": "Flying Wyvern",
     "title": "Thunderous Rage",
     "desc": "Large Flying Wyverns with crest-shaped organs that let them control vast amounts of electricity. Astalos vibrate these organs on their head, forked tail, and brilliant wings to charge the respective body part with electricity, yielding tremendous strength and an amplified attack range. Violent to a fault, witnesses have observed them using all their might to drive intruders from their territory.",
     "theme": "Astalos"
    },
    {
     "name": "Boltreaver Astalos",
     "type": "Flying Wyvern",
     "title": "Blue Thunder lord",
     "desc": "Whoever gets caught in the lightning shot by the unique Boltreaver Astalos will vanish without a trace, leaving only their shadow behind. The electrical properties of its shell allow it to glide through the air and create electromagnetic charges that can be used in chasing down prey. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Seregios",
     "type": "Flying Wyvern",
     "title": "Slicing Scales",
     "desc": "Large Flying Wyverns with sharp, blade-like scales covering their body. Seregios are well-known as extremely territorial and belligerent creatures, wielding their aerial mobility and powerful hind leg attacks in intense combat against other large monsters. Reports have confirmed that Seregios have the ability to launch the scales from their body, inflicting their victims with the Bleeding status.",
     "theme": "Seregios"
    },
    {
     "name": "Monoblos",
     "type": "Flying Wyvern",
     "title": "One Horned Wyvern",
     "desc": "A monocerous desert-dwelling wyvern able to burrow swiftly through the sand. It puts its horn to lethal use with a charging thrust, and while it possesses no breath attack, its roar is loud enough to split human eardrums.",
     "theme": "Desert"
    },
    {
     "name": "White Monoblos",
     "type": "Flying Wyvern",
     "title": "White One Horn Wyvern",
     "desc": "A rare Monoblos subspecies covered in chalk-tinted plating. More ferocious than its standard cousin, the White Monoblos is unrelenting in the pursuit of any prey it happens upon.",
     "theme": "Desert"
    },
    {
     "name": "Diablos",
     "type": "Flying Wyvern",
     "title": "Tyrant of the Desert",
     "desc": "Known as the \"Tyrant of the Desert\", the Diablos is extremely territorial and will use its massive horns to charge at invaders. Diablos have the ability to burrow underground and use this ability to strike from below, however, their sensitive ears make them susceptible to Sonic Bombs. Despite their predatory appearance, they are herbivorous and mostly feed on cactus.",
     "theme": "Desert"
    },
    {
     "name": "Black Diablos",
     "type": "Flying Wyvern",
     "title": "Black Horn Wyvern of the Desert",
     "desc": "These black-shelled Diablos are actually female Diablos in heat. The color signals their aggressiveness and heightened hostility to other creatures in their habitat.",
     "theme": "Desert"
    },
    {
     "name": "Bloodbath Diablos",
     "type": "Flying Wyvern",
     "title": "Massacre Demon",
     "desc": "A desert legend tells of the brave armies sent out against the unimaginable cruelties that had besieged their cities and nations. None of them returned alive, and only the sands remained as witnesses of their efforts. This story has no hero or happy ending, only the wyvern known as \"Bloodbath\". Requires special permission to hunt.",
     "theme": "Bloodbath Diablos"
    },
    {
     "name": "Rathian",
     "type": "Flying Wyvern",
     "title": "Queen of the Land",
     "desc": "Fire-breathing female wyverns, also known as the \"Queens of the Land\". With powerful legs and poison-secreting tails, they hunt mainly on the ground. Sometimes seen preying as a couple, Rathians and Rathalos cooperate well.",
     "theme": "Ratha"
    },
    {
     "name": "Pink Rathian",
     "type": "Flying Wyvern",
     "title": "Cherry Blossom Fire Wyvern",
     "desc": "A subspecies with vibrant pink scales. Pink Rathians wield their toxic tails more deftly than normal Rathians, weakening prey with poison before moving in for the kill.",
     "theme": "Ratha"
    },
    {
     "name": "Gold Rathian",
     "type": "Flying Wyvern",
     "title": "Illustrious Queen",
     "desc": "A rare species of Rathian covered in shimmering golden scales. Known as the Gold Fire Wyvern, or alternatively the Golden Moon, as inspired by their divine appearance. These wyverns are infamous for their strong scales and attacks with their reinforced tails, giving these beasts exceptional combat ability. In battle, their attacks grow only more intense when in their Incandescent state.",
     "theme": "Ratha"
    },
    {
     "name": "Dreadqueen Rathian",
     "type": "Flying Wyvern",
     "title": "Violet Poison Princess",
     "desc": "Every rose has its thorns. The \"Dreadqueen's\" thorns are barbs full of deadly venom, and they can scatter a purple cloud of suffocating death in any area she alights. She blooms proud and alone amidst her own desolation. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Rathalos",
     "type": "Flying Wyvern",
     "title": "King of the Skies",
     "desc": "Terrible wyverns called \"Kings of the Skies.\" Along with Rathian, they stake wide territories centered around their nest. Rathalos descend on invaders from the sky, attacking with poison claws and a breath of fire.",
     "theme": "Ratha"
    },
    {
     "name": "Azure Rathalos",
     "type": "Flying Wyvern",
     "title": "Azure Fire Wyvern",
     "desc": "An azure-colored subspecies of Rathalos. More mobile than their standard cousins, they locate prey from the air and quickly swoop in for the kill.",
     "theme": "Ratha"
    },
    {
     "name": "Silver Rathalos",
     "type": "Flying Wyvern",
     "title": "Argent Emperor",
     "desc": "A rare species of Rathalos covered in shimmering silver scales. Known as the Silver Fire Wyvern, or alternatively the Silver Sun, as inspired by their majestic appearance. These wyverns are known for their fierce breath and even fiercer claws, giving these threatening beasts exceptional combat ability. In battle, their attacks grow only more intense when in their Incandescent state.",
     "theme": "Ratha"
    },
    {
     "name": "Dreadking Rathalos",
     "type": "Flying Wyvern",
     "title": "Black Flame King",
     "desc": "Even among the rulers of the sky, the \"Dreadking\" is truly the king of kings. A giant, supported by wings as black as the scorched remains of its prey. Humans are usually unworthy of its attention, but it descends with fiery wrath upon intruders to its domain. Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Anteka",
     "type": "Herbivores",
     "title": "-",
     "desc": "Herbivores that live in cold climates. Generally docile, though they have been known to attack when threatened. Their high-quality pelts have many uses, and their antlers are highly prized by the Guild. Simply stun the creatures to easily harvest one.",
     "theme": "Herbivores"
    },
    {
     "name": "Apceros",
     "type": "Herbivores",
     "title": "-",
     "desc": "Herbivores that inhabits the Wildspire Waste. They've developed particularly hard hide to ward off attackers, and are known to gather in groups to defend themselves.",
     "theme": "Herbivores"
    },
    {
     "name": "Aptonoth",
     "type": "Herbivores",
     "title": "-",
     "desc": "Docile herbivores that graze in packs. Their meat is considered a delicacy and is rich in nutrients. If one member of the herd is attacked, the rest will flee immediately.",
     "theme": "Herbivores"
    },
    {
     "name": "Epioth",
     "type": "Herbivores",
     "title": "-",
     "desc": "Submissive, water-dwelling herbivores that subsist on water grasses and moss. Epioth surface frequently to sunbathe. Extremely timid, they panic when danger is present, swimming about in haphazard fashion.",
     "theme": "Herbivores"
    },
    {
     "name": "Gastodon",
     "type": "Herbivores",
     "title": "-",
     "desc": "Pack monsters that inhabit the Elder's Recess. They are easily angered by intruders, and will charge at monsters twice their size.",
     "theme": "Herbivores"
    },
    {
     "name": "Gowngoat",
     "type": "Herbivores",
     "title": "Beautiful Sheep Beast",
     "desc": "Herbivorous monsters with fluffy tails. Their tails are mostly composed of slate gray hair; some scholars surmise that this trait lets them roll into balls to disguise themselves as rocks. Others believe their tails serve to hide and protect newborn offspring. Gentle by nature, they tend to live in herds. They are easily frightened, and the entire group will flee when attacked.",
     "theme": "Herbivores"
    },
    {
     "name": "Kelbi",
     "type": "Herbivores",
     "title": "-",
     "desc": "Small herbivores known for their gentle demeanor as well as medicinal properties of their horns. Those wishing to harvest a horn should aim for the head when attacking them.",
     "theme": "Herbivores"
    },
    {
     "name": "Kestodon",
     "type": "Herbivores",
     "title": "-",
     "desc": "Female Kestodon will alert the pack of danger, while the males will violently charge would-be threats. Their rushing charges can be blocked, however, leaving them open to attacks. Males are blessed with a stronger physique, and they can easily be told apart from females by their coloring and head shape.",
     "theme": "Herbivores"
    },
    {
     "name": "Larinoth",
     "type": "Herbivores",
     "title": "Crying Neck Wyvern",
     "desc": "These giant herbivores are peaceful towards hunters unless their young are threatened. Their long necks let them eat hard-to-reach leaves and nuts, which they may drop if attacked while feeding, and eat constantly to maintain their size. They also have a unique sound-producing organs.",
     "theme": "Herbivores"
    },
    {
     "name": "Moofah",
     "type": "Herbivores",
     "title": "Cloud Sheep Deer",
     "desc": "Small herbivores that can be found on the Deserted Island. Their soft, high-quality fur has been used since ancient times in clothing and ceremonial tools, and can be shaved off of them with cutting weapons. They are docile and raised as livestock in many regions.",
     "theme": "Herbivores"
    },
    {
     "name": "Mosswine",
     "type": "Herbivores",
     "title": "-",
     "desc": "Mosswine are known for their excellent sense of smell, and are often found foraging for fungi. If you're hunting around for mushrooms, follow the Mosswine to the motherlode.",
     "theme": "Herbivores"
    },
    {
     "name": "Popo",
     "type": "Herbivores",
     "title": "-",
     "desc": "Herd-forming herbivores covered in thick fur to endure the cold. Popo are gentile by nature, so if they are attacked the whole herd will turn tail and run. Popo meat is very nutritious; the tongue is said to be especially palatable.",
     "theme": "Herbivores"
    },
    {
     "name": "Rhenoplos",
     "type": "Herbivores",
     "title": "Herbivorous Wyvern",
     "desc": "Extremely territorial herbivores with poor vision and acute hearing, Rhenoplos will doggedly pursue any target they sense. They cannot easily stop once they break into a run, a fact confirmed by hunters who foolishly thought they could stop them using a buckler or a shield.",
     "theme": "Herbivores"
    },
    {
     "name": "Slagtoth",
     "type": "Herbivores",
     "title": "Drooping Hide Wyvern",
     "desc": "Highly territorial herbivores that live in costal areas. Their heavy, sagging hides store nutrients and are prized for their heat and water resistance.",
     "theme": "Herbivores"
    },
    {
     "name": "Uroktor",
     "type": "Leviathen",
     "title": "Lava Beast",
     "desc": "Leviathans that inhabit volcanoes. Noted for swarming around larger monsters' kills in order to feed. Uroktor rarely hunt for themselves, but stab upward at prey from the ground when they do. Known for being highly aggressive.",
     "theme": "Volcano"
    },
    {
     "name": "Agnaktor",
     "type": "Leviathen",
     "title": "Fire Pike Wyvern",
     "desc": "Also known as fire-pike wyverns, Agnaktor use their tough beaks and great strength to burrow effortlessy through rock, and can even burrow into ceilings. Their hardened-lava armor becomes even harder when cooled forming an almost impenetrable armor.",
     "theme": "Agnaktor"
    },
    {
     "name": "Glacial Agnaktor",
     "type": "Leviathen",
     "title": "Freeze Pike Wyvern",
     "desc": "A Tundra-based subspecies of Agnaktor that spits powerful jets of water. Its sharp beak allows it to burrow into the permafrost and clad itself in a layer of ice. This icy armor can only be melted with heat-based attacks.",
     "theme": "Frozen"
    },
    {
     "name": "Ludroth",
     "type": "Leviathen",
     "title": "Aquatic Beast",
     "desc": "Aquatic female monsters. Ludroth form \"harems\" around large males, gathering in territories designated as breeding grounds. They're known to be extremely aggressive towards outsiders, so caution is advised when treading in their territory.",
     "theme": "Water"
    },
    {
     "name": "Royal Ludroth",
     "type": "Leviathen",
     "title": "Mane Contender",
     "desc": "Larger than regular Ludroth, Royal Ludroth use their sponge-like mane to absorb water and keep from drying out on land. Once the sponge loses moisture, they will seek out water to recover. They also spew mucus to trip their prey.",
     "theme": "Water"
    },
    {
     "name": "Purple Ludroth",
     "type": "Leviathen",
     "title": "Purple Water Beast",
     "desc": "A Royal Ludroth subspecies with a spongy purple mane that can both store and disperse a powerful toxin. Moistening this mane seems to revitalize the creature, so it prefers to reside in watery areas.",
     "theme": "Water"
    },
    {
     "name": "Almudron",
     "type": "Leviathen",
     "title": "Hermit of the Swamp",
     "desc": "As its name implies, Almudron spends a great deal of time lurking in mud - at least until it emerges to smother approaching prey. From its tail oozes a strange golden fluid, which Almudron uses to dissolve the ground beneath its prey, arresting them in a mire so that it can drag them under. When enraged, it produces more fluid, turning the mud golden. When you see gold, watch out!",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Magma Almudron",
     "type": "Leviathen",
     "title": "Scorching Mud",
     "desc": "Unlike normal Almudron, Magma Almudron live in the Lava Caverns, and can manipulate magma instead of mud. They secrete a special liquid that melts the ground, allowing them to move freely through the earth. Known for their aggressive nature, they become extremely agitated when trespassers set foot on their turf, attacking them unrelentingly.",
     "theme": "Volcano"
    },
    {
     "name": "Gobul",
     "type": "Leviathen",
     "title": "Lantern Fish Wyvern",
     "desc": "Monsters with strong camouflage skills and powerful neurotoxins. Poor swimmers, Gobul conceal themselves and lure prey by imitating plants with their barbels. Can reportedly swallow Epioth whole. They love frogs.",
     "theme": "Water"
    },
    {
     "name": "Lagiacrus",
     "type": "Leviathen",
     "title": "Lord of the Seas",
     "desc": "Leviathans that exist at the top of the aquatic food chain. Feared by sailors as the \"Lords of the Seas\", Lagiacrus store enough electricity in their spinal organs to make the oceans surge. Occasionally they can be found resting on land as well.",
     "theme": "Lagiacrus"
    },
    {
     "name": "Ivory Lagiacrus",
     "type": "Leviathen",
     "title": "White Sea Wyvern",
     "desc": "A subspecies of Lagiacrus with a beautiful ivory carapace. It has exceptional mobility while on land, and its charge and breath attacks are nothing short of devastating. The electrical charges it emits when enraged are truly fearsome.",
     "theme": "Lagiacrus"
    },
    {
     "name": "Abyssal Lagiacrus",
     "type": "Leviathen",
     "title": "Consumer of the World",
     "desc": "A rare species of Lagiacrus known only from an ancient scroll: From the abyss' darkest cave Comes the master of the wave Consumer of the world entire Devil of the sea most dire Fear it as you fear the grave.",
     "theme": "Lagiacrus"
    },
    {
     "name": "Nibelsnarf",
     "type": "Leviathen",
     "title": "Latent Mouth Wyvern",
     "desc": "Leviathans that have adapted to live in sandy areas. They burrow beneath the desert and locate prey aurally, then suck both the target and any surrounding sand into their maws. The gill-like organs in their mouths are thought to absorb nutrients.",
     "theme": "Desert"
    },
    {
     "name": "Somnacanth",
     "type": "Leviathen",
     "title": "Soporific Siren",
     "desc": "A formidable aquatic serpent that crests on moonlit nights—likely why it has often been mistaken for a mermaid. It expels an intoxicating sleep powder from its neck gills and tail, knocking out prey before it can resist. Some Somnacanth sightings tell of this species making use of unusual shells, so exercise caution if you catch one swimming towards you with a shell in its claws.",
     "theme": "Frozen"
    },
    {
     "name": "Aurora Somnacanth",
     "type": "Leviathen",
     "title": "Seductive Siren",
     "desc": "Light illuminates the dust scattered around this subspecies, making their fantastical appearance shimmer softly. Aurora Somnacanth sprays icy blasts in place of sleeping powder, attacking all who dare enter their territory. They use the permanent cold emanating from their bodies to freeze the vicinity, and then the frozen surface to move around swiftly.",
     "theme": "Frozen"
    },
    {
     "name": "Mizutsune",
     "type": "Leviathen",
     "title": "Bewitching Dancer",
     "desc": "A specially evolved Leviathan with a sleek, lithe body. Mizutsune can secrete a peculiar fluid that covers its foes in immobilizing bubbles. Once its foe's movement is impaired, it closes in with spry, dance-like movements.",
     "theme": "Mizutsune"
    },
    {
     "name": "Violet Mizutsune",
     "type": "Leviathen",
     "title": "Dancer of Eldritch Flame",
     "desc": "Violet Mizutsune are leviathans known for their beautiful lilac-colored fur. They use the fluid they secrete to slide around, targeting their prey with gas-filled bubbles. Though they appear graceful creatures, the facade quickly fades as they envelop themselves in pale flames and bathe their surroundings in a beautiful, but deadly, inferno of white-hot flame.",
     "theme": "Mizutsune"
    },
    {
     "name": "Soulseer Mizutsune",
     "type": "Leviathen",
     "title": "Heavenly Eye",
     "desc": "A Mizutsune that has lost its eyesight but adapted to use its bubbles as another sense. Rumor says that the malice of an undying grudge burns within its closed eyes. Those it catches in its bubbles know the true meaning of its nickname, \"Soulseer\". Requires special permission to hunt.",
     "theme": "Apex"
    },
    {
     "name": "Felyne",
     "type": "Lynian",
     "title": "-",
     "desc": "Bipedal creatures resembling cats, known for their light hair. Though usually docile, they will attack viciously if provoked. Naturally curious, some try to enter human society, and are often hired by the Guild to cook for and otherwise assist hunters.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Melynx",
     "type": "Lynian",
     "title": "-",
     "desc": "\tBipedal creatures resembling cats, known for their dark hair. More curious than Felynes and possessed by kleptomania, Melynxes take what they steal back to their dens.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Grimalkyne",
     "type": "Lynian",
     "title": "-",
     "desc": "Grimalkyne resembles bipedal lynxes. They have tufted ears, and come in a variety of colors depending on the tribe",
     "theme": "Desert"
    },
    {
     "name": "Gajalaka",
     "type": "Lynian",
     "title": "Odd Mask Tribe",
     "desc": "These tribes become immediately hostile when approached to close range. By accepting quests from the Lynian Researcher, hunters can gain benefits from the tribe such as shortcuts, tailriders, and the Palico gadget Mewlotov Cocktail. They are the only Lynian tribe in the New World to be ruled by a bigger and stronger leader, the Gajalaka Chief.",
     "theme": "Volcano"
    },
    {
     "name": "BoaBoa",
     "type": "Lynian",
     "title": "-",
     "desc": "The Boaboa have the basic shape of a Grimalkyne, but exhibit much thicker, white fur and a bulkier frame. They wear crude imitations of Popo heads as masks, with the tusk's tips painted in colours that correspond to the status ailment each individual Boaboa uses in combat.",
     "theme": "Frozen"
    },
    {
     "name": "Shakalaka",
     "type": "Lynian",
     "title": "-",
     "desc": "A small, four-limbed monster known for always wearing a mask. Their camouflage-like qualities make them difficult to spot, but if you do, you're in trouble! Their leader, the King Shakalaka, is known to wear a crown like object.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "King Shakalaka",
     "type": "Lynian",
     "title": "Strange Masked Leader",
     "desc": "This Shakalaka chieftain pulls together the Shakalaka's as one, in order to act. Extremely quick to anger when approached, this hot-head can invoke his fiery wrath with emotion alone. Feared by even the most skilled hunters.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Altaroth",
     "type": "Neopterons",
     "title": "Shell Insect",
     "desc": "Insects that widely inhabit many areas. They absorb fruit, mushrooms, and honey, and then carry them back to their nest. Materials can thus be collected from their swollen abdomens, whose color is related to what they're carrying.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Bnahabra",
     "type": "Neopterons",
     "title": "Flying Shell Insect",
     "desc": "Pervasive flying insects that attack invaders with paralyzing venom and lay eggs in carrion along with a fluid that hastens decomposition. It is best to kill them with poison so that their parts are left ripe for the carving.",
     "theme": "Citadel"
    },
    {
     "name": "Hornetaur",
     "type": "Neopterons",
     "title": "Hidden Jungle Clouds",
     "desc": "Small Neopterons found primarily on land, featuring two developed horns and legs peppered with sharp thorns. Extremely territorial, Hornetaurs attack any who approach without mercy. When processed, the shells around their body boast impressive strength; in their current state, however, too much \"umph\" when attacking can easily obliterate them, rendering them useless. Collect those materials with care!",
     "theme": "Rotten Vale"
    },
    {
     "name": "Konchu",
     "type": "Neopterons",
     "title": "Shield Bug",
     "desc": "Neopterons that travel widely for food and can survive in almost any environment. Konchu roll into balls both to protect themselves and to fend off threats. Their sturdy shells are fairly easy to procure and are highly prized by armorers.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Vespoid",
     "type": "Neopterons",
     "title": "-",
     "desc": "Neopterons with paralyzing poison stingers on their abdomen. Vespoids adapt to almost any environment, and have been observed in many regions. Their sharp stingers are powerful enough to let them relentlessly jab any outsiders with a paralytic agent. They are delicate, weak to impacts, and make great materials for toxic weaponry.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Vespoid Queen",
     "type": "Neopterons",
     "title": "-",
     "desc": "A massive thorax and brilliant, gigantic wings mark the Vespoid Queen. It commands its subjects through unique flight patterns, and will stab any intruders with a poisonous stinger that also causes paralysis. It also spits acidic bodily fluid at its prey.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Ahtal-Ka",
     "type": "Neopterons",
     "title": "Pavilion Mantis",
     "desc": "The golden empress of praying mantises resides in a huge, ruined castle. She flattens towns and fortresses, and uses the wreckage to build her lair ever larger. It's rumored that the Empress's Throne, as it is known, is strewn with golden cocoons and webbing, which contain stolen treasures.",
     "theme": "Ahtal-Ka"
    },
    {
     "name": "Seltas",
     "type": "Neopterons",
     "title": "Piercing Beetle",
     "desc": "A medium-sized Neopteron that use swift aerial movements to attack invaders on the ground. It can also store a corrosive liquid inside itself, which it can shoot from its stinger-shaped abdomen.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Seltas Queen",
     "type": "Neopterons",
     "title": "Heavy Beetle",
     "desc": "Unable to fly by themselves, these wingless female Neopterons release pheromones to lure in male Seltas to serve as thralls. Seltas Queens possess a hard carapace, which they use to protect their vulnerable abdomens and mucus-spewing maws, which are vulnerable when exposed.",
     "theme": "Shrine Ruins"
    },
    {
     "name": "Desert Seltas",
     "type": "Neopterons",
     "title": "Axe Beetle",
     "desc": "A mid-sized Neopteron whose forked horns and broad foreleg- attack range set it apart from its more common cousins. Desert Seltas have also been known to burrow freely through the ground.",
     "theme": "Desert"
    },
    {
     "name": "Desert Seltas Queen",
     "type": "Neopterons",
     "title": "Cannon Beetle",
     "desc": "A large Neopteron known to use the pincers at the tip of its long tail to grasp male Seltas -- or anything it considers a threat. Once it has a male in its grasp, this Desert subspecies may even violently throw its mate at enemies.",
     "theme": "Desert"
    },
    {
     "name": "Delex",
     "type": "Piscine Wyvern",
     "title": "-",
     "desc": "Carnivorous desert monsters that travel in schools of four or five. Delex often follow large predators in the hope of scavenging leftover. They are extremely sensitive to sound.",
     "theme": "Desert"
    },
    {
     "name": "Gajau",
     "type": "Piscine Wyvern",
     "title": "Gajau",
     "desc": "Vicious piscine that forms groups to defend their territory from intruders. Though primarily aquatic creatures, they have been known to chase their prey onto land, before wriggling back to the banks and into the water. Be sure not to venture too closely to their habitat!",
     "theme": "Water"
    },
    {
     "name": "Cephalos",
     "type": "Piscine Wyvern",
     "title": "Sand Wyvern",
     "desc": "The coloration of these piscine wyverns is well-suited to the deserts they inhabit. Excellent burrowers, they swim through the sand in packs, rarely surfacing. Their ears are highly developed; any impact caused by striking the ground forces them out of hiding.",
     "theme": "Old Great"
    },
    {
     "name": "Cephadrome",
     "type": "Piscine Wyvern",
     "title": "Sand Wyvern",
     "desc": "The leaders of Cephalos herds, these individuals are set apart by their larger size and hard, black scales. Like their smaller counterparts, they have excellent hearing, making them sensitive to loud noises. Their fins also secrete a paralytic agent.",
     "theme": "Old Great"
    },
    {
     "name": "Jyuratodus",
     "type": "Piscine Wyvern",
     "title": "Sinister Swamp Shadow",
     "desc": "A piscine wyvern that inhabits swamps, utilizing the mud there to hunt and survive. It wallows in the mire to maximize cutaneous respiration and preserve the toughness of its scales. The sludge it spits is highly viscous, so watch where you step, lest you get stuck in it.",
     "theme": "Desert"
    },
    {
     "name": "Lavasioth",
     "type": "Piscine Wyvern",
     "title": "Lava Wyvern",
     "desc": "Lavasioths utilize molten lava as armor. They are extremely aggressive and will attack without prejudice until the threat has been eliminated.",
     "theme": "Volcano"
    },
    {
     "name": "Beotodus",
     "type": "Piscine Wyvern",
     "title": "Frozen Fish Wyvern",
     "desc": "This piscine monster’s wedge-shaped head allows it to freely swim through the tundra snow. Frequently seen flinging snow at prey.",
     "theme": "Frozen"
    },
    {
     "name": "Plesioth",
     "type": "Piscine Wyvern",
     "title": "Water Wyvern",
     "desc": "Giant piscine wyverns which can be spotted near bodies of water. Where wings would be found on other wyverns, it has developed fins specialized for swimming, and, as a result, cannot fly. Despite its fish-like appearance, it is just as comfortable on land.",
     "theme": "Water"
    },
    {
     "name": "Green Plesioth",
     "type": "Piscine Wyvern",
     "title": "Master of the Giant Lake",
     "desc": "A subspecies of Plesioth with jade-green scales. Though primarily aquatic, the creature's movements are equally adept both in and out of water. When enraged, it has a habit of surfacing to rampage on land.",
     "theme": "Water"
    },
    {
     "name": "Remobra",
     "type": "Snake Wyvern",
     "title": "Winged Snake Wyvern",
     "desc": "Small but agile flying wyverns that seek out weakened creatures to attack. Often seen near elder dragons, they're considered a portent of disaster. Originally classified as flying wyverns, after further research they were reclassified as snake wyverns.",
     "theme": "Wingdrake"
    },
    {
     "name": "Najarala",
     "type": "Snake Wyvern",
     "title": "Twisting Snake Wyvern",
     "desc": "A monster that stuns its prey with vibrations from its scales, then wraps around and constricts its victims. Once a Najarala start to coil around its prey, a quick escape or a mortal blow to it are the only things that will offer a chance at survival.",
     "theme": "Desert"
    },
    {
     "name": "Tidal Najarala",
     "type": "Snake Wyvern",
     "title": "Water Snake Wyvern",
     "desc": "A Najarala subspecies that makes deadly use of its long body. Tidal Najarala respond to threats by spitting a watery substance at targets and have even been known to use their own scales to deflect this liquid bile so that they can snipe at more elusive prey.",
     "theme": "Frozen"
    },
    {
     "name": "Nerscylla",
     "type": "Temnocerans",
     "title": "Shadow Spider",
     "desc": "A Temnoceran that spins webs to defend territory and hunt prey. They bind foes that have been weakened by ailments and devour them with giant mandibles. They are fond of wearing the hides left by the Gypceros prey they consume.",
     "theme": "Rotten Vale"
    },
    {
     "name": "Shrouded Nerscylla",
     "type": "Temnocerans",
     "title": "Corpse Spider",
     "desc": "Desert-dwelling Temnocerans who lure threats into sand traps, then tear into the ensnared prey using their scissor-like mandibles. Similar to their more common cousins, they wear the skins of their prey -- most often Khezu.",
     "theme": "Desert"
    },
    {
     "name": "Rachnoid",
     "type": "Temnocerans",
     "title": "Vassal Spider",
     "desc": "The infant form of Rakna-Kadaki. At this stage in their life cycle, they cling to their mother's abdomen, feeding on scraps of her regurgitated prey. From birth, they are instantly able to spit webs that are just as strong as their mother's, which they use to bind prey or swiftly move about at her command.",
     "theme": "Desert"
    },
    {
     "name": "Rakna-Kadaki",
     "type": "Temnocerans",
     "title": "Wandering Widow",
     "desc": "A Rakna-Kadaki is usually seen covered in sticky webbing. Clinging to its abdomen are its offspring, known as Rachnoid, which it controls using the flammable gas that builds up there. Rachnoid spit fire, capture prey, and support the Rakna-Kadaki's massive body. As their numbers dwindle, the beast will hatch more, at which point it is extremely dangerous.",
     "theme": "Desert"
    },
    {
     "name": "Pyratula",
     "type": "Temnocerans",
     "title": "-",
     "desc": "Offspring of the Pyra Rakna-Kadaki. Pyrantula usually stay put, relying on their progenitor for almost all movement. On the other hand, they treat all who approach as threats, eagerly attacking any invaders they detect. Their bodies contain explosive gasses that the Pyre Rakna-Kadaki can detonate through webs, generating small explosions.",
     "theme": "Volcano"
    },
    {
     "name": "Pyre Rakna-Kadaki",
     "type": "Temnocerans",
     "title": "Parching Puppeteer",
     "desc": "A subspecies of Rakna-Kadaki filled with explosive material, their bodies are covered in a dark red, explosion- resistant webbing. An advanced chain of command lets them direct their offspring with a special sound-producing organ. On offense, they strike their forelimbs like flints to induce explosions. Connecting special detonation threads to offspring in the area lets them expand the explosive area to their positions.",
     "theme": "Volcano"
    },
    {
     "name": "Barnos",
     "type": "Wingdrake",
     "title": "-",
     "desc": "Barnos are wingdrakes that resemble retro-style pterosaurs. They have pointed beaks filled with teeth and large draconic wings.",
     "theme": "Wingdrake"
    },
    {
     "name": "Cortos",
     "type": "Wingdrake",
     "title": "-",
     "desc": "A wingdrake from the Hinterlands. Usually not aggressive, but will attack hunters in a bind. Its breath lowers elemental resistance.",
     "theme": "Wingdrake"
    },
    {
     "name": "Mernos",
     "type": "Wingdrake",
     "title": "-",
     "desc": "Mernos are wingdrakes that somewhat resemble certain species of rhamphorynchid pterosaur. They have hatchet-like beaks, blue skin, and a long yellow-tipped tail.",
     "theme": "Wingdrake"
    },
    {
     "name": "Noios",
     "type": "Wingdrake",
     "title": "-",
     "desc": "Noios are wingdrakes that resemble vultures in addition to pterosaurs. They have a large beak, a waddle hanging from their neck, light-brown skin, and a long tail.",
     "theme": "Wingdrake"
    },
    {
     "name": "Raphinos",
     "type": "Wingdrake",
     "title": "-",
     "desc": "Raphinos are wingdrakes that resemble parrots or tapejarid pterosaurs. They have a light pink skin and wings with ribbon-like appendages hanging from them.",
     "theme": "Wingdrake"
    }
   ];

var monsters = new Array();
for(i=0;i<json.length;i++){
    monsters[i]=Monster.from(json[i]);
}

leftCount=monsters.length;

function draw() {
    const canvas = document.getElementById("tutorial");
    const volume = document.getElementById("volume-control")
    if (!initalSetup){
        // Adding the button actually button
        canvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            // stop audio for next button press
            themeAudio.pause(); themeAudio.currentTime = 0;
            themeAudio.volume=audioVolume;
            if (isInside(mousePos,themeButton)) {
                themeAudio.play();
            }else if(isInside(mousePos,smashButton)){
                monsters[monsterIndex].smashing(1);
            }else if(isInside(mousePos,passButton)){
                monsters[monsterIndex].smashing(-1);
            }else if(isInside(mousePos,backButton)){
                monsters[monsterIndex].backStep();
            }else{
                // don't know what to do here yet
                //alert('clicked outside buttons');
            }
        }, false);
        volume.addEventListener("change", function(e) {
            //console.log(e.currentTarget.value);
            audioVolume = e.currentTarget.value / 200;
            themeAudio.volume=audioVolume;
            roarAudio.volume=audioVolume;
            });
        initalSetup=true;
    }
    monsters[monsterIndex].show();
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        // clear the inital space
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle="black";

        // Main text for saying what is done
        ctx.font= "40px serif";
        ctx.fillText("Monster Hunter: Smash or Pass", 10, 50);
        ctx.font= "20px serif";
        ctx.fillText("Made by: mjr117 and Benwor",10,90)
        
        // Title text for the monster
        ctx.font = "20px serif";
        ctx.fillText(titleText,10,110);

        // Current Count text
        ctx.font = "40px serif";
        ctx.fillText(smashCount+" : "+leftCount+" : "+passCount,150,590);
        //console.log(smashCount,leftCount,passCount);

        // Description text for the monster
        ctx.font = "20px serif";
        printAtWordWrap(ctx,descText,20,390,25,540);
        
        // Place main image of monster
        img.onload = () => {
            ctx.drawImage(img,150,150,200,200);
        }
        img.src=imgSource;

        // setting up button click
        ctx.fillStyle='#810066';
        ctx.fillRect(themeButton.x,themeButton.y,themeButton.width,themeButton.height);
        ctx.fillStyle='pink';
        ctx.fillRect(smashButton.x,smashButton.y,smashButton.width,smashButton.height);
        ctx.fillStyle='green';
        ctx.fillRect(passButton.x,passButton.y,passButton.width,passButton.height);
        ctx.fillStyle='black';
        ctx.fillRect(backButton.x,backButton.y,backButton.width,backButton.height);
        // The text for the buttons
        ctx.fillStyle='#f5bd05';
        ctx.font = "20px serif";
        ctx.fillText("Theme",20,580);
        ctx.fillStyle='white';
        ctx.font = "20px serif";
        ctx.fillText("Go back",480,580);
        ctx.save();
        ctx.rotate(Math.PI/2);
        ctx.fillStyle='black';
        ctx.font = "20px serif";
        ctx.fillText("SMASH",180,-20);
        ctx.restore();
        ctx.save();
        ctx.rotate(-Math.PI/2);
        ctx.fillStyle='black';
        ctx.font = "20px serif";
        ctx.fillText("PASS",-230,580);
        ctx.restore();
    }
}

// Function for getting the mouse position
function getMousePos(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    }
}

// Function for checking is point is inside a box
function isInside(pos, rect){
    return pos.x > rect.x && pos.x < rect.x+rect.width && pos.y < rect.y+rect.height && pos.y > rect.y;
}

// FillText but for many lines
function printAtWordWrap( context , text, x, y, lineHeight, fitWidth) {
    fitWidth = fitWidth || 0;
    
    if (fitWidth <= 0){
        context.fillText( text, x, y );
        return;
    }
    var words = text.split(' ');
    var currentLine = 0;
    var idx = 1;
    while (words.length > 0 && idx <= words.length){
        var str = words.slice(0,idx).join(' ');
        var w = context.measureText(str).width;
        if ( w > fitWidth ){
            if (idx==1){
                idx=2;
            }
            context.fillText( words.slice(0,idx-1).join(' '), x, y + (lineHeight*currentLine) );
            currentLine++;
            words = words.splice(idx-1);
            idx = 1;
        } else {
            idx++;
        }
    }
    if  (idx > 0){
        context.fillText( words.join(' '), x, y + (lineHeight*currentLine) );
    }
}