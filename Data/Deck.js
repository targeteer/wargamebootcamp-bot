
module.exports.decode = (deckCode) => {
        
    let Deck = {};
  
   
   var deckBinary ="";
   if (deckCode.length < 4 ) { return; }
   for (var i = 0; i < deckCode.length; i++) {
     if (deckCode.charAt(i) == "A") { deckBinary += "000000"; } else
     if (deckCode.charAt(i) == "B") { deckBinary += "000001"; } else
     if (deckCode.charAt(i) == "C") { deckBinary += "000010"; } else
     if (deckCode.charAt(i) == "D") { deckBinary += "000011"; } else
     if (deckCode.charAt(i) == "E") { deckBinary += "000100"; } else
     if (deckCode.charAt(i) == "F") { deckBinary += "000101"; } else
     if (deckCode.charAt(i) == "G") { deckBinary += "000110"; } else
     if (deckCode.charAt(i) == "H") { deckBinary += "000111"; } else
     if (deckCode.charAt(i) == "I") { deckBinary += "001000"; } else
     if (deckCode.charAt(i) == "J") { deckBinary += "001001"; } else
     if (deckCode.charAt(i) == "K") { deckBinary += "001010"; } else
     if (deckCode.charAt(i) == "L") { deckBinary += "001011"; } else
     if (deckCode.charAt(i) == "M") { deckBinary += "001100"; } else
     if (deckCode.charAt(i) == "N") { deckBinary += "001101"; } else
     if (deckCode.charAt(i) == "O") { deckBinary += "001110"; } else
     if (deckCode.charAt(i) == "P") { deckBinary += "001111"; } else
     if (deckCode.charAt(i) == "Q") { deckBinary += "010000"; } else
     if (deckCode.charAt(i) == "R") { deckBinary += "010001"; } else
     if (deckCode.charAt(i) == "S") { deckBinary += "010010"; } else
     if (deckCode.charAt(i) == "T") { deckBinary += "010011"; } else
     if (deckCode.charAt(i) == "U") { deckBinary += "010100"; } else
     if (deckCode.charAt(i) == "V") { deckBinary += "010101"; } else
     if (deckCode.charAt(i) == "W") { deckBinary += "010110"; } else
     if (deckCode.charAt(i) == "X") { deckBinary += "010111"; } else
     if (deckCode.charAt(i) == "Y") { deckBinary += "011000"; } else
     if (deckCode.charAt(i) == "Z") { deckBinary += "011001"; } else
     if (deckCode.charAt(i) == "a") { deckBinary += "011010"; } else
     if (deckCode.charAt(i) == "b") { deckBinary += "011011"; } else
     if (deckCode.charAt(i) == "c") { deckBinary += "011100"; } else
     if (deckCode.charAt(i) == "d") { deckBinary += "011101"; } else
     if (deckCode.charAt(i) == "e") { deckBinary += "011110"; } else
     if (deckCode.charAt(i) == "f") { deckBinary += "011111"; } else
     if (deckCode.charAt(i) == "g") { deckBinary += "100000"; } else
     if (deckCode.charAt(i) == "h") { deckBinary += "100001"; } else
     if (deckCode.charAt(i) == "i") { deckBinary += "100010"; } else
     if (deckCode.charAt(i) == "j") { deckBinary += "100011"; } else
     if (deckCode.charAt(i) == "k") { deckBinary += "100100"; } else
     if (deckCode.charAt(i) == "l") { deckBinary += "100101"; } else
     if (deckCode.charAt(i) == "m") { deckBinary += "100110"; } else
     if (deckCode.charAt(i) == "n") { deckBinary += "100111"; } else
     if (deckCode.charAt(i) == "o") { deckBinary += "101000"; } else
     if (deckCode.charAt(i) == "p") { deckBinary += "101001"; } else
     if (deckCode.charAt(i) == "q") { deckBinary += "101010"; } else
     if (deckCode.charAt(i) == "r") { deckBinary += "101011"; } else
     if (deckCode.charAt(i) == "s") { deckBinary += "101100"; } else
     if (deckCode.charAt(i) == "t") { deckBinary += "101101"; } else
     if (deckCode.charAt(i) == "u") { deckBinary += "101110"; } else
     if (deckCode.charAt(i) == "v") { deckBinary += "101111"; } else
     if (deckCode.charAt(i) == "w") { deckBinary += "110000"; } else
     if (deckCode.charAt(i) == "x") { deckBinary += "110001"; } else
     if (deckCode.charAt(i) == "y") { deckBinary += "110010"; } else
     if (deckCode.charAt(i) == "z") { deckBinary += "110011"; } else
     if (deckCode.charAt(i) == "0") { deckBinary += "110100"; } else
     if (deckCode.charAt(i) == "1") { deckBinary += "110101"; } else
     if (deckCode.charAt(i) == "2") { deckBinary += "110110"; } else
     if (deckCode.charAt(i) == "3") { deckBinary += "110111"; } else
     if (deckCode.charAt(i) == "4") { deckBinary += "111000"; } else
     if (deckCode.charAt(i) == "5") { deckBinary += "111001"; } else
     if (deckCode.charAt(i) == "6") { deckBinary += "111010"; } else
     if (deckCode.charAt(i) == "7") { deckBinary += "111011"; } else
     if (deckCode.charAt(i) == "8") { deckBinary += "111100"; } else
     if (deckCode.charAt(i) == "+") { deckBinary += "111110"; } else
     if (deckCode.charAt(i) == "9") { deckBinary += "111101"; } else
     if (deckCode.charAt(i) == "/") { deckBinary += "111111"; }
   }
   if (deckBinary.charAt(1) == '0')
   {
       Deck.sSide = "블루포";
       Deck.iSide = 0;
   }
   else if (deckBinary.charAt(1) == '1')
   {
       Deck.sSide = "레드포";
       Deck.iSide = 1;
   }
   else
   {
       Deck.sSide = "INVALID";
       Deck.iSide = 2;
   }
   Deck.iNation = "";
   Deck.sNation = "";
   for (var i = 0; i <= 11; i++)
   {
       Deck.iNation += deckBinary.charAt(i);
   }//magic numbers galore
   if (Deck.iNation == "000000001100") { Deck.sNation = "미국"; } else
   if (Deck.iNation == "000000101100") { Deck.sNation = "영국"; } else
   if (Deck.iNation == "000001001100") { Deck.sNation = "프랑스"; } else
   if (Deck.iNation == "000001101100") { Deck.sNation = "서독"; } else
   if (Deck.iNation == "000010001100") { Deck.sNation = "캐나다"; } else
   if (Deck.iNation == "000010101100") { Deck.sNation = "덴마크"; } else
   if (Deck.iNation == "000011001100") { Deck.sNation = "스웨덴"; } else
   if (Deck.iNation == "000011101100") { Deck.sNation = "노르웨이"; } else
   if (Deck.iNation == "000100001100") { Deck.sNation = "ANZAC"; } else
   if (Deck.iNation == "000100101100") { Deck.sNation = "일본"; } else
   if (Deck.iNation == "000101001100") { Deck.sNation = "대한민국"; } else
   if (Deck.iNation == "000101101100") { Deck.sNation = "네덜란드"; } else
   if (Deck.iNation == "000110001100") { Deck.sNation = "이스라엘";} else
   if (Deck.iNation == "000111100000") { Deck.sNation = "유로콥스"; } else
   if (Deck.iNation == "000111100001") { Deck.sNation = "스칸디"; } else
   if (Deck.iNation == "000111100010") { Deck.sNation = "영연방"; } else
   if (Deck.iNation == "000111100011") { Deck.sNation = "청룡"; } else
   if (Deck.iNation == "000111100110") { Deck.sNation = "란트유트"; } else
   if (Deck.iNation == "000111101000") { Deck.sNation = "NORAD"; } else
   if (Deck.iNation == "000111101001") { Deck.sNation = "DGC"; } else
   if (Deck.iNation == "000111101100") { Deck.sNation = "블루"; } else
   if (Deck.iNation == "010000001100") { Deck.sNation = "서독"; } else
   if (Deck.iNation == "010000101100") { Deck.sNation = "소련"; } else
   if (Deck.iNation == "010001001100") { Deck.sNation = "폴란트"; } else
   if (Deck.iNation == "010001101100") { Deck.sNation = "체코"; } else
   if (Deck.iNation == "010010001100") { Deck.sNation = "중국"; } else
   if (Deck.iNation == "010010101100") { Deck.sNation = "북한"; } else
   if (Deck.iNation == "010011001100") { Deck.sNation = "핀란드"; } else
   if (Deck.iNation == "010011101100") { Deck.sNation = "유고슬라비아"; } else
   if (Deck.iNation == "010100100100") { Deck.sNation = "적룡"; } else
   if (Deck.iNation == "010100100101") { Deck.sNation = "동구권"; } else
   if (Deck.iNation == "010100101010") { Deck.sNation = "발틱전선"; } else
   if (Deck.iNation == "010100101011") { Deck.sNation = "앙탕트"; } else
   if (Deck.iNation == "010100101100") { Deck.sNation = "레드"; } 
   //13
   Deck.sSpec = "";
   for (var i = 12; i <= 14; i++)
   {
       Deck.sSpec += deckBinary.charAt(i);
   }
   Deck.iSpec = parseInt(Deck.sSpec, 2);
   if (Deck.iSpec == 0) { Deck.sSpec = "차량화"; } else
   if (Deck.iSpec == 1) { Deck.sSpec = "기갑"; } else
   if (Deck.iSpec == 2) { Deck.sSpec = "지원"; } else
   if (Deck.iSpec == 3) { Deck.sSpec = "해병"; } else
   if (Deck.iSpec == 4) { Deck.sSpec = "기계화"; } else
   if (Deck.iSpec == 5) { Deck.sSpec = "공수"; } else
   if (Deck.iSpec == 6) { Deck.sSpec = "해군"; } else
   if (Deck.iSpec == 7) { Deck.sSpec = "무특성"; }

   Deck.sEra = "";
   for (var i = 15; i <= 16; i++)
   {
       Deck.sEra +=  deckBinary.charAt(i);
   }
   Deck.iEra = parseInt(Deck.sEra, 2);
   if (Deck.iEra == 0) { Deck.sEra = "1985"; } else
   if (Deck.iEra == 1) { Deck.sEra = "1980"; } else
   if (Deck.iEra == 2) { Deck.sEra = ""; }
   
let fulldeck = Deck.sNation + ' ' + Deck.sSpec + ' ' + Deck.sEra;
return [fulldeck, Deck.iSide];

}
