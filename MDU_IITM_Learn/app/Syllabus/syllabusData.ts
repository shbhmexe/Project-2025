// Define the structure for syllabus data
type Subject = {
  name: string;
  link: string;
  " " :    string;
};

type Semester = {
  [subjectName: string]: string;
};

export const syllabusData: Record<string, Semester> = {
  semester1: {
    "Mathematics-I": "https://drive.google.com/file/d/1g3TbKelierFEe9wDPDOBxVlGA1D8DpVU/view?usp=drive_link",
    "Semiconductor Physics": "https://drive.google.com/drive/folders/1ZXVshkb_YBYcez8-ybiq-yby4qg1pfBa?usp=drive_link",
    "English": "https://drive.google.com/file/d/1AMtnA_uh0xJbyEvAAyEr1Vzf89uBBR6u/view",
    "Basic Electrical Engineering": "https://drive.google.com/drive/folders/1rmtiH0Ir16t3USK-5P53bcvoFq7vIOwW",
    "Physics Lab-1": "",
    "BEE Lab": "https://drive.google.com/file/d/15z81-_d44jXTGp9LWxMFLYHyH_T-HC9w/view?usp=sharing",

  },
  semester2: {
    "Mathematics-II": "https://drive.google.com/your-math2-link",
    "Chemistry-I": "https://drive.google.com/your-chemistry1-link",
    "Programming For Problem Solving": "https://drive.google.com/your-programming-pps-link",
    "Workshop Technology": "https://drive.google.com/your-workshop-tech-link",
    "Chemistry Lab-1": "https://drive.google.com/your-chemistry-lab1-link",
    "Programming in C Lab": "https://drive.google.com/your-programming-c-lab-link",
    "Language Lab": "https://drive.google.com/your-language-lab-link",
  },
  semester3: {
    Physics: "https://drive.google.com/your-physics2-link",
    Mathematics: "https://drive.google.com/your-math2-link",
    BEE: "https://drive.google.com/your-bee2-link",
    English: "https://drive.google.com/your-english2-link",
  },
  semester4: {
    Physics: "https://drive.google.com/your-physics2-link",
    Mathematics: "https://drive.google.com/your-math2-link",
    BEE: "https://drive.google.com/your-bee2-link",
    English: "https://drive.google.com/your-english2-link",
  },
  semester5: {
    Physics: "https://drive.google.com/your-physics2-link",
    Mathematics: "https://drive.google.com/your-math2-link",
    BEE: "https://drive.google.com/your-bee2-link",
    English: "https://drive.google.com/your-english2-link",
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
