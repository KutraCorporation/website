import { MessageCircle, Users } from "lucide-react";

export default function AboutCards() {
    return (
        <>
            <div className="text-center group border-2 border-white/20 rounded-xl p-8 backdrop-blur-xl hover:border-owt1/20 hover:bg-owt1/10 hover:text-owt1 transition-all duration-300">
                <a href="/about/team">
                    <Users className="w-12 h-12 text-current text-center mx-auto"/>
                    <span className="mt-5">Team</span>
                </a>
            </div>
            <div className="text-center group border-2 border-white/20 rounded-xl p-8 backdrop-blur-xl hover:border-owt1/20 hover:bg-owt1/10 hover:text-owt1 transition-all duration-300">
                <a href="/about/contact">
                    <MessageCircle className="w-12 h-12 text-current text-center mx-auto" />
                    <span className="mt-5">Contact</span>
                </a>
            </div>
        </>
    )
}