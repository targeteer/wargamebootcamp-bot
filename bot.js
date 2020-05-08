const Discord = require('discord.js');
const COMMAND_CHAR = '!';
const client = new Discord.Client();
const prefix = '!';
const commands = require('./ArmoryCommands.js');
const commonCommands = require('./Commands.js');
// const token = process.env.token;
const token = "NzA3NTAzMDc2MjczMDI5MTYx.XrJvqw.rpfcMqAVFnGRnJgIl-39yRlJFyI"
const format = require('./Formatting.js');
const fs = require('fs');
const Q = require('q');
let status = "​";
const csv = require('csv-parser');
let color;
let displaylimit = '20';
let limit = '3';
var heatdata = require('./Data/HeatKeData.json');
let commoncommands = true;
const results = [];
var units = require('./Data/UnitData.json');
var stringSimilarity = require('string-similarity');
const MSGES = require('./Mongoose/messageSchema.js');
const Streaming = require("discord-streaming");
// const Streamrole = require("discord-streamrole");

  var axioms = ["전투를 앞둔 병사의 눈빛을 본 적이 있는 사람이라면 전쟁을 하자는 말을 하지 못할 것이다.", 
  "겪어보지 못한 자에게 전쟁이란 달콤한 것이다.",
  "전쟁은 누구도 좋아서 하는 게 아니오. 이건 의무이지. 국민이 침략의 희생자가 되었을 때 싸워서 스스로를 지키는 것 외에 다른 해결책은 없소.",
  "나무가 단단하면 곧 부러지고, 군대가 강하면 곧 망할것이다.",
  "국가간의 전쟁 역시도 우리가 이웃과 다투는 것과 같은 이유로 시작되는 것이다.",
  "도로써 군주를 보좌하는 이는 군사로 천하를 누르고자 하지 않는다. 결과가 좋으면 될 따름이요, 군사를 쓰지는 않는다.",
  "군대란 인간을 잡는 흉기요, 전쟁은 덕을 거스르는 것이며, 장수는 죽음을 내리는 관리다.따라서 전쟁은 부득이한 경우에만 하는 것이다.",
  "그냥 전쟁만 멈춰줘요, 그게 전부예요.",
  "그들은 노년기에 국가를 위한 아름답고 조화로운 죽음에 관하여 서술하였다. 그러나 현대전에서는 더 이상 아름답거나 조화로운 죽음은 존재하지 않는다. 당신은 아무 이유 없이 개처럼 죽을 것이다.",
  "그들은 자신들이 하는 일이 저주받을 짓임을 추호도 의심하지 않는다. 그들은 모두 평화를 원하기 때문이다. 그러나 지금, 그들은 무엇인가? 진정 사람인가? 아니면 일부 권력을 잡은 부도덕한 사람들의 움직이는 요새나 탄창인가?",
  "나는 전쟁이 좋다. 전쟁은 커다란 소풍과 같다.",
  "나라가 크더라도 전쟁을 좋아하게 되면 반드시 망하는 법이다. 또 아무리 천하가 태평하더라도 전쟁에 대한 만일의 준비를 잊어버리면 반드시 위험한 법이다.",
  "너희가 우리 군인 10명을 죽일 때 우리는 너희 편 1명을 죽일 테지만 결국 지치는 것은 너희들일 것이다.",
  "누구나 전쟁에서 자신이 죽는다고 생각하지 않는다. 자신은 살아남아서 죽은 전우들을 묻게 될 것이라고만 생각한다. 하지만 현실은 그렇지 않다.",
  "늙은이들이 전쟁을 선포한다. 그러나 싸워야 하고 죽어야 하는 것은 젊은이들이다.",
  "단순히 평화를 외친다고 해서 평화가 이루어지는 게 아니다. 평화는 그저 의미없는 한 단어일 뿐이다. 우리에게 필요한 건 영광스러운 평화다.",
  "당신은 전쟁에 관심이 없을지 몰라도, 전쟁은 당신에게 관심이 있다.",
  "더 이상 TV에서, 신문에서, 끔찍한 전쟁 소식이 없었으면 좋겠습니다. 세상의 모든 사람들이 하나로 이어지는 그런 평화의 세상이 올 것입니다. 이제 총소리는 게임 속에서만 들렸으면 좋겠습니다.",
  "땀 한 파인트는 피 한 갤런을 아끼게 한다.",
  "맨 먼저 전쟁을 일으킨 자에게 저주가 있으라",
  "몇천 명이란 사람을 살해하는 것은 외견상으로 훌륭한 이름이 주어진다. 전쟁은 영광의 기술이며 불멸의 명성을 부여한다.",];
  var axiomLength = axioms.length;

  var maps = ["푸른징 계곡", "진흙탕 싸움", "논밭", "펀치볼", "1번 국도", "한 평의 지옥", "핵 겨울"];
  var maplength = maps.length;

  var filter = ["뉴비"];


client.once('ready', () => {
  console.log('Bot running in the index file.');
  client.user.setPresence({
    game: {
      name: status,
      type: 'Watching',

    },
  }); //sets the bot's status to the default status
});

 
Streaming(client, {
  live :  "라이브 가능"
  // ,required : "undefined" // optional parameter, only use if you want to take action on people of a specific role
});

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};

units.sort((a, b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));       //sort the units by name

//start of commands

client.on('error', err => {
  console.log(err)
});
client.on('message', async message => {


  

   
  


  message.member = await message.guild.fetchMember(message.author);
  const args = message.content.split(' ');
  if(message.attachments.first())
  if(message.attachments.first().url.endsWith('.wargamerpl2') &&  message.channel.id !== '578977435710914560' && message.channel.id !== '578603904183435294' && message.channel.id !== '584806407186939928' && message.channel.id !== '615451491821420544') {
    commonCommands.replay(args, message);
  }

   // filter certain words in the messages --------------
  //  if(message.content === '뉴비') {
  //   message.reply('고인물이 무슨 뉴비냐?');
  //   return;
  //  }

//    if(message.content.includes('뉴비')) {
//     message.reply('고인물이 무슨 뉴비냐');
//     return;
// }


  


  if (message.author.bot) {
    return; //if the author of the message is the bot, do nothing.
  }

  if (!message.guild) { //If the message is sent via DMs.
    message.reply('WHY ARE YOU SUMMONING ME IN DMS MORTAL');
    return;
  }
  const capitalArgs = message.content.split(' ');
  for (let i = args.length - 1; i >= 0; i--) {
    args[i] = args[i];
  }
  var argsCommaSplit = message.content.split(',');
  var commandName = args.shift();
  if (!commandName.startsWith(COMMAND_CHAR)) {
    return;
  }
  commandName = commandName.slice(1);
  commandName = commandName.toLowerCase();


  const adminRoles = ['376252102843826176', '577607802197901332', '584124615647821857']; //defines the roles considered as admins and returns either true or false with 'admin'
  let admin;
  for (let i = adminRoles.length - 1; i >= 0; i--) {
    if(!message.member.roles) {
       admin = false;
       break;
    }
    if (message.member.roles.has(adminRoles[i])) {
      admin = true;
      break;
    }
    admin = false;
  }

  //allows you to check if youre an admin

  if (commandName === 'checkadmin') {
    message.reply(admin ? 'You have the power.' : 'You do not have anough power, mortal.');
  }

  if (commandName === 'ping') {
    message.reply('pong');
  }


 
  // write commands below this line ---------------------------------------------------


  

  switch (commandName) {

    case 'dynocommands':
      if (!admin) {
        message.reply('Not enough admin mayo to complete this action');
        return;
      }
      if (commoncommands === true) {
        message.reply('Turned off dyno commands');
        commoncommands = false;
        return;
      } else if (commoncommands === false) {
        message.reply('Turned on dyno commands');
        commoncommands = true;
        console.log(commoncommands);
        return;
      }
      break;
      //adds up all of the items said after !changestatus and changes them into the bot's status
    case 'test':
      message.channel.fetchMessages({
        limit: 5,
      }).then((messages) => console.log(Object.keys(messages)));


      break;
    case 'changestatus':
      var allArgs = '';
      for (let i = 0; i < args.length; i++) {
        allArgs += args[i].toLowerCase() + ' ';
      }
      if (message.author.id === '148830717617373184') {
        status = allArgs;
        client.user.setPresence({
          game: {
            name: status,
            type: 'WATCHING',
          },
        });
      } else {
        message.channel.send('You do not have enough mayonnaise to complete this action');
      }
      break;

      //checks if the arguement 0 (first thing after !changelimit) is a number, if it is, change the limit of units displayed with it

    case 'changelimit':
      if (!admin) {
        message.reply('You must be an admin to use this command');
      } else if (admin) {
        if (!isNaN(args[0])) {
          limit = args[0];
          message.channel.send('Changed unit limit to ' + limit);
        } else if (isNaN(args[0])) {
          message.channel.send('Please use a valid number');

        }
      }
      break;

      //same as !changelimit but changes the limit of matching units displayed in the list

    case 'changedisplaylimit':
      if (!admin) {
        message.reply('You must be an admin to use this command');
      } else if (admin) {
        if (!isNaN(args[0])) {
          displaylimit = args[0];
          message.channel.send('Changed display limit to ' + displaylimit);
        } else if (isNaN(args[0])) {
          message.channel.send('Please use a valid number'); // if args[0] is not a number, throw out args 0 and return this

        }
      }
      break;

      // displays the unit limit

    case 'limit':
      message.reply(limit);
      break;


    case 'displaylimit':
      message.reply(displaylimit);
      break;


   case 'similarity':
       argsCommaSplit[0] = argsCommaSplit[0].replaceAll(/(\w*!similarity\w*)*\s/gi, '').toLowerCase();
       argsCommaSplit[1] = argsCommaSplit[1].replaceAll(/\s/g, '').toLowerCase();
     var similarity = stringSimilarity.compareTwoStrings(argsCommaSplit[0], argsCommaSplit[1]);
   message.channel.send(Math.round(similarity * 100) + '%');
       break;

       case 'userinvite':
       commonCommands.userinvite(message);
       break;
    case 'tempflip':
      let result = Math.floor(Math.random() * 2)
      message.channel.send(result == 1 ? 'Heads' : "Tails")
      break;
      case 'git':
      commands.git(args, message, limit, displaylimit);
      break;
    case 'gitlist':
      commands.gitlist(args, message, limit, displaylimit);
      break;
      case 'list':
      commands.list(args, message, displaylimit);
      break;
    case 'gitpm':
    commands.gitpm(args, message);
      break;
    case 'gitspec':
    commands.gitspec(args, message, limit, displaylimit);
      break;
      case 'aptable':
        commands.aptable(args, message);
      break;
    case 'armor':
      commands.ke(args, message, heatdata);
    break;
    case 'ke':
      commands.ketable(args, message);
    break;
    case 'heat':
      commands.heattable(args, message);
    break;

    case "resetcommands":
      commonCommands.botcommands(client, admin);
      break;
    case 'invite':
    commonCommands.invite(message, admin, args);
    break;

    case 'vet':
    message.channel.send({files: ['./Pictures/Misc/VetTable.png']});
    break;

    case 'duckinfo':
      const embed = new Discord.RichEmbed()
        .setColor('GOLD')
        .setTitle('**Bootcamp/ Armory bot**')
        .setDescription('A bot developed by senorDickweed#7033 for the r/wargamebootcamp server, offers common commands and unit search functions, coded in discord.js, **for commands use !help**')
        .addField('Acknowledgements', '1: **Tyrnek#2495** for letting me do this lol \n 2: **Lawlzer#4013** for helping a lot on the code \n 3: **Mbetts#9468** for helping me a lot on the formatting and the code \n 4: **Phlogis#9776** for helping with the data aspect of the units \n 5: **Crankytoaster#1240** for telling me everything wrong with it lol \n 6: **rogertheshrubb3r#0862** for the amazing regexp search algorithm and more \n 5: **everyone** on the testing server that helped me test the bot')
        .addField('Code', 'https://github.com/duckthecuck/wargamebootcamp-bot')
        .addField('**한국어 번역**', 'DK');
      message.channel.send(embed);
      break;
      case 'code':
      message.reply('https://github.com/duckthecuck/wargamebootcamp-bot');
      break;

    case 'commands':
    case 'duckhelp':
    commonCommands.help(args, message);
    break;
    case 'adminhelp':
      commonCommands.adminhelp(args, message);
      break;

  }

  //디코방 역할 계급순 - 병사, 원사, 위관, 영관, 장성
  var ranks = ["707534156351013015","707534154652188673","707534152542584942", "707534233890979902","707534233240862721"];  

  if (commoncommands == true) {
    var lotto = Math.floor(Math.random() * axiomLength);
    switch (commandName) {
      case '신병':
        if (!message.member.roles.has('707534156351013015') && !message.member.roles.has('707534154652188673') && !message.member.roles.has('707534152542584942') && !message.member.roles.has('707534233890979902') && !message.member.roles.has('707534233240862721')) {
          message.member.addRole('707534156351013015');
          message.reply('워게임 입문을 환영합니다.');
          message.reply(axioms[lotto]);
          break;
        } else if (message.member.roles.has('707534156351013015')) {
          message.member.removeRole('707534156351013015');ㄴ
          message.reply('신병 계급 삭제 중...');
          break;
        } 

        if(message.member.roles.has('707534154652188673')){
          message.member.addRole('707534156351013015');
          message.member.removeRole('707534154652188673');
          message.reply('강등당하셨군요. 그렇다고 헬리 스팸은 하지 마세요.');
          break;
        }
        else {
          message.reply('영창가기 싫으면 계급 사칭하지 마세요');
          break;
        }

        message.reply('혹시 부캐를 파셨나요? 어떻게 신병으로 다시 입대하시죠?');
        break;
        case '부사관':
        if(message.member.roles.has('707534156351013015')){
          if (!message.member.roles.has('707534154652188673')) {
            message.member.addRole('707534154652188673');
            message.member.removeRole('707534156351013015');
            message.member.removeRole('707534152542584942');
            message.member.removeRole('707534233890979902');
            message.member.removeRole('707534233240862721');
            message.reply('충성! 원사 진급을 축하드립니다.');
            message.reply(axioms[lotto]);

            break;
          }
        } 
        
        // else {
        //   message.reply('영창가기 싫으면 계급 사칭하지 마세요');
        //   break;
        // }
        if (message.member.roles.has('707534154652188673')) {
          message.member.removeRole('707534154652188673');
          message.reply('부사관 계급 삭제 중...');
          break;
        }

        if(message.member.roles.has('707534152542584942')){
          message.member.addRole('707534154652188673');
          message.member.removeRole('707534152542584942');
          message.reply('강등당하셨군요.')
        } else {
          message.reply('영창가기 싫으면 계급 사칭하지 마세요');
          break;
        }

        break;
        case '위관':
          if(message.member.roles.has('707534154652188673')){
            if (!message.member.roles.has('707534152542584942')) {
          message.member.addRole('707534152542584942');
          message.member.removeRole('707534156351013015');
          message.member.removeRole('707534154652188673');
          message.member.removeRole('707534233890979902');
          message.member.removeRole('707534233240862721');
          message.reply('충성! 위관 진급을 축하드립니다.');
          message.reply(axioms[lotto]);

          break;
        }
       }
      //   else {
      //   message.reply('영창가기 싫으면 계급 사칭하지 마세요');
      //   break;
      //  }
        if (message.member.roles.has('707534152542584942')) {
          message.member.removeRole('707534152542584942');
          message.reply('위관 계급 삭제 중...');
          break;
        }

        if(message.member.roles.has('707534233890979902')){
          message.member.addRole('707534152542584942');
          message.member.removeRole('707534233890979902');
          message.reply('강등당하셨군요.')
        } else {
          message.reply('영창가기 싫으면 계급 사칭하지 마세요');
          break;
        }

        break;
        case '영관':
        if(message.member.roles.has('707534152542584942')){
        if (!message.member.roles.has('707534233890979902')) {
          message.member.addRole('707534233890979902');
          message.member.removeRole('707534156351013015');
          message.member.removeRole('707534154652188673');
          message.member.removeRole('707534152542584942');
          message.member.removeRole('707534233240862721');
          message.reply('충성! 영관 진급을 축하드립니다.');
          message.reply(axioms[lotto]);

          break;
          
        } 
      } 
      // else{
      //   message.reply('영창가기 싫으면 계급 사칭하지 마세요');
      //   break;
      // } 
      if (message.member.roles.has('707534233890979902')) {
          message.member.removeRole('707534233890979902');
          message.reply('영관 계급 삭제 중...');
          break;
        }

        if(message.member.roles.has('707534233240862721')){
          message.member.addRole('707534233890979902');
          message.member.removeRole('707534233240862721');
          message.reply('강등당하셨군요.')
        } else {
          message.reply('영창가기 싫으면 계급 사칭하지 마세요');
          break;
        }


        break;
        case '장성':
          if(message.member.roles.has('707534233890979902')){
        if (!message.member.roles.has('707534233240862721')) {
          message.member.addRole('707534233240862721');
          message.member.removeRole('707534156351013015');
          message.member.removeRole('707534154652188673');
          message.member.removeRole('707534152542584942');
          message.member.removeRole('707534233890979902');
          message.reply('충성! 장성 진급을 축하드립니다.');
          message.reply(axioms[lotto]);

          break;
        } 
      }
      // else {
      //             message.reply('영창가기 싫으면 계급 사칭하지 마세요');
      //             break;

      //   }
        
        if (message.member.roles.has('707534233240862721')) {
          message.member.removeRole('707534233240862721');
          message.reply('장군 계급 삭제 중...');
        } else {
          message.reply('영창가기 싫으면 계급 사칭하지 마세요');
          break;
        }
        break;
        
      case '큐':
        
        if (!message.member.roles.has('707528572872556544')) {
          message.member.addRole('707528572872556544');
          message.reply('님께서 게임을 찾는 중...');

        //게임 상대 찾는 중 역할 key
        let roleID = "707528572872556544";
        let membersWithRole = message.guild.roles.get(roleID).members;
        message.channel.send(`현재 ${membersWithRole.size}명이 게임 상대를 찾고 있습니다.`);
        
        
        let player_rec = "계급이 없으셔서 추천 상대를 못 찾겠네요...어서 명령어 '!신병'으로 입대하세요!";
        var ranks = ["707534156351013015","707534154652188673","707534152542584942", "707534233890979902","707534233240862721"];  
        var playablerank = [];

        // message.channel.send("DK가 일을 안해서 추천을 못해주겠네요");
        // break;

        //게임 찾는 플레이어가 병사일 경우
        // console.log(message.member.roles.has(ranks[0])
        if (message.roles.has(ranks[0])){
          playablerank = ranks.slice(0,2);
          console.log(playablerank);

        
          // let rec1 = message.member.roles.get(playablerank[0]);
          // console.log(rec1);
          // let rec2 = client.users.get(playablerank[1]);
          // console.log(rec2);
          // let rec3 = rec1 + rec2;

          // console.log(rec3);
          
          if(member.roles.cache.has(playablerank[0])){
            player_rec = member.roles.values().value + "님, 저랑 실력 비슷하신거 같은데 한 판 하실?";
            console.log(message.member.roles);
          } else {
            player_rec = "추천할 만한 플레이어들이 없네요. 근데 그냥 실력부터 먼저 올리시는게...";
          }
        }

        //게임 찾는 플레이어가 부사관일 경우
        if (message.member.roles.has(ranks[1])){

          playablerank = ranks.slice(1,4);
          const hasplayablerank = message.member.roles.some(role => playablerank.includes(role.name));

          if(hasplayablerank){
            player_rec = member.roles.values().value + "님, 저랑 실력 비슷하신거 같은데 한 판 하실?";
            console.log(message.member.roles);
          } else {
            player_rec = "추천할 만한 병사/부사관/영관 플레이어들이 없네요.";
          }

        }

        //게임 찾는 플레이어가 위관일 경우
        if (message.member.roles.has(ranks[2])){


          playablerank = ranks.slice(2,5);
          const hasplayablerank = message.member.roles.some(role => playablerank.includes(role.name));

          if(hasplayablerank){
            player_rec = member.roles.values().value + "님, 저랑 실력 비슷하신거 같은데 한 판 하실?";
            console.log(message.member.roles);
          } else {
            player_rec = "추천할 만한 부사관/위관/영관 플레이어들이 없네요.";
          }

        }

        //게임 찾는 플레이어가 영관일 경우
        if (message.member.roles.has(ranks[3])){
          playablerank = ranks.slice(3,6);
          const hasplayablerank = message.member.roles.some(role => playablerank.includes(role.name));

          if(hasplayablerank){
            player_rec = member.roles.values().value + "님, 저랑 실력 비슷하신거 같은데 한 판 하실?";
            console.log(message.member.roles);
          } else {
            player_rec = "추천할 만한 위관/영관/장성 플레이어들이 없네요.";
          }
        }

        //게임 찾는 플레이어가 장성일 경우
        if (message.member.roles.has(ranks[4])){

          playablerank = ranks.slice(4,6);
          const hasplayablerank = message.member.roles.some(role => playablerank.includes(role.name));

          if(hasplayablerank){
            player_rec = member.roles.values().value + "님, 저랑 실력 비슷하신거 같은데 한 판 하실?";
            console.log(message.member.roles);
          } else {
            player_rec = "여기 다 못하는 사람들 밖에 없어서 추천을 못하겠네요.";
          }
        }
    
        message.channel.send(player_rec);
      }

        if (message.member.roles.has('707528572872556544')) {
          message.member.removeRole('707528572872556544');
          message.reply('님께서 탈주하신다네요...');
        }

        
        break;

      case '돌림판':
        message.reply("1대1 랜덤 맵은.....")
        var ranmap = Math.floor(Math.random() * maplength);
        message.reply(maps[ranmap]);
        break;
      case 'unspecguide':
        message.reply('Here is the beginner unspec deck building guide: https://www.reddit.com/r/wargamebootcamp/comments/5m0wmz/meta_a_guide_to_unspec_deckbuilding/');
        break;
      case 'specprimer':
        message.reply('Here is the spec primer: https://www.reddit.com/r/wargamebootcamp/comments/8pppyi/meta_a_basic_primer_to_spec_decks/');
        break;
      case 'honguide':
        message.reply('Here is the hon beginner guide: https://honhonhonhon.wordpress.com/how-to-get-started-with-wargame/');
        break;
      case 'razzguide':

       
        message.reply("Here is Razzmann's video guides: https://www.youtube.com/playlist?list=PL3d-ZYWK9TPkb8zuvxNRArw1gyi1fgb0R");
        break;
      case 'keyvalues':
        message.reply('참고하세요', {
          files: ['./Data/keyvalues.txt']
        });
        break;
      case 'armorytool':
        message.reply('Here is a link to the armory tool: https://forums.eugensystems.com/viewtopic.php?t=59265');
        break;
      case 'replayfolder':
        message.reply('here is the directory for the replay folder: \n\n *Windows: C:\\Users%username%\\Saved Games\\EugenSystems\\WarGame3* \n\nLinux: ~/.config/EugenSystems/Wargame3/saves \n\n Mac: [Hard drive] > Users > [your account] > Library > Application Support > EugenSystems > Wargame3 > SavedGames');
        break;
      case 'rof':
        message.reply('Here is a link to the rate of fire spreadsheet: https://docs.google.com/spreadsheets/d/1dx28wRZ_3ofnP7kWKcoziGpPw2tOAJcixnuiKjJPL-A/edit#gid=1401351233');
        break;
      case 'bling':
        message.reply('here is the bling guide: https://steamcommunity.com/sharedfiles/filedetails/?id=355698402');
        break;
      case 'progression':
        message.reply('RD Player Progression: What the fuck am I doing -> Ordering units around -> Mastering hotkeys and keybinds -> Tactical level micro: Fundamentals of Infantry, Tanks, and Smoke -> Tactical Micro: Support units -> Tactical Micro: Air Power -> Learning what makes units good -> Macro thinking: Force Dispositions, Capabilities, & Concentration -> Macro thinking: Reacting to & Countering cheese -> Macro Thinking: Teamgame Considerations');
        break;
      case 'rankedmaps':
        message.reply('1v1: \n\n **Mud fight** \n\n **Plunjing valley** \n\n **Paddy field** \n\n **Punchbowl** \n\n **Hell in a very small place** \n\n **Highway to seoul** \n\n **Nuclear winter**');
        break;
    }
  }
});

// DONT MIND THIS CODE, i know its absolute shit, but im too lazy to make it better lol

client.on('message', message => {
  if (message.content.startsWith('!mud')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/mud.png'],
    });
  } else if (message.content.startsWith('!plunjing')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/plunjing.png'],
    });
  } else if (message.content == '!paddy') {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/paddy.png'],
    });
  } else if (message.content.startsWith('!punchbowl')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/punchbowl.png'],
    });
  } else if (message.content.startsWith('!hell')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/hell.png'],
    });
  } else if (message.content.startsWith('!highway')) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/highway.png'],
    });
  } else if (message.content.startsWith(`!nuclear`)) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/nuclear.png'],
    });
  } else if (message.content.startsWith(`!hopandglory`)) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/hopandglory.png'],
    });
  } else if (message.content == `!paddy2v2`) {
    message.channel.send('here is the map', {
      files: ['./Pictures/Map Pictures/paddy2v2.png'],
    });
  }
});



client.login(token);

// message.member = await message.guild.fetchMember(message.author.id);
// if(message.guild.id == '304436901165662209' ) {
//  if(message.author.id == '426117986261139456' || message.author.id == '148830717617373184' || message.author.id == '322561952041795584' || message.author.id == '232989841107845121' || message.author.id == '540716742968737800' || message.author.id == '148830717617373184' || message.author.id == '198236277659795475') {
//      savemessage = new MSGES({
//      message_content: message.content,
//      message_author: message.author.id,
//      message_channel: message.channel,
//      })
//          await savemessage.save();
//  }
// }
// case "imitate":
//       if(message.channel.parentID == '387109170887000075' || message.channel.parentID == '387108133249482753') return;
//       let allmessages = await MSGES.find();
//       commonCommands.imitate(args, message, allmessages);
//       break;


//*live notification code */]
