export default function AboutUs() {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative isolate overflow-hidden bg-blue-600 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">About Us</h1>
            <p className="mt-6 text-lg leading-8 text-blue-100">
              We are making getting a mortgage faster, less expensive, and more clear.
            </p>
          </div>
        </div>
      </div>

      {/* Mission section */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Mission</h2>
          <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
            <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
              <p className="text-xl leading-8 text-gray-600">
                We&apos;re using technology to make getting a mortgage fast, simple, and secure.
              </p>
              <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
                <p>
                  Founded in 2016, Better is a digital-first homeownership company whose services included mortgage, real estate, title, and homeowners insurance.
                </p>
                <p className="mt-6">
                  From our offices in New York City, we&apos;re using technology to change the way people finance their homes, for the better.
                </p>
                <p className="mt-6">
                  By focusing on a seamless online experience and eliminating commissions, we&apos;re making getting a mortgage faster, less expensive, and more clear.
                </p>
              </div>
            </div>
            <div className="lg:flex lg:flex-auto lg:justify-center">
              <dl className="w-64 space-y-8 xl:w-80">
                {[
                  { label: "Founded", value: "2016" },
                  { label: "Employees", value: "500+" },
                  { label: "Borrowers served", value: "100,000+" },
                  { label: "Funded", value: "$30B+" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-y-4">
                    <dt className="text-base leading-7 text-gray-600">{stat.label}</dt>
                    <dd className="text-5xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-blue-600">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What we believe in
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: "Transparency",
                  description: "We believe in clear, honest communication with our customers about rates, fees, and processes.",
                },
                {
                  title: "Innovation",
                  description: "We continuously improve our technology to make the mortgage process simpler and more efficient.",
                },
                {
                  title: "Accessibility",
                  description: "We&apos;re committed to making homeownership accessible to more people through lower costs and fewer barriers.",
                },
              ].map((value) => (
                <div key={value.title} className="flex flex-col">
                  <dt className="text-lg font-semibold leading-7 text-gray-900">{value.title}</dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{value.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
