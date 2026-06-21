import img1 from "../assets/Frame 737.png"

export default function Users() {
    return (
        <section className="bg-white flex flex-col items-center py-12 md:py-16 px-4 gap-8 md:gap-12">

            {/* ===== TITLE ===== */}
            <h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl text-center text-black leading-tight max-w-3xl">
                Connect with companies and{" "}
                <br className="hidden sm:block" />
                <span className="text-[#0A77FF]">achieve your goals</span>
            </h1>

            {/* ===== SUBTITLE ===== */}
            <p className="font-normal text-sm md:text-base text-black text-center max-w-md leading-relaxed">
                Join and be a part of particular number 1 jobs and mentoring community to achieve the goals
            </p>

            {/* ===== IMAGE ===== */}
            <div className="w-full max-w-5xl">
                <img src={img1} alt="users" className="w-full h-auto object-contain" />
            </div>

        </section>
    )
}