import icon from "../assets/Icon.png"
import one from "../assets/Union.png"
import two from "../assets/Union-2.png"
import irish from "../assets/irish.png"
import img from "../assets/image 59.png"
import three from "../assets/Union-3.png"
import four from "../assets/Union-4.png"

export default function CareerJourney() {
    return (
        <section className="min-h-screen bg-[#8DBAEF] flex flex-col justify-center items-center px-6 py-16">

            <h1 className="font-semibold text-4xl md:text-5xl text-center">
                <span className="text-[#0A77FF]">Advice for Your </span> Career Journey
            </h1>

            <img src={icon} alt="icon" className=" ml-250 mt-15" />

            <div className="w-full max-w-6xl mt-16 flex flex-col md:flex-row justify-center items-center gap-8">

                {/* ===== LEFT ===== */}
                <div className="flex-1 flex flex-col gap-12">
                    <div className="flex items-center gap-6">
                        <img src={one} alt="one" className="w-6 shrink-0" />
                        <p className="font-normal text-lg">
                            <span className="font-semibold">Explore Companies:</span> Browse through
                            our featured companies or use the
                            search function to find companies
                            based on industry or location
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <img src={two} alt="two" className="w-6 shrink-0" />
                        <p className="font-normal text-lg">
                            <span className="font-semibold">Learn About Cultures:</span> Dive
                            into each company's profile to
                            understand their mission, values,
                            and workplace culture
                        </p>
                    </div>
                    <img src={irish} alt="irish" className="w-16" />
                </div>

                {/* ===== CENTER IMAGE ===== */}
                <div className="flex-1 flex justify-center">
                    <img src={img} alt="img" className="w-full max-w-sm object-contain" />
                </div>

                {/* ===== RIGHT ===== */}
                <div className="flex-1 flex flex-col gap-12">
                    <div className="flex items-center gap-6">
                        <p className="font-normal text-lg">
                            <span className="font-semibold">Find Openings:</span> Check out the current
                            job openings at each company and
                            apply for positions that align with
                            your skills and career goals
                        </p>
                        <img src={three} alt="three" className="w-6 shrink-0" />
                    </div>
                    <div className="flex items-center gap-6">
                        <p className="font-normal text-lg">
                            <span className="font-semibold">Connect with Employers:</span> Use our
                            platform to connect with recruiters.
                            Stay informed about upcoming job
                            fairs and networking events
                        </p>
                        <img src={four} alt="four" className="w-6 shrink-0" />
                    </div>
                </div>

            </div>
        </section>
    )
}