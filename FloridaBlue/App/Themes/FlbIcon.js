/**
 * FlbIcon icon set component.
 * Usage: <FlbIcon name="icon-name" size={20} color="#4F8EF7" />
 */

import createIconSet from 'react-native-vector-icons/lib/create-icon-set';
const glyphMap = {
  "align-justify": 97,
  "arrow-left": 98,
  "arrow-right": 99,
  "arrow-up": 100,
  "arrow-down": 101,
  "call-phone": 102,
  "calendar": 103,
  "caret-down-two": 104,
  "caret-left": 105,
  "caret-right": 106,
  "caret-up-two": 107,
  "caret-up": 108,
  "caret-up-down": 109,
  "caret-down": 110,
  "cloud-download": 118,
  "close-delete": 119,
  "cog-gear": 120,
  "credit-card": 121,
  "delete-circle": 65,
  "email-envelope": 66,
  "exclamation-triangle": 67,
  "exclamation-circle": 68,
  "exclamation": 69,
  "external-link": 70,
  "external-link-sqaure": 71,
  "facebook": 73,
  "file": 72,
  "filter": 75,
  "linkedin": 76,
  "list-bullet": 77,
  "location-arrow": 78,
  "lock": 79,
  "log-in": 80,
  "log-out": 81,
  "minus": 82,
  "pencil": 83,
  "pin-map": 84,
  "plus": 85,
  "remove": 87,
  "repeat-redo": 88,
  "search-find": 86,
  "talk-chat": 89,
  "talk-chat-2": 90,
  "unlock": 48,
  "twitter": 49,
  "trash-bin": 50,
  "unlock-2": 51,
  "user": 52,
  "drive": 53,
  "save-disk": 54,
  "ptint": 55,
  "tachometer": 56,
  "shopping-cart": 33,
  "aid-medkit-case": 34,
  "user-1": 35,
  "pill": 36,
  "google-plus": 37,
  "pencil-square": 38,
  "list-2": 39,
  "edit-write": 112,
  "refresh": 113,
  "question-1": 74,
  "question": 57,
  "plus-circle": 40,
  "briefcase-case-two": 41,
  "pdf": 42,
  "flag": 43,
  "doctor": 44,
  "hospital": 45,
  "stethoscope": 46,
  "calendar-1": 47,
  "quote": 59,
  "searchdoc": 60,
  "imaging": 61,
  "ideas2": 62,
  "hospitals": 63,
  "govt": 64,
  "family2": 91,
  "cross": 93,
  "medicare": 94,
  "criticalillness": 95,
  "life": 96,
  "labs": 124,
  "accident": 125,
  "application": 126,
  "news": 92,
  "single": 57344,
  "prenatal": 57345,
  "wireless": 57346,
  "questions": 57347,
  "search": 57348,
  "wallet": 57353,
  "onlinetour": 57355,
  "sun": 57349,
  "excercise": 57350,
  "check": 57351,
  "chat": 57352,
  "dental": 57354,
  "doctor-1": 57356,
  "health": 57357,
  "groups": 57358,
  "meds": 57359,
  "money": 57360,
  "book": 57361,
  "answers": 57362,
  "ear": 57363,
  "event": 57364,
  "hand": 57365,
  "star": 57366,
  "handshake": 57367,
  "online": 57368,
  "heart": 57369,
  "visit": 57370,
  "water": 57371,
  "vision": 57372,
  "document": 57373,
  "family": 57444,
  "youtube-play": 57445,
  "accordion-collapse": 111,
  "youtube-rd": 114,
  "accordion-expand": 115,
  "addressbook": 116,
  "alert": 117,
  "blog-rd": 122,
  "brand-caduceus": 57374,
  "brand-calendar": 57375,
  "brand-compass": 57376,
  "brand-doctor": 57377,
  "brand-folder": 57378,
  "brand-phone": 57379,
  "calculate": 57380,
  "calendar-31": 57381,
  "cc-card": 57382,
  "chat-1": 57384,
  "chevron-down": 57385,
  "chevron-left": 57386,
  "address-book2": 57387,
  "chevron-right": 57388,
  "chevron-up": 57389,
  "desktop-vector": 57390,
  "download": 57391,
  "english": 57392,
  "excel": 57393,
  "explore": 57394,
  "facebook-rd": 57395,
  "fat-down-arrow": 57396,
  "fat-left-arrow": 57397,
  "fat-right-arrow": 57398,
  "fat-up-arrow": 57399,
  "filter-1": 57400,
  "forward": 57402,
  "fullscreen": 57403,
  "gear": 57404,
  "generic-doc": 57405,
  "globe": 57406,
  "glossary": 57407,
  "government": 57408,
  "home": 57409,
  "info": 57410,
  "instagram-rd": 57411,
  "lab": 57412,
  "map-pin": 57413,
  "mail": 57414,
  "menu-mobile": 57415,
  "metrics": 57416,
  "mobile-vector": 57417,
  "ms-powerpoint": 57418,
  "ms-word": 57419,
  "open-search": 57420,
  "pause": 57421,
  "pdf-1": 57422,
  "percentage": 57423,
  "pharmacy": 57424,
  "pie-chart": 57425,
  "pinterest-rd": 57426,
  "play-video": 57427,
  "print": 57428,
  "rd-brand-compass": 57429,
  "rd-brand-phone": 57430,
  "rd-caduceus": 57431,
  "rd-d-arrow": 57432,
  "rd-doctor": 57433,
  "rd-l-arrow": 57434,
  "rd-mobile": 57435,
  "rd-percentage": 57436,
  "rd-r-arrow": 57437,
  "rd-u-arrow": 57438,
  "refresh-1": 57439,
  "rewind": 57440,
  "rss-feed": 57441,
  "save-disc": 57442,
  "settings-gears": 57443,
  "shopping-cart-1": 57446,
  "skip-back": 57447,
  "skip-forward": 57448,
  "spanish": 57449,
  "stop-player": 57450,
  "subsidy": 57451,
  "success": 57452,
  "support": 57453,
  "tablet": 57454,
  "toolkit": 57455,
  "trash": 57456,
  "twitter-rd": 57457,
  "upload": 57458,
  "urgent-care": 57459,
  "video": 57460,
  "warning": 57461,
  "weight": 57462,
  "check-rd": 57401,
  "prize-award": 57463,
  "instagram": 57464,
  "searchplans": 57465,
  "clear-filters": 57466,
  "maintenance": 57467,
  "live-chat": 57468,
  "heart-hand": 57470,
  "care-services": 57471,
  "pdf-download": 57469,
  "clock": 57472,
  "square-line": 57473,
  "check-mark-2": 57474,
  "centers": 57383,
  "medicare-1": 57475,
  "retail-center": 57476,
  "accessibility": 57478,
  "laws": 123,
  "language-switch": 57477,
  "id-card": 57479,
  "stamp-mail": 57480,
  "booklet": 57482,
  "claims": 57483,
  "like-filled": 57484,
  "network-size": 57485,
  "thumb-up-coin": 57481,
  "thumbs-up-circle": 57486,
  "calculator-circle-1": 57493,
  "calculator-coin-1": 57494,
  "booklet-circle": 57487,
  "booklet-coin": 57488,
  "claims-circle": 57489,
  "claims-coin": 57490,
  "doctor-circle": 57491,
  "doctor-coin": 57492,
  "1-empty": 57495,
  "1-filled": 57496,
  "2-empty": 57497,
  "2-filled": 57498,
  "3-empty": 57499,
  "3-filled": 57500,
  "4-empty": 57501,
  "4-filled": 57502,
  "5-empty": 57503,
  "5-filled": 57504,
  "6-empty": 57505,
  "6-filled": 57506,
  "7-empty": 57507,
  "7-filled": 57508,
  "8-empty": 57509,
  "8-filled": 57510,
  "9-empty": 57511,
  "9-filled": 57512,
  "10-empty": 57513,
  "10-filled": 57514,
  "11-empty": 57515,
  "11-filled": 57516,
  "12-empty": 57517,
  "12-filled": 57518,
  "car-insurance": 57520,
  "email-share": 57521,
  "share": 57522,
  "share-circle": 57523,
  "bookmark": 57519,
  "add-bookmark": 57524,
  "directions": 57525,
  "piggy-bank": 57526,
  "urgent-care-circle": 57527,
  "map": 58,
  "map-circle": 57528,
  "fingerprint": 57529,
  "flip-arrow": 57530,
  "10-plus-empty": 57531,
  "10-plus-filled": 57532,
  "blocks": 57533,
  "blocks-circle": 57534,
  "health-statement": 57535,
  "health-statement-circle": 57536,
  "wire-globe": 57537,
  "wire-globe-circle": 57538,
  "cash-payment": 57539,
  "cash-payment-circle": 57540,
  "check-payment": 57541,
  "check-payment-circle": 57542,
  "debit-payment": 57543,
  "debit-payment-circle": 57544,
  "electronic-payment": 57545,
  "electronic-payment-circle": 57546,
  "mobile-payment": 57547,
  "mobile-payment-circle": 57548,
  "online-payment": 57549,
  "online-payment-circle": 57550,
  "pharmacy-building": 57551,
  "pharmacy-building-circle": 57552
};

const iconSet = createIconSet(glyphMap, 'flb', 'FlbIcon.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;

