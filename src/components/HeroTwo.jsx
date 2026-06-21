import img1 from "../assets/Rectangle 1.png";

export default function HeroTwo() {
    return (
        <section className="w-full">
            <img
                src={img1}
                alt="Hero Banner"
                className="w-full h-48 sm:h-64 md:h-80 lg:h-auto object-cover"
            />
        </section>
    );
}