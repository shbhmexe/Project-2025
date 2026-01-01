import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import blogData from "@/components/Blog/blogData";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id: routeId } = await params;
  const id = parseInt(routeId);
  const blog = blogData.find((blog) => blog.id === id);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The requested blog post was not found.",
    };
  }

  return {
    title: `${blog.title} | MDU IITM Learn`,
    description: blog.paragraph,
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: routeId } = await params;
  const id = parseInt(routeId);
  const blog = blogData.find((blog) => blog.id === id);

  if (!blog) {
    notFound();
  }

  return (
    <>
      <section className="pb-[120px] pt-[150px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-8/12">
              <div>
                <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight">
                  {blog.title}
                </h2>
                <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color border-opacity-10 pb-4 dark:border-white dark:border-opacity-10">
                  <div className="flex flex-wrap items-center">
                    <div className="mb-5 mr-10 flex items-center">
                      <div className="mr-4">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full">
                          <Image
                            src={blog.author.image}
                            alt="author"
                            fill
                            priority
                            unoptimized
                          />
                        </div>
                      </div>
                      <div className="w-full">
                        <span className="mb-1 text-base font-medium text-body-color">
                          By <span>{blog.author.name}</span>
                        </span>
                      </div>
                    </div>
                    <div className="mb-5 flex items-center">
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                          <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            className="fill-current"
                          >
                            <path d="M3.89531 8.67529H3.10666C2.96327 8.67529 2.86768 8.77089 2.86768 8.91428V9.67904C2.86768 9.82243 2.96327 9.91802 3.10666 9.91802H3.89531C4.03871 9.91802 4.1343 9.82243 4.1343 9.67904V8.91428C4.1343 8.77089 4.03871 8.67529 3.89531 8.67529Z" />
                            <path d="M6.429 8.67529H5.64035C5.49696 8.67529 5.40137 8.77089 5.40137 8.91428V9.67904C5.40137 9.82243 5.49696 9.91802 5.64035 9.91802H6.429C6.57239 9.91802 6.66799 9.82243 6.66799 9.67904V8.91428C6.66799 8.77089 6.5485 8.67529 6.429 8.67529Z" />
                            <path d="M8.93828 8.67529H8.14963C8.00624 8.67529 7.91064 8.77089 7.91064 8.91428V9.67904C7.91064 9.82243 8.00624 9.91802 8.14963 9.91802H8.93828C9.08167 9.91802 9.17727 9.82243 9.17727 9.67904V8.91428C9.17727 8.77089 9.08167 8.67529 8.93828 8.67529Z" />
                            <path d="M11.4715 8.67529H10.6828C10.5394 8.67529 10.4438 8.77089 10.4438 8.91428V9.67904C10.4438 9.82243 10.5394 9.91802 10.6828 9.91802H11.4715C11.6149 9.91802 11.7105 9.82243 11.7105 9.67904V8.91428C11.7105 8.77089 11.591 8.67529 11.4715 8.67529Z" />
                            <path d="M3.89531 11.1606H3.10666C2.96327 11.1606 2.86768 11.2562 2.86768 11.3996V12.1644C2.86768 12.3078 2.96327 12.4034 3.10666 12.4034H3.89531C4.03871 12.4034 4.1343 12.3078 4.1343 12.1644V11.3996C4.1343 11.2562 4.03871 11.1606 3.89531 11.1606Z" />
                            <path d="M6.429 11.1606H5.64035C5.49696 11.1606 5.40137 11.2562 5.40137 11.3996V12.1644C5.40137 12.3078 5.49696 12.4034 5.64035 12.4034H6.429C6.57239 12.4034 6.66799 12.3078 6.66799 12.1644V11.3996C6.66799 11.2562 6.5485 11.1606 6.429 11.1606Z" />
                            <path d="M8.93828 11.1606H8.14963C8.00624 11.1606 7.91064 11.2562 7.91064 11.3996V12.1644C7.91064 12.3078 8.00624 12.4034 8.14963 12.4034H8.93828C9.08167 12.4034 9.17727 12.3078 9.17727 12.1644V11.3996C9.17727 11.2562 9.08167 11.1606 8.93828 11.1606Z" />
                            <path d="M11.4715 11.1606H10.6828C10.5394 11.1606 10.4438 11.2562 10.4438 11.3996V12.1644C10.4438 12.3078 10.5394 12.4034 10.6828 12.4034H11.4715C11.6149 12.4034 11.7105 12.3078 11.7105 12.1644V11.3996C11.7105 11.2562 11.591 11.1606 11.4715 11.1606Z" />
                            <path d="M13.2637 3.3697H7.64754V2.58105C8.19721 2.43765 8.62738 1.91189 8.62738 1.31442C8.62738 0.597464 8.02992 0 7.28906 0C6.54821 0 5.95074 0.597464 5.95074 1.31442C5.95074 1.91189 6.35702 2.41376 6.93058 2.58105V3.3697H1.31442C0.597464 3.3697 0 3.96716 0 4.68412V13.2637C0 13.9807 0.597464 14.5781 1.31442 14.5781H13.2637C13.9807 14.5781 14.5781 13.9807 14.5781 13.2637V4.68412C14.5781 3.96716 13.9807 3.3697 13.2637 3.3697ZM6.6677 1.31442C6.6677 0.979841 6.93058 0.716957 7.28906 0.716957C7.62364 0.716957 7.91042 0.979841 7.91042 1.31442C7.91042 1.649 7.64754 1.91189 7.28906 1.91189C6.95448 1.91189 6.6677 1.6251 6.6677 1.31442ZM1.31442 4.08665H13.2637C13.5983 4.08665 13.8612 4.34954 13.8612 4.68412V6.45261H0.716957V4.68412C0.716957 4.34954 0.979841 4.08665 1.31442 4.08665ZM13.2637 13.8612H1.31442C0.979841 13.8612 0.716957 13.5983 0.716957 13.2637V7.16957H13.8612V13.2637C13.8612 13.5983 13.5983 13.8612 13.2637 13.8612Z" />
                          </svg>
                        </span>
                        {blog.publishDate}
                      </p>
                      <p className="mr-5 flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                          <svg
                            width="18"
                            height="13"
                            viewBox="0 0 18 13"
                            className="fill-current"
                          >
                            <path d="M15.6375 0H1.6875C0.759375 0 0 0.759375 0 1.6875V10.6875C0 11.3062 0.309375 11.8406 0.84375 12.15C1.09687 12.2906 1.40625 12.375 1.6875 12.375C1.96875 12.375 2.25 12.2906 2.53125 12.15L5.00625 10.7156C5.11875 10.6594 5.23125 10.6312 5.34375 10.6312H15.6094C16.5375 10.6312 17.2969 9.87187 17.2969 8.94375V1.6875C17.325 0.759375 16.5656 0 15.6375 0ZM16.3406 8.94375C16.3406 9.3375 16.0312 9.64687 15.6375 9.64687H5.37187C5.09062 9.64687 4.78125 9.73125 4.52812 9.87187L2.05313 11.3063C1.82812 11.4187 1.575 11.4187 1.35 11.3063C1.125 11.1938 1.0125 10.9688 1.0125 10.7156V1.6875C1.0125 1.29375 1.32188 0.984375 1.71563 0.984375H15.6656C16.0594 0.984375 16.3687 1.29375 16.3687 1.6875V8.94375H16.3406Z" />
                            <path d="M12.2342 3.375H4.69668C4.41543 3.375 4.19043 3.6 4.19043 3.88125C4.19043 4.1625 4.41543 4.3875 4.69668 4.3875H12.2623C12.5435 4.3875 12.7685 4.1625 12.7685 3.88125C12.7685 3.6 12.5154 3.375 12.2342 3.375Z" />
                            <path d="M11.0529 6.55322H4.69668C4.41543 6.55322 4.19043 6.77822 4.19043 7.05947C4.19043 7.34072 4.41543 7.56572 4.69668 7.56572H11.0811C11.3623 7.56572 11.5873 7.34072 11.5873 7.05947C11.5873 6.77822 11.3342 6.55322 11.0529 6.55322Z" />
                          </svg>
                        </span>
                        500
                      </p>
                      <p className="flex items-center text-base font-medium text-body-color">
                        <span className="mr-3">
                          <svg
                            width="20"
                            height="12"
                            viewBox="0 0 20 12"
                            className="fill-current"
                          >
                            <path d="M10.2559 3.8125C9.03711 3.8125 8.06836 4.8125 8.06836 6C8.06836 7.1875 9.06836 8.1875 10.2559 8.1875C11.4434 8.1875 12.4434 7.1875 12.4434 6C12.4434 4.8125 11.4746 3.8125 10.2559 3.8125ZM10.2559 7.09375C9.66211 7.09375 9.16211 6.59375 9.16211 6C9.16211 5.40625 9.66211 4.90625 10.2559 4.90625C10.8496 4.90625 11.3496 5.40625 11.3496 6C11.3496 6.59375 10.8496 7.09375 10.2559 7.09375Z" />
                            <path d="M19.7559 5.625C17.6934 2.375 14.1309 0.4375 10.2559 0.4375C6.38086 0.4375 2.81836 2.375 0.755859 5.625C0.630859 5.84375 0.630859 6.125 0.755859 6.34375C2.81836 9.59375 6.38086 11.5312 10.2559 11.5312C14.1309 11.5312 17.6934 9.59375 19.7559 6.34375C19.9121 6.125 19.9121 5.84375 19.7559 5.625ZM10.2559 10.4375C6.84961 10.4375 3.69336 8.78125 1.81836 5.96875C3.69336 3.1875 6.84961 1.53125 10.2559 1.53125C13.6621 1.53125 16.8184 3.1875 18.6934 5.96875C16.8184 8.78125 13.6621 10.4375 10.2559 10.4375Z" />
                          </svg>
                        </span>
                        350
                      </p>
                    </div>
                  </div>
                  <div className="mb-5">
                    <a
                      href="#0"
                      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white"
                    >
                      Follow
                    </a>
                  </div>
                </div>
                <div>
                  <p className="mb-10 text-base font-medium leading-relaxed text-body-color dark:text-white sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                    {blog.paragraph}
                  </p>
                  <div className="mb-10 w-full overflow-hidden rounded">
                    <div className="relative aspect-[97/60] w-full sm:aspect-[97/44]">
                      <Image
                        src={blog.image}
                        alt="image"
                        fill
                        priority
                        className="object-cover object-center"
                        unoptimized
                      />
                    </div>
                  </div>

                  {/* Blog content will be dynamically loaded based on blog ID */}
                  {blog.id === 1 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Organize Your Notes Properly:
                          <br />
                          <br />
                          Keeping your notes well-organized is the first step toward effective studying. Categorize them based on subjects, topics, and difficulty levels. Use:<br />
                          <br />
                          ✅ Folders and Labels – Keep different subjects separate.<br />
                          ✅ Digital Notes – Use platforms like Notion, Evernote, or OneNote to keep track of your study material.
                          ✅ Color Coding – Highlight important concepts for quick reference.<br />
                        </strong>
                      </p>

                      {/* Additional content for blog 1 */}
                    </>
                  )}

                  {blog.id === 2 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Create a Strategic Study Schedule:
                          <br />
                          <br />
                          Planning is essential for exam success. Here's how to create an effective schedule:<br />
                          <br />
                          ✅ Start Early – Begin preparation at least 4-6 weeks before exams<br />
                          ✅ Time Blocks – Allocate specific time blocks for different subjects<br />
                          ✅ Prioritize – Focus more time on challenging subjects<br />
                          ✅ Include Breaks – Use the Pomodoro technique (25 minutes study, 5 minutes break)<br />
                        </strong>
                      </p>

                      {/* Additional content for blog 2 */}
                    </>
                  )}

                  {blog.id === 3 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Learning Management Systems That Make a Difference:
                          <br />
                          <br />
                          These platforms can transform how you study and organize your academic resources:<br />
                          <br />
                          ✅ Google Classroom – Perfect for accessing course materials and submitting assignments<br />
                          ✅ Moodle – Used by many professors for course management<br />
                          ✅ Canvas – Intuitive interface with excellent mobile app support<br />
                        </strong>
                      </p>

                      {/* Additional content for blog 3 */}
                    </>
                  )}

                  {blog.id === 4 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Understanding the Credit System:
                          <br />
                          <br />
                          MDU's credit system forms the foundation of your academic evaluation:<br />
                          <br />
                          ✅ Credits per Course – Each course is assigned specific credits (usually 3-4)<br />
                          ✅ Credit Hours – One credit typically equals one hour of lecture per week<br />
                          ✅ Credit Requirements – B.Tech programs require ~160-180 total credits<br />
                          ✅ Credit Distribution – Core courses, electives, labs, and projects each have different credit allocations<br />
                        </strong>
                      </p>

                      {/* Additional content for blog 4 */}
                    </>
                  )}

                  {blog.id === 5 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Traditional Career Paths for B.Tech Graduates:
                          <br />
                          <br />
                          These established career options continue to offer excellent opportunities:<br />
                          <br />
                          ✅ Software Engineering – Development roles at tech companies, startups, or IT service providers<br />
                          ✅ Hardware Engineering – Design and development of electronic systems and components<br />
                          ✅ Technical Consulting – Advising companies on technology implementation and optimization<br />
                          ✅ Product Management – Bridging technical and business aspects of product development<br />
                        </strong>
                      </p>

                      {/* Additional content for blog 5 */}
                    </>
                  )}

                  {blog.id === 6 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Python: The Versatile Foundation:
                          <br />
                          <br />
                          There's a reason Python is recommended for beginners and experts alike:<br />
                          <br />
                          ✅ Easy Learning Curve – Simple syntax makes it perfect for beginners<br />
                          ✅ Versatility – Used in web development, data science, AI, automation, and more<br />
                          ✅ High Demand – Consistently ranked as one of the most in-demand programming skills<br />
                          ✅ Extensive Libraries – Rich ecosystem of frameworks and libraries (Django, Flask, NumPy, Pandas)<br />
                        </strong>
                      </p>

                      {/* Additional content for blog 6 */}
                    </>
                  )}

                  {blog.id === 7 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Understanding the Value of Professional Networking:
                          <br />
                          <br />
                          Networking isn't just about finding jobs—it's about building lasting professional relationships:<br />
                          <br />
                          ✅ Access to Opportunities – Many job openings are filled through referrals before being publicly posted<br />
                          ✅ Industry Insights – Connections provide valuable perspective on industry trends and challenges<br />
                          ✅ Mentorship Possibilities – Finding experienced professionals who can guide your career<br />
                          ✅ Reputation Building – Establishing yourself as a knowledgeable and engaged professional<br />
                        </strong>
                      </p>

                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          2. Campus Networking Strategies for MDU Students:
                          <br />
                          <br />
                          Take advantage of on-campus opportunities to build your network:<br />
                          <br />
                          ✅ Department Events – Attend workshops, seminars, and guest lectures in your field<br />
                          ✅ Student Organizations – Join engineering clubs, IEEE student branch, or other professional societies<br />
                          ✅ Research Opportunities – Work with professors on research projects to build academic connections<br />
                          ✅ Alumni Engagement – Participate in alumni meet-ups and mentorship programs<br />
                        </strong>
                      </p>
                    </>
                  )}

                  {blog.id === 8 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Foundational Machine Learning Concepts:
                          <br />
                          <br />
                          Before diving into complex algorithms, master these fundamental concepts:<br />
                          <br />
                          ✅ Supervised vs. Unsupervised Learning – Understanding the difference between labeled and unlabeled data approaches<br />
                          ✅ Regression vs. Classification – Key problems in supervised learning and their applications<br />
                          ✅ Training, Validation, and Test Sets – How to properly split data for robust model evaluation<br />
                          ✅ Overfitting and Underfitting – Recognizing and preventing these common modeling pitfalls<br />
                        </strong>
                      </p>

                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          2. Essential Machine Learning Algorithms:
                          <br />
                          <br />
                          Understand these key algorithms that form the foundation of machine learning:<br />
                          <br />
                          ✅ Linear Regression – The building block for many predictive models<br />
                          ✅ Logistic Regression – Despite the name, this is a fundamental classification algorithm<br />
                          ✅ Decision Trees and Random Forests – Versatile and interpretable algorithms<br />
                          ✅ K-Means Clustering – A foundational unsupervised learning technique<br />
                        </strong>
                      </p>
                    </>
                  )}

                  {blog.id === 9 && (
                    <>
                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          1. Understanding Your Academic Priorities:
                          <br />
                          <br />
                          Before you can achieve balance, identify what matters most:<br />
                          <br />
                          ✅ Core Courses – Identify which courses are most crucial for your major and career path<br />
                          ✅ Academic Goals – Set clear GPA targets and learning objectives for each semester<br />
                          ✅ Non-Negotiables – Determine which study habits and academic practices you won't compromise<br />
                          ✅ Long-term Vision – Connect your current academic efforts to your future career aspirations<br />
                        </strong>
                      </p>

                      <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed lg:text-base lg:leading-relaxed xl:text-lg xl:leading-relaxed">
                        <strong className="text-primary dark:text-white">
                          2. Selecting Meaningful Extracurricular Activities:
                          <br />
                          <br />
                          Quality matters more than quantity when it comes to extracurriculars:<br />
                          <br />
                          ✅ Alignment with Goals – Choose activities that complement your academic and career objectives<br />
                          ✅ Passion Projects – Participate in clubs or organizations you genuinely enjoy<br />
                          ✅ Leadership Opportunities – Seek roles that allow you to develop transferable skills<br />
                          ✅ Community Engagement – Consider activities that let you give back to the MDU community<br />
                        </strong>
                      </p>
                    </>
                  )}

                  <h3 className="font-xl mb-10 font-bold leading-tight text-black dark:text-white sm:text-2xl sm:leading-tight lg:text-xl lg:leading-tight xl:text-xl xl:leading-tight">
                    Conclusion
                  </h3>

                  <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary bg-opacity-10 p-8 md:p-9 lg:p-8 xl:p-9">
                    <p className="text-center text-base font-medium italic text-body-color">
                      {blog.id === 1 && "By following these strategies, you can maximize the potential of your MDU & IITM notes and enhance your academic performance. A well-structured study routine, active learning, and consistent practice will ensure you stay ahead in your exams."}
                      {blog.id === 2 && "Implementing these study hacks can significantly improve your semester exam performance. Remember that effective studying is about working smarter, not just harder. Customize these techniques to fit your learning style and watch your grades improve."}
                      {blog.id === 3 && "Mastering these online tools will give you a significant advantage in your academic journey. By leveraging technology effectively, you can enhance your learning experience, improve collaboration, and develop digital skills that will serve you well beyond your college years."}
                      {blog.id === 4 && "Understanding MDU&apos;s grading system empowers you to make informed decisions about your academic journey. Use this knowledge to set realistic goals, track your progress, and strategically plan your course selections to maximize your GPA and overall academic success."}
                      {blog.id === 5 && "Your B.Tech degree from MDU or IITM opens numerous career doors. The key is to start early, gain relevant experience, build your network, and continuously update your skills. With the right approach, you can transform your degree into a successful and fulfilling career."}
                      {blog.id === 6 && "Mastering these programming languages will significantly enhance your career prospects as a CS student. Remember that consistent practice, building projects, and contributing to open-source are just as important as learning the syntax. Start early and code often!"}
                      {blog.id === 7 && "Building a professional network as an engineering student can significantly enhance your career prospects. By leveraging campus resources, online platforms, and industry events, you'll create valuable connections that can last throughout your professional life."}
                      {blog.id === 8 && "Understanding machine learning fundamentals is becoming essential for computer science students. By mastering these concepts early in your education, you'll be well-positioned to explore advanced topics and pursue exciting opportunities in this rapidly evolving field."}
                      {blog.id === 9 && "Achieving balance between academics and extracurriculars is a skill that will serve you throughout your career. By setting clear priorities, managing your time effectively, and making strategic choices, you can excel academically while still enjoying a fulfilling college experience."}
                    </p>
                  </div>

                  <div className="items-center justify-between sm:flex">
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color">
                        Popular Tags :
                      </h5>
                      <div className="flex items-center">
                        {blog.tags.map((tag, index) => (
                          <TagButton key={index} text={tag} />
                        ))}
                      </div>
                    </div>
                    <div className="mb-5">
                      <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                        Share this post :
                      </h5>
                      <div className="flex items-center sm:justify-end">
                        <SharePost />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 