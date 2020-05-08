
String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.replace(new RegExp(search, 'g'), replacement);
};
const wtf = require('wtf_wikipedia');
const fetch = require('node-fetch');
const Discord = require('discord.js');
const moment = require('moment');

module.exports.wformatting = (index, data, message) => {
  const url = data[3][index];
  data[1][index].trim();
  let input = data[1][index];
  input = input.replace(/[\s+]/g, '_');
  (async () => {;
    var doc = await wtf.fetch(input);
    let doc2 = doc.images();

    let description = '';
    let title = '**' + doc.title + '**';
    doc = doc.json();
    for(let i = 0; i < doc.sections[0].paragraphs[0].sentences.length; i++) {
      description = description +  ' ' + doc.sections[0].paragraphs[0].sentences[i].text;
    }
    let paragraph2 = '';
    if(doc.sections[0].paragraphs[1] !== undefined) {
    for(let i = 0; i < doc.sections[0].paragraphs[1].sentences.length; i++) {
      paragraph2 = paragraph2 + ' ' + doc.sections[0].paragraphs[1].sentences[i].text;
    }
    }
    let fulldescription = description + '\n\n' + paragraph2;
    if(fulldescription.length > 2000) fulldescription.length = 1500;
    fulldescription = fulldescription + '...';

    let image = '';
    if(doc2[0] !== undefined) {
      image = doc2[0].url();
    }
    // console.log(JSON.stringify(doc));
    const embed = new Discord.RichEmbed()
    .setAuthor('Entry for ' + input.replace(/[\_+]/g, ' '), 'https://imgur.com/ab2t4Kh.png')
    .setTitle(data[1][index])
    .setURL(url)
    .setDescription(fulldescription)
    .setThumbnail(image)
    .setColor('WHITE')
    .setFooter('Via wikipedia.com • Today at ' + moment().format('LTS'), 'https://imgur.com/yBUUNmd.png');
    const filter = (reaction, user, member) => { //make a filter of only the reaction wastebasket made by the user
      return ['🗑'].includes(reaction.emoji.name) && user.id === message.author.id;
    };
    message.channel.send(embed).then(m => {
      m.react('🗑');
      m.awaitReactions(filter, {
          max: 1,
          time: 7000,
          errors: ['Time'],
        })
        .then(collected => {
          const reaction = collected.first();
          if (reaction.emoji.name === '🗑') {
            m.delete().then(() => {
                message.delete(message).catch(err => { });
            });
          }
        }).catch(err => {
          m.clearReactions().catch(err => {});
        });
    });
    })();

};

module.exports.formatting = (i) => {

  if (i.Name === '') {
    return;
  }


  i.Weapon2Type = i.Weapon2Type.replaceAll('LAW', 'AT');
  i.Weapon3Type = i.Weapon3Type.replaceAll('LAW', 'AT');

  // i.Name = i.Name.replaceAll('%', ' ');

  let weapon1round;
  let weapon2round;
  let weapon3round;
  let weapon4round;
  let weapon5round;
  let weapon6round;
  let weapon7round;
  let weapon8round;

  let proto;

  let armorfront;
  let armorsides;
  let armorrear;
  let armortop;

  const weapon1rof = Math.round(60 * i.Weapon1ShotsPerSalvo / ((i.Weapon1ShotsPerSalvo - 1) * i.Weapon1TimeBetweenShots - -i.Weapon1TimeBetweenSalvos));
  const weapon2rof = Math.round(60 * i.Weapon2ShotsPerSalvo / ((i.Weapon2ShotsPerSalvo - 1) * i.Weapon2TimeBetweenShots - -i.Weapon2TimeBetweenSalvos));
  const weapon3rof = Math.round(60 * i.Weapon3ShotsPerSalvo / ((i.Weapon3ShotsPerSalvo - 1) * i.Weapon3TimeBetweenShots - -i.Weapon3TimeBetweenSalvos));
  const weapon4rof = Math.round(60 * i.Weapon4ShotsPerSalvo / ((i.Weapon4ShotsPerSalvo - 1) * i.Weapon4TimeBetweenShots - -i.Weapon4TimeBetweenSalvos));
  const weapon5rof = Math.round(60 * i.Weapon5ShotsPerSalvo / ((i.Weapon5ShotsPerSalvo - 1) * i.Weapon5TimeBetweenShots - -i.Weapon5TimeBetweenSalvos));
  const weapon6rof = Math.round(60 * i.Weapon6ShotsPerSalvo / ((i.Weapon6ShotsPerSalvo - 1) * i.Weapon6TimeBetweenShots - -i.Weapon6TimeBetweenSalvos));
  const weapon7rof = Math.round(60 * i.Weapon7ShotsPerSalvo / ((i.Weapon7ShotsPerSalvo - 1) * i.Weapon7TimeBetweenShots - -i.Weapon7TimeBetweenSalvos));
  const weapon8rof = Math.round(60 * i.Weapon8ShotsPerSalvo / ((i.Weapon8ShotsPerSalvo - 1) * i.Weapon8TimeBetweenShots - -i.Weapon8TimeBetweenSalvos));

  let rookieavail = ('<:신병:583396237936427039>' + i.RookieDeployableAmount + '   ');
  let trainedavail = ('<:기간병:583396237655670825>' + i.TrainedDeployableAmount + '   ');
  let hardenedavail = ('<:숙련병:583396237626048517>' + i.HardenedDeployableAmount + '   ');
  let veteranavail = ('<:정예병:583396237550813229>' + i.VeteranDeployableAmount + '   ');
  let eliteavail = ('<:최정예병:583396237601013779>' + i.EliteDeployableAmount + '   ');


  const redfor = {


    "Poland": ":flag_pl:",
    'Czechoslavakia': ':flag_cz:',
    // 'Soviet Union': '<:flag_sr:581691631523069952>',
    'Soviet Union': '<:soviet:702534061356482680>',
    //유고슬라비아, 동독 이모티콘 없음
    'Yugoslavia': '<:emote:581895502568620110>',
    'Finland': ':flag_fi:',
    'East Germany': '<:unknown:581897376000638996>',
    'China': ':flag_cn:',
    // 'North Korea': '<:download:581897628959375372>',
    'North Korea': ':flag_kp:',


  };

  const blufor = {

    "France": ":flag_fr:",
    'Canada': ':flag_ca:',
    'Sweden': ':flag_se:',
    'The Netherlands': ':flag_nl:',
    'ANZAC': ':flag_au:',
    'Israel': ':flag_il:',
    'United Kingdom': ':flag_gb:',
    'Japan': ':flag_jp:',
    'United States': ':flag_us:',
    'West Germany': ':flag_de:',
    'Denmark': ':flag_dk:',
    'South Korea': ':flag_kr:',
    'Norway': ':flag_no:',

  };

  const stealth = {
    '1': '매우 나쁨',
    '1.25': '나쁨',
    '1.5': '보통',
    '2': '좋음',
    '2.5': '매우 좋음',
    '3': '탁월함',
  };

  const groundOptics = {
    '40': '매우 나쁨',
    '60': '나쁨',
    '80': '보통',
    '120': '좋음',
    '170': '매우 좋음',
    '220': '탁월함',
  };


  if (groundOptics.hasOwnProperty(i.OpticalStrengthGround)) {
    i.OpticalStrengthGround = groundOptics[i.OpticalStrengthGround];
  }

  if (stealth.hasOwnProperty(i.Stealth)) {
    i.Stealth = stealth[i.Stealth];
  }

  if (blufor.hasOwnProperty(i.MotherCountry)) {
    i.MotherCountry = blufor[i.MotherCountry];
    color = "BLUE";
  } else if (redfor.hasOwnProperty(i.MotherCountry)) {
    i.MotherCountry = redfor[i.MotherCountry];
    color = "RED";
  }

  if (i.Weapon1HE < 1) {
    weapon1round = i.Weapon1HE;
  } else {
    weapon1round = Math.trunc(i.Weapon1HE);
  };

  if (i.Weapon2HE < 1) {
    weapon2round = i.Weapon2HE;
  } else {
    weapon2round = Math.trunc(i.Weapon2HE);
  };

  if (i.Weapon3HE < 1) {
    weapon3round = i.Weapon3HE;
  } else {
    weapon3round = Math.trunc(i.Weapon3HE);
  };

  if (i.Weapon4HE < 1) {
    weapon4round = i.Weapon4HE;
  } else {
    weapon4round = Math.trunc(i.Weapon4HE);
  };

  if (i.Weapon5HE < 1) {
    weapon5round = i.Weapon5HE;
  } else {
    weapon5round = Math.trunc(i.Weapon5HE);
  };

  if (i.Weapon6HE < 1) {
    weapon6round = i.Weapon6HE;
  } else {
    weapon6round = Math.trunc(i.Weapon6HE);
  };

  if (i.Weapon7HE < 1) {
    weapon7round = i.Weapon7HE;
  } else {
    weapon7round = Math.trunc(i.Weapon7HE);
  };

  if (i.Weapon8HE < 1) {
    weapon8round = i.Weapon8HE;
  } else {
    weapon8round = Math.trunc(i.Weapon8HE);
  };



  if (i.ArmorFrontSplashResistant.toLowerCase() === 'true') {
    armorfront = '0';
  } else {
    armorfront = i.ArmorFront;
  }
  if (i.ArmorSidesSplashResistant.toLowerCase() === 'true') {
    armorsides = '0';
  } else {
    armorsides = i.ArmorSides;
  }
  if (i.ArmorRearSplashResistant.toLowerCase() === 'true') {
    armorrear = '0';
  } else {
    armorrear = i.ArmorRear;
  }
  if (i.ArmorTopSplashResistant.toLowerCase() === 'true') {
    armortop = '0';
  } else {
    armortop = i.ArmorTop;
  }

  if (i.IsPrototype.toLowerCase() === 'false') {
    proto = '**프로토타입 아님**';
  } else if (i.IsPrototype.toLowerCase() === 'true') {
    proto = '**프토로타입**';
  }

  if (i.RookieDeployableAmount !== '0') {
    rookieavail = ('<:신병:583396237936689155> **' + i.RookieDeployableAmount + '**   ');
  };
  if (i.TrainedDeployableAmount !== '0') {
    trainedavail = ('<:기간병:583396237735362593> **' + i.TrainedDeployableAmount + '**   ');
  };
  if (i.HardenedDeployableAmount !== '0') {
    hardenedavail = ('<:숙련병:583396237890551808> **' + i.HardenedDeployableAmount + '**   ');
  };
  if (i.VeteranDeployableAmount !== '0') {
    veteranavail = ('<:정예병:583396237873643529> **' + i.VeteranDeployableAmount + '**   ');
  };
  if (i.EliteDeployableAmount !== '0') {
    eliteavail = ('<:최정예병:583396238053867558> **' + i.EliteDeployableAmount + '**   ');
  };

  // the dude that made the final data csv bungled the helo range for autocannons

  if (i.Weapon1Type == 'Autocannon' && Math.trunc(i.Weapon1RangeGround) > 1575) {
    i.Weapon1RangeHelicopters = i.Weapon1RangeGround - 175;
  } else if (i.Weapon1Type == 'Autocannon' && Math.trunc(i.Weapon1RangeGround) <= 1575) {
    i.Weapon1RangeHelicopters = i.Weapon1RangeGround;
  }
  if (i.Weapon2Type == 'Autocannon' && Math.trunc(i.Weapon2RangeGround) > 1575) {
    i.Weapon2RangeHelicopters = i.Weapon2RangeGround - 175;
  } else if (i.Weapon2Type == 'Autocannon' && Math.trunc(i.Weapon2RangeGround) <= 1575) {
    i.Weapon2RangeHelicopters = i.Weapon2RangeGround;
  }
  if (i.Weapon3Type == 'Autocannon' && Math.trunc(i.Weapon3RangeGround) > 1575) {
    i.Weapon3RangeHelicopters = i.Weapon3RangeGround - 175;
  } else if (i.Weapon3Type == 'Autocannon' && Math.trunc(i.Weapon3RangeGround) <= 1575) {
    i.Weapon3RangeHelicopters = i.Weapon3RangeGround;
  }

  //defaults

  let title = ('**' + i.Name.toUpperCase() + ('%', ' ') + '**');

  let availability = (rookieavail + trainedavail + hardenedavail + veteranavail + eliteavail);

  let accuracy = (+' | **명중률**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

  if (i.Weapon1HitProbability === '') {
    accuracy = '';
  };

  let description = ('**가격**: ' + i.Price + ' | **장갑: ** 전면: ' + armorfront + ' | 측면: ' + armorsides + ' | 후면: ' + armorrear + ' | 상면: ' + armortop);

  let category = ('**기본 정보** | **국가**: ' + i.MotherCountry + ' | ' + proto);

  let movement = ('**이동**', '**종류**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **스텔스**: ' + i.Stealth + ' \n **지상 관측**: ' + i.OpticalStrengthGround);

  let weapon1 = ('**무기 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', ** ' + i.Weapon1Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon1RangeGround) + ' - ' + Math.trunc(i.Weapon1RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon1RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon1DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon1DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon1AP + ' | **HE(고폭)**: ' + weapon1round + ' | **살보**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon1SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon1rof + ' | **명중률**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

  let weapon2 = ('**무기 2**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', ** ' + i.Weapon2Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon2RangeGround) + ' - ' + Math.trunc(i.Weapon2RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon2RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon2DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon2DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon2AP + ' | **HE(고폭)**: ' + weapon2round + ' | **살보**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon2SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon2rof + ' | **명중률**: ' + Math.trunc(i.Weapon2HitProbability * 100) + '%');

  let weapon3 = ('**무기 3**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', ** ' + i.Weapon3Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon3RangeGround) + ' - ' + Math.trunc(i.Weapon3RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon3RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon3DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon3DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon3AP + ' | **HE(고폭)**: ' + weapon3round + ' | **살보**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon3SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon3rof + ' | **명중률**: ' + Math.trunc(i.Weapon3HitProbability * 100) + '%');

  let weapon4 = ('**무기 4**: ' + i.Weapon4Name + ', ' + i.Weapon4Caliber + ' x' + Math.trunc(i.Weapon4DisplayedAmmunition) + ', ** ' + i.Weapon4Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon4RangeGround) + ' - ' + Math.trunc(i.Weapon4RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon4RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon4RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon4DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon4DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon4AP + ' | **HE(고폭)**: ' + weapon4round + ' | **살보**: ' + Math.trunc(i.Weapon4ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon4SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon4rof + ' | **명중률**: ' + Math.trunc(i.Weapon4HitProbability * 100) + '%');

  let weapon5 = ('**무기 5**: ' + i.Weapon5Name + ', ' + i.Weapon5Caliber + ' x' + Math.trunc(i.Weapon5DisplayedAmmunition) + ', ** ' + i.Weapon5Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon5RangeGround) + ' - ' + Math.trunc(i.Weapon5RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon5RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon5RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon5DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon5DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon4AP + ' | **HE(고폭)**: ' + weapon5round + ' | **살보**: ' + Math.trunc(i.Weapon5ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon5SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon5rof + ' | **명중률**: ' + Math.trunc(i.Weapon5HitProbability * 100) + '%');

  let weapon6 = ('**무기 6**: ' + i.Weapon6Name + ', ' + i.Weapon6Caliber + ' x' + Math.trunc(i.Weapon6DisplayedAmmunition) + ', ** ' + i.Weapon6Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon6RangeGround) + ' - ' + Math.trunc(i.Weapon6RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon6RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon6RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon6DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon6DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon4AP + ' | **HE(고폭)**: ' + weapon6round + ' | **살보**: ' + Math.trunc(i.Weapon6ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon6SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon6rof + ' | **명중률**: ' + Math.trunc(i.Weapon6HitProbability * 100) + '%');

  let weapon7 = ('**무기 7**: ' + i.Weapon7Name + ', ' + i.Weapon7Caliber + ' x' + Math.trunc(i.Weapon7DisplayedAmmunition) + ', ** ' + i.Weapon7Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon7RangeGround) + ' - ' + Math.trunc(i.Weapon7RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon7RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon7RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon7DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon7DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon4AP + ' | **HE(고폭)**: ' + weapon7round + ' | **살보**: ' + Math.trunc(i.Weapon7ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon7SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon7rof + ' | **명중률**: ' + Math.trunc(i.Weapon7HitProbability * 100) + '%');

  let weapon8 = ('**무기 8**: ' + i.Weapon8Name + ', ' + i.Weapon8Caliber + ' x' + Math.trunc(i.Weapon8DisplayedAmmunition) + ', ** ' + i.Weapon8Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon8RangeGround) + ' - ' + Math.trunc(i.Weapon8RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon8RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon8RangePlanes) + '| **분산도**: 최소: ' + Math.trunc(i.Weapon8DispersionAtMinRange) + ', 최대: ' + Math.trunc(i.Weapon8DispersionAtMaxRange) + ' | **AP(장갑 관통력)**: ' + i.Weapon4AP + ' | **HE(고폭)**: ' + weapon8round + ' | **살보**: ' + Math.trunc(i.Weapon8ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon8SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon8rof + ' | **명중률**: ' + Math.trunc(i.Weapon8HitProbability * 100) + '%');

  // if(i.Weapon2Type == 'AT' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_at_infantry:583701946477576192>');
  // } else if (i.Weapon2Type == 'SAM' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_aa_sam_infantry:583703304974893093>');
  // } else if (i.Weapon2Type == 'Flamethrower' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_flame_infantry:583703448567152672>');
  // } else if (i.Weapon2Type == 'Flamethrower' && i.Training !== '' && i.Weapon3Name == '') {
  //    title = ('**' + i.Name.toUpperCase() + '**' + '    <:nato_flame_infantry:583703448567152672>');
  // }


  //specialized formatting

  if (i.Tab === 'LOG') { //logistics tab formatting
    if (i.SupplyCapacity === '') {
      title = ('**' + i.Name.toUpperCase() + '**' + ' <:command:583070567301644290>');
    } //if its a cv, give it the cv icon

    category = ('**군수** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    if (i.Training !== '') {
      movement = ('**이동**', '**종류**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **스텔스**: ' + i.Stealth + ' \n **지상 관측**: ' + i.OpticalStrengthGround + ' | **훈련도**: ' + i.Training);
      description = ('**가격**: ' + i.Price);
    }
    if (armorfront == 'none' && armorsides == 'none' && armorrear == 'none' && armortop == 'none') {
      description = ('**가격**: ' + i.Price + ' | **장갑**: Splash');
    }
    if (i.SupplyCapacity !== '') {
      category = ('**군수** | **최대 보급량**: ' + i.SupplyCapacity + ' | **국가**: ' + i.MotherCountry + ' | ' + proto);
    }

  } else if (i.Tab === 'INF') {
    category = ('**보병** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    description = ('**가격**: ' + i.Price);
    movement = ('**이동**', '**종류**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **스텔스**: ' + i.Stealth + ' \n **지상 관측**: ' + i.OpticalStrengthGround + ' | **훈련도**: ' + i.Training);
    weapon1 = ('**무기 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', ** ' + i.Weapon1Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon1RangeGround) + ' - ' + Math.trunc(i.Weapon1RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon1RangePlanes) + ' | **AP(장갑 관통력)**: ' + i.Weapon1AP + ' | **HE(고폭)**: ' + weapon1round + ' | **살보**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon1SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon1rof + ' | **명중률**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

    weapon2 = ('**무기 2**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', ** ' + i.Weapon2Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon2RangeGround) + ' - ' + Math.trunc(i.Weapon2RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon2RangePlanes) + ' | **AP(장갑 관통력)**: ' + i.Weapon2AP + ' | **HE(고폭)**: ' + weapon2round + ' | **살보**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon2SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon2rof + ' | **명중률**: ' + Math.trunc(i.Weapon2HitProbability * 100) + '%');

    weapon3 = ('**무기 3**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', ** ' + i.Weapon3Tags + '** | **사거리**: 지상: ' + Math.trunc(i.Weapon3RangeGround) + ' - ' + Math.trunc(i.Weapon3RangeGroundMinimum) + ', 회전익: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', 고정익: ' + Math.trunc(i.Weapon3RangePlanes) + ' | **AP(장갑 관통력)**: ' + i.Weapon3AP + ' | **HE(고폭)**: ' + weapon3round + ' | **살보**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' 탄약 | **보급 비용**: ' + Math.trunc(i.Weapon3SupplyCost) + ' (살보 당) | **연사 속도**: ' + weapon3rof + ' | **명중률**: ' + Math.trunc(i.Weapon3HitProbability * 100) + '%');

  } else if (i.Tab === 'SUP') {
    category = ('**지원** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    if (i.Weapon1Caliber.includes('Radar') && weapon1rof > 30) {
      title = title + ' <:nato_aa_flak_vehicle_rad:583815605442969600>';

    }
    if (!i.Weapon1Caliber.includes('Radar') && weapon1rof > 30) {
      title = title + ' <:nato_aa_flak_vehicle:583815605547696131>';

    }
  } else if (i.Tab === 'TNK') {
    category = ('**기갑** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    if (i.Weapon1ShotsPerSalvo == i.Weapon1DisplayedAmmunition) {
      category = category + ' | **AUTOLOADED**';

    }

  } else if (i.Tab === 'REC') {
    category = ('**정찰** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'VHC') {
    category = ('**차량** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'HEL') {
    category = ('**고정익** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'PLA') {

    const airOptics = {
      '150': '좋음 (150)',
      '300': '매우 좋음 (300)',
      '450': '탁월함 (450)',
      '900': '탁월함 + (900)',
    };
    if (airOptics.hasOwnProperty(i.OpticalStrengthAir)) {
      i.OpticalStrengthAir = airOptics[i.OpticalStrengthAir];
    }

    description = ('**가격**: ' + i.Price);
    if (i.Name === 'A10ATHUNDERBOLTII' || i.Name === 'SU25T') {
      description = ('**가격**: ' + i.Price + ' | **장갑: ** 전면: ' + armorfront + ' | 측면: ' + armorsides + ' | 후면: ' + armorrear + ' | 상면: ' + armortop);
    }

    category = ('**항공** | **국가**: ' + i.MotherCountry + ' | ' + proto);
    movement = ('**이동**', '**종류**: ' + i.MovementType + ' | **속도**: ' + Math.trunc(i.MaxSpeed) + 'kph | **스텔스**: ' + i.Stealth + ' \n **항공 관측**: ' + i.OpticalStrengthAir);
    if (i.Weapon1Caliber == 'Antiradar' || i.Weapon2Caliber == 'Antiradar' || i.Weapon3Caliber == 'Antiradar') {
      title = title + ' <:nato_sead:583815605124202507>';
    }

  } else if (i.Tab = 'NAV') {
    category = ('**해군** | **국가**: ' + i.MotherCountry + ' | ' + proto);
  }
  weapon1 = weapon1 + (' | **재장전**: ' + i.Weapon1TimeBetweenShots + '초 (1발 당), ' + i.Weapon1TimeBetweenSalvos + '초 (살보 당)');
  weapon2 = weapon2 + (' | **재장전**: ' + i.Weapon2TimeBetweenShots + '초 (1발 당), ' + i.Weapon2TimeBetweenSalvos + '초 (살보 당)');
  weapon3 = weapon3 + (' | **재장전**: ' + i.Weapon3TimeBetweenShots + '초 (1발 당), ' + i.Weapon3TimeBetweenSalvos + '초 (살보 당)');
  weapon4 = weapon4 + (' | **재장전**: ' + i.Weapon4TimeBetweenShots + '초 (1발 당), ' + i.Weapon4TimeBetweenSalvos + '초 (살보 당)');
  weapon5 = weapon5 + (' | **재장전**: ' + i.Weapon5TimeBetweenShots + '초 (1발 당), ' + i.Weapon5TimeBetweenSalvos + '초 (살보 당)');
  weapon6 = weapon6 + (' | **재장전**: ' + i.Weapon6TimeBetweenShots + '초 (1발 당), ' + i.Weapon6TimeBetweenSalvos + '초 (살보 당)');
  weapon7 = weapon7 + (' | **재장전**: ' + i.Weapon7TimeBetweenShots + '초 (1발 당), ' + i.Weapon7TimeBetweenSalvos + '초 (살보 당)');
  weapon8 = weapon8 + (' | **재장전**: ' + i.Weapon8TimeBetweenShots + '초 (1발 당), ' + i.Weapon8TimeBetweenSalvos + '초 (살보 당)');

  if (i.Weapon7Name == i.Weapon8Name) {
    i.weapon8Name = '';
  }
  if (i.Weapon5Name == i.Weapon6Name) {
    i.Weapon6Name = '';

  }
  if (i.Weapon3Name == i.Weapon4Name) {
    i.weapon4Name = '';
  }
  if (i.Weapon2Name == i.Weapon3Name) {
    i.weapon3Name = '';
  }

  if (i.Weapon1Name == i.Weapon2Name) {
    i.weapon2Name = '';
  }
  description = description + ' | **체력**: ' + i.Strength;

  weapon1 = weapon1 + (' | **안정장치**: ' + Math.trunc(i.Weapon1HitProbabilityWhileMoving * 100) + '%');
  weapon2 = weapon2 + (' | **안정장치**: ' + Math.trunc(i.Weapon2HitProbabilityWhileMoving * 100) + '%');
  weapon3 = weapon3 + (' | **안정장치**: ' + Math.trunc(i.Weapon3HitProbabilityWhileMoving * 100) + '%');

  if(i.Weapon1Type == 'Howitzer' || i.Weapon1Type == 'MLRS') {
    weapon1 = weapon1 + (' | **조준 속도** : ' + i.Weapon1AimTime);
  }
  if(i.Weapon2Type == 'Howitzer' || i.Weapon2Type == 'MLRS') {
    weapon2 = weapon2 + (' | **조준 속도** : ' + i.Weapon2AimTime);
  }

  if(i.Weapon1MissileMaxSpeed !== '') {
    weapon1 = weapon1 + (' | **탄 속도**: ' + i.Weapon1MissileMaxSpeed);
  }
  if(i.Weapon2MissileMaxSpeed !== '') {
    weapon2 = weapon2 + (' | **탄 속도**: ' + i.Weapon2MissileMaxSpeed);
  }
  if(i.Weapon3MissileMaxSpeed !== '') {
    weapon3 = weapon3 + (' | **탄 속도**: ' + i.Weapon3MissileMaxSpeed);
  }

  category = category + (' \n **카테고리**: ' + i.Decks);
  const embed = new Discord.RichEmbed()

    .setTitle(title)
    .setDescription(description)
    .setColor(color)

    .addField('**카테고리**', category)

    .addField('**이동**', movement)

    .addField('**가용량**', availability);

  //add fields for weapons only if the unit has the weapons
  if (i.Weapon1Name !== '') {
    embed.addField('**무기 1 ( ' + i.Weapon1Type + ')**', weapon1);
  }
  if (i.Weapon2Name !== '') {
    embed.addField('**무기 2 ( ' + i.Weapon2Type + ')**', weapon2);
  }
  if (i.Weapon3Name !== '') {
    embed.addField('**무기 3 ( ' + i.Weapon3Type + ')**', weapon3);
  }
  if (i.Weapon4Name !== '') {
    embed.addField('**무기 4 ( ' + i.Weapon4Type + ')**', weapon4);
  }
  if (i.Weapon5Name !== '') {
    embed.addField('**무기 5 ( ' + i.Weapon5Type + ')**', weapon5);
  }
  if (i.Weapon6Name !== '') {
    embed.addField('**무기 6 ( ' + i.Weapon6Type + ')**', weapon6);
  }
  if (i.Weapon7Name !== '') {
    embed.addField('**무기 7 ( ' + i.Weapon7Type + ')**', weapon7);
  }
  if (i.Weapon8Name !== '') {
    embed.addField('**무기 8 ( ' + i.Weapon8Type + ')**', weapon8);
  }


  if (i.Tab === 'INF') {
    if (i.Weapon2Type == 'SAM' && i.Training !== '') {
      embed.setThumbnail('https://imgur.com/Fsu5xhP.png');
    } else if (i.Weapon2Type == 'ATGM' && Number(i.Strength) < 10 && i.Training !== '') {
      embed.setThumbnail('https://imgur.com/CyGxIIc.png');
    } else if (i.Weapon2Type == 'AT' && i.Weapon3Name === '' && i.Training !== '') {
      embed.setThumbnail('https://imgur.com/Fsu5xhP.png');
    } else if (i.Weapon2Type == 'Flamethrower') {
      embed.setThumbnail('https://imgur.com/y5h3LEE.png');
    } else if (i.Training == 'Shock' && Number(i.MaxSpeed) > 38) {
      embed.setThumbnail('https://imgur.com/etyRZVH.png');
    } else if (i.Training == 'Shock' && Number(i.MaxSpeed) < 38) {
      embed.setThumbnail('https://imgur.com/uIFXG9x.png');
    } else if (i.Training == 'Regular' && Number(i.MaxSpeed) < 31) {
      embed.setThumbnail('https://imgur.com/uIFXG9x.png');
    } else if (i.Training == 'Regular' && Number(i.MaxSpeed) > 31) {
      embed.setThumbnail('https://imgur.com/etyRZVH.png');
    }
  }
  if (i.Tab == 'LOG' && i.Training !== '') {
    embed.setThumbnail('https://imgur.com/jdkNJNj.png');
  }

  if (i.Training == 'Elite') {
    embed.setThumbnail('https://imgur.com/upNpaW8.png');
  } else if (i.Training !== 'Elite' && i.Training !== '' && i.Tab == 'REC') {
    embed.setThumbnail('https://imgur.com/xB5ISIK.png');
  }

  return embed;
};
