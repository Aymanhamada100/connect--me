import { useEffect, useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import HeroTwo from "../components/HeroTwo";
import HeroThree from "../components/HeroThree";
import CareerJourney from "../components/CareerJourney";
import Users from "../components/Users";
import About from "../components/About";
import { API } from "../store";

export default function Home() {
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (!token) return;

        const fetchProfile = async () => {
            try {
                const res = await fetch(API.getProfile, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                if (data.name) setUserName(data.name);
            } catch (err) {
                console.error("Failed to fetch user profile:", err);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div className="w-full h-full">
            <Header userName={userName} />
            <Hero userName={userName} />
            <HeroTwo userName={userName} />
            <HeroThree userName={userName} />
            <CareerJourney userName={userName} />
            <Users userName={userName} />
            <About userName={userName} />
        </div>
    );
}