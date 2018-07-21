'use strict'
async function FecthApiPOST(apiMap) {
  let request = `http://localhost/api`
  console.log("newfecthapi apiMap json", JSON.stringify(apiMap))
  return fetch(request,{
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'text/plain; charset=utf-8'
    },
    body: JSON.stringify(apiMap)
  })
    .then(res => res.json())
    .then(
      (result) => {
        return result
      },
      (error) => {
        return error
      }
    )
}
function isEmpty(obj) {
  for (var key in obj) {
    return false
  }
  return true
}
function deepClonObject(lastObj) {
  let newObj = {}
  if (Array.isArray(lastObj))  {
    newObj = []
  }
  for (var key in lastObj) {
    if (typeof(lastObj[key]) === 'object') {
      newObj[key] = deepClonObject(lastObj[key])
    } else {
      newObj[key] = lastObj[key]
    }
  }
  return newObj
}
let SourceLanguage = {
  "az" : "азербайджанский",
  "sq" : "албанский",
  "am" : "амхарский",
  "en" : "английский",
  "ar" : "арабский",
  "hy" : "армянский",
  "af" : "африкаанс",
  "eu" : "баскский",
  "be" : "белорусский",
  "bn" : "бенгальский",
  "my" : "бирманский",
  "bg" : "болгарский",
  "bs" : "боснийский",
  "cy" : "валлийский",
  "hu" : "венгерский",
  "vi" : "вьетнамский",
  "haw" : "гавайский",
  "gl" : "галисийский",
  "el" : "греческий",
  "ka" : "грузинский",
  "gu" : "гуджарати",
  "da" : "датский",
  "zu" : "зулу",
  "iw" : "иврит",
  "ig" : "игбо",
  "yi" : "идиш",
  "id" : "индонезийский",
  "ga" : "ирландский",
  "is" : "исландский",
  "es" : "испанский",
  "it" : "итальянский",
  "yo" : "йоруба",
  "kk" : "казахский",
  "kn" : "каннада",
  "ca" : "каталанский",
  "ky" : "киргизский",
  "zhCN" : "китайский",
  "ko" : "корейский",
  "co" : "корсиканский",
  "ht" : "креольский (Гаити)",
  "ku" : "курманджи",
  "km" : "кхмерский",
  "xh" : "кхоса",
  "lo" : "лаосский",
  "la" : "латинский",
  "lv" : "латышский",
  "lt" : "литовский",
  "lb" : "люксембургский",
  "mk" : "македонский",
  "mg" : "малагасийский",
  "ms" : "малайский",
  "ml" : "малаялам",
  "mt" : "мальтийский",
  "mi" : "маори",
  "mr" : "маратхи",
  "mn" : "монгольский",
  "de" : "немецкий",
  "ne" : "непальский",
  "nl" : "нидерландский",
  "no" : "норвежский",
  "pa" : "панджаби",
  "fa" : "персидский",
  "pl" : "польский",
  "pt" : "португальский",
  "ps" : "пушту",
  "ro" : "румынский",
  "ru" : "русский",
  "sm" : "самоанский",
  "ceb" : "себуанский",
  "sr" : "сербский",
  "st" : "сесото",
  "si" : "сингальский",
  "sd" : "синдхи",
  "sk" : "словацкий",
  "sl" : "словенский",
  "so" : "сомалийский",
  "sw" : "суахили",
  "su" : "суданский",
  "tg" : "таджикский",
  "th" : "тайский",
  "ta" : "тамильский",
  "te" : "телугу",
  "tr" : "турецкий",
  "uz" : "узбекский",
  "uk" : "украинский",
  "ur" : "урду",
  "tl" : "филиппинский",
  "fi" : "финский",
  "fr" : "французский",
  "fy" : "фризский",
  "ha" : "хауса",
  "hi" : "хинди",
  "hmn" : "хмонг",
  "hr" : "хорватский",
  "ny" : "чева",
  "cs" : "чешский",
  "sv" : "шведский",
  "sn" : "шона",
  "gd" : "шотландский (гэльский)",
  "eo" : "эсперанто",
  "et" : "эстонский",
  "jw" : "яванский",
  "ja" : "японский"
}
export { FecthApiPOST, SourceLanguage, isEmpty, deepClonObject }
