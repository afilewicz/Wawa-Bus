export const emailPattern = {
  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
  message: "Invalid email",
};

export const passwordPattern = {
  value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  message: "Password must have at least 8 characters",
};

export const passwordRules = (isRequired = true) => {
  const rules: any = {
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  };

  if (isRequired) {
    rules.required = "Password is required";
  }

  return rules;
};

export const confirmPasswordRules = (
  getValues: () => any,
  isRequired = true
) => {
  const rules: any = {
    validate: (value: string) => {
      const password = getValues().password || getValues().new_password;
      return value === password ? true : "The passwords do not match";
    },
  };

  if (isRequired) {
    rules.required = "Password confirmation is required";
  }

  return rules;
};

const busLines: string[] = [
  "102", "103", "104", "105", "106", "107", "108", "110", "111", "112",
  "114", "115", "116", "117", "118", "119", "120", "121", "122", "123",
  "124", "125", "126", "127", "128", "129", "130", "131", "132", "133",
  "134", "135", "136", "138", "139", "140", "141", "142", "143", "145",
  "146", "147", "148", "149", "150", "151", "152", "153", "154", "156",
  "157", "158", "159", "160", "161", "162", "163", "164", "165", "166",
  "167", "168", "169", "170", "171", "172", "173", "174", "175", "176",
  "177", "178", "179", "180", "181", "182", "183", "184", "185", "186",
  "187", "188", "189", "190", "191", "192", "193", "194", "196", "197",
  "198", "199", "201", "202", "203", "204", "207", "208", "209", "210",
  "211", "212", "213", "217", "218", "219", "220", "221", "225", "226",
  "228", "234", "239", "240", "245", "249", "250", "251", "256", "262",
  "263", "303", "305", "311", "314", "317", "319", "320", "326", "331",
  "332", "338", "340", "349", "356", "401", "402", "409", "411", "414",
  "500", "502", "503", "504", "507", "509", "511", "512", "514", "516",
  "517", "518", "519", "520", "521", "523", "525", "527", "702", "703",
  "704", "705", "706", "707", "709", "710", "711", "712", "713", "714",
  "715", "716", "717", "719", "720", "721", "722", "723", "724", "727",
  "728", "729", "730", "731", "733", "735", "736", "737", "738", "739",
  "742", "743", "750", "809", "815", "817", "850", "900",
  "E-1", "E-2", "Z-8", "Z12", "Z18",
  
  "L-1", "L-2", "L-3", "L-4", "L-5", "L-8", "L-9", "L10", "L11", "L12",
  "L13", "L14", "L15", "L16", "L17", "L19", "L20", "L22", "L23", "L24",
  "L25", "L26", "L27", "L31", "L32", "L33", "L34", "L35", "L36", "L37",
  "L38", "L39", "L40", "L41", "L44", "L45", "L46", "L49", "L50", "L51",
  "L52", "L53",

  "N01", "N02", "N03", "N11", "N12", "N13", "N14", "N16", "N21", "N22",
  "N24", "N25", "N31", "N32", "N33", "N34", "N35", "N36", "N37", "N38",
  "N41", "N42", "N43", "N44", "N45", "N46", "N50", "N56", "N58", "N61",
  "N62", "N63", "N64", "N71", "N72", "N81", "N83", "N85", "N86", "N88",
  "N91", "N95"
];


export default busLines;

const formatDate = (date: Date): string => {
  const pad = (num: number) => (num < 10 ? `0${num}` : num);
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
