// Define the structure for syllabus data
type Subject = {
  name: string;
  link: string;
  " ": string;
};

type Semester = {
  [subjectName: string]: string;
};

export const syllabusData: Record<string, Semester> = {
  semester1: {
    "Mathematics-I": "https://drive.google.com/drive/folders/1gvOVjBrpMz3SCS8bG6lSDgjSyBfv0A3E?usp=sharing",
    "Semiconductor Physics": "https://drive.google.com/drive/folders/1ZXVshkb_YBYcez8-ybiq-yby4qg1pfBa?usp=drive_link",
    "English": "https://drive.google.com/drive/folders/1jJc43xCtVnqtQGc3ZIoxuxIaNuElxvJj?usp=sharing",
    "Basic Electrical Engineering": "https://drive.google.com/drive/folders/1rmtiH0Ir16t3USK-5P53bcvoFq7vIOwW",
    // "Physics Lab-1": "",
    "BEE Lab": "https://drive.google.com/file/d/15z81-_d44jXTGp9LWxMFLYHyH_T-HC9w/view?usp=sharing",

  },
  semester2: {
    "Mathematics-II": "https://drive.google.com/drive/folders/1MWS2jpbc6JKnIbd9ViaA-qX6DQH6ohLk?usp=drive_link",
    "PPS": "https://drive.google.com/drive/folders/1muH-Cz-svrW290xSZPkBJtXOYEZYHS4i?usp=drive_link",
    "Chemistry-I": "https://drive.google.com/drive/folders/1XiOKv7OuO-ELzmlHwDFAkYZ5kh8Prtjf",
    "Workshop Technology": "https://drive.google.com/file/d/18Nch4Lr8LihUJT500XJszYVNDAlWHESv/view?usp=sharing",
    "Chemistry Lab-1": "https://drive.google.com/file/d/1tWQ_c0zi8nd0fqqcW-ykjUqzlLgdYA0E/view?usp=sharing",
    "Programming in C Lab": "https://drive.google.com/file/d/12BmwX_ZH2RWBLruS08UvQmywzSIWdco3/view?usp=sharing",
    "Language Lab": "https://drive.google.com/drive/folders/1UxOTSoflxQGIB3hQr8CFzo5O-ZCS9eRp?usp=sharing",
  },
  semester3: {
    "Database Management Systems": "",
    "Data Structures & Algorithms": "",
    "Digital Electronics": "",
    "Python Programming": "",
    "Mathematics-III": "",
    "Economics for Engineers": "",
    "Database Management Systems Lab": "",
    "Digital Electronics Lab": "",
    "Data Structures & Algorithms Lab (C)": "",
    "Python Programming Lab": "",
  },
  semester4: {
    "Discrete Mathematics": "",
    "Computer Organization & Arch": "",
    "Operating System": "",
    "Object Oriented Programming": "",
    "Organizational Behaviour": "",
    "Environmental Sciences": "",
    "Web Technologies": "",
    "Operating System Lab": "",
    "Object Oriented Programming Lab (C++)": "",
    "Web Technologies Lab": "",
  },
  semester5: {
    "Microprocessor": "",
    "Computer Networks": "",
    "Formal Languages & Automata": "",
    "Design & Analysis of Algorithms": "",
    "Programming in Java": "",
    "Software Engineering": "",
    "Microprocessor Lab": "",
    "Computer Networks Lab": "",
    "Design & Analysis of Algorithms Using C++": "",
    "Programming in Java Lab": "",
    "Practical Training - 1": "",
  },
  semester6: {
    Physics: "https://drive.google.com/your-physics2-link",
    Mathematics: "https://drive.google.com/your-math2-link",
    BEE: "https://drive.google.com/your-bee2-link",
    English: "https://drive.google.com/your-english2-link",
  },
  semester7: {
    Physics: "https://drive.google.com/your-physics2-link",
    Mathematics: "https://drive.google.com/your-math2-link",
    BEE: "https://drive.google.com/your-bee2-link",
    English: "https://drive.google.com/your-english2-link",
  },
  semester8: {
    Physics: "https://drive.google.com/your-physics2-link",
    Mathematics: "https://www.youtube.com/watch?v=82IDoaiYU0c&list=PLhSp9OSVmeyLvBHpACaFNJut6L5jOBCWr",
    BEE: "https://drive.google.com/your-bee2-link",
    English: "https://drive.google.com/your-english2-link",
  },
};
