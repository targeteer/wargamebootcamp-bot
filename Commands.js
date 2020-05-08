const Discord = require('discord.js');
const help = ('**!duckinfo** - Displays info about the bot, code, and Acknowledgements \n **!gitlist <unit>** - Displays the full stats of any units with the matching name \n **!git <unit>** - Displays a message where you can scroll through the units using reactions \n **!gitpm <unit>** - Same as git but sends the results through pm \n **!gitspec <unit>** - Same as git but requires a specific unit name \n **!list <unit>** - Lists all matching units \n **!ke <ke value>** - Displays a table of armor damage values for that ke value \n **!heat <heat value>** - Displays a table of armor damage for that heat value \n **!armor <0 - 25 armor>** - Displays the damage resistance of an armor value towards ke and heat \n **!<map>** - Displays a map of a ranked map \n  **!vet** - Shows Vlern\'s table of accuracy with upvetting \n **!userinvite** - Makes a 2 hour, 1 use invite for you to invite someone \n **!rookie** - Gives you the rookie role \n **!lfg** - Adds you to the looking for game pool \n **!unspecguide** - A beginner deck building guide \n **!specprimer** - A primer to spec decks and how to counter them \n **!honguide** - A beginner\'s guide to wargame \n **!razzguide** - Razzmann\'s video wargame guides \n **!keyvalues** - Values worth remembering  \n **!armorytool** - A tool for viewing hidden unit stats \n **!replayfolder** - Folder Where game replays are stored \n **!rof** - A Rate of Fire cheatsheet \n **!bling** - How to get colors and tags in wargame \n **!progression** - Reccomended progression guide for beginners\n **!rankedmaps** - List of maps in the ranked pool \n\n **Changelog**: https://docs.google.com/document/d/1WAlUqnyoh8ZZCVZwXd95em5sXpuMG4iSiE2ODPG7iSE/edit?usp=sharing \n\n **For any bugs or questions, pm senorDickweed#7033**');
const adminhelp = ('List of admin commands: \n**!invite <duration in minutes> <uses>** - Creates an invite link, set duration to zero to make it infinite duration \n **!changelimit <number>** - Changes the limit of matching units to display fully \n **!changedisplaylimit <number>** - Changes the limit of units to be shown in a name list \n **!dynocommands** - Turns on / off the dyno commands (!unspec !rookie, etc)');
const MSGES = require('./Mongoose/messageSchema.js');
const deck = require('./Data/Deck.js');

module.exports.userinvite = (message) => {
  message.channel.createInvite({
    maxAge: Number((2 * 60) * 60),
    maxUses: Number(1),
  }).then(m => {
    message.reply('created invite: ' + m);
  }).catch(err => {
    console.log(err);
  });
};

module.exports.help = (args, message) => {
  const filter = (reaction, user, member) => {
    return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  message.reply(help).then(m => {
    m.react('🗑');
    m.awaitReactions(filter, {
        max: 1,
        time: 5000,
        errors: ['Time'],
      })
      .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '🗑') {
          m.delete().then(() => {
            message.delete(message);
          });
        }
      }).catch(err => {
        m.clearReactions();
      });
  });
};

module.exports.adminhelp = (args, message) => {
  const filter = (reaction, user, member) => {
    return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
  };
  message.reply(adminhelp).then(m => {
    m.react('🗑');
    m.awaitReactions(filter, {
        max: 1,
        time: 5000,
        errors: ['Time'],
      })
      .then(collected => {
        const reaction = collected.first();
        if (reaction.emoji.name === '🗑') {
          m.delete().then(() => {
            message.delete(message);
          });
        }
      }).catch(err => {
        m.clearReactions();
      });
  });
};


module.exports.invite = (message, admin, args) => {
  const duration = args[0] * 60;
  const uses = args[1];
  if(!admin) {
    message.reply('Must be an admin to use this command');
    return;
  }
  if(isNaN(duration) || isNaN(uses)) {
    message.reply('Please use a number for the inputs');
    return;
  }

  message.channel.createInvite({
    maxAge: Number(duration),
    maxUses: Number(uses),
  }).then(m => {
    message.channel.send('created invite: ' + m);
  }).catch(err => {
    console.log(err);
  });


};

module.exports.botcommands = (client, admin) => {

  if(admin) {
  client.channels.get("506955344996597771").bulkDelete(2);
  client.channels.get("506955344996597771").send(help);
  } else {
    return;
  };
  };

  const wtf = require('wtf_wikipedia');
  const fs = require('fs');
  const search = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=';
  const fetch = require('node-fetch');
  const w = require('./Formatting.js');

  module.exports.wikipedia = (message, args) => {
      var allArgs = '';
      for (let i = 0; i < args.length; i++) {
        allArgs += args[i].toLowerCase() + ' ';
      }
      allArgs = allArgs.trim();
      allArgs = allArgs.replace(/[\s+]/g, '_');
      let searchurl = search + allArgs;
      searchurl = searchurl.replace(/[\s+]/g, '_');
        fetch(searchurl)
      .then(res => res.json())
      .then((data) => {
        if (data[1].length === 0) {
             let embed = new Discord.RichEmbed()
                 .setAuthor('No results', 'https://imgur.com/ab2t4Kh.png')
                 .setTitle('Error: There are no search results for ' + allArgs.replace(/[\_]/g, ' ') + ' :( . Try something else!')
                 .setColor('WHITE');
              message.channel.send(embed);
             return;
         }
         let index = 0;
         let listNumbers = ["1⃣", "2⃣", "3⃣", "4⃣", "5⃣", "6⃣", "7⃣", "8⃣", "9⃣"];
          let usedListNumbers = [];
          let articleListText = "";
          if(data[1].length == 1) {index = 0; w.wformatting(index, data, message); return; }
          if(data[1].length === 10) data[1].length = data[1].length - 1;

          for (let i = 0; i < 20; i++) {
            if(i === data[1].length) break;
              articleListText += listNumbers[i] + "  " + data[1][i];
              articleListText += "\n";
          }
          let embed = new Discord.RichEmbed()
              .setAuthor('Results', 'https://imgur.com/ab2t4Kh.png')
              .addField('Here are the search results for:' + allArgs, articleListText + "\n")
              .setFooter("Use the reactions to select an article to get the description and link.")
              .setColor('WHITE');
              const pagesFilter = (reaction, user) => user.id == message.author.id;
          message.channel.send(embed)
          .then(async msg => {
              for (const reaction of listNumbers) {
                if(index === data[1].length) break;
                await msg.react(reaction);
                index++;
              }


            const pages =  new Discord.ReactionCollector(msg, pagesFilter, {
              time: 60000,
            });

            pages.on('collect', r => {
              if(r.emoji.name === listNumbers[-1]) {index = -1; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[0]) {index = 0; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[1]) {index = 1; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[2]) {index = 2; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[3]) {index = 3; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[4]) {index = 4; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[5]) {index = 5; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[6]) {index = 6; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[7]) {index = 7; w.wformatting(index, data, message); msg.delete(); return;}
              else if(r.emoji.name === listNumbers[8]) {index = 8; w.wformatting(index, data, message); msg.delete(); return;}
            });
            pages.on('end', (collected, reason) => {
              if(reason == 'time') {
                msg.delete().catch(err => {
                });
              }
            });
          });
        });
  };

  module.exports.replay = (args, message) => {
  const url = (message.attachments.first().url);
  const fileType = require('file-type');

  fetch(url)
      .then(res => res.buffer())
      .then(buffer => {
          fileType(buffer)
          content = buffer;
          const jsonsize = content.readInt16BE(0x32);  
          let json =  content.slice( 0x38, 0x38 + jsonsize).toString();
          json = JSON.parse(json);
          const user1 = Object.values(json)[1];
          json.game.Map = json.game.Map.replace(/\_/g, ' ');

          const income = {
              "1":"매우 낮음 -40%",
              "2":"낮음 - 20%",
              "3":"보통 -0%",
              "4":"높음 +20%",
              "5":"매우 높음 +40%"
          }
          
          const map = {
              "Conquete 2x3 Gangjin":"진흙탕 싸움",
              "Conquete 2x3 Hwaseong":"핵 겨울",
              "Conquete 3x3 Muju":"푸른징 계곡",
              "Conquete 2x3 Tohoku Alt":"논밭",
              "Conquete 3x3 Muju Alt":"펀치볼",
              "Conquete 3x3 Marine 3 Reduite Terrestre":"한 평의 지옥",
              "Conquete 3x3 Highway Small":"1번 국도"
          }
          if(map.hasOwnProperty(json.game.Map))
              json.game.Map = map[json.game.Map];

          if (income.hasOwnProperty(json.game.IncomeRate))
              json.game.IncomeRate = income[json.game.IncomeRate];

          
          
          if(Object.values(json)[3] !== undefined || Object.values(json)[2] == undefined) {
              return;
          }
          

          let user2;
          if(Object.values(json)[2] !== undefined) {
          user2 = Object.values(json)[2];
          }
          let u1rank;
          let u2rank;

          let users = [user1, user2];
          let userRanks = [u1rank, u2rank];
          
          for (let i = 0; i < users.length; i++){
            if (users[i].PlayerElo <= 1500){
              userRanks[i] = "이등병"
            } else if (users[i].PlayerElo > 1500 && users[i].PlayerElo <= 1520){
              userRanks[i] = "상병"
            }else if (users[i].PlayerElo > 1520 && users[i].PlayerElo <= 1544){
              userRanks[i] = "병장"
            }else if (users[i].PlayerElo > 1544 && users[i].PlayerElo <= 1574){
              userRanks[i] = "원사"
            }else if (users[i].PlayerElo > 1574 && users[i].PlayerElo <= 1610){
              userRanks[i] = "소위"
            }else if (users[i].PlayerElo > 1610 && users[i].PlayerElo <= 1653){
              userRanks[i] = "중위"
            }else if (users[i].PlayerElo > 1653 && users[i].PlayerElo <= 1705){
              userRanks[i] = "대위"
            }else if (users[i].PlayerElo > 1704 && users[i].PlayerElo <= 1767){
              userRanks[i] = "소령"
            }else if (users[i].PlayerElo > 1767 && users[i].PlayerElo <= 1841){
              userRanks[i] = "중령"
            }else if (users[i].PlayerElo > 1841 && users[i].PlayerElo <= 1931){
              userRanks[i] = "대령"
            }else if (users[i].PlayerElo > 1931 && users[i].PlayerElo <= 2039){
              userRanks[i] = "준장"
            }else if (users[i].PlayerElo > 2039 && users[i].PlayerElo <= 2169){
              userRanks[i] = "소장"
            }
            else if (users[i].PlayerElo > 2169 && users[i].PlayerRank <= 3){
              userRanks[i] = "대장"
            }
            else if (users[i].PlayerElo > 2169 && users[i].PlayerRank == 1){
              userRanks[i] = "원수"
            }
          }
          console.log("Analyzing a replay....");

          let embed = new Discord.RichEmbed()
              .setTitle(json.game.ServerName)
              .setDescription(
               '\n **맵**: ' + json.game.Map + 
               '\n **시작 포인트**: ' + json.game.InitMoney +
               '\n **승리 점수**: ' + json.game.ScoreLimit +
               '\n **경기 시간**: ' + (json.game.TimeLimit / 60 + '분') +
               '\n **포인트 증가 속도**: ' + json.game.IncomeRate)
              .setColor('GOLD')
              .addField(user1.PlayerName, ' **레벨**: ' + user1.PlayerLevel + 
              '\n **랭크 점수 | 순위**: ' + Math.round(user1.PlayerElo) + ' | ' + userRanks[0] +
              '\n **덱**: ' + deck.decode(user1.PlayerDeckContent)[0] + 
              '\n **덱 코드**: ' + user1.PlayerDeckContent + 
              '\n **덱 이름**: ' + user1.PlayerDeckName +
              '\n **팀**: ' + (user1.PlayerAlliance - - 1), true);
              
             
          // let user2 = Object.values(json)[2];
          embed.addField(user2.PlayerName, ' **레벨**: ' + user2.PlayerLevel + 
              '\n **랭크 점수 | 순위**: ' + Math.round(user2.PlayerElo) + ' | ' + userRanks[1] +
              '\n **덱**: ' + deck.decode(user2.PlayerDeckContent)[0] + 
              '\n **덱 코드**: ' + user2.PlayerDeckContent + 
              '\n **덱 이름**: ' + user2.PlayerDeckName +
              '\n **팀**: ' + (user2.PlayerAlliance - - 1), true);

                     
            message.channel.send(embed);

              
              
         
      })
      .then(type => { /* ... */ });

     
  }
