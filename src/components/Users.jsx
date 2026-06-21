import img1 from "../assets/Frame 737.png"

export default function Users() {
    return (
        <section className="h-244.5 bg-white flex flex-col items-center pt-9.25 gap-15">
            <div className="w-254 h-30.75 ">
                <h1 className="font-semibold text-[56px] text-center text-black">Connect with companies and<br /> <span className="text-[#0A77FF]">achieve your goals</span></h1>
            </div>
            <div className="w-99.75 h-7.75">
                <p className="font-normal text-[16px] text-black text-center ">Join and be a part of particular number 1 jobs and mentoring community to achieve the goals</p>
            </div>
            <div className="w-310.25 h-141.5">
                <img src={img1} alt="img" />
            </div>
        </section>
    )
}
