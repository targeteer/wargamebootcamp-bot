const Discord = require('discord.js');
String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};
module.exports.formatting = (i) => {



  i.Weapon2Type = i.Weapon2Type.replaceAll('LAW', 'AT');
  i.Weapon3Type = i.Weapon3Type.replaceAll('LAW', 'AT');

  let title = ('**' + i.Name.toUpperCase() + '**');

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

  const weapon1rof = Math.round(60 * i.Weapon1ShotsPerSalvo / ((i.Weapon1ShotsPerSalvo - 1) * i.Weapon1TimeBetweenShots - - i.Weapon1TimeBetweenSalvos));
  const weapon2rof = Math.round(60 * i.Weapon2ShotsPerSalvo / ((i.Weapon2ShotsPerSalvo - 1) * i.Weapon2TimeBetweenShots - - i.Weapon2TimeBetweenSalvos));
  const weapon3rof = Math.round(60 * i.Weapon3ShotsPerSalvo / ((i.Weapon3ShotsPerSalvo - 1) * i.Weapon3TimeBetweenShots - - i.Weapon3TimeBetweenSalvos));
  const weapon4rof = Math.round(60 * i.Weapon4ShotsPerSalvo / ((i.Weapon4ShotsPerSalvo - 1) * i.Weapon4TimeBetweenShots - - i.Weapon4TimeBetweenSalvos));
  const weapon5rof = Math.round(60 * i.Weapon5ShotsPerSalvo / ((i.Weapon5ShotsPerSalvo - 1) * i.Weapon5TimeBetweenShots - - i.Weapon5TimeBetweenSalvos));
  const weapon6rof = Math.round(60 * i.Weapon6ShotsPerSalvo / ((i.Weapon6ShotsPerSalvo - 1) * i.Weapon6TimeBetweenShots - - i.Weapon6TimeBetweenSalvos));
  const weapon7rof = Math.round(60 * i.Weapon7ShotsPerSalvo / ((i.Weapon7ShotsPerSalvo - 1) * i.Weapon7TimeBetweenShots - - i.Weapon7TimeBetweenSalvos));
  const weapon8rof = Math.round(60 * i.Weapon8ShotsPerSalvo / ((i.Weapon8ShotsPerSalvo - 1) * i.Weapon8TimeBetweenShots - - i.Weapon8TimeBetweenSalvos));

  let rookieavail = ('<:unvet1:583396237936427039>' + i.RookieDeployableAmount + '   ');
  let trainedavail = ('<:unvet2:583396237655670825>' + i.TrainedDeployableAmount + '   ');
  let hardenedavail = ('<:unvet3:583396237626048517>' +  i.HardenedDeployableAmount + '   ');
  let veteranavail = ('<:unvet4:583396237550813229>' + i.VeteranDeployableAmount + '   ');
  let eliteavail = ('<:unvet5:583396237601013779>' + i.EliteDeployableAmount + '   ');


  const redfor = {


    "Poland":":flag_pl:",
    'Czechoslavakia': ':flag_cz:',
    'Soviet Union':'<:flag_sr:581691631523069952>',
    'Yugoslavia':'<:emote:581895502568620110>',
    'Finland':':flag_fi:',
    'East Germany':'<:unknown:581897376000638996>',
    'China':':flag_cn:',
    'North Korea':'<:download:581897628959375372>',

  };

  const blufor = {

    "France":":flag_fr:",
    'Canada':':flag_ca:',
    'Sweden':':flag_se:',
    'The Netherlands':':flag_nl:',
    'ANZAC':':flag_au:',
    'Israel':':flag_il:',
    'United Kingdom':':flag_gb:',
    'Japan':':flag_jp:',
    'United States':':flag_us:',
    'West Germany':':flag_de:',
    'Denmark':':flag_dk:',
    'South Korea':':flag_kr:',
    'Norway':':flag_no:',

  };

  const stealth = {
    '1':'Poor',
    '1.25':'Poor - Medium',
    '1.5':'Medium',
    '2':'Good',
    '2.5':'Very good',
    '3':'Exceptional',
  };

  const groundOptics = {
    '40':'Bad',
    '60':'Poor',
    '80':'Medium',
    '120':'Good',
    '170':'Very Good',
    '220':'Exceptional',
  };

   if(groundOptics.hasOwnProperty(i.OpticalStrengthGround)) {
     i.OpticalStrengthGround = groundOptics[i.OpticalStrengthGround];
   }

   if(stealth.hasOwnProperty(i.Stealth)) {
     i.Stealth = stealth[i.Stealth];
   }

  if(blufor.hasOwnProperty(i.MotherCountry)) {
      i.MotherCountry = blufor[i.MotherCountry];
      color = "BLUE";
  } else if(redfor.hasOwnProperty(i.MotherCountry)) {
      i.MotherCountry = redfor[i.MotherCountry];
      color = "RED";
  }

if (i.Weapon1HE < 1) { weapon1round = i.Weapon1HE; } else { weapon1round = Math.trunc(i.Weapon1HE);};

if (i.Weapon2HE < 1) { weapon2round = i.Weapon2HE; } else { weapon2round = Math.trunc(i.Weapon2HE);};

if (i.Weapon3HE < 1) { weapon3round = i.Weapon3HE; } else { weapon3round = Math.trunc(i.Weapon3HE);};

if (i.Weapon4HE < 1) { weapon4round = i.Weapon4HE; } else { weapon4round = Math.trunc(i.Weapon4HE);};

if (i.Weapon5HE < 1) { weapon5round = i.Weapon5HE; } else { weapon5round = Math.trunc(i.Weapon5HE);};

if (i.Weapon6HE < 1) { weapon6round = i.Weapon6HE; } else { weapon6round = Math.trunc(i.Weapon6HE);};

if (i.Weapon7HE < 1) { weapon7round = i.Weapon7HE; } else { weapon7round = Math.trunc(i.Weapon7HE);};

if (i.Weapon8HE < 1) { weapon8round = i.Weapon8HE; } else { weapon8round = Math.trunc(i.Weapon8HE);};



  if(i.ArmorFrontSplashResistant.toLowerCase() ===  'true') {
          armorfront = i.ArmorFront + ' **SPLASH**';
} else {
          armorfront = i.ArmorFront;
}
  if(i.ArmorSidesSplashResistant.toLowerCase() ===  'true') {
          armorsides = i.ArmorSides + ' **SPLASH**';
  } else {
          armorsides = i.ArmorSides;
}
  if(i.ArmorRearSplashResistant.toLowerCase() ===  'true') {
          armorrear = i.ArmorRear + ' **SPLASH**';
  } else {
          armorrear = i.ArmorRear;
}
  if(i.ArmorTopSplashResistant.toLowerCase() ===  'true') {
          armortop = i.ArmorTop + ' **SPLASH**';
  } else {
          armortop = i.ArmorTop;
}

if(i.IsPrototype.toLowerCase() === 'false') {
    proto = '**Not prototype**';
}
else if (i.IsPrototype.toLowerCase() === 'true') {
 proto = '**Prototype**';
}

if(i.RookieDeployableAmount !== '0') {rookieavail = ('<:vet1:583396237936689155> **' + i.RookieDeployableAmount + '**   '); };
if(i.TrainedDeployableAmount !== '0') {trainedavail = ('<:vet2:583396237735362593> **' + i.TrainedDeployableAmount + '**   '); };
if(i.HardenedDeployableAmount !== '0') {hardenedavail = ('<:vet3:583396237890551808> **' + i.HardenedDeployableAmount + '**   '); };
if(i.VeteranDeployableAmount !== '0') {veteranavail = ('<:vet4:583396237873643529> **' + i.VeteranDeployableAmount + '**   '); };
if(i.EliteDeployableAmount !== '0') {eliteavail = ('<:vet5:583396238053867558> **' + i.EliteDeployableAmount + '**   '); };


//defaults



  const availability = (rookieavail + trainedavail + hardenedavail + veteranavail + eliteavail);

  let accuracy = (+ ' | **Accuracy**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

  if(i.Weapon1HitProbability === '') { accuracy = ''; };

  let description = ('**Price**: ' + i.Price +  ' | **Armor: ** Front: ' + armorfront + ' | Sides: ' + armorsides + ' | Rear: ' + armorrear + ' | Top: ' + armortop);

  let category = ('**Logistics** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);

  const supply = Math.trunc(i.Weapon1SupplyCost / i.Weapon1ShotsPerSalvo);

  const movement = ('**Movement**', '**Type**: ' + i.MovementType + ' | **Speed**: ' + Math.trunc(i.MaxSpeed) + 'kph | **Stealth**: ' + i.Stealth + ' \n **Ground optics**: ' + i.OpticalStrengthGround);

  let weapon1 = ('**Weapon 1**: ' + i.Weapon1Name + ', ' + i.Weapon1Caliber + ' x' + Math.trunc(i.Weapon1DisplayedAmmunition) + ', ** ' + i.Weapon1Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon1RangeGround) + ' - ' + Math.trunc(i.Weapon1RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon1RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon1RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon1DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon1DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon1AP + ' | **HE Power**: ' + weapon1round + ' | **Salvo**: ' + Math.trunc(i.Weapon1ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon1SupplyCost) + ' per salvo | **ROF**: ' + weapon1rof  + ' | **Accuracy**: ' + Math.trunc(i.Weapon1HitProbability * 100) + '%');

  let weapon2 = ('**Weapon 2**: ' + i.Weapon2Name + ', ' + i.Weapon2Caliber + ' x' + Math.trunc(i.Weapon2DisplayedAmmunition) + ', ** ' + i.Weapon2Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon2RangeGround) + ' - ' + Math.trunc(i.Weapon2RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon2RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon2RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon2DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon2DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon2AP + ' | **HE Power**: ' + weapon2round + ' | **Salvo**: ' + Math.trunc(i.Weapon2ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon2SupplyCost) + ' per salvo | **ROF**: ' + weapon2rof + ' | **Accuracy**: ' + Math.trunc(i.Weapon2HitProbability * 100) + '%');

  let weapon3 = ('**Weapon 3**: ' + i.Weapon3Name + ', ' + i.Weapon3Caliber + ' x' + Math.trunc(i.Weapon3DisplayedAmmunition) + ', ** ' + i.Weapon3Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon3RangeGround) + ' - ' + Math.trunc(i.Weapon3RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon3RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon3RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon3DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon3DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon3AP + ' | **HE Power**: ' + weapon3round + ' | **Salvo**: ' + Math.trunc(i.Weapon3ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon3SupplyCost) + ' per salvo | **ROF**: ' + weapon3rof +  ' | **Accuracy**: ' + Math.trunc(i.Weapon3HitProbability * 100) + '%');

<<<<<<< HEAD
  let weapon4 = ('**Weapon 4**: ' + i.Weapon4Name + ', ' + i.Weapon4Caliber + ' x' + Math.trunc(i.Weapon4DisplayedAmmunition) + ', ** ' + i.Weapon4Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon4RangeGround) + ' - ' + Math.trunc(i.Weapon4RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon4RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon4RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon4DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon4DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon4AP + ' | **HE Power**: ' + weapon4round + ' | **Salvo**: ' + Math.trunc(i.Weapon4ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon4SupplyCost) + ' per salvo | **ROF**: ' + weapon4rof +  ' | **Accuracy**: ' + Math.trunc(i.Weapon4HitProbability * 100) + '%');
=======
  .addField('**Category**', '**TAB**: ' + i.Tab + '| **Nationality**: ' + i.MotherCountry + ' | ' + proto)
>>>>>>> 9a718545cbff5a7665dc8b04d79cac313af47740

  let weapon5 = ('**Weapon 5**: ' + i.Weapon5Name + ', ' + i.Weapon5Caliber + ' x' + Math.trunc(i.Weapon5DisplayedAmmunition) + ', ** ' + i.Weapon5Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon5RangeGround) + ' - ' + Math.trunc(i.Weapon5RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon5RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon5RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon5DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon5DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon4AP + ' | **HE Power**: ' + weapon5round + ' | **Salvo**: ' + Math.trunc(i.Weapon5ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon5SupplyCost) + ' per salvo | **ROF**: ' + weapon5rof +  ' | **Accuracy**: ' + Math.trunc(i.Weapon5HitProbability * 100) + '%');

  let weapon6 = ('**Weapon 6**: ' + i.Weapon6Name + ', ' + i.Weapon6Caliber + ' x' + Math.trunc(i.Weapon6DisplayedAmmunition) + ', ** ' + i.Weapon6Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon6RangeGround) + ' - ' + Math.trunc(i.Weapon6RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon6RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon6RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon6DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon6DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon4AP + ' | **HE Power**: ' + weapon6round + ' | **Salvo**: ' + Math.trunc(i.Weapon6ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon6SupplyCost) + ' per salvo | **ROF**: ' + weapon6rof +  ' | **Accuracy**: ' + Math.trunc(i.Weapon6HitProbability * 100) + '%');

  let weapon7 = ('**Weapon 7**: ' + i.Weapon7Name + ', ' + i.Weapon7Caliber + ' x' + Math.trunc(i.Weapon7DisplayedAmmunition) + ', ** ' + i.Weapon7Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon7RangeGround) + ' - ' + Math.trunc(i.Weapon7RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon7RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon7RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon7DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon7DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon4AP + ' | **HE Power**: ' + weapon7round + ' | **Salvo**: ' + Math.trunc(i.Weapon7ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon7SupplyCost) + ' per salvo | **ROF**: ' + weapon7rof +  ' | **Accuracy**: ' + Math.trunc(i.Weapon7HitProbability * 100) + '%');

  let weapon8 = ('**Weapon 8**: ' + i.Weapon8Name + ', ' + i.Weapon8Caliber + ' x' + Math.trunc(i.Weapon8DisplayedAmmunition) + ', ** ' + i.Weapon8Tags + '** | **RANGE**: Ground: ' + Math.trunc(i.Weapon8RangeGround) + ' - ' + Math.trunc(i.Weapon8RangeGroundMinimum) + ', Helicopters: ' + Math.trunc(i.Weapon8RangeHelicopters) + ', Airplanes: ' + Math.trunc(i.Weapon8RangePlanes) + '| **Dispersion**: Min: ' + Math.trunc(i.Weapon8DispersionAtMinRange) + ', Max: ' + Math.trunc(i.Weapon8DispersionAtMaxRange) + ' | **AP Power**: ' + i.Weapon4AP + ' | **HE Power**: ' + weapon8round + ' | **Salvo**: ' + Math.trunc(i.Weapon8ShotsPerSalvo) + ' Shots | **Supply Cost**: ' + supply + ' per shot, ' + Math.trunc(i.Weapon8SupplyCost) + ' per salvo | **ROF**: ' + weapon8rof +  ' | **Accuracy**: ' + Math.trunc(i.Weapon8HitProbability * 100) + '%');

//specialized formatting

if(i.Tab === 'LOG') {                                        //logistics tab formatting
  if(i.SupplyCapacity === '') {
    title = ('**' + i.Name.toUpperCase() + '**' + ' <:command:583070567301644290>'); } //if its a cv, give it the cv icon

    description = ('**Price**: ' + i.Price +  ' | **Armor: ** Front: ' + armorfront + ' | Sides: ' + armorsides + ' | Rear: ' + armorrear + ' | Top: ' + armortop);

    category = ('**Logistics** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);


  } else if (i.Tab === 'INF') {
    category = ('**Infantry** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'SUP') {
    category = ('**Support** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'TNK') {
    category = ('**Tank** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'REC') {
    category = ('**Recon** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'VHC') {
    category = ('**Vehicle** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'HEL') {
    category = ('**Helicopter** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  } else if (i.Tab === 'PLA') {
    category = ('**Plane** | **Nationality**: ' + i.MotherCountry + ' | ' + proto);
  }

  if(i.Weapon7Name == i.Weapon8Name) {
    i.weapon8Name = '';
  }
  if(i.Weapon5Name == i.Weapon6Name) {
  i.Weapon6Name = '';

  }
  if(i.Weapon3Name == i.Weapon4Name) {
    i.weapon4Name = '';
  }
  if(i.Weapon2Name == i.Weapon3Name) {
    i.weapon3Name = '';
  }

  if(i.Weapon1Name == i.Weapon2Name) {
    i.weapon2Name = '';
  }








const embed = new Discord.RichEmbed()

  .setTitle(title)
  .setDescription(description)
  .setColor(color)

  .addField('**Category**', category)

  .addField('**Movement**', movement)

  .addField('**Availability**', availability)

  .addField('**Weapon 1** (' + i.Weapon1Type + ')', weapon1);
//add fields for weapons only if the unit has the weapons

if(i.Weapon2Name !== '') {
    embed.addField('**Weapon 2 ( ' + i.Weapon2Type + ')**', weapon2);
}
if(i.Weapon3Name !== '') {
    embed.addField('**Weapon 3 ( ' + i.Weapon3Type + ')**', weapon3);
}
if(i.Weapon4Name !== '') {
    embed.addField('**Weapon 4 ( ' + i.Weapon4Type + ')**', weapon4);
}
if(i.Weapon5Name !== '') {
    embed.addField('**Weapon 5 ( ' + i.Weapon5Type + ')**', weapon5);
}
if(i.Weapon6Name !== '') {
    embed.addField('**Weapon 6 ( ' + i.Weapon6Type + ')**', weapon6);
}
if(i.Weapon7Name !== '') {
    embed.addField('**Weapon 7 ( ' + i.Weapon7Type + ')**', weapon7);
}
if(i.Weapon8Name !== '') {
    embed.addField('**Weapon 8 ( ' + i.Weapon8Type + ')**', weapon8);
}

if(i.Tab === 'INF') {
  if(i.Weapon2Type == 'SAM') {
  embed.attachFiles(['./Pictures/Inf/manpads.png']);
   embed.setThumbnail('attachment://manpads.png');
} else if (i.Weapon2Type == 'ATGM') {
  embed.attachFiles(['./Pictures/Inf/atgms.png']);
   embed.setThumbnail('attachment://atgms.png');
} else if (i.Weapon2Type == 'AT' && i.Weapon3Name === '') {
  embed.attachFiles(['./Pictures/Inf/fist.png']);
   embed.setThumbnail('attachment://fist.png');
} else if (i.Weapon2Type == 'Flamethrower') {
  embed.attachFiles(['./Pictures/Inf/flamers.png']);
   embed.setThumbnail('attachment://flamers.png');
} else if (i.Training == 'Regular' || i.Training == 'Militia') {
  embed.attachFiles(['./Pictures/Inf/lineinfantry.png']);
    embed.setThumbnail('attachment://lineinfantry.png');
} else if (i.Training == 'Shock') {
  embed.attachFiles(['./Pictures/Inf/lightinfantry.png']);
    embed.setThumbnail('attachment://lightinfantry.png');
  }
}
   if (i.Tab == 'LOG' && i.Training !== '') {
    embed.attachFiles(['./Pictures/Inf/command.png']);
     embed.setThumbnail('attachment://command.png');
   }
 if (i.Training == 'Elite') {
  embed.attachFiles(['./Pictures/Inf/commandos.png']);
    embed.setThumbnail('attachment://commandos.png');
}else if (i.Training !== 'Elite' && i.Training !== '' && i.Tab == 'REC') {
  embed.attachFiles(['./Pictures/Inf/recon.png']);
    embed.setThumbnail('attachment://recon.png');
}




return embed;
  };